// Utilities for GST calculations and GSTIN validation

function toPaise(n) {
  return Math.round(Number(n) * 100);
}

function fromPaise(n) {
  return Number((n / 100).toFixed(2));
}

export function validateGSTIN(gstin) {
  if (!gstin) return false;
  // basic length & pattern check (not exhaustive)
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin.toUpperCase());
}

export function computeInvoice({ customer, items }) {
  // compute taxable values and taxes using paise integers to avoid float issues
  let subtotalPaise = 0;
  let totalTaxPaise = 0;
  const computedItems = items.map((it) => {
    const qty = Number(it.quantity);
    const rate = Number(it.rate);
    const taxable = qty * rate;
    const taxablePaise = toPaise(taxable);
    const taxRate = Number(it.taxRate || 0);
    const taxPaise = Math.round(taxablePaise * (taxRate / 100));

    // for simplicity split tax evenly into CGST/SGST when applicable
    const cgstPaise = Math.round(taxPaise / 2);
    const sgstPaise = taxPaise - cgstPaise;
    const igstPaise = 0; // decision left to caller if IGST needed

    subtotalPaise += taxablePaise;
    totalTaxPaise += taxPaise;

    return {
      description: it.description,
      hsn: it.hsn,
      quantity: qty,
      rate: rate,
      taxableValue: fromPaise(taxablePaise),
      taxRate,
      cgst: fromPaise(cgstPaise),
      sgst: fromPaise(sgstPaise),
      igst: fromPaise(igstPaise)
    };
  });

  const taxBreakdown = { cgst: 0, sgst: 0, igst: 0 };
  // sum breakdown
  computedItems.forEach((it) => {
    taxBreakdown.cgst = Number((taxBreakdown.cgst + (it.cgst || 0)).toFixed(2));
    taxBreakdown.sgst = Number((taxBreakdown.sgst + (it.sgst || 0)).toFixed(2));
    taxBreakdown.igst = Number((taxBreakdown.igst + (it.igst || 0)).toFixed(2));
  });

  const subtotal = fromPaise(subtotalPaise);
  const totalTax = fromPaise(totalTaxPaise);
  const totalAmount = Number((subtotal + totalTax).toFixed(2));

  // human-friendly date string for templates
  const dateString = new Date().toLocaleDateString('en-GB');

  // amount in words (simple, for INR) - integer rupees and paise
  function numberToWords(n) {
    const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    const b = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
    function inWords(num) {
      if ((num = num.toString()).length > 9) return 'Overflow';
      const n = ('000000000' + num).substr(-9).match(/(\d{2})(\d{2})(\d{3})(\d{3})/);
      if (!n) return;
      let str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || (b[Number(n[1][0])] + ' ' + a[Number(n[1][1])])) + ' Crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || (b[Number(n[2][0])] + ' ' + a[Number(n[2][1])])) + ' Lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || (b[Number(n[3][0])] + ' ' + a[Number(n[3][1])])) + ' Thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || (b[Number(n[4][0])] + ' ' + a[Number(n[4][1])])) + ' ' : '';
      return str.trim();
    }

    const rupees = Math.floor(totalAmount);
    const paise = Math.round((totalAmount - rupees) * 100);
    let words = '';
    if (rupees > 0) words += inWords(rupees) + ' Rupees';
    if (paise > 0) words += (words ? ' and ' : '') + paise + ' Paise';
    if (!words) words = 'Zero Rupees';

    return words;
  }

  const words = numberToWords();

  return {
    customer,
    items: computedItems,
    subtotal,
    totalTax,
    totalAmount,
    taxBreakdown,
    dateString,
    totalAmountWords: words
  };
}
