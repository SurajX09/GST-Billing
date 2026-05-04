import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import ejs from 'ejs';

let browser = null;

async function getBrowser() {
  if (browser) return browser;
  // Prefer an explicit Chrome/Chromium executable path to avoid puppeteer's large download
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || undefined;
  browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=medium'
    ],
    defaultViewport: { width: 1200, height: 800 }
  });
  return browser;
}

function ensureTwoDecimals(obj) {
  if (typeof obj === 'number') return Number(obj.toFixed(2));
  if (Array.isArray(obj)) return obj.map(ensureTwoDecimals);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const k of Object.keys(obj)) out[k] = ensureTwoDecimals(obj[k]);
    return out;
  }
  return obj;
}

export async function generateInvoicePdf(invoiceData, options = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Render template
    const templatePath = path.join(process.cwd(), 'server', 'src', 'templates', 'invoice.ejs');
    const template = await fs.promises.readFile(templatePath, 'utf8');

    // normalize numbers to 2 decimals to avoid float surprises
    invoiceData = ensureTwoDecimals(invoiceData);

    const html = ejs.render(template, {
      invoice: invoiceData,
      company: options.company || { name: 'Company Name', gstin: '' }
    });

    await page.setContent(html, { waitUntil: ['load', 'domcontentloaded'] });

    // Wait for fonts to be ready in the page to avoid layout shifts
    await page.evaluateHandle('document.fonts.ready');

    // ensure network idle and a small timeout for safety
    await page.waitForTimeout(250);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    await page.close();
    return pdfBuffer;
  } catch (err) {
    try { await page.close(); } catch (e) {}
    throw err;
  }
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
