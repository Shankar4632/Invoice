import React from "react";
import { Route, Routes } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";
import CustomiseItem from "../Pages/CustomiseItem";
import AddItem from "../Pages/AddItem";
import AddCustomer from "../Pages/AddCustomer";
import AmountsOnly from "../Pages/AmountsOnly";
import Hours from "../Pages/Hours";
import AddTax from "../Pages/AddTax";
const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/customise" element={<CustomiseItem />} />
        <Route path="/additems" element={<AddItem />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
        <Route path="/amountsonly" element={<AmountsOnly />} />
        <Route path="/hours" element={<Hours />} />
        <Route path="/addtax" element={<AddTax />} />
      </Routes>
    </div>
  );
};

export default Index;
