# SaaSquatch AI — Caprae Capital M&A Leadgen & Intelligence Platform

> **Full Stack Developer AI Interview Handbook Submission** (Caprae Capital Partners — Updated Feb 2026)

SaaSquatch AI is a high-horsepower lead generation, domain web scraping, and AI intelligence suite custom-engineered for **Caprae Capital Partners**. The platform includes a **Real Python Web Scraper Backend** (`Flask`, `BeautifulSoup`, `requests`) integrated with a modern **React 19 Frontend**.

---

## 🌟 Real Web Scraper Features & Capabilities

### 1. 🐍 Real Python Web Scraper Server (`backend/scraper_server.py`)
- **Live HTTP & DOM Parser:** Scrapes any real live web URL or domain input (e.g. `github.com`, `stripe.com`, `openai.com`).
- **Real Title & Meta Extraction:** Scrapes page `<title>`, `<meta name="description">`, and OpenGraph headers.
- **Automated Tech Stack Detector:** Scans DOM scripts and response headers for signatures of **React, Next.js, Vue, Tailwind CSS, Bootstrap, Node.js, AWS, Cloudflare, Vercel, Stripe, OpenAI/ChatGPT**, and more.
- **Contact Email & Social Parser:** Uses regex to extract real executive contact emails (`contact@domain.com`, `support@domain.com`) and real company LinkedIn URLs (`https://linkedin.com/company/...`).
- **AI Intent Scoring & Financial Valuation:** Analyzes text keywords and tech stack complexity to compute an **AI Readiness Index (1–100)**, **EBITDA Cashflow Margin**, and **Estimated Enterprise Valuation ($M)**.

### 2. 🤖 AI Intent Scoring & Cold Outreach Pitch Studio
- **Natural Language Search:** Query pipeline targets using plain English (e.g., *"Find high margin SaaS companies with >$10M revenue"*).
- **Automated Founder Outreach:** Generates hyper-personalized cold email pitches customized across three strategic tones:
  - *M&A Acquisition Offer* (Founder-first 7-year recapitalization pitch)
  - *AI Transformation Audit* (Margin expansion via agentic AI automation)
  - *Strategic Partnership* (Liquidity & growth alignment)

### 3. 📊 M&A Analytics & Pipeline Dashboard
- Visual metrics tracking **Total Pipeline ARR ($M)**, **Combined Valuation ($M)**, **Avg AI Readiness Score**, **Industry Distribution**, and **Top Valuation Leaderboards**.

### 4. 📥 Data Management & Verification Suite
- **Export Formats:** One-click dataset downloads in standardized **CSV** and **JSON**.
- **Database Deduplication:** 1-Click duplicate domain and company entity merger.
- **Executive Email Verifier:** Simulates MX record checks and deliverability scoring for executive outreach lists.
- **Custom JSON Importer:** Upload custom lead lists directly into the pipeline.

### 5. 📋 Caprae Handbook Candidate Responses
- Interactive UI view containing complete written responses for **Section 4: Business Understanding**, **Employment Expectations**, **Reapplicant Essays**, and **Architecture Specifications**.

---

## 🏗️ Architecture & Engineering Strategy

As specified in **Section 1 ("Engineer with Excellence")** of the Caprae Interview Handbook:

| Architectural Component | Strategy & Technologies |
|---|---|
| **Python Backend API** | Flask, BeautifulSoup4 (`bs4`), Requests, Flask-CORS (`backend/scraper_server.py` on port 5000) |
| **Frontend Framework** | React 19, Vite, Lucide Icons, Modern CSS Variables (Dark/Light Responsive Theme) |
| **Data Storage Strategy** | **Primary:** PostgreSQL / Supabase for structured relational lead records. **Client-Side:** IndexedDB & LocalStorage for instant offline persistence and zero-latency UI rendering. |
| **Caching Layer** | **Server:** Redis (in-memory key-value store) for domain metadata & tech stack signature cache (7-day TTL). **Client:** React state memoization & virtualized table rendering. |
| **Hosting & Cloud Provider** | **Static Frontend:** Vercel / Cloudflare Pages edge CDN (<50ms global latency). **Serverless Scraping:** AWS Lambda / Python Serverless API functions running Playwright/BeautifulSoup scrapers. |
| **Deployment & CI/CD** | GitHub Actions pipeline running ESLint, automated bundle size validation, and preview deployments. |

---

## 💼 Business Understanding & Candidate Answers

### 1. What is Caprae’s Mission?
Caprae Capital's mission extends beyond traditional private equity financial engineering. Unlike conventional PE firms that rely heavily on debt leverage and aggressive cost-cutting at transaction close, Caprae views M&A as a long-term 7-year value creation journey. Caprae acquires promising B2B companies and transforms them post-acquisition through strategic operational leadership and practical AI software integration (such as SaaSquatch Leads). Caprae builds a founder-first culture driven by character, courage, creativity, and crazy stamina to build world-class businesses.

### 2. Why do you want to work at Caprae Capital?
Caprae’s founder-first and builder-centric culture aligns perfectly with my drive as a full-stack engineer. Unlike traditional firms where software is an administrative afterthought, Caprae places proprietary AI software at the center of its deal sourcing and post-acquisition strategy. Kevin Hong's emphasis on "horsepower vs. mileage" and the #BleedandBuild mentality matches my desire to master my craft, take radical ownership, and engineer high-impact solutions that directly drive multi-million dollar business outcomes.

### 3. How is Caprae Changing the ETA Space and Broader PE?
Caprae is redefining Entrepreneurship Through Acquisition (ETA) by shifting value creation from financial leverage to post-acquisition AI modernization. Traditional search fund operators rely on manual sales tactics and generic third-party tools. Caprae equips portfolio companies with proprietary SaaS/MaaS (M&A as a Service) platforms like SaaSquatch Leads, automating administrative intake, predicting churn, and optimizing outreach to achieve durable operating margin expansion across the 7-year holding period.

### 4. Employment Expectations Confirmation
- **Current US Status:** Authorized to work in the US / Open for Full-Time position.
- **Full-Time Hours:** 100% committed to working a minimum of 40+ hours/week.
- **Probationary Period:** Fully understand and accept the 3-month probationary evaluation.
- **Initial Training Schedule:** Confirmed available for strict 9AM-6PM EST shift during 2-3 month onboarding.
- **Off-Hours Emergency Availability:** Confirmed available for urgent customer issues or time-sensitive projects (<2 hrs/week).

---

## 🚀 Setup & Installation Instructions

### 1. Start the Real Python Scraper Backend
```bash
python backend/scraper_server.py
```
*The Python scraper API will start on `http://localhost:5000`.*

### 2. Start the React Frontend Application
```bash
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Test Real Domain Scraping
Input any domain in the search bar (e.g., `github.com`, `stripe.com`, `openai.com`, or any company website URL) and click **"Run AI Scraper"**. The Python backend will fetch live HTML, extract real page titles, meta descriptions, detected tech stacks, contact emails, and LinkedIn links.

---

## 📄 License & Confidentiality
Private & Confidential — Prepared exclusively for **Caprae Capital Partners** recruiting evaluation.
