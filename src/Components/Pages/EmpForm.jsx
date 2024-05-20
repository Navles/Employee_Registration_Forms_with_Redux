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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState([]);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;
    const codePattern = /^[A-Za-z0-9]+$/;

    if (!firstname || !namePattern.test(firstname)) {
      newErrors.firstname =
        "First name is required and should only contain letters";
    }
    if (!lastname || !namePattern.test(lastname)) {
      newErrors.lastname =
        "Last name is required and should only contain letters";
    }
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "A valid email is required";
    }
    if (!phoneNumber || !phonePattern.test(phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number is required and should be 10 digits";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!jobrole) {
      newErrors.jobrole = "Job role is required";
    }
    if (!department) {
      newErrors.department = "Department is required";
    }
    if (!dob) {
      newErrors.dob = "Date of birth is required";
    }
    if (!code || !codePattern.test(code)) {
      newErrors.code =
        "Employee code is required and should contain letters and numbers";
    }
    if (!gender) {
      newErrors.gender = "Gender is required";
    }
    if (!branch) {
      newErrors.branch = "Branch is required";
    }

    return newErrors;
  };

  const handleChange = (setter, field, regex) => (e) => {
    const value = e.target.value;
    setter(value);
    if (regex.test(value)) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: getFieldErrorMessage(field),
      }));
    }
  };

  const getFieldErrorMessage = (field) => {
    const errorMessages = {
      firstname: "First name is required and should only contain letters",
      lastname: "Last name is required and should only contain letters",
      email: "A valid email is required",
      phoneNumber: "Phone number is required and should be 10 digits",
      code: "Employee code is required and should contain letters and numbers",
      address: "Address is required",
      jobrole: "Job role is required",
      department: "Department is required",
      dob: "Date of birth is required",
      gender: "Gender is required",
      branch: "Branch is required",
    };
    return errorMessages[field];
  };

  const handleSelectChange = (setter, field) => (e) => {
    const value = e.target.value;
    setter(value);
    if (value) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: getFieldErrorMessage(field),
      }));
    }
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachments([...attachments, file]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
      resetForm();
      nav("/employee/view");
    } catch (error) {
      toast.error("Error occurred while creating user");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
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
    setErrors({});
  };

  return (
    <>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="container my-3">
          <h2 className="text-start mb-4 fw-bold" style={{ color: "#007bff" }}>
            CREATE EMPLOYEE
          </h2>
          <form onSubmit={handleSubmit} className="Form-card-css">
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
                    onChange={handleChange(setCode, "code", /^[A-Za-z0-9]+$/)}
                  />
                  {errors.code && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.code}
                    </div>
                  )}
                </div>
                <div className="form-cell">
                  <label htmlFor="name">
                    First Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={firstname}
                    placeholder="Enter your First Name"
                    onChange={handleChange(
                      setFirstname,
                      "firstname",
                      /^[A-Za-z]+$/
                    )}
                  />
                  {errors.firstname && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.firstname}
                    </div>
                  )}
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
                    onChange={handleChange(
                      setLastName,
                      "lastname",
                      /^[A-Za-z]+$/
                    )}
                  />
                  {errors.lastname && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.lastname}
                    </div>
                  )}
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
                    onChange={handleChange(
                      setEmail,
                      "email",
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    )}
                  />
                  {errors.email && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.email}
                    </div>
                  )}
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
                    onChange={handleChange(setDob, "dob", /.+/)}
                  />
                  {errors.dob && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.dob}
                    </div>
                  )}
                </div>
                <div className="form-cell">
                  <label htmlFor="phoneNumber">
                    Phone Number<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    value={phoneNumber}
                    placeholder="9876543210"
                    onChange={handleChange(
                      setPhoneNumber,
                      "phoneNumber",
                      /^[0-9]{10}$/
                    )}
                  />
                  {errors.phoneNumber && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.phoneNumber}
                    </div>
                  )}
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
                    onChange={handleSelectChange(setDepartment, "department")}
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Civil">Civil</option>
                    <option value="Finance">Finance</option>
                  </select>
                  {errors.department && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.department}
                    </div>
                  )}
                </div>
                <div className="form-cell">
                  <label htmlFor="jobrole">
                    Role<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="jobrole"
                    value={jobrole}
                    placeholder="Select a Role"
                    onChange={handleSelectChange(setJobrole, "jobrole")}
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                  {errors.jobrole && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.jobrole}
                    </div>
                  )}
                </div>

                <div className="form-cell">
                  <label htmlFor="gender">
                    Gender<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    placeholder="Select Your Gender"
                    onChange={handleSelectChange(setGender, "gender")}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.gender}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-cell">
                  <label htmlFor="branch">
                    Branch<span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="branch"
                    value={branch}
                    onChange={handleSelectChange(setBranch, "branch")}
                  >
                    <option value="">Select Branch</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                  {errors.branch && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.branch}
                    </div>
                  )}
                  <div className="form-cell mt-4 ">
                    <label htmlFor="attachment">Attachment</label>
                    <input
                      type="file"
                      id="attachment"
                      onChange={(e) => handleAttachmentChange(e)}
                    />
                  </div>
                </div>
                <div className="form-cell">
                  <label htmlFor="address">
                    Address<span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    id="address"
                    value={address}
                    placeholder="Enter your address"
                    onChange={handleChange(setAddress, "address", /.+/)}
                  ></textarea>
                  {errors.address && (
                    <div className="error" style={{ color: "red" }}>
                      {errors.address}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-cell justify-content-end d-flex">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary ms-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EmpForm;
