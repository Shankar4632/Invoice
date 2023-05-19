import React from "react";
import { Route, Routes } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";
import CustomiseItem from "../Pages/CustomiseItem";
import AddItem from "../Pages/AddItem";
import AddCustomer from "../Pages/AddCustomer";

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/customise" element={<CustomiseItem />} />
        <Route path="/additems" element={<AddItem />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
      </Routes>
    </div>
  );
};

export default Index;
