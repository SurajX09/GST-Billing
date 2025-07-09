import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoicePreview = ({ invoice }) => {
  const componentRef = useRef();
  const [customerData, setCustomerData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: "",
    mobile: "",
  });

  const handleChange = (field, value) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const yStart = 80;

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth - margin * 2;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.setFontSize(12);
    pdf.setTextColor(30);
    pdf.text("Suraj Enterprises", margin, 45);
    pdf.text("GSTIN: 27ABCDE1234Z5", margin, 60);
    pdf.text("Email: billing@suraj.com", margin, 75);

    pdf.setFontSize(11);
    pdf.setTextColor(50);
    pdf.text(`Customer: ${customerData.name}`, margin, yStart - 30);
    pdf.text(`Email: ${customerData.email}`, margin, yStart - 15);
    pdf.text(`Mobile: ${customerData.mobile}`, margin + 300, yStart - 15);

    pdf.addImage(imgData, "PNG", margin, yStart, pdfWidth, pdfHeight);

    // Watermark (optional)
    pdf.setTextColor(245, 245, 245);
    pdf.setFontSize(14);
    pdf.setTextColor(80);
    pdf.setFont("helvetica", "bold");
    pdf.text("Tax Invoice", pageWidth / 2, pageHeight / 40, {
      align: "center",
      angle: 0,
      opacity: 0.01,
    });

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor(100);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 20, {
        align: "right",
      });
    }

    pdf.save("GST-Invoice.pdf");

    // Local storage code (optional)
    const stored = localStorage.getItem("savedInvoices") || "[]";
    const parsed = JSON.parse(stored);
    const updated = [...parsed, { ...invoice, customerData }];
    localStorage.setItem("savedInvoices", JSON.stringify(updated));
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={customerData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Customer Name"
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          value={customerData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Customer Email"
          className="border p-2 rounded w-full"
        />
        <input
          type="tel"
          value={customerData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          placeholder="Mobile Number"
          className="border p-2 rounded w-full"
        />
        <textarea
          value={customerData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Address"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={customerData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="City"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={customerData.state}
          onChange={(e) => handleChange("state", e.target.value)}
          placeholder="State"
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          value={customerData.pincode}
          onChange={(e) => handleChange("pincode", e.target.value)}
          placeholder="Pincode"
          className="border p-2 rounded w-full"
        />
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ⬇️ Download PDF
      </button>

      <p className="text-xs text-gray-500 mb-4">
        Tip: "Download PDF" saves the invoice with watermark.
      </p>

      <div ref={componentRef} className="bg-white p-6 shadow rounded text-sm">
        <div className="mb-4">
          <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
          <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold underline mb-1">Billed To:</h3>
            <p>{customerData.name}</p>
            <p>{customerData.address}</p>
            <p>{customerData.city}, {customerData.state} - {customerData.pincode}</p>
            <p>Email: {customerData.email}</p>
            <p>Mobile: {customerData.mobile}</p>
          </div>
          <div>
            <h3 className="font-semibold underline mb-1">From SK Enterprises:</h3>
            <p>SK Enterprises</p>
            <p>AP - Phaltan</p>
            <p> Maharashtra 415523</p>
            <p>GSTIN: 27ABCDE1234Z5</p>
          </div>
        </div>

        <table className="w-full border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Description</th>
              <th className="border p-2">HSN</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">GST %</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={i}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.hsn}</td>
                <td className="border p-2">{item.qty}</td>
                <td className="border p-2">₹{item.rate}</td>
                <td className="border p-2">{item.taxRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right space-y-1">
          <p>Subtotal: ₹{invoice.subtotal.toFixed(2)}</p>
          {invoice.placeOfSupply === "intra" ? (
            <>
              <p>CGST: ₹{invoice.cgst.toFixed(2)}</p>
              <p>SGST: ₹{invoice.sgst.toFixed(2)}</p>
            </>
          ) : (
            <p>IGST: ₹{invoice.igst.toFixed(2)}</p>
          )}
          <p className="font-bold text-lg">Total: ₹{invoice.total.toFixed(2)}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Signature:</h3>
          <div className="border h-20 w-64 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
