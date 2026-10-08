import React from 'react';
import { 
  Sparkles, 
  Search, 
  BrainCircuit, 
  BarChart3, 
  Database, 
  FileText, 
  Building2, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, stats, leadCount }) => {
  return (
    <header className="header-container">
      {/* Top Banner Ticker */}
      <div className="top-ticker">
        <div className="ticker-badge">
          <span className="live-dot"></span>
          CAPRAE M&A AI ENGINE READY
        </div>
        <div className="ticker-stats">
          <span><strong>Total Targets:</strong> {leadCount}</span>
          <span className="dot-divider">•</span>
          <span><strong>Pipeline Revenue:</strong> ${stats.totalRevenue}M</span>
          <span className="dot-divider">•</span>
          <span><strong>Avg AI Readiness:</strong> {stats.avgAiScore}/100</span>
          <span className="dot-divider">•</span>
          <span><strong>High Fit Leads:</strong> {stats.highFitCount}</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="main-nav-bar">
        <div className="brand-logo" onClick={() => setActiveTab('finder')}>
          <div className="logo-icon-box">
            <Sparkles className="logo-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              SaaSquatch <span className="highlight-ai">AI</span>
            </div>
            <div className="brand-subtitle">
              Caprae Capital Leadgen & M&A Intelligence
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <nav className="tab-navigation">
          <button 
            className={`nav-tab-btn ${activeTab === 'finder' ? 'active' : ''}`}
            onClick={() => setActiveTab('finder')}
          >
            <Search className="tab-icon" />
            Lead Finder & Crawler
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            <BrainCircuit className="tab-icon" />
            AI Scoring & Pitch Studio
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 className="tab-icon" />
            M&A Analytics
          </button>

          <button 
            className={`nav-tab-btn ${activeTab === 'datatools' ? 'active' : ''}`}
            onClick={() => setActiveTab('datatools')}
          >
            <Database className="tab-icon" />
            Data Tools & Export
          </button>

          <button 
            className={`nav-tab-btn handbook-tab ${activeTab === 'handbook' ? 'active' : ''}`}
            onClick={() => setActiveTab('handbook')}
          >
            <FileText className="tab-icon" />
            Handbook Answers
          </button>
        </nav>
      </div>
    </header>
  );
};
