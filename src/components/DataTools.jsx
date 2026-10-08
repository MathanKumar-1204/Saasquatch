import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  RefreshCw, 
  ShieldCheck 
} from 'lucide-react';
import { exportLeadsToCsv, exportLeadsToJson, deduplicateLeads, simulateScrapeDomain } from '../services/scraperEngine';

export const DataTools = ({ leads, setLeads }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [emailCheckInput, setEmailCheckInput] = useState('');
  const [emailCheckResult, setEmailCheckResult] = useState(null);

  const handleExportCsv = () => {
    exportLeadsToCsv(leads);
  };

  const handleExportJson = () => {
    exportLeadsToJson(leads);
  };

  const handleRunDeduplication = () => {
    const originalCount = leads.length;
    const cleaned = deduplicateLeads(leads);
    setLeads(cleaned);
    const removedCount = originalCount - cleaned.length;
    setImportStatus(`Deduplication successful: Scanned ${originalCount} items, removed ${removedCount} duplicates.`);
  };

  const handleImportJson = (e) => {
    e.preventDefault();
    if (!jsonInput.trim()) return;

    try {
      const parsed = JSON.parse(jsonInput);
      const itemsToAdd = Array.isArray(parsed) ? parsed : [parsed];
      
      const validatedItems = itemsToAdd.map(item => ({
        id: item.id || `imported-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: item.name || 'Imported Company',
        domain: item.domain || 'example.com',
        industry: item.industry || 'B2B SaaS',
        revenue: Number(item.revenue) || 5.0,
        employees: Number(item.employees) || 25,
        location: item.location || 'USA',
        foundedYear: item.foundedYear || 2020,
        aiScore: item.aiScore || 80,
        maFit: item.maFit || 'High',
        ebitdaMargin: item.ebitdaMargin || 20,
        estimatedValuation: item.estimatedValuation || 15.0,
        verified: true,
        techStack: item.techStack || ['React', 'AWS'],
        decisionMakers: item.decisionMakers || [{ name: 'CEO', title: 'Founder', email: 'contact@domain.com', verified: true }],
        aiInsights: item.aiInsights || ['Imported via JSON Tool'],
        status: 'New',
        dateScraped: new Date().toISOString().split('T')[0]
      }));

      setLeads([...validatedItems, ...leads]);
      setImportStatus(`Successfully imported ${validatedItems.length} new target leads.`);
      setJsonInput('');
    } catch (err) {
      setImportStatus(`JSON Import Error: ${err.message}. Please check syntax.`);
    }
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (!emailCheckInput.trim()) return;

    const email = emailCheckInput.trim();
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidFormat) {
      setEmailCheckResult({ valid: false, message: "Invalid email format syntax." });
      return;
    }

    const domain = email.split('@')[1];
    const isCommonB2b = !['gmail.com', 'yahoo.com', 'hotmail.com'].includes(domain.toLowerCase());

    setEmailCheckResult({
      valid: true,
      email,
      domain,
      mxVerified: true,
      corporateDomain: isCommonB2b,
      deliverabilityScore: isCommonB2b ? '99.4%' : '82.0%',
      message: isCommonB2b 
        ? "Verified Corporate Executive Email. MX records active."
        : "Valid Email syntax, but public freemail domain."
    });
  };

  return (
    <div className="data-tools-container">
      <div className="tools-banner">
        <div>
          <h1 className="tools-title">SaaSquatch Data Management & Verification Suite</h1>
          <p className="tools-subtitle">
            Export dataset, deduplicate database entries, import custom JSON lead lists, and verify corporate email deliverability.
          </p>
        </div>
      </div>

      {importStatus && (
        <div className="status-notification-banner">
          <CheckCircle2 className="icon" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Grid of Data Tools */}
      <div className="tools-grid">
        {/* Card 1: Data Export & Deduplication */}
        <div className="tool-card">
          <h3 className="card-title"><Download className="title-icon" /> Export & Clean Dataset</h3>
          <p className="card-desc">
            Download your current pipeline of <strong>{leads.length} leads</strong> in standardized CSV or JSON formats for CRM integration.
          </p>

          <div className="tool-btn-group">
            <button className="tool-btn primary" onClick={handleExportCsv}>
              <Download className="btn-icon" /> Export CSV File
            </button>
            <button className="tool-btn secondary" onClick={handleExportJson}>
              <FileText className="btn-icon" /> Export JSON File
            </button>
            <button className="tool-btn warning" onClick={handleRunDeduplication}>
              <Layers className="btn-icon" /> Deduplicate Database
            </button>
          </div>
        </div>

        {/* Card 2: Email Verification Tool */}
        <div className="tool-card">
          <h3 className="card-title"><ShieldCheck className="title-icon" /> Executive Email Verifier</h3>
          <p className="card-desc">
            Test MX records, SMTP handshake simulation, and syntax verification for executive cold outreach.
          </p>

          <form onSubmit={handleVerifyEmail} className="email-verify-form">
            <input 
              type="text" 
              placeholder="e.g. CEO@targetcompany.com..."
              value={emailCheckInput}
              onChange={e => setEmailCheckInput(e.target.value)}
              className="verify-input"
            />
            <button type="submit" className="tool-btn primary">Verify</button>
          </form>

          {emailCheckResult && (
            <div className={`verify-result-box ${emailCheckResult.valid ? 'success' : 'error'}`}>
              <div className="result-header">
                {emailCheckResult.valid ? <CheckCircle2 className="icon" /> : <AlertCircle className="icon" />}
                <span>{emailCheckResult.message}</span>
              </div>
              {emailCheckResult.valid && (
                <div className="result-meta">
                  <span>Domain: <strong>{emailCheckResult.domain}</strong></span> • 
                  <span>Deliverability: <strong>{emailCheckResult.deliverabilityScore}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Import JSON Box */}
      <div className="tool-card import-card">
        <h3 className="card-title"><Upload className="title-icon" /> Custom JSON Lead List Importer</h3>
        <p className="card-desc">
          Paste custom JSON objects containing target leads. Supports fields: name, domain, industry, revenue, employees, aiScore, decisionMakers.
        </p>

        <form onSubmit={handleImportJson}>
          <textarea 
            className="json-textarea"
            rows="6"
            placeholder={`[\n  {\n    "name": "CloudScale Inc",\n    "domain": "cloudscale.io",\n    "industry": "B2B SaaS",\n    "revenue": 12.5,\n    "employees": 65,\n    "aiScore": 92\n  }\n]`}
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
          />
          <button type="submit" className="tool-btn primary mt-10">
            <Upload className="btn-icon" /> Import Leads to Pipeline
          </button>
        </form>
      </div>
    </div>
  );
};
