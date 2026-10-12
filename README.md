# SaaSquatch Leads — AI Lead Generation & Outreach Platform

> **Caprae Capital Partners — Full Stack AI Developer Project**  
> **Live Frontend App**: [https://saasquatch-alpha.vercel.app/](https://saasquatch-alpha.vercel.app/)  
> **Live Backend API**: [https://saasback.vercel.app/](https://saasback.vercel.app/)  

---

## 🚀 Live Deployments

| Service | Hosting | Live URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend** | Vercel (Edge SPA) | [https://saasquatch-alpha.vercel.app/](https://saasquatch-alpha.vercel.app/) | ✅ Live |
| **Backend API** | Vercel Serverless (Python WSGI) | [https://saasback.vercel.app/](https://saasback.vercel.app/) | ✅ Live |
| **Database & Auth** | Supabase Cloud | `https://jtklprmilmecpxqddpgd.supabase.co` | ✅ Connected |
| **AI Email Engine** | Groq Cloud AI | Model: `openai/gpt-oss-20b` | ✅ Active |

---

## 📌 Project Overview

**SaaSquatch Leads** is a full-stack, automated B2B lead discovery, real-time web scraping, and AI outreach generation platform custom-built for M&A deal sourcing and commercial outreach.

Instead of displaying static or mock databases, SaaSquatch Leads dynamically searches the open web for live companies matching any **Industry** and **Product Offering**, parses their websites in real-time, extracts verified contact information and social handles, and crafts high-converting executive pitch emails using Groq's `openai/gpt-oss-20b` model. Every search and lead record is automatically synced to **Supabase** under each authenticated user's profile.

---

## ⚙️ How It Works (End-to-End Pipeline)

```
[ User Search: Industry + Product ]
                 │
                 ▼
     [ React Frontend (Vite) ]
                 │  POST /api/search_leads
                 ▼
  [ Python Backend (Flask / Vercel) ]
                 │
   ┌─────────────┴─────────────┐
   ▼                           ▼
[ Module 1: search_engine.py ] [ Module 2: website_scraper.py ]
- Live web search query         - Fetches live company HTML
- Bing index decoding           - Extracts title, email, phone
- Discovers top 5-10 domains    - Verified LinkedIn profile scraper
   └─────────────┬─────────────┘
                 │
                 ▼
    [ Structured Lead Results ] ──► [ Supabase DB: user_searches ]
                 │                   - Auto-saved with User ID & Timestamp
                 ▼
     [ Interactive Results UI ]
                 │
        Click "Make Mail"
                 │  POST /api/generate_email
                 ▼
   [ Groq AI: openai/gpt-oss-20b ]
- Generates personalized B2B outreach pitch based on tone & context
```

### 1. User Authentication & Session
- Users register and sign in using **Supabase Auth** with email and password.
- Supports instant **Quick Demo Login** for seamless evaluation.
- User email and session state are managed in client state and used to namespace search records.

### 2. Company Finder (Zero Static Data)
- Users input an **Industry** (e.g. *Healthcare, Logistics, Fintech*) and a **Product Offering** (e.g. *AI Automation, Cold Chain Packaging*). No location input is required.
- The UI starts empty and requests live leads directly from the Python backend.

### 3. Modular Python Search & Scraping Engine
- **`backend/search_engine.py`**: Queries live search engine indexes to discover top authoritative company domains matching the industry and product criteria.
- **`backend/website_scraper.py`**: Concurrently visits each discovered website:
  - Extracts official **Company Name** from titles and OpenGraph tags.
  - Extracts direct **Contact Emails** (`contact@`, `info@`, `sales@`, `support@`).
  - Scrapes **Phone Numbers** and **Physical HQ Locations**.
  - **Verified LinkedIn Detection**: Extracts real `https://linkedin.com/company/...` links directly from the website HTML. If no real LinkedIn link exists, the icon is hidden from the UI.
  - Infers **Product/Service Category** and **Business Type** (B2B, B2B2C).

### 4. AI Cold Email Studio (Groq GPT-OSS)
- On the rightmost column of each lead row, users click **"Make Mail"** to launch the outreach modal.
- Sends lead context, recipient executive name, company industry, desired tone (*Direct, Professional, Friendly, Executive M&A*), and strategic focus to `/api/generate_email`.
- **Exclusively utilizes Groq model `openai/gpt-oss-20b`** to draft personalized subject lines and compelling outreach copy.
- Includes a one-click clipboard copy feature.

### 5. Supabase Lead Database & Search History
- Every executed search automatically persists to the Supabase table `user_searches` with:
  - `user_id` & `user_email`
  - `industry` & `product`
  - `results_count`
  - Full JSON array of lead objects (`leads_data`)
  - Timestamp
- The **"Database"** view in the navbar displays past searches, total leads scraped, and allows users to click **"Open in Table"** to instantly reload previous leads.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Hooks, Context, Functional Components)
- **Bundler & Tooling**: Vite 8
- **Icons**: Lucide React
- **Styling**: Pure Modern CSS (Dark SaaS Theme, CSS Variables, Responsive Grid)
- **Database Client**: `@supabase/supabase-js`

### Backend
- **Framework**: Python 3.9+ with Flask & Flask-CORS
- **Serverless Runtime**: Vercel Python WSGI (`@vercel/python`)
- **Web Scraping & Parsing**: `beautifulsoup4`, `requests`, `urllib.parse`
- **AI Inference**: Groq Cloud API (`openai/gpt-oss-20b`)
- **Production Server**: Gunicorn

---

## 📦 Local Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.9 or higher
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/MathanKumar-1204/Saasquatch.git
cd caprae
```

---

### Step 2: Configure Environment Variables
Create a `.env` file in the project root:

```env
# Backend API URL (Default to deployed Vercel backend or localhost for dev)
VITE_BACKEND_URL=https://saasback.vercel.app

```

---

### Step 3: Frontend Setup & Run
```bash
# Install NPM dependencies
npm install

# Start Vite local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Step 4: Backend Setup & Run (Optional for Local Dev)
If you wish to run the Python scraper locally instead of using the live Vercel backend:

```bash
# Navigate to backend folder
cd backend

# Create and activate a virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install Python requirements
pip install -r requirements.txt

# Start the Flask API server
python scraper_server.py
```
The local API server will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000).  
*(To point your local frontend to local backend, set `VITE_BACKEND_URL=http://127.0.0.1:5000` in `.env`).*

---

## 🗄️ Supabase Database Schema

To enable persistent cloud storage for user searches in your Supabase project, execute this SQL script in the [Supabase SQL Editor](https://supabase.com/dashboard/project/jtklprmilmecpxqddpgd/sql):

```sql
-- 1. Create table for user searches and scraped leads
CREATE TABLE IF NOT EXISTS public.user_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    industry TEXT NOT NULL,
    product TEXT,
    results_count INTEGER DEFAULT 0,
    leads_data JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index on user_email for fast queries
CREATE INDEX IF NOT EXISTS idx_user_searches_user_email ON public.user_searches (user_email);
CREATE INDEX IF NOT EXISTS idx_user_searches_created_at ON public.user_searches (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

-- 4. Create policy allowing read and insert
CREATE POLICY "Allow public read and insert on user_searches"
    ON public.user_searches
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

---

## 🌐 API Reference

### 1. Root / Landing Page
- **Method**: `GET /`
- **Response**: Responsive HTML status dashboard documenting endpoints.

### 2. Health Check
- **Method**: `GET /api/health`
- **Response**:
```json
{
  "groq_model": "openai/gpt-oss-20b",
  "platform": "Vercel Serverless / Flask WSGI",
  "service": "SaaSquatch Leads Python Web Scraper API",
  "status": "online"
}
```

### 3. Search & Scrape Leads
- **Method**: `POST /api/search_leads`
- **Payload**:
```json
{
  "industry": "Healthcare",
  "product": "Telemedicine Software"
}
```
- **Response**:
```json
{
  "success": true,
  "count": 8,
  "leads": [
    {
      "id": "lead-1",
      "company": "MedTech Solutions",
      "industry": "Healthcare",
      "links": {
        "website": "https://medtechsolutions.com",
        "linkedin": "https://www.linkedin.com/company/medtechsolutions",
        "email": "contact@medtechsolutions.com",
        "location": "Boston, MA, USA"
      },
      "location": "Boston, MA, USA",
      "productCategory": "Healthcare, Telemedicine",
      "businessType": "B2B",
      "decisionMakers": [
        {
          "name": "Sarah Jenkins",
          "title": "Managing Director / CEO",
          "email": "contact@medtechsolutions.com"
        }
      ]
    }
  ]
}
```

### 4. AI Email Generation (Groq GPT-OSS)
- **Method**: `POST /api/generate_email`
- **Payload**:
```json
{
  "lead": {
    "company": "MedTech Solutions",
    "industry": "Healthcare",
    "productCategory": "Telemedicine"
  },
  "tone": "Direct",
  "focus": "Collaboration",
  "context": "Follow-up regarding digital intake workflows",
  "groq_key": "gsk_..."
}
```
- **Response**:
```json
{
  "success": true,
  "subject": "Enhancing MedTech Solutions's Operational Scale",
  "message": "Hi Sarah,\n\nI noticed MedTech Solutions is driving innovation in Telemedicine...",
  "provider": "Groq Cloud AI (openai/gpt-oss-20b)"
}
```

---

## 🚀 Deployment Instructions

### Deploying the Backend on Vercel
1. Import repository into [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `backend`.
3. Set Framework Preset to **Other**.
4. Deploy. Vercel automatically runs `@vercel/python` using `backend/vercel.json` and `backend/index.py`.

### Deploying the Frontend on Vercel
1. Import repository into [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `./` (root).
3. Framework Preset: **Vite**.
4. Set Environment Variables (`VITE_BACKEND_URL`, `VITE_GROQ_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
5. Deploy.

---

## 📄 License & Confidentiality
Private & Confidential — Built for **Caprae Capital Partners** engineering evaluation.
