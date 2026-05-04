import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import invoiceRoutes from './routes/invoice.routes.js';
import pdfRoutes from './routes/pdf.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 200 });
app.use(limiter);

app.use('/api/invoices', invoiceRoutes);
app.use('/api', pdfRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
