import Invoice from '../models/Invoice.js';
import { computeInvoice } from '../utils/gst.js';

export async function createInvoice(req, res, next) {
  try {
    const { customer, items } = req.body;
    const computed = computeInvoice({ customer, items });

    const invoice = new Invoice({
      customer: computed.customer,
      items: computed.items,
      subtotal: computed.subtotal,
      totalTax: computed.totalTax,
      totalAmount: computed.totalAmount,
      taxBreakdown: computed.taxBreakdown,
      createdBy: req.user?.id
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
}

export async function listInvoices(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(invoices);
  } catch (err) {
    next(err);
  }
}

export async function getInvoice(req, res, next) {
  try {
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ message: 'Not found' });
    res.json(inv);
  } catch (err) {
    next(err);
  }
}
