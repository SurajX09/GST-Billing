import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/invoice/InvoiceForm";
import CustomerForm from "./components/customer/CustomerForm";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="p-4">
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoice" element={<InvoiceForm />} />
        <Route path="/customer" element={<CustomerForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
