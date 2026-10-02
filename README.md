# MedBill Pro - Medical Invoice Dashboard Demo

A polished click-through demo web application for a medical clinic invoice and accounts dashboard. This is a **sales demo** showcasing the concept of AI-powered invoice processing — it does not include real AI/OCR or a real backend.

![Demo Screenshot](https://via.placeholder.com/800x400?text=MedBill+Pro+Dashboard)

## Product Story

Medical clinics manage many invoices and accounts from various vendors (outsourced x-rays, labs, medical supplies, equipment, pharmacy, etc.). This demo showcases:

1. **Invoice Ingestion** — Upload invoices (simulated)
2. **AI Parsing** — Watch invoices being "processed" with convincing AI animations
3. **Review & Edit** — Review AI-extracted fields and make adjustments
4. **Dashboard Analytics** — See financial KPIs, trends, and category breakdowns

## Features

- **Dashboard** with realistic sample clinic data:
  - KPI cards (Revenue, Costs, Net Profit, Avg Markup, Invoice Count)
  - Revenue & Costs trend chart over time
  - Profit breakdown by category (pie chart)
  - Category performance comparison (bar chart)
  - Searchable and filterable invoice table

- **Upload Flow** (simulated):
  - Click "Upload Invoices" to start the demo
  - Watch fake PDF files being "uploaded" and "processed"
  - AI processing animation with step-by-step progress

- **Review Step**:
  - View AI-extracted invoice fields
  - Editable fields (vendor cost, markup percentage)
  - Confidence scores for each invoice
  - Real-time calculation of billed amounts and profit

- **Dashboard Update**:
  - Confirming invoices adds them to the dashboard
  - All charts and KPIs update in real-time

## Tech Stack

- **Vite** — Fast build tool and dev server
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Recharts** — Beautiful, responsive charts
- **Lucide React** — Clean, consistent icons
- **CSS** — Custom styling with a medical/clinic theme (navy/teal)

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This app is configured for easy deployment on Vercel:

1. Push to GitHub
2. Connect your repo to Vercel
3. Deploy!

The `vercel.json` file handles SPA routing automatically.

## Demo Flow

1. **Dashboard** — Start on the dashboard with pre-loaded sample data
2. **Upload** — Click "Upload Invoices" button in the header
3. **Processing** — Watch the simulated upload and AI processing animation
4. **Review** — Edit any fields in the extracted invoices
5. **Confirm** — Click "Confirm & Add to Dashboard"
6. **Updated Dashboard** — See the new invoices reflected in all charts and tables

## Note

This is a **demo application** for sales presentations. It uses:
- Hardcoded sample invoice data
- Simulated file uploads (no actual files are uploaded)
- Fake AI processing animations
- Client-side state only (no backend, no database)

No API keys or secrets are required.

## License

MIT
