
const InvoiceItemRow = ({ idx, item, onChange, onRemove }) => {
  const handleField = (field, value) => onChange(idx, field, value);

  return (
    <tr className="text-center border-b">
      <td>
        <input
          className="w-full p-1 border"
          value={item.description}
          onChange={(e) => handleField("description", e.target.value)}
          placeholder="Item / Service"
        />
      </td>
      <td>
        <input
          className="w-20 p-1 border text-center"
          value={item.hsn}
          onChange={(e) => handleField("hsn", e.target.value)}
          placeholder="HSN"
        />
      </td>
      <td>
        <input
          type="number"
          className="w-16 p-1 border text-center"
          value={item.qty}
          min={1}
          onChange={(e) => handleField("qty", parseFloat(e.target.value) || 0)}
        />
      </td>
      <td>
        <input
          type="number"
          className="w-24 p-1 border text-center"
          value={item.rate}
          min={0}
          onChange={(e) => handleField("rate", parseFloat(e.target.value) || 0)}
        />
      </td>
      <td>
        <select
          className="p-1 border"
          value={item.taxRate}
          onChange={(e) => handleField("taxRate", parseInt(e.target.value))}
        >
          {[0, 5, 12, 18, 28].map((r) => (
            <option key={r} value={r}>
              {r}%
            </option>
          ))}
        </select>
      </td>
      <td className="text-red-600 cursor-pointer" onClick={() => onRemove(idx)}>
        ✖
      </td>
    </tr>
  );
};

export default InvoiceItemRow;
