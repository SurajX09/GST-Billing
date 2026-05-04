import express from 'express';
import { createInvoice, listInvoices, getInvoice } from '../controllers/invoice.controller.js';
import { validateInvoice } from '../validators/invoice.validator.js';

const router = express.Router();

router.post('/', validateInvoice, createInvoice);
router.get('/', listInvoices);
router.get('/:id', getInvoice);

export default router;
