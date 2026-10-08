import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Search, 
  Send, 
  Copy, 
  Check, 
  Building2, 
  Users, 
  DollarSign, 
  Sliders, 
  Zap, 
  Bot, 
  ArrowRight 
} from 'lucide-react';
import { generateAiPitch } from '../services/scraperEngine';

export const AiIntelligence = ({ leads, selectedPitchLead, onSelectLead }) => {
  const [activeLeadId, setActiveLeadId] = useState(
    selectedPitchLead ? selectedPitchLead.id : (leads[0] ? leads[0].id : '')
  );
  const [tone, setTone] = useState('M&A Acquisition');
  const [customPrompt, setCustomPrompt] = useState('');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState('');
  const [nlResults, setNlResults] = useState(null);
  const [copied, setCopied] = useState(false);

  const currentLead = leads.find(l => l.id === activeLeadId) || leads[0];

  const handleCopy = () => {
    if (!currentLead) return;
    const emailText = generateAiPitch(currentLead, tone);
    navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNlSearch = (e) => {
    e.preventDefault();
    if (!naturalLanguageQuery.trim()) return;

    const queryLower = naturalLanguageQuery.toLowerCase();
    const matches = leads.filter(l => {
      if (queryLower.includes('saas') && l.industry.toLowerCase().includes('saas')) return true;
      if (queryLower.includes('high') && l.maFit === 'High') return true;
      if (queryLower.includes('revenue') && l.revenue > 10) return true;
      if (queryLower.includes('logistics') && l.industry.toLowerCase().includes('logistics')) return true;
      if (queryLower.includes('tech') && l.industry.toLowerCase().includes('tech')) return true;
      return l.name.toLowerCase().includes(queryLower) || l.domain.toLowerCase().includes(queryLower);
    });

    setNlResults(matches.length > 0 ? matches : leads.slice(0, 3));
  };

  return (
    <div className="ai-intelligence-container">
      {/* Top Banner */}
      <div className="ai-banner">
        <div className="ai-banner-content">
          <div className="ai-icon-badge">
            <BrainCircuit className="icon" />
          </div>
          <div>
            <h1 className="ai-title">Caprae AI Intent Scoring & Pitch Studio</h1>
            <p className="ai-desc">
              Leverage custom agentic AI logic to evaluate acquisition intent, operational optimization ROI, and generate hyper-personalized founder outreach pitches.
            </p>
          </div>
        </div>
      </div>

      {/* Natural Language Query Search Bar */}
      <div className="nl-search-card">
        <h3 className="card-heading"><Sparkles className="icon" /> Natural Language Lead Finder</h3>
        <form onSubmit={handleNlSearch} className="nl-form">
          <input 
            type="text" 
            placeholder="Ask AI e.g. 'Find high margin SaaS companies with >$10M revenue and high AI score'..." 
            value={naturalLanguageQuery}
            onChange={e => setNaturalLanguageQuery(e.target.value)}
            className="nl-input"
          />
          <button type="submit" className="nl-submit-btn">
            <Search className="btn-icon" /> Query AI Engine
          </button>
        </form>

        {nlResults && (
          <div className="nl-results-box">
            <div className="nl-results-title">AI Query Matches ({nlResults.length} targets found):</div>
            <div className="nl-chips-list">
              {nlResults.map(l => (
                <button 
                  key={l.id} 
                  className={`nl-chip ${l.id === activeLeadId ? 'active' : ''}`}
                  onClick={() => { setActiveLeadId(l.id); onSelectLead(l); }}
                >
                  <Building2 className="chip-icon" /> {l.name} (${l.revenue}M ARR)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Studio Grid */}
      {currentLead ? (
        <div className="studio-grid">
          {/* Left Panel: Target Selection & AI Analysis */}
          <div className="studio-panel left-panel">
            <div className="panel-section">
              <label className="section-label">Select Target Company:</label>
              <select 
                value={activeLeadId} 
                onChange={e => setActiveLeadId(e.target.value)} 
                className="target-select-dropdown"
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.domain}) — ${l.revenue}M Rev | Score: {l.aiScore}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Card Overview */}
            <div className="target-summary-box">
              <div className="target-title-row">
                <h2>{currentLead.name}</h2>
                <span className={`fit-pill fit-${currentLead.maFit.toLowerCase()}`}>{currentLead.maFit} Fit</span>
              </div>
              <div className="target-sub">{currentLead.industry} • {currentLead.location}</div>

              <div className="target-stat-pills">
                <div className="stat-pill">
                  <span className="lbl">ARR Revenue</span>
                  <span className="val">${currentLead.revenue}M</span>
                </div>
                <div className="stat-pill">
                  <span className="lbl">EBITDA Cashflow</span>
                  <span className="val">${(currentLead.revenue * currentLead.ebitdaMargin / 100).toFixed(1)}M</span>
                </div>
                <div className="stat-pill">
                  <span className="lbl">AI Score</span>
                  <span className="val highlight-val">{currentLead.aiScore}/100</span>
                </div>
              </div>

              {/* AI Value Creation Roadmap */}
              <div className="ai-roadmap-box">
                <h4 className="roadmap-title"><Zap className="icon" /> Post-Acquisition AI Opportunity Roadmap:</h4>
                <ul className="roadmap-list">
                  {currentLead.aiInsights && currentLead.aiInsights.map((insight, idx) => (
                    <li key={idx} className="roadmap-item">
                      <ArrowRight className="item-icon" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Panel: Outreach Pitch Generator Studio */}
          <div className="studio-panel right-panel">
            <div className="studio-header">
              <h3 className="panel-title"><Bot className="icon" /> AI Outreach Pitch Studio</h3>
              <div className="tone-pill-group">
                <button 
                  className={`tone-pill ${tone === 'M&A Acquisition' ? 'active' : ''}`}
                  onClick={() => setTone('M&A Acquisition')}
                >
                  M&A Deal
                </button>
                <button 
                  className={`tone-pill ${tone === 'AI Transformation' ? 'active' : ''}`}
                  onClick={() => setTone('AI Transformation')}
                >
                  AI Modernization
                </button>
                <button 
                  className={`tone-pill ${tone === 'Strategic Intro' ? 'active' : ''}`}
                  onClick={() => setTone('Strategic Intro')}
                >
                  Strategic
                </button>
              </div>
            </div>

            <div className="pitch-editor-card">
              <div className="editor-top-info">
                <span><strong>Recipient:</strong> {currentLead.decisionMakers[0]?.name || 'Founder'} ({currentLead.decisionMakers[0]?.email})</span>
              </div>
              
              <textarea 
                className="ai-textarea"
                rows="14"
                value={generateAiPitch(currentLead, tone)}
                readOnly
              />

              <div className="editor-action-bar">
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check className="btn-icon" /> : <Copy className="btn-icon" />}
                  {copied ? 'Copied Pitch to Clipboard!' : 'Copy Outreach Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No lead selected. Please add or select a lead.</div>
      )}
    </div>
  );
};
