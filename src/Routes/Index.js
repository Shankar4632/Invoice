import React from "react";
import { Route, Routes } from "react-router-dom";
import InvoicePage from "../Pages/InvoicePage";

const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InvoicePage />} />
      </Routes>
    </div>
  );
};

export default Index;
