import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Filter, 
  Globe, 
  Building2, 
  DollarSign, 
  CheckCircle2, 
  Users, 
  SlidersHorizontal, 
  Download, 
  Trash2, 
  Eye, 
  Mail, 
  Layers, 
  RefreshCw, 
  Grid, 
  List 
} from 'lucide-react';
import { scrapeDomainReal, simulateScrapeDomain, exportLeadsToCsv, exportLeadsToJson, deduplicateLeads } from '../services/scraperEngine';

export const LeadFinder = ({ leads, setLeads, onSelectLead, onViewHandbook }) => {
  const [scrapeInput, setScrapeInput] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeLog, setScrapeLog] = useState('');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [maFitFilter, setMaFitFilter] = useState('All');
  const [minRevenue, setMinRevenue] = useState(0);
  const [minAiScore, setMinAiScore] = useState(0);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Selection state
  const [selectedIds, setSelectedIds] = useState([]);

  // Industries list
  const industries = ["All", "Logistics & Supply Chain", "Healthcare Tech", "FinTech", "Cybersecurity & IT", "B2B SaaS", "E-Commerce Tech", "EdTech & Learning", "Industrial & Manufacturing Tech"];

  // Handle Domain Scrape
  const handleScrape = async (e) => {
    e.preventDefault();
    if (!scrapeInput.trim()) return;

    setIsScraping(true);
    setScrapeLog(`Connecting to Python Web Scraper backend for domain: ${scrapeInput}...`);

    setTimeout(() => {
      setScrapeLog(`[1/3] Fetching live HTTP response, SSL certificate & HTML meta tags...`);
    }, 500);

    setTimeout(() => {
      setScrapeLog(`[2/3] BeautifulSoup parsing DOM: detecting JS frameworks, emails & social links...`);
    }, 1200);

    setTimeout(() => {
      setScrapeLog(`[3/3] Running Python AI intent scoring & financial valuation algorithms...`);
    }, 1900);

    try {
      const newLead = await scrapeDomainReal(scrapeInput);
      setLeads(prev => [newLead, ...prev]);
      setIsScraping(false);
      setScrapeInput('');
      setScrapeLog('');
      onSelectLead(newLead);
    } catch (err) {
      console.error(err);
      setIsScraping(false);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.techStack && l.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesIndustry = industryFilter === 'All' || l.industry === industryFilter;
    const matchesFit = maFitFilter === 'All' || l.maFit === maFitFilter;
    const matchesRev = (l.revenue || 0) >= minRevenue;
    const matchesScore = (l.aiScore || 0) >= minAiScore;

    return matchesSearch && matchesIndustry && matchesFit && matchesRev && matchesScore;
  });

  // Bulk actions
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleExportSelected = () => {
    const target = leads.filter(l => selectedIds.includes(l.id));
    exportLeadsToCsv(target.length > 0 ? target : filteredLeads);
  };

  const handleDeduplicate = () => {
    const cleaned = deduplicateLeads(leads);
    setLeads(cleaned);
    alert(`Deduplication complete. Retained ${cleaned.length} unique lead records.`);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setLeads(leads.filter(l => !selectedIds.includes(l.id)));
    setSelectedIds([]);
  };

  return (
    <div className="lead-finder-container">
      {/* Top Banner / Scraper Bar */}
      <div className="scraper-card-hero">
        <div className="scraper-hero-header">
          <div>
            <h1 className="hero-title">SaaSquatch Leadgen & AI Scraping Engine</h1>
            <p className="hero-subtitle">
              Input any target company URL or domain to extract decision makers, detect tech stack, and calculate Caprae M&A AI readiness scores in real-time.
            </p>
          </div>
          <button className="handbook-cta-btn" onClick={onViewHandbook}>
            <Sparkles className="icon" /> View Handbook Submission Answers
          </button>
        </div>

        <form onSubmit={handleScrape} className="scraper-form-bar">
          <div className="input-group">
            <Globe className="input-icon" />
            <input 
              type="text" 
              placeholder="e.g. acmecloud.com, stripe.com, or enterprise domain..."
              value={scrapeInput}
              onChange={e => setScrapeInput(e.target.value)}
              disabled={isScraping}
              className="scraper-input"
            />
          </div>
          <button type="submit" disabled={isScraping || !scrapeInput.trim()} className="scrape-submit-btn">
            {isScraping ? (
              <>
                <RefreshCw className="btn-icon spinning" /> Crawling Domain...
              </>
            ) : (
              <>
                <Sparkles className="btn-icon" /> Run AI Scraper
              </>
            )}
          </button>
        </form>

        {isScraping && (
          <div className="scraping-progress-banner">
            <div className="progress-spinner-box">
              <RefreshCw className="spinning progress-icon" />
            </div>
            <div className="progress-text-box">
              <div className="progress-status-title">AI Crawler Active</div>
              <div className="progress-status-log">{scrapeLog}</div>
            </div>
          </div>
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="filters-toolbar">
        <div className="search-box">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search company name, domain, tech stack..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-select-group">
            <Filter className="filter-icon" />
            <select value={industryFilter} onChange={e => setIndustryFilter(e.target.value)} className="filter-dropdown">
              {industries.map((ind, i) => (
                <option key={i} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-group">
            <select value={maFitFilter} onChange={e => setMaFitFilter(e.target.value)} className="filter-dropdown">
              <option value="All">All M&A Fit Levels</option>
              <option value="High">High Fit Only</option>
              <option value="Medium">Medium Fit</option>
              <option value="Low">Low Fit</option>
            </select>
          </div>

          <div className="filter-slider-group">
            <label className="slider-label">Min Revenue: ${minRevenue}M</label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              step="1"
              value={minRevenue}
              onChange={e => setMinRevenue(Number(e.target.value))}
              className="slider-input"
            />
          </div>

          <div className="filter-slider-group">
            <label className="slider-label">Min AI Score: {minAiScore}</label>
            <input 
              type="range" 
              min="0" 
              max="95" 
              step="5"
              value={minAiScore}
              onChange={e => setMinAiScore(Number(e.target.value))}
              className="slider-input"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="view-toggle-btns">
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} 
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List className="icon" />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid className="icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="table-actions-bar">
        <div className="results-count">
          Showing <strong>{filteredLeads.length}</strong> of {leads.length} leads
          {selectedIds.length > 0 && <span className="selected-badge">({selectedIds.length} selected)</span>}
        </div>

        <div className="action-buttons-group">
          <button className="secondary-action-btn" onClick={handleExportSelected}>
            <Download className="btn-icon" /> Export CSV ({selectedIds.length || filteredLeads.length})
          </button>
          <button className="secondary-action-btn" onClick={handleDeduplicate}>
            <Layers className="btn-icon" /> Deduplicate
          </button>
          {selectedIds.length > 0 && (
            <button className="danger-action-btn" onClick={handleDeleteSelected}>
              <Trash2 className="btn-icon" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Main Content View: Table or Grid */}
      {viewMode === 'table' ? (
        <div className="table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th className="th-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filteredLeads.length > 0 && selectedIds.length === filteredLeads.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Company & Domain</th>
                <th>Industry</th>
                <th>Revenue & Cashflow</th>
                <th>AI Readiness</th>
                <th>M&A Fit</th>
                <th>Decision Maker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className={selectedIds.includes(lead.id) ? 'row-selected' : ''}>
                  <td className="td-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(lead.id)}
                      onChange={() => toggleSelectLead(lead.id)}
                    />
                  </td>

                  <td className="td-company" onClick={() => onSelectLead(lead)}>
                    <div className="company-cell-name">
                      {lead.name}
                      {lead.verified && <CheckCircle2 className="verified-check" title="Verified Domain" />}
                    </div>
                    <div className="company-cell-domain">{lead.domain}</div>
                    <div className="company-tech-pills">
                      {lead.techStack && lead.techStack.slice(0, 3).map((t, i) => (
                        <span key={i} className="mini-tech-pill">{t}</span>
                      ))}
                    </div>
                  </td>

                  <td className="td-industry">{lead.industry}</td>

                  <td className="td-financials">
                    <div className="fin-rev">${lead.revenue}M ARR</div>
                    <div className="fin-sub">Est. Val: ${lead.estimatedValuation}M ({lead.ebitdaMargin}% margin)</div>
                  </td>

                  <td className="td-score">
                    <div className="score-badge-box">
                      <span className="score-number">{lead.aiScore}</span>
                      <span className="score-max">/100</span>
                    </div>
                  </td>

                  <td className="td-fit">
                    <span className={`fit-pill fit-${lead.maFit.toLowerCase()}`}>
                      {lead.maFit}
                    </span>
                  </td>

                  <td className="td-dm">
                    {lead.decisionMakers && lead.decisionMakers[0] ? (
                      <div>
                        <div className="dm-cell-name">{lead.decisionMakers[0].name}</div>
                        <div className="dm-cell-email">{lead.decisionMakers[0].email}</div>
                      </div>
                    ) : (
                      <span className="empty-text">N/A</span>
                    )}
                  </td>

                  <td className="td-actions">
                    <button className="row-action-btn" onClick={() => onSelectLead(lead)} title="View Full Intelligence Report">
                      <Eye className="icon" /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan="8" className="no-results-td">
                    No leads match your active filters. Try clearing your search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="leads-grid">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="lead-card-grid" onClick={() => onSelectLead(lead)}>
              <div className="card-top-row">
                <div className="card-company-name">{lead.name}</div>
                <span className={`fit-pill fit-${lead.maFit.toLowerCase()}`}>{lead.maFit} Fit</span>
              </div>
              <div className="card-domain">{lead.domain}</div>
              <div className="card-industry">{lead.industry}</div>

              <div className="card-metrics-row">
                <div>
                  <span className="metric-lbl">Revenue</span>
                  <div className="metric-val">${lead.revenue}M</div>
                </div>
                <div>
                  <span className="metric-lbl">Valuation</span>
                  <div className="metric-val">${lead.estimatedValuation}M</div>
                </div>
                <div>
                  <span className="metric-lbl">AI Score</span>
                  <div className="metric-val highlight">{lead.aiScore}/100</div>
                </div>
              </div>

              <div className="card-tech-list">
                {lead.techStack && lead.techStack.map((t, i) => (
                  <span key={i} className="mini-tech-pill">{t}</span>
                ))}
              </div>

              <div className="card-footer-action">
                <button className="card-inspect-btn">
                  <Eye className="icon" /> View AI Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
