import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../Action/Action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderSpinner from "../Layout/Loader";

const EmpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [code, setCode] = useState("");
  const [gender, setGender] = useState("");
  const [branch, setBranch] = useState("");
  // const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const nav = useNavigate();

  // const handleAttachmentChange = (e) => {
  //   const file = e.target.files[0];
  //   setAttachments([...attachments, file]);
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        createUser({
          firstname,
          lastname,
          email,
          phoneNumber,
          address,
          jobrole,
          department,
          dob,
          code,
          gender,
          branch,
        })
      );
      toast.success("User created successfully");
      setFirstname("");
      setEmail("");
      setLastName("");
      setPhoneNumber("");
      setAddress("");
      setJobrole("");
      setDepartment("");
      setDob("");
      setCode("");
      setGender("");
      setBranch("");
      nav("/emptable");
    } catch (error) {
      toast.error("Error occurred while creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className="container mt-3">
            <h2
              className="text-center mb-4 fw-bold"
              style={{ color: "#007bff" }}
            >
              EMPLOYEE FORM
            </h2>
            <form onSubmit={handleSubmit} className="Form-card-css ">
              <div className="form-table">
                <div className="form-row">
                  <div className="form-cell">
                    <label htmlFor="empid">
                      Employee Code<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="empid"
                      value={code}
                      placeholder="ABC123"
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-cell ">
                    <label htmlFor="name">
                      First Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={firstname}
                      placeholder="Enter your First Name"
                      onChange={(e) => setFirstname(e.target.value)}
                      pattern="[A-Za-z]+"
                      required
                    />
                  </div>
                  <div className="form-cell">
                    <label htmlFor="lastname">
                      Last Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={lastname}
                      placeholder="Enter your last name"
                      onChange={(e) => setLastName(e.target.value)}
                      pattern="[A-Za-z]+"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-cell">
                    <label htmlFor="email">
                      Email<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      placeholder="Enter your email address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-cell">
                    <label htmlFor="doj">
                      Date of Birth<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      id="doj"
                      value={dob}
                      placeholder="00/00/0000"
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-cell">
                    <label htmlFor="phoneNumber">
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={phoneNumber}
                      placeholder="9876543210"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-cell">
                    <label htmlFor="department">
                      Department<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="department"
                      value={department}
                      placeholder="Select a Department"
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Civil">Civil</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                  <div className="form-cell">
                    <label htmlFor="jobrole">
                      Role<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="jobrole"
                      value={jobrole}
                      placeholder="Select a Role"
                      onChange={(e) => setJobrole(e.target.value)}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                      <option value="Supervisor">Supervisor</option>
                    </select>
                  </div>

                  <div className="form-cell">
                    <label htmlFor="gender">
                      Gender<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      placeholder="Select Your Gender"
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-cell ">
                    <label htmlFor="branch">
                      Branch<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="branch"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      required
                    >
                      <option value="">Select Branch</option>
                      <option value="branch1">Branch 1</option>
                      <option value="branch2">Branch 2</option>
                      <option value="branch3">Branch 3</option>
                    </select>
                    <div className="form-cell mt-4 ">
                      <label htmlFor="attachment">Attachment</label>
                      <input
                        type="file"
                        id="attachment"
                        // onChange={(e) => handleAttachmentChange(e)}
                      />
                    </div>
                  </div>
                  <div className="form-cell ">
                    <label htmlFor="address">
                      Address<span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="w-100 "
                      style={{ height: "100" }}
                      id="address"
                      value={address}
                      placeholder="Enter Your Address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn ">
                Add User
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EmpForm;
