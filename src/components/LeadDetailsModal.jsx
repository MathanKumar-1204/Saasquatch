import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Globe, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Mail, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  Bot, 
  Zap, 
  FileText 
} from 'lucide-react';
import { generateAiPitch } from '../services/scraperEngine';

export const LeadDetailsModal = ({ lead, onClose, onSelectPitchLead }) => {
  const [pitchTone, setPitchTone] = useState("M&A Acquisition");
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  const currentPitch = generateAiPitch(lead, pitchTone);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-company-icon">
              <Building2 className="icon" />
            </div>
            <div>
              <div className="company-name-row">
                <h2 className="modal-company-name">{lead.name}</h2>
                {lead.verified && (
                  <span className="badge verified-badge">
                    <ShieldCheck className="badge-icon" /> Verified
                  </span>
                )}
                <span className={`badge fit-badge fit-${lead.maFit.toLowerCase()}`}>
                  {lead.maFit} M&A Fit
                </span>
              </div>
              <a href={`https://${lead.domain}`} target="_blank" rel="noreferrer" className="company-domain-link">
                <Globe className="link-icon" /> {lead.domain}
              </a>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Top Metric Cards Grid */}
          <div className="modal-metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Estimated Revenue</div>
              <div className="metric-value">${lead.revenue}M ARR</div>
              <div className="metric-sub">YoY Growth +{lead.yoyGrowth || 24}%</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Est. Valuation</div>
              <div className="metric-value">${lead.estimatedValuation}M</div>
              <div className="metric-sub">Multiple: {(lead.estimatedValuation / lead.revenue).toFixed(1)}x Rev</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">EBITDA Margin</div>
              <div className="metric-value">{lead.ebitdaMargin}%</div>
              <div className="metric-sub">${(lead.revenue * lead.ebitdaMargin / 100).toFixed(1)}M Annual Cash Flow</div>
            </div>

            <div className="metric-card highlight-metric">
              <div className="metric-label">AI Readiness Score</div>
              <div className="metric-value">{lead.aiScore}/100</div>
              <div className="metric-sub">High Modernization ROI</div>
            </div>
          </div>

          {/* Section Grid: Left = Info & Tech, Right = AI Outreach Generator */}
          <div className="modal-content-split">
            {/* Left Column */}
            <div className="split-column left-column">
              {/* Decision Makers */}
              <div className="info-block">
                <h3 className="block-title"><Users className="title-icon" /> Decision Makers & Leadership</h3>
                <div className="decision-makers-list">
                  {lead.decisionMakers && lead.decisionMakers.map((dm, idx) => (
                    <div className="dm-card" key={idx}>
                      <div className="dm-info">
                        <div className="dm-name">{dm.name}</div>
                        <div className="dm-title">{dm.title}</div>
                        <div className="dm-email"><Mail className="dm-icon" /> {dm.email}</div>
                      </div>
                      <div className="dm-actions">
                        {dm.linkedin && (
                          <a href={dm.linkedin} target="_blank" rel="noreferrer" className="social-icon-btn">
                            <ExternalLink className="icon" />
                          </a>
                        )}
                        <span className={`dm-status ${dm.verified ? 'status-verified' : 'status-unverified'}`}>
                          {dm.verified ? 'Verified Email' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="info-block">
                <h3 className="block-title"><Cpu className="title-icon" /> Detected Tech Stack</h3>
                <div className="tech-tags-wrapper">
                  {lead.techStack && lead.techStack.map((tech, idx) => (
                    <span className="tech-chip" key={idx}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* Caprae AI Insights */}
              <div className="info-block">
                <h3 className="block-title"><Bot className="title-icon" /> Caprae M&A AI Insights</h3>
                <ul className="ai-insights-list">
                  {lead.aiInsights && lead.aiInsights.map((insight, idx) => (
                    <li key={idx} className="insight-item">
                      <Zap className="bullet-icon" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: AI Outreach Pitch Generator */}
            <div className="split-column right-column">
              <div className="info-block pitch-studio-block">
                <div className="pitch-header">
                  <h3 className="block-title"><Sparkles className="title-icon" /> AI Outreach Generator</h3>
                  <div className="tone-selector">
                    <button 
                      className={`tone-btn ${pitchTone === 'M&A Acquisition' ? 'active' : ''}`}
                      onClick={() => setPitchTone('M&A Acquisition')}
                    >
                      M&A Deal
                    </button>
                    <button 
                      className={`tone-btn ${pitchTone === 'AI Transformation' ? 'active' : ''}`}
                      onClick={() => setPitchTone('AI Transformation')}
                    >
                      AI Audit
                    </button>
                    <button 
                      className={`tone-btn ${pitchTone === 'Strategic Intro' ? 'active' : ''}`}
                      onClick={() => setPitchTone('Strategic Intro')}
                    >
                      Strategic
                    </button>
                  </div>
                </div>

                <div className="pitch-box">
                  <textarea 
                    className="pitch-textarea" 
                    readOnly 
                    value={currentPitch}
                  />
                  <div className="pitch-footer">
                    <button className="copy-pitch-btn" onClick={handleCopyPitch}>
                      {copied ? <Check className="btn-icon" /> : <Copy className="btn-icon" />}
                      {copied ? 'Copied to Clipboard!' : 'Copy Cold Outreach Email'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>Close</button>
          <button className="primary-btn" onClick={() => { onClose(); onSelectPitchLead(lead); }}>
            <Sparkles className="btn-icon" /> Open in AI Pitch Studio
          </button>
        </div>
      </div>
    </div>
  );
};
