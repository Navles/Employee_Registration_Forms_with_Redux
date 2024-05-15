import React, { useState } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbars">
      <h3 className="ms-3 fw-bold " >
        EMPLOYEE REGISTRATION
      </h3>

      <ul className={isOpen ? "navbar-navs active" : "navbar-navs me-3"}>
        <li className="nav-items">
          <a href="/" className="nav-links fw-bold">
            FORM
          </a>
        </li>
        <li className="nav-items">
          <a href="/emptable" className="nav-links fw-bold">
            LIST DETAILS
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
