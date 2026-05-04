import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import { closeBrowser } from './services/pdfService.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await connectDB(process.env.MONGO_URI);
    } else {
      console.warn('MONGO_URI not provided — skipping DB connection (PDF-only mode)');
    }

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down...');
      server.close();
      try { await closeBrowser(); } catch (e) {}
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server', err);
    try { await closeBrowser(); } catch (e) {}
    process.exit(1);
  }
}

start();
