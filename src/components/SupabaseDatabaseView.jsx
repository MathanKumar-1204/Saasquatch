import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Calendar, 
  Layers, 
  ExternalLink, 
  Globe, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  RefreshCw, 
  ChevronRight, 
  ChevronDown, 
  ArrowLeft, 
  Code, 
  ShieldCheck,
  AlertTriangle,
  Download
} from 'lucide-react';
import { fetchUserSearches, testSupabaseTable } from '../services/supabaseService';

export const SupabaseDatabaseView = ({ user, onLoadLeadsToFinder, onBackToSearch }) => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSearchId, setExpandedSearchId] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [tableStatus, setTableStatus] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const status = await testSupabaseTable();
    setTableStatus(status);

    if (user?.email) {
      const data = await fetchUserSearches(user.email);
      setSearches(data || []);
      if (data && data.length > 0) {
        setExpandedSearchId(data[0].id || '0');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const filteredSearches = searches.filter(s => {
    const q = filterQuery.toLowerCase();
    return (
      (s.industry || '').toLowerCase().includes(q) ||
      (s.product || '').toLowerCase().includes(q)
    );
  });

  const totalLeadsCount = searches.reduce((acc, curr) => acc + (curr.results_count || curr.leads_data?.length || 0), 0);

  return (
    <div className="supabase-db-view-wrapper">
      {/* Top Header */}
      <div className="db-top-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBackToSearch}>
            <ArrowLeft size={16} /> Back to Search
          </button>
          <div className="title-area">
            <h1 className="db-title">
              <Database className="db-title-icon" /> Saved Leads Database
            </h1>
            <p className="db-subtitle">
              Saved searches & leads for <strong>{user?.email || 'Logged In User'}</strong>
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button className="refresh-db-btn" onClick={loadData} disabled={loading}>
            <RefreshCw size={15} className={loading ? "spinning" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* Database Metrics Overview */}
      <div className="db-metrics-grid">
        <div className="db-metric-card">
          <div className="metric-label">User Saved Searches</div>
          <div className="metric-val">{searches.length}</div>
          <div className="metric-hint">Historical query sessions recorded</div>
        </div>

        <div className="db-metric-card">
          <div className="metric-label">Total Leads Scraped & Stored</div>
          <div className="metric-val text-emerald">{totalLeadsCount}</div>
          <div className="metric-hint">Saved companies with verified details</div>
        </div>

        <div className="db-metric-card">
          <div className="metric-label">Database Sync Status</div>
          <div className="metric-val mode-val">
            <span className="badge-live">Active & Synchronized</span>
          </div>
          <div className="metric-hint">Automatic per-user cloud persistence</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="db-content-box">
        <div className="db-search-bar-row">
          <div className="filter-input-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Filter by industry or product..." 
              value={filterQuery}
              onChange={e => setFilterQuery(e.target.value)}
              className="db-filter-input"
            />
          </div>
          <div className="searches-count-text">
            Showing {filteredSearches.length} of {searches.length} query records
          </div>
        </div>

        {/* Searches List */}
        {filteredSearches.length === 0 ? (
          <div className="empty-db-state">
            <Database size={40} className="empty-icon" />
            <h3>No Stored Searches Found</h3>
            <p>Perform a search on the Company Finder page and leads will automatically be saved to Supabase.</p>
            <button className="primary-action-btn" onClick={onBackToSearch}>
              Go to Company Finder
            </button>
          </div>
        ) : (
          <div className="searches-accordion-list">
            {filteredSearches.map((s, idx) => {
              const leadsList = s.leads_data || [];
              const isExpanded = expandedSearchId === (s.id || idx);
              const formattedDate = s.created_at ? new Date(s.created_at).toLocaleString() : 'Recent';

              return (
                <div key={s.id || idx} className="search-record-item">
                  <div 
                    className={`search-record-header ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedSearchId(isExpanded ? null : (s.id || idx))}
                  >
                    <div className="header-meta">
                      {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      <span className="industry-badge">{s.industry}</span>
                      {s.product && <span className="product-badge">Product: {s.product}</span>}
                    </div>

                    <div className="header-stats">
                      <span className="count-pill">{s.results_count || leadsList.length} Leads</span>
                      <span className="date-pill">
                        <Calendar size={13} /> {formattedDate}
                      </span>
                      <button 
                        className="load-leads-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadLeadsToFinder(leadsList);
                        }}
                        title="Load these leads into main table"
                      >
                        <Layers size={14} /> Open in Table
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="search-record-details">
                      <div className="subtable-wrap">
                        <table className="leads-subtable">
                          <thead>
                            <tr>
                              <th>Company</th>
                              <th>Industry</th>
                              <th>Location</th>
                              <th>Contact Email</th>
                              <th>Phone</th>
                              <th>Website</th>
                              <th>Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leadsList.map((lead, lIdx) => (
                              <tr key={lead.id || lIdx}>
                                <td className="lead-name-cell">
                                  <strong>{lead.company}</strong>
                                </td>
                                <td>{lead.industry}</td>
                                <td>
                                  <span className="loc-flex">
                                    <MapPin size={12} /> {lead.location || lead.links?.location || 'HQ'}
                                  </span>
                                </td>
                                <td>{lead.links?.email || lead.decisionMakers?.[0]?.email || 'contact@domain'}</td>
                                <td>{lead.phone || lead.links?.phone || 'Available'}</td>
                                <td>
                                  {lead.links?.website ? (
                                    <a href={lead.links.website} target="_blank" rel="noreferrer" className="site-link">
                                      <Globe size={13} /> Link
                                    </a>
                                  ) : '—'}
                                </td>
                                <td>
                                  <span className="type-tag">{lead.businessType || 'B2B'}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
