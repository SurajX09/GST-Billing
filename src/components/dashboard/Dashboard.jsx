// src/components/dashboard/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Suraj</h1>
          <p className="text-sm text-gray-500">Overview of your billing activity</p>
        </div>
        <div className="flex gap-3">
          <Link to="/invoice" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:opacity-95">+ New Invoice</Link>
          <Link to="/customer" className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md">Customers</Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Total Invoices</div>
          <div className="text-2xl font-semibold text-gray-800">124</div>
          <div className="text-xs text-green-600 mt-1">+8% vs last month</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Outstanding</div>
          <div className="text-2xl font-semibold text-gray-800">₹ 28,450</div>
          <div className="text-xs text-red-600 mt-1">2 overdue</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Revenue (YTD)</div>
          <div className="text-2xl font-semibold text-gray-800">₹ 9,24,000</div>
          <div className="text-xs text-green-600 mt-1">+12% vs last year</div>
        </div>
      </div>

      <motion.div className="bg-white rounded-2xl shadow-md p-6 border" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
        <p className="text-gray-700">Quick actions and recent invoices appear here. Use the left navigation to manage invoices and customers.</p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
