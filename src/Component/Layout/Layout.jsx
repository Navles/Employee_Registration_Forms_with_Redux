import React, { useState } from "react";
import "./Layout.css";
import { FaBars } from "react-icons/fa";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbars">
      <h2 className="" style={{ color: "white" }}>
        EMPLOYEE REGISTRATION
      </h2>

      <ul className={isOpen ? "navbar-navs active" : "navbar-navs"}>
        <li className="nav-items">
          <a href="/" className="nav-links">
            Employee Form
          </a>
        </li>
        <li className="nav-items">
          <a href="/emptable" className="nav-links">
            Employee Details
          </a>
        </li>
        <li className="nav-items">
          <a href="/edit" className="nav-links">
            Employee Updates
          </a>
        </li>
      </ul>
      <button className="toggle-button" onClick={toggleNavbar}>
        <FaBars />
      </button>
    </nav>
  );
}

export default Layout;
