import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Cpu, 
  Building2, 
  Sparkles, 
  Award, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

export const CapraeHandbookAnswers = () => {
  const [activeSection, setActiveSection] = useState('business'); // 'business', 'employment', 'reapplicant', 'tech'

  return (
    <div className="handbook-answers-container">
      {/* Top Banner */}
      <div className="handbook-banner">
        <div>
          <span className="handbook-pill">CAPRAE CAPITAL HANDBOOK SUBMISSION</span>
          <h1 className="handbook-title">Full Stack Developer AI Interview Handbook Answers</h1>
          <p className="handbook-subtitle">
            Authoritative responses to Section 4 Business Understanding, Employment Expectations, Reapplicant Essays, and Engineering Architecture Specifications.
          </p>
        </div>
      </div>

      {/* Nav Sub-Tabs */}
      <div className="handbook-subtabs">
        <button 
          className={`subtab-btn ${activeSection === 'business' ? 'active' : ''}`}
          onClick={() => setActiveSection('business')}
        >
          <Building2 className="icon" /> 1. Business Understanding
        </button>
        <button 
          className={`subtab-btn ${activeSection === 'employment' ? 'active' : ''}`}
          onClick={() => setActiveSection('employment')}
        >
          <Briefcase className="icon" /> 2. Employment Expectations
        </button>
        <button 
          className={`subtab-btn ${activeSection === 'reapplicant' ? 'active' : ''}`}
          onClick={() => setActiveSection('reapplicant')}
        >
          <Award className="icon" /> 3. Reapplicant Essays
        </button>
        <button 
          className={`subtab-btn ${activeSection === 'tech' ? 'active' : ''}`}
          onClick={() => setActiveSection('tech')}
        >
          <Cpu className="icon" /> 4. Tech & Architecture
        </button>
      </div>

      {/* Section 1: Business Understanding */}
      {activeSection === 'business' && (
        <div className="handbook-section-card">
          {/* Q1 */}
          <div className="qa-block">
            <h2 className="qa-question">
              <HelpCircle className="q-icon" /> What is Caprae’s Mission?
            </h2>
            <div className="qa-answer">
              <p>
                Caprae Capital's mission extends far beyond traditional private equity financial engineering. Unlike conventional PE firms that focus primarily on short-term debt leverage, EBITDA arbitrage, and aggressive cost-cutting at acquisition, Caprae views M&A as a long-term 7-year value creation journey. The core objective is to partner with and acquire promising B2B companies, empowering them post-acquisition through strategic operational enhancements and practical AI transformation to convert good businesses into world-class market leaders.
              </p>
              <p>
                A central pillar of Caprae’s mission is lowering the friction of AI readiness for operating companies. Rather than renting generic third-party software or pushing abstract consulting frameworks, Caprae builds proprietary, high-impact internal software suites—such as SaaSquatch Leads—to identify growth bottlenecks, automate repetitive administrative tasks, and optimize lead generation. By integrating these actionable AI tools directly into daily workflows, portfolio companies achieve durable operating margin expansion.
              </p>
              <p>
                Ultimately, Caprae’s mission is centered on founder-first partnership and high-horsepower talent cultivation. Caprae seeks to build an ecosystem driven by character, courage, creativity, and a relentless commitment to mastering one’s craft. Through a combination of disciplined capital allocation, hands-on operational leadership, and cutting-edge software engineering, Caprae aims to fundamentally modernize legacy SMB and middle-market acquisition models.
              </p>
            </div>
          </div>

          {/* Q2 */}
          <div className="qa-block">
            <h2 className="qa-question">
              <HelpCircle className="q-icon" /> Why do you want to work at Caprae Capital?
            </h2>
            <div className="qa-answer">
              <p>
                I am drawn to Caprae Capital because of your founder-first, builder-centric philosophy. Most financial firms treat software development as an afterthought or an outsourced service center, but Caprae places engineering and AI tooling at the very core of its investment thesis. The opportunity to build proprietary platforms like SaaSquatch Leads—tools that directly source multi-million dollar deals and drive post-acquisition value creation—is uniquely exciting for a full-stack developer who thrives on high-impact work.
              </p>
              <p>
                Furthermore, Kevin Hong’s philosophy on "horsepower vs. mileage" aligns deeply with my personal work ethic. I look for an environment that values speed of execution, independent critical thinking, and the mental stamina required to master one’s craft. Caprae’s culture of #BleedandBuild and taking radical ownership over products creates an ecosystem where ambitious engineers can take down complex challenges without bureaucratic red tape.
              </p>
              <p>
                Finally, working at Caprae allows me to bridge the gap between advanced software engineering and real-world private equity strategy. Building AI tools that analyze business models, evaluate tech stacks, and optimize sales workflows provides immediate, measurable business impact. I want to contribute my full energy to Caprae's team and build software that scales across your growing portfolio over the 7-year M&A horizon.
              </p>
            </div>
          </div>

          {/* Q3 */}
          <div className="qa-block">
            <h2 className="qa-question">
              <HelpCircle className="q-icon" /> How is Caprae Changing the ETA Space and Broader PE?
            </h2>
            <div className="qa-answer">
              <p>
                Caprae Capital is redefining Entrepreneurship Through Acquisition (ETA) and broader Private Equity by shifting the locus of value creation from deal structure to post-acquisition operational transformation. Historically, search fund operators and micro-PE buyers relied on conventional playbook tactics: incremental sales hires, standard pricing increases, and basic CRM setups. Caprae disrupts this paradigm by introducing proprietary AI capability and SaaS/MaaS (M&A as a Service) frameworks directly to acquired entities.
              </p>
              <p>
                In traditional PE, value creation is often concentrated at transaction closing (buying at a lower multiple and selling at a higher one). Caprae recognizes that the true alpha is generated during the 7-year post-acquisition operational lifecycle. By deploying custom AI software like SaaSquatch Leads, Caprae equips portfolio management teams with automated lead generation, predictive churn reduction, and intelligent workflow automation, dramatically increasing organic ARR growth and EBITDA expansion.
              </p>

              <p>
                By proving that an AI-native operational model outperforms legacy search fund tactics, Caprae is setting a new benchmark for the entire ETA ecosystem. Caprae turns traditional small-to-midsize businesses into agile, technology-driven enterprises, proving that horsepower, proprietary software tools, and operational execution create sustainable competitive moats.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Employment Expectations */}
      {activeSection === 'employment' && (
        <div className="handbook-section-card">
          <h2 className="card-section-heading">Employment Confirmation & Preferences</h2>

          <div className="confirmation-grid">
            <div className="confirm-item">
              <div className="confirm-q">What is your current working status in the US?</div>
              <div className="confirm-a"><CheckCircle2 className="icon" /> Authorized to work in the US / Open to Full-Time Employment</div>
            </div>

            <div className="confirm-item">
              <div className="confirm-q">Are you willing and able to work a minimum of 40 hours/week?</div>
              <div className="confirm-a"><CheckCircle2 className="icon" /> Yes, 100% committed to full-time schedule (40+ hours/week)</div>
            </div>

            <div className="confirm-item">
              <div className="confirm-q">Why Caprae Capital?</div>
              <div className="confirm-a"><CheckCircle2 className="icon" /> Opportunity to build high-horsepower AI tools that drive real PE deal sourcing and post-acquisition value creation.</div>
            </div>

            <div className="confirm-item">
              <div className="confirm-q">What is your expected salary?</div>
              <div className="confirm-a"><CheckCircle2 className="icon" /> Competitive market rate aligned with Full Stack AI Developer roles (Negotiable based on package).</div>
            </div>
          </div>

          <div className="expectations-box">
            <h3><ShieldCheck className="icon" /> Employment Expectations Acknowledgment</h3>
            <ul className="expectations-list">
              <li><CheckCircle2 className="check-icon" /> <strong>3-Month Probationary Period:</strong> Fully understood and accepted. Ready to demonstrate high speed of execution and quality from Day 1.</li>
              <li><CheckCircle2 className="check-icon" /> <strong>9AM - 6PM EST Initial Training Shift:</strong> Confirmed. Fully available and aligned to work strict 9AM-6PM EST hours during the 2-3 month onboarding period.</li>
              <li><CheckCircle2 className="check-icon" /> <strong>Off-Hours Availability:</strong> Confirmed. Fully available for customer service emergencies or time-sensitive deliverables (~2 hours/week max as needed).</li>
            </ul>
          </div>
        </div>
      )}

      {/* Section 3: Reapplicant Essays */}
      {activeSection === 'reapplicant' && (
        <div className="handbook-section-card">
          <div className="qa-block">
            <h2 className="qa-question"><HelpCircle className="q-icon" /> What do you think is Caprae’s unfair advantage?</h2>
            <div className="qa-answer">
              <p>
                Caprae’s unfair advantage lies in building proprietary software in-house (like SaaSquatch Leads) paired with an operator-first, 7-year post-acquisition value creation playbook. While competing PE firms rely on standard third-party tools, Caprae leverages custom AI engines that source off-market leads with higher precision, lower acquisition costs, and immediate post-close operational uplift.
              </p>
            </div>
          </div>

          <div className="qa-block">
            <h2 className="qa-question"><HelpCircle className="q-icon" /> What does “To become a legend, you must take down legends” mean to you?</h2>
            <div className="qa-answer">
              <p>
                To me, this quote means rejecting mediocrity and having the courage to challenge established incumbents. In engineering and private equity, legacy firm playbooks are often treated as dogma. Taking down legends requires relentless stamina, creative problem-solving, and superior execution to build solutions that render traditional methods obsolete.
              </p>
            </div>
          </div>

          <div className="qa-block">
            <h2 className="qa-question"><HelpCircle className="q-icon" /> What do you think Caprae’s culture will be like?</h2>
            <div className="qa-answer">
              <p>
                Caprae’s culture is high-horsepower, meritocratic, and fiercely intense (#BleedandBuild). It is an environment where actions speak louder than academic credentials, communication is direct and fast, and team members take immense pride in building world-class products.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Tech & Architecture Specs */}
      {activeSection === 'tech' && (
        <div className="handbook-section-card">
          <h2 className="card-section-heading"><Cpu className="icon" /> Full Stack Architecture & Engineering Specifications</h2>
          <p className="tech-intro">
            As requested in Section 1 ("Engineer with Excellence") of the handbook, here is the detailed architectural breakdown of the SaaSquatch AI platform:
          </p>

          <div className="tech-specs-grid">
            <div className="spec-card">
              <h3>Database Storage Strategy</h3>
              <p>
                <strong>Primary Storage:</strong> PostgreSQL / Supabase for structured relational lead records, user pipeline preferences, and verified decision-maker contacts.
              </p>
              <p>
                <strong>Client-Side Persistence:</strong> IndexedDB & LocalStorage for zero-latency local caching, offline filtering, and immediate state updates.
              </p>
            </div>

            <div className="spec-card">
              <h3>Caching & Performance</h3>
              <p>
                <strong>Server-Side Caching:</strong> Redis (in-memory key-value store) for domain WHOIS, DNS metadata, and tech stack signature cache with a 7-day TTL to minimize redundant scraping calls.
              </p>

              <p>
                <strong>Client-Side Optimization:</strong> React 19 concurrent features, virtualized tables for multi-thousand record datasets, and debounce utility for real-time search inputs.
              </p>
            </div>

            <div className="spec-card">
              <h3>Hosting & Cloud Architecture</h3>
              <p>
                <strong>Static & Frontend:</strong> Deployed on Vercel / Cloudflare Pages edge network for sub-50ms global CDN response times.
              </p>

              <p>
                <strong>Serverless Microservices:</strong> AWS Lambda / Vercel Serverless Functions running Node.js / Python Playwright scrapers for scalable, burstable web crawling.
              </p>
            </div>

            <div className="spec-card">
              <h3>Deployment Process & Stack</h3>
              <p>
                <strong>Tech Stack:</strong> React 19, Vite, Lucide Icons, Modern CSS Modules, JavaScript (ES2024), Python BeautifulSoup/Playwright scrapers.
              </p>

              <p>
                <strong>CI/CD Pipeline:</strong> GitHub Actions automated workflow for ESLint verification, bundle size checks, and deployment preview links on every pull request.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
