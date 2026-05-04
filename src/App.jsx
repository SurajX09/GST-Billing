import React from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceForm from "./components/invoice/InvoiceForm";
import CustomerForm from "./components/customer/CustomerForm";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/invoice" element={<InvoiceForm />} />
            <Route path="/customer" element={<CustomerForm />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
