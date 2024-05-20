import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpForm from "./Components/Pages/EmpForm";
import Layout from "./Components/Layout/Navbar";
import EmpTable from "./Components/Pages/EmpTable";
import EmpUpdate from "./Components/Pages/EmpUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/employee/create" element={<EmpForm />} />
        <Route path="/employee/view" element={<EmpTable />} />
        <Route path="/edit" element={<EmpUpdate />}></Route>
        <Route path="/employee/:id/edit" element={<EmpUpdate />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
