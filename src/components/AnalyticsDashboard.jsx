import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  Award, 
  Layers 
} from 'lucide-react';
import { calculatePipelineStats } from '../services/scraperEngine';

export const AnalyticsDashboard = ({ leads, onSelectLead }) => {
  const stats = calculatePipelineStats(leads);

  // Industry Distribution
  const industryCounts = {};
  leads.forEach(l => {
    industryCounts[l.industry] = (industryCounts[l.industry] || 0) + 1;
  });

  // Revenue brackets
  const revBrackets = {
    "Under $10M": leads.filter(l => l.revenue < 10).length,
    "$10M - $20M": leads.filter(l => l.revenue >= 10 && l.revenue <= 20).length,
    "Over $20M": leads.filter(l => l.revenue > 20).length
  };

  // Top valuation targets
  const sortedByValuation = [...leads].sort((a, b) => b.estimatedValuation - a.estimatedValuation).slice(0, 5);

  return (
    <div className="analytics-container">
      {/* Top Banner */}
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">M&A Deal Flow & AI Pipeline Analytics</h1>
          <p className="analytics-subtitle">
            Comprehensive market intelligence breakdown of scraped targets across valuation tiers, industry distributions, and AI readiness scores.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="analytics-metrics-grid">
        <div className="analytics-card">
          <div className="card-top-icon">
            <Building2 className="icon" />
          </div>
          <div className="card-num">{stats.totalLeads}</div>
          <div className="card-lbl">Total Tracked Targets</div>
          <div className="card-foot">+100% Verified Caprae Pipeline</div>
        </div>

        <div className="analytics-card">
          <div className="card-top-icon">
            <DollarSign className="icon" />
          </div>
          <div className="card-num">${stats.totalRevenue}M</div>
          <div className="card-lbl">Total Combined ARR</div>
          <div className="card-foot">Avg ARR: ${(stats.totalRevenue / (stats.totalLeads || 1)).toFixed(1)}M</div>
        </div>

        <div className="analytics-card">
          <div className="card-top-icon">
            <TrendingUp className="icon" />
          </div>
          <div className="card-num">${stats.totalValuation}M</div>
          <div className="card-lbl">Est. Enterprise Valuation</div>
          <div className="card-foot">Based on EBITDA multiples</div>
        </div>

        <div className="analytics-card highlight-analytics">
          <div className="card-top-icon">
            <Award className="icon" />
          </div>
          <div className="card-num">{stats.avgAiScore}/100</div>
          <div className="card-lbl">Avg AI Readiness Index</div>
          <div className="card-foot">{stats.highFitCount} High-Priority Deals</div>
        </div>
      </div>

      {/* Main Charts & Leaderboards Split */}
      <div className="analytics-split">
        {/* Left Column: Industry & Revenue Distribution */}
        <div className="split-panel">
          <h3 className="panel-title"><PieChart className="title-icon" /> Industry Breakdown</h3>
          <div className="progress-bars-list">
            {Object.entries(industryCounts).map(([ind, count], idx) => {
              const pct = Math.round((count / leads.length) * 100);
              return (
                <div key={idx} className="progress-item">
                  <div className="item-header">
                    <span className="item-label">{ind}</span>
                    <span className="item-val">{count} targets ({pct}%)</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 className="panel-title mt-20"><BarChart3 className="title-icon" /> Revenue Tier Distribution</h3>
          <div className="revenue-brackets-grid">
            {Object.entries(revBrackets).map(([bracket, count], idx) => (
              <div key={idx} className="bracket-card">
                <div className="bracket-count">{count}</div>
                <div className="bracket-label">{bracket}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Top Valuation Target Leaderboard */}
        <div className="split-panel">
          <h3 className="panel-title"><Award className="title-icon" /> Top Valuation Acquisition Targets</h3>
          <div className="leaderboard-list">
            {sortedByValuation.map((target, rank) => (
              <div key={target.id} className="leaderboard-item" onClick={() => onSelectLead(target)}>
                <div className="rank-badge">#{rank + 1}</div>
                <div className="target-info">
                  <div className="target-name">{target.name}</div>
                  <div className="target-meta">{target.industry} • ${target.revenue}M ARR</div>
                </div>
                <div className="target-valuation">
                  <div className="val-amount">${target.estimatedValuation}M</div>
                  <span className={`fit-pill fit-${target.maFit.toLowerCase()}`}>{target.maFit} Fit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
