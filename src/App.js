import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpForm from "./Pages/EmpRegistForm/EmpForm";
import Layout from "./Component/Layout/Layout";
import EmpTable from "./Pages/EmpRegistTable/EmpTable";
import EmpUpdate from "./Pages/EmpRegistUpdate/EmpUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<EmpForm />} />
        <Route path="/emptable" element={<EmpTable />} />
        <Route path="/edit" element={<EmpUpdate />}></Route>
        <Route path="/form/:id/edit" element={<EmpUpdate />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
