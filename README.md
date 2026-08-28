GST Billing SaaS Application

A MERN-stack SaaS application for small businesses to manage GST billing, customers, products, invoices, payments, inventory, and reports.

🎯 Project Goal

Build a production-ready GST Billing SaaS where a business can:

- Manage business profile
- Add customers
- Add products/services
- Create GST invoices
- Calculate CGST / SGST / IGST
- Generate and download PDF invoices
- Track payments
- Manage inventory
- View sales dashboard
- Generate reports
- Manage SaaS subscriptions

«Compliance Note: GST tax rules, invoice fields, numbering, and compliance requirements should be verified against current Indian GST requirements before production use.»

---

👥 User Roles

Admin / Business Owner

- Business setup
- Products management
- Customers management
- Invoices
- Payments
- Reports
- Settings
- Staff management

Staff

- Create invoices
- View customers
- View products
- Limited access to business settings

Future Roles

- Accountant
- Super Admin

---

🔐 1. Authentication

Registration

Name
Email
Mobile
Password
Business Name
GSTIN (optional initially)

Authentication Flow

Register
   ↓
Create User
   ↓
Create Business
   ↓
Login
   ↓
JWT Access Token
   ↓
Dashboard

Security

- JWT authentication
- Redis token blacklisting
- Password hashing
- HTTP-only cookies
- Rate limiting
- Input validation
- Role-based authorization

---

🏢 2. Business Module

Business profile:

Business Name
GSTIN
PAN
Business Address
State
State Code
Phone
Email
Logo
Invoice Prefix
Bank Details
UPI ID
Terms & Conditions

Example:

ABC Electronics
GSTIN: 27XXXXXXXXXXXXXX
Maharashtra

---

👤 3. Customer Module

Customer CRUD:

Customer Name
Phone
Email
Billing Address
Shipping Address
GSTIN
State
State Code
Customer Type

Customer types:

Registered
Unregistered
Composition

---

📦 4. Product Module

Product fields:

Product Name
SKU
HSN/SAC
Category
Unit
Selling Price
Purchase Price
GST Rate
Stock
Low Stock Limit

GST rates should be configurable instead of hard-coded.

Example:

Product: Keyboard
Price: ₹1,000
GST: 18%

---

🧾 5. Invoice Module

Invoice creation flow:

Customer
   ↓
Select Product
   ↓
Quantity
   ↓
Price
   ↓
Discount
   ↓
GST
   ↓
Total

Example:

Keyboard       ₹1,000 × 2
Mouse            ₹500 × 2
-------------------------
Subtotal       ₹3,000

GST 18%          ₹540
-------------------------
Grand Total     ₹3,540

GST Calculation

Intra-State

CGST = 9%
SGST = 9%

Inter-State

IGST = 18%

The application can determine the tax type from:

Seller State
     vs
Customer State

«Validate the exact applicable tax treatment against current GST rules before production.»

---

💳 6. Payment Module

Invoice Status

PAID
PARTIAL
UNPAID
OVERDUE

Payment Methods

Cash
UPI
Bank Transfer
Card
Cheque
Other

Example:

Invoice Total: ₹10,000

Paid: ₹6,000
Remaining: ₹4,000

---

📄 7. PDF Invoice

PDF generation is a core feature.

MongoDB
   ↓
Invoice Data
   ↓
Invoice Template
   ↓
PDF
   ↓
Download / Print / Share

Invoice should contain:

- Business details
- GSTIN
- Invoice number
- Invoice date
- Customer details
- Product table
- HSN/SAC
- Quantity
- Rate
- Discount
- Taxable value
- CGST
- SGST
- IGST
- Grand total
- Amount in words
- Bank details
- Terms & Conditions
- Signature

---

📊 8. Dashboard

Dashboard should display:

Today's Sales
Total Invoices
Total Customers
Total Products
Pending Payments
GST Collected

Charts

- Daily sales
- Monthly sales
- GST collected
- Top products
- Outstanding payments

---

📦 9. Inventory

When an invoice is created:

Product Stock
      ↓
Invoice
      ↓
Stock - Quantity

Example:

Keyboard Stock = 50

Sold = 3

New Stock = 47

Future Inventory Features

- Low stock alerts
- Stock history
- Purchase entries
- Stock adjustments

---

📈 10. Reports

Sales Report

Date
Invoice
Customer
Taxable Amount
GST
Total
Payment Status

GST Report

Taxable Value
CGST
SGST
IGST
Total GST

Outstanding Report

Customer
Invoice
Invoice Amount
Paid
Remaining
Due Date

Export

PDF
Excel
CSV

---

🔔 11. Notifications

Future notifications:

Invoice Created
Payment Received
Payment Overdue
Low Stock

Possible integrations:

- Email
- WhatsApp
- Telegram

---

💰 12. SaaS Subscription

Free Plan

50 invoices/month
1 business
Basic reports

Pro Plan

Unlimited invoices
Inventory
Advanced reports
PDF customization
Multiple users

Business Plan

Multiple branches
Multiple users
Advanced analytics
Priority support

Payment gateway integration can be added later.

---

🗄️ 13. MongoDB Data Model

Initial collections:

User
Business
Customer
Product
Invoice
Payment
Expense
StockTransaction
Subscription

Multi-Tenant Structure

User
 │
 └── Business
       │
       ├── Customers
       ├── Products
       ├── Invoices
       ├── Payments
       └── StockTransactions

Use "businessId" for tenant isolation.

Critical Security Rule

User A → Business A → Data A

User B → Business B → Data B

User A must never be able to access Business B's data by manipulating an ID.

---

🧑‍💻 14. MERN Architecture

                React
                  │
                  ▼
              API Layer
                  │
               Express
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
     MongoDB              Redis
        │                   │
   Business Data       Auth / Cache

Backend Structure

server/
│
├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
├── utils/
├── validators/
├── config/
└── app.js

Frontend Structure

src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── context/
├── utils/
└── routes/

---

🗓️ 15. 30-Day Development Roadmap

Week 1 — Foundation

Day 1

- Project architecture
- Git repository
- Environment setup

Day 2

- MongoDB setup
- Express setup

Day 3

- Register/Login API

Day 4

- JWT + Redis

Day 5

- User + Business models

Day 6

- Protected routes
- Authorization

Day 7

- React authentication UI

---

Week 2 — Business Data

Day 8

- Business profile

Day 9

- Customer CRUD

Day 10

- Product CRUD

Day 11

- Categories
- HSN/SAC

Day 12

- GST configuration

Day 13

- Inventory basics

Day 14

- Frontend API integration

---

Week 3 — Billing

Day 15

- Invoice database design

Day 16

- Invoice creation UI

Day 17

- Product selection

Day 18

- GST calculation

Day 19

- Invoice numbering

Day 20

- Payment tracking

Day 21

- Invoice history

---

Week 4 — SaaS Features

Day 22

- PDF invoice

Day 23

- Print invoice

Day 24

- Dashboard

Day 25

- Sales reports

Day 26

- GST reports

Day 27

- Inventory reports

Day 28

- Subscription system

Day 29

- Security + testing

Day 30

- Deployment
- Production testing

---

🔥 16. MVP Scope

Do not build everything at once.

Build the first working version with:

Authentication
      ↓
Business Setup
      ↓
Customer
      ↓
Product
      ↓
Create Invoice
      ↓
GST Calculation
      ↓
PDF Invoice
      ↓
Payment Status
      ↓
Dashboard

After the MVP is stable, add:

Inventory
   ↓
Reports
   ↓
WhatsApp / Email
   ↓
Subscriptions
   ↓
Multi-user
   ↓
Multi-branch
   ↓
Advanced SaaS Features

---

🚀 Final Product Vision

                    GST BILLING SAAS
                           │
          ┌────────────────┼────────────────┐
          │                │                │
       Billing          Inventory        Customers
          │                │                │
       Invoices          Stock           Profiles
          │                │
        GST              Alerts
          │
        PDF
          │
      Payments
          │
       Reports
          │
    Subscription

Recommended Development Order

1. Authentication
2. Multi-tenant Business Setup
3. Customer
4. Product
5. Invoice
6. GST Calculation
7. PDF Invoice
8. Payment Tracking
9. Dashboard
10. Inventory
11. Reports
12. Subscription
13. Notifications
14. Deployment