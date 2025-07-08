// src/components/dashboard/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome to GST360 Billing App
      </h1>

      {/* Navigation buttons directly on dashboard */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-3 rounded-xl text-center hover:scale-105 transition transform duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/invoice"
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium px-6 py-3 rounded-xl text-center hover:scale-105 transition transform duration-200"
        >
          Create Invoice
        </Link>
        <Link
          to="/customer"
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium px-6 py-3 rounded-xl text-center hover:scale-105 transition transform duration-200"
        >
          Customers
        </Link>
      </motion.div>

      {/* Welcome info box */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border text-center"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <p className="text-lg text-gray-700 mb-2">
          📋 Manage your billing, customers, and invoices from one place.
        </p>
        <p className="text-gray-500">
          Use the buttons above to navigate through your billing app.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
