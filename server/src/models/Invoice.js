import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  hsn: { type: String },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  taxableValue: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  cgst: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  igst: { type: Number, default: 0 }
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true, index: true },
  date: { type: Date, default: Date.now },
  customer: {
    name: { type: String, required: true },
    gstin: { type: String },
    address: { type: String }
  },
  items: [ItemSchema],
  subtotal: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  taxBreakdown: { type: mongoose.Schema.Types.Mixed },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

InvoiceSchema.pre('save', function (next) {
  if (!this.invoiceNumber) {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    this.invoiceNumber = `INV-${y}${m}${d}-${Date.now().toString().slice(-6)}`;
  }
  next();
});

export default mongoose.model('Invoice', InvoiceSchema);
