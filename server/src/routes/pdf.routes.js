import express from 'express';
import { generateInvoicePdfHandler } from '../controllers/pdf.controller.js';
import { validateInvoice } from '../validators/invoice.validator.js';

const router = express.Router();

// POST /generate-invoice-pdf
router.post('/generate-invoice-pdf', validateInvoice, generateInvoicePdfHandler);

export default router;
