import React from "react";
import { Route, Routes } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";
import CustomiseItem from "../Pages/CustomiseItem";

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
        <Route path="/customise" element={<CustomiseItem />} />
      </Routes>
    </div>
  );
};

export default Index;
