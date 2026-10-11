import React, { useState } from 'react';
import { 
  Search, 
  Database, 
  Upload, 
  Globe, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Phone, 
  Eye, 
  Edit3, 
  Copy, 
  Star, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Layers 
} from 'lucide-react';

import { saveUserSearch } from '../services/supabaseService';
import { API_ENDPOINTS } from '../services/apiConfig';

export const CompanyFinder = ({ 
  leads, 
  setLeads, 
  user,
  onViewDatabase,
  onSelectLeadForMail, 
  onInspectLead, 
  onImportData 
}) => {
  const [industryInput, setIndustryInput] = useState('');
  const [productInput, setProductInput] = useState('');
  const [showPopularDropdown, setShowPopularDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStatusLog, setSearchStatusLog] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const popularIndustries = [
    "Software Development",
    "Healthcare",
    "Financial Services",
    "Manufacturing",
    "E-Commerce & Retail",
    "Cybersecurity & IT",
    "Logistics & Supply Chain"
  ];

  const handleSelectPopular = (ind) => {
    setIndustryInput(ind);
    setShowPopularDropdown(false);
  };

  const handleSearchCompanies = async (e) => {
    if (e) e.preventDefault();
    const ind = industryInput.trim() || 'Software Development';
    const prod = productInput.trim();

    setIsSearching(true);
    setSearchStatusLog(`Searching live web and backend scraper for ${ind} companies...`);

    try {
      const response = await fetch(API_ENDPOINTS.SEARCH_LEADS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: ind, product: prod })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.leads && data.leads.length > 0) {
          setLeads(data.leads);

          // Silently auto-save to Supabase for the current authenticated user
          if (user) {
            saveUserSearch({
              user,
              industry: ind,
              product: prod,
              leads: data.leads
            });
          }
        }
      }
    } catch (err) {
      console.warn("Backend search API error:", err);
    } finally {
      setIsSearching(false);
      setSearchStatusLog('');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleStarLead = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, starred: !l.starred } : l));
  };

  const handleCopyLead = (lead) => {
    const summary = `${lead.company} | ${lead.industry} | ${lead.links?.website || ''} | ${lead.location || ''} | ${lead.decisionMakers?.[0]?.email || ''}`;
    navigator.clipboard.writeText(summary);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="company-finder-wrapper">
      {/* Header */}
      <div className="finder-header-row">
        <div>
          <h1 className="finder-title">Company Finder</h1>
          <p className="finder-subtitle">Find companies by industry and product target</p>
        </div>
        <div className="header-actions">
          <button className="estimate-rev-btn">
            <Sparkles className="btn-icon" /> Estimate Revenues
          </button>
        </div>
      </div>

      {/* Search Criteria Card */}
      <div className="search-criteria-card">
        <div className="card-top-header">
          <div>
            <h2 className="card-title">Search Criteria</h2>
            <p className="card-desc">Enter industry and product to find high-intent leads</p>
          </div>
          <button className="import-data-btn" onClick={onImportData}>
            <Upload className="btn-icon" /> Import Data
          </button>
        </div>

        <form onSubmit={handleSearchCompanies} className="search-inputs-grid">
          <div className="input-field-group">
            <label className="field-label">Industry</label>
            <div className="relative-container">
              <input 
                type="text"
                placeholder="Enter industry (e.g. Software, Healthcare)"
                value={industryInput}
                onChange={e => setIndustryInput(e.target.value)}
                onFocus={() => setShowPopularDropdown(true)}
                className="criteria-input"
              />
              {showPopularDropdown && (
                <div className="popular-dropdown-menu">
                  <div className="dropdown-heading">Popular Industries</div>
                  {popularIndustries.map((ind, i) => (
                    <div 
                      key={i} 
                      className="dropdown-item"
                      onMouseDown={() => handleSelectPopular(ind)}
                    >
                      {ind}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="input-field-group">
            <label className="field-label">Product</label>
            <input 
              type="text"
              placeholder="Enter product about to got leads for (e.g. AI Automation, Packaging)"
              value={productInput}
              onChange={e => setProductInput(e.target.value)}
              className="criteria-input"
            />
          </div>

          <div className="form-buttons-row">
            <button type="submit" disabled={isSearching} className="find-companies-btn">
              {isSearching ? (
                <>
                  <RefreshCw className="btn-icon spinning" /> Finding Leads...
                </>
              ) : (
                <>
                  <Database className="btn-icon" /> Find Companies
                </>
              )}
            </button>
            <button type="button" className="cancel-btn" onClick={() => { setIndustryInput(''); setProductInput(''); }}>
              Cancel
            </button>
          </div>
        </form>

        {isSearching && (
          <div className="search-progress-bar">
            <RefreshCw className="spinning progress-icon" />
            <span>{searchStatusLog}</span>
          </div>
        )}
      </div>

      {/* Companies Results Table Section */}
      <div className="companies-table-section">
        <div className="section-header">
          <h2 className="section-title">Companies</h2>
          <span className="lead-count-pill">{leads.length} Companies Found</span>
        </div>

        <div className="table-responsive-box">
          <table className="saasquatch-table">
            <thead>
              <tr>
                <th className="th-check">
                  <input 
                    type="checkbox" 
                    checked={leads.length > 0 && selectedIds.length === leads.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Company</th>
                <th>Actions</th>
                <th>Industry</th>
                <th>Links</th>
                <th>Location</th>
                <th>Product/Service Category</th>
                <th>Business Type (B2B, B2B2C)</th>
                <th className="th-right-end">Make Mail</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const hasLinkedin = Boolean(lead.links?.linkedin && lead.links.linkedin.trim() !== "");
                return (
                  <tr key={lead.id} className={selectedIds.includes(lead.id) ? 'row-selected' : ''}>
                    {/* Checkbox */}
                    <td className="td-check">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(lead.id)}
                        onChange={() => toggleSelectLead(lead.id)}
                      />
                    </td>

                    {/* Company Name */}
                    <td className="td-company-name" onClick={() => onInspectLead(lead)}>
                      <div className="company-title">{lead.company}</div>
                    </td>

                    {/* Action Icons */}
                    <td className="td-actions-icons">
                      <button className="icon-action-btn" onClick={() => onInspectLead(lead)} title="View Company Intelligence">
                        <Eye className="icon" />
                      </button>
                      <button className="icon-action-btn" title="Edit Lead Record">
                        <Edit3 className="icon" />
                      </button>
                      <button className="icon-action-btn" onClick={() => handleCopyLead(lead)} title="Copy Details">
                        {copiedId === lead.id ? <Check className="icon check-color" /> : <Copy className="icon" />}
                      </button>
                      <button className={`icon-action-btn ${lead.starred ? 'starred' : ''}`} onClick={() => toggleStarLead(lead.id)} title="Star Lead">
                        <Star className="icon" />
                      </button>
                    </td>

                    {/* Industry Tag */}
                    <td className="td-industry">
                      <div className="industry-text">{lead.industry}</div>
                    </td>

                    {/* Links (Globe, LinkedIn - ONLY if available!, Email, MapPin) */}
                    <td className="td-links-icons">
                      <div className="links-flex">
                        {lead.links?.website && (
                          <a href={lead.links.website} target="_blank" rel="noreferrer" className="link-icon-btn globe" title="Website Link">
                            <Globe className="link-svg" />
                          </a>
                        )}
                        {hasLinkedin && (
                          <a href={lead.links.linkedin} target="_blank" rel="noreferrer" className="link-icon-btn linkedin" title="LinkedIn Profile">
                            <ExternalLink className="link-svg" />
                          </a>
                        )}
                        {lead.links?.email && (
                          <a href={`mailto:${lead.links.email}`} className="link-icon-btn email" title={`Email: ${lead.links.email}`}>
                            <Mail className="link-svg" />
                          </a>
                        )}
                        {lead.links?.location && (
                          <span className="link-icon-btn location" title={`Location: ${lead.links.location}`}>
                            <MapPin className="link-svg" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Dedicated Location Column */}
                    <td className="td-location-col">
                      <div className="location-text">
                        <MapPin className="inline-loc-pin" /> {lead.location || lead.links?.location || 'HQ Location Available'}
                      </div>
                    </td>

                    {/* Product/Service Category */}
                    <td className="td-product-cat">
                      <div className="cat-text">{lead.productCategory || 'Technology, Services'}</div>
                    </td>

                    {/* Business Type */}
                    <td className="td-business-type">
                      <span className="type-pill">{lead.businessType || 'B2B'}</span>
                    </td>

                    {/* Make Mail Button */}
                    <td className="td-make-mail-end">
                      <button className="make-mail-row-btn" onClick={() => onSelectLeadForMail(lead)}>
                        <Mail className="btn-svg" /> Make Mail
                      </button>
                    </td>
                  </tr>
                );
              })}

              {leads.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-td">
                    No leads loaded. Enter Industry and Product above, then click "Find Companies" to execute search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
