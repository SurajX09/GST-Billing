import React, { useState } from "react";

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: "",
    gstin: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // ✅ Improved GSTIN validation
  const isValidGSTIN = (gstin) => {
    const trimmedGSTIN = gstin.trim().toUpperCase();
    const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return regex.test(trimmedGSTIN);
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: name === "gstin" ? value.toUpperCase() : value,
    }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!customer.name.trim()) newErrors.name = "Name is required.";
    if (!isValidGSTIN(customer.gstin))
      newErrors.gstin = "Invalid GSTIN format. Ex: 27ABCDE1234F1Z5";
    if (!customer.phone.match(/^[6-9]\d{9}$/))
      newErrors.phone = "Invalid phone number.";
    if (!customer.address.trim())
      newErrors.address = "Address is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("✅ Customer Saved:", customer);
      alert("Customer saved successfully!");
      setCustomer({ name: "", gstin: "", address: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">GSTIN</label>
          <input
            type="text"
            name="gstin"
            value={customer.gstin}
            onChange={handleChange}
            className="w-full border p-2 rounded uppercase"
          />
          {errors.gstin && (
            <p className="text-red-500 text-sm">{errors.gstin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
