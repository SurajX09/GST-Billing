import { generateInvoicePdf } from '../services/pdfService.js';
import { computeInvoice, validateGSTIN } from '../utils/gst.js';

export async function generateInvoicePdfHandler(req, res, next) {
  try {
    const payload = req.body;

    // compute invoice (ensures rounding and tax breakdown)
    const invoice = computeInvoice(payload);

    // basic GSTIN validation for customer and company if provided
    if (invoice.customer?.gstin && !validateGSTIN(invoice.customer.gstin)) {
      return res.status(400).json({ message: 'Invalid customer GSTIN' });
    }

    const pdfBuffer = await generateInvoicePdf(invoice, { company: payload.company });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${invoice.invoiceNumber || 'invoice'}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
}
