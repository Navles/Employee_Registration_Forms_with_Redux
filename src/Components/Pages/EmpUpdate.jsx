import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../Action/Action";
import { useParams, useNavigate } from "react-router-dom";

const EmpUpdate = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [jobrole, setJobRol] = useState("");
  const [department, setDepartment] = useState("");
  const [doj, setDoj] = useState("");
  const [empid, setEmpId] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  // Fetch user data by ID when the component mounts
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  // Get user data from Redux store
  const userToUpdate = useSelector((state) => state.user);

  // Update local state when user data changes
  useEffect(() => {
    if (userToUpdate) {
      setName(userToUpdate.name);
      setLastName(userToUpdate.lastname);
      setEmail(userToUpdate.email);
      setPhoneNumber(userToUpdate.phoneNumber);
      setAddress(userToUpdate.address);
      setJobRol(userToUpdate.jobrole);
      setDepartment(userToUpdate.department);
      setDoj(userToUpdate.doj);
      setEmpId(userToUpdate.empid);
      setGender(userToUpdate.gender);
    }
  }, [userToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToUpdate) {
      dispatch(
        updateUser(userToUpdate.id, {
          name,
          lastname,
          email,
          phoneNumber,
          address,
          jobrole,
          department,
          doj,
          empid,
          gender,
        })
      );
      setName("");
      nav("/emptable");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-3 fw-bold" style={{ color: "blue" }}>
        UPDATING FORM
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
                value={empid}
                placeholder="eg: ABC123"
                onChange={(e) => setEmpId(e.target.value)}
                required
              />
            </div>
            <div className="form-cell">
              <label htmlFor="name">
                First Name<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter your First Name"
                onChange={(e) => setName(e.target.value)}
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
                value={doj}
                placeholder="00/00/0000"
                onChange={(e) => setDoj(e.target.value)}
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
                onChange={(e) => setJobRol(e.target.value)}
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
            <div className="form-cell">
              <label htmlFor="address">
                Address<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
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
          Update User
        </button>
      </form>
    </div>
  );
};

export default EmpUpdate;
