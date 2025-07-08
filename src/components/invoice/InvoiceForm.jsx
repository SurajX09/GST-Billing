// src/components/invoice/InvoiceForm.jsx
import React, { useState } from "react";
import InvoiceItemRow from "./InvoiceItemRow";
import InvoicePreview from "./InvoicePreview";

// Helper function to auto-generate invoice number
const getNextInvoiceNumber = () => {
  const lastNumber = localStorage.getItem("lastInvoiceNumber");
  const nextNumber = lastNumber ? parseInt(lastNumber) + 1 : 1;
  localStorage.setItem("lastInvoiceNumber", nextNumber);
  return `INV-${String(nextNumber).padStart(3, "0")}`;
};

const InvoiceForm = () => {
  const SELLER_STATE_CODE = "27"; // Maharashtra
  const [placeOfSupply, setPlaceOfSupply] = useState("intra");
  const [items, setItems] = useState([
    { description: "", hsn: "", qty: 1, rate: 0, taxRate: 18 },
  ]);

  const [previewData, setPreviewData] = useState(null);

  const updateItem = (idx, field, value) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { description: "", hsn: "", qty: 1, rate: 0, taxRate: 18 },
    ]);

  const removeItem = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const subtotal = items.reduce((acc, it) => acc + it.qty * it.rate, 0);
  const gstTotal = items.reduce(
    (acc, it) => acc + (it.qty * it.rate * it.taxRate) / 100,
    0
  );

  const cgst = placeOfSupply === "intra" ? gstTotal / 2 : 0;
  const sgst = placeOfSupply === "intra" ? gstTotal / 2 : 0;
  const igst = placeOfSupply === "inter" ? gstTotal : 0;
  const grandTotal = subtotal + gstTotal;

  const handleSave = () => {
    const invoice = {
      invoiceNo: getNextInvoiceNumber(),
      billingAddress: "Mr. Ramesh\n123 Main Street\nMumbai, MH 400001",
      date: new Date().toISOString(),
      items,
      placeOfSupply,
      subtotal,
      cgst,
      sgst,
      igst,
      total: grandTotal,
    };

    console.log("💾 Invoice object:", invoice);
    alert(`Invoice ${invoice.invoiceNo} saved!`);
    setPreviewData(invoice);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Invoice</h2>

      {/* Place of Supply */}
      <div className="mb-4 flex gap-4">
        <label className="font-medium">Place of Supply:</label>
        <select
          className="border p-1"
          value={placeOfSupply}
          onChange={(e) => setPlaceOfSupply(e.target.value)}
        >
          <option value="intra">Within State (CGST + SGST)</option>
          <option value="inter">Outside State (IGST)</option>
        </select>
      </div>

      {/* Items table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-center">
              <th>Description</th>
              <th>HSN</th>
              <th>Qty</th>
              <th>Rate (₹)</th>
              <th>GST %</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <InvoiceItemRow
                key={idx}
                idx={idx}
                item={it}
                onChange={updateItem}
                onRemove={removeItem}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addItem}
        className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
      >
        + Add Item
      </button>

      {/* Summary */}
      <div className="mt-6 text-right space-y-1">
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        {placeOfSupply === "intra" ? (
          <>
            <p>CGST: ₹{cgst.toFixed(2)}</p>
            <p>SGST: ₹{sgst.toFixed(2)}</p>
          </>
        ) : (
          <p>IGST: ₹{igst.toFixed(2)}</p>
        )}
        <p className="font-bold text-lg">Grand Total: ₹{grandTotal.toFixed(2)}</p>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Invoice
      </button>

      {/* Preview */}
      {previewData && (
        <div className="mt-10">
          <InvoicePreview invoice={previewData} />
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
