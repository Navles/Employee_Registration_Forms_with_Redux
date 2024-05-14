import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
} from "../Action/Action";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const ReduxTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dt = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [state, setState] = useState({
    deleteDialogVisible: false,
    deleteSelectedDialogVisible: false,
    deleteTarget: null,
  });
  const [globalSearchText, setGlobalSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  });

  const handleEditClick = (id) => {
    navigate(`/form/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedProducts.map((user) => dispatch(deleteUser(user.id))));
      setSelectedProducts([]);
      toast.success("Selected users deleted successfully");
    } catch (error) {
      toast.error("Error deleting selected users");
    }
  };

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TEXT", users: e.target.value });
    setGlobalSearchText(e.target.value);
  };

  const filteredData = users
    ? users.filter((row) => {
        const searchText = globalSearchText.toLowerCase();
        return (
          (row.firstname && row.firstname.toLowerCase().includes(searchText)) ||
          (row.email && row.email.toLowerCase().includes(searchText)) ||
          (row.phoneNumber &&
            row.phoneNumber.toLowerCase().includes(searchText)) ||
          (row.lastname && row.lastname.toLowerCase().includes(searchText)) ||
          (row.jobrole && row.jobrole.toLowerCase().includes(searchText)) ||
          (row.department &&
            row.department.toLowerCase().includes(searchText)) ||
          (row.dob && row.dob.toLowerCase().includes(searchText)) ||
          (row.gender && row.gender.toLowerCase().includes(searchText)) ||
          (row.code && row.code.toLowerCase().includes(searchText)) ||
          (row.address && row.address.toLowerCase().includes(searchText))
        );
      })
    : [];

  const clearGlobalSearch = () => {
    dt.current.reset();
    setGlobalSearchText("");
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then((autoTable) => {
        const doc = new jsPDF.default();
        doc.autoTable({
          head: [
            [
              "Code",
              "E-mail",
              "Phone Number",
              "First Name",
              "Last Name",
              "Department",
              "Role",
              "Gender",
              "Date of Birth",
              "Address",
            ],
          ],
          body: users.map((row) => [
            row.empid,
            row.name,
            row.email,
            row.phoneNumber,
            row.lastname,
            row.empid,
            row.department,
            row.gender,
            row.doj,
            row.address,
          ]),
        });

        doc.save("Student Details.pdf");
      });
    });
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  const header = (
    <div className="d-md-flex justify-content-between gap-2">
      <div>
        <h3>Employee Details</h3>
      </div>
      <div className="d-md-flex">
        <div className="my-auto">
          <Button
            onClick={() => clearGlobalSearch("")}
            className="pi pi-filter-slash p-button-outlined me-3 p-2"
          >
            <span className="ms-2">Clear</span>
          </Button>
        </div>
        <div className="">
          <span className="p-input-icon-left">
            <InputText
              value={globalSearchText}
              onChange={handleSearch}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center col-10 mx-auto  mt-2">
      
      <div className="d-md-flex border shadow justify-content-between p-3 my-3">
        <div className="d-flex justify-content-center">
          <div>
            <Link to="/">
              <Button className="p-button p-button-success  me-2 rounded">
                <FaPlus className="me-2" />
                <span>Add New</span>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={() =>
                setState({ ...state, deleteSelectedDialogVisible: true })
              }
              className="p-button p-button-danger rounded"
              disabled={!selectedProducts || selectedProducts.length === 0}
            >
              <FaTrashAlt className="me-2" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 mt-md-0">
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons rounded"
            icon="pi pi-file-pdf "
            rounded
            severity="warning"
            onClick={() => exportPdf(false)}
            data-pr-tooltip="Export to PDF"
          />
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons rounded"
            icon="pi pi-file-excel"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="Export to Excel"
          />
        </div>
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="datatable">
        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          header={header}
          rows={5}
          className="card shadow mb-5"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="code"
            header="Emp Code"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="firstname"
            header="First Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="lastname"
            header="Last Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="department"
            header="Department"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="jobrole"
            header="Role"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />

          <Column
            field="dob"
            header="Date Of Birth"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="phoneNumber"
            header="Phone Number"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />

          <Column
            field="gender"
            header="Gender"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="address"
            header="Address"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />

          <Column
            body={(rowData) => (
              <>
                <div key={rowData.id}></div>
                <Link to={`/form/${rowData.id}/edit`}>
                  <Button
                    onClick={() => handleEditClick(rowData.id)}
                    icon={<FaPencilAlt />}
                    className="p-button p-button-primary mx-2 rounded"
                    rounded
                  />
                </Link>
                <Button
                  onClick={() =>
                    setState({
                      ...state,
                      deleteDialogVisible: true,
                      deleteTarget: rowData,
                    })
                  }
                  icon={<FaTrashAlt />}
                  className="p-button p-button-danger rounded"
                  rounded
                />
              </>
            )}
            header="Actions"
          />
        </DataTable>
      </div>

      <Dialog
        visible={state.deleteDialogVisible}
        onHide={() =>
          setState({ ...state, deleteDialogVisible: false, deleteTarget: null })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({
                  ...state,
                  deleteDialogVisible: false,
                  deleteTarget: null,
                })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={() => {
                handleDelete(state.deleteTarget.id);
                setState({ ...state, deleteDialogVisible: false });
              }}
            />
          </div>
        }
      >
        {state.deleteTarget && (
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{state.deleteTarget.name}</strong>?
          </p>
        )}
      </Dialog>

      <Dialog
        visible={state.deleteSelectedDialogVisible}
        onHide={() =>
          setState({ ...state, deleteSelectedDialogVisible: false })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({ ...state, deleteSelectedDialogVisible: false })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={() => {
                handleDeleteSelected();
                setState({ ...state, deleteSelectedDialogVisible: false });
              }}
            />
          </div>
        }
      >
        <p>Are you sure you want to delete the selected users?</p>
      </Dialog>
    </div>
  );
};

export default ReduxTable;
