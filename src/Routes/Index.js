import React from "react";
import { Route, Routes } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";
import AddCustomer from "../Pages/AddCustomer";
import AddedList from "../Pages/AddedList";
import AddEdit from "../Pages/AddEdit";
import Downloadpdf from "../Pages/Downloadpdf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Index = () => {
  return (
    <div>
      <ToastContainer className="text-center" />
      <Routes>
        <Route exact path="/invoicepage" element={<InvoicePage />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
        <Route path="/addedit" element={<AddEdit />} />
        <Route path="/" element={<AddedList />} />
        <Route path="/downloadpdf/:id" element={<Downloadpdf />} />
      </Routes>
    </div>
  );
};

export default Index;
