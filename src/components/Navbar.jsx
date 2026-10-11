import React from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  HelpCircle, 
  Key, 
  FileText,
  Database,
  LogOut,
  LogIn
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenGroqModal, 
  groqKey,
  user,
  onOpenLogin,
  onSignOut
}) => {
  return (
    <header className="saasquatch-nav">
      {/* Left Brand Logo */}
      <div className="nav-left">
        <div className="brand-box" onClick={() => setActiveTab('search')}>
          <div className="logo-sasquatch">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"></path>
              <path d="M19 11v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="8" y1="22" x2="16" y2="22"></line>
            </svg>
          </div>
          <div className="brand-name">
            <span className="brand-saasquatch">SaaSquatch</span> <span className="brand-highlight">Leads</span>
          </div>
        </div>
      </div>

      {/* Center Navigation items */}
      <nav className="nav-center">
        <button 
          className={`nav-link ${activeTab === 'search' ? 'active' : ''}`} 
          onClick={() => setActiveTab('search')}
        >
          Home
        </button>

        <button 
          className={`nav-search-pill-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>

        {/* Database Tab */}
        <button 
          className={`nav-link db-nav-btn ${activeTab === 'database' ? 'active' : ''}`}
          onClick={() => setActiveTab('database')}
          title="View stored leads database"
        >
          <Database className="key-icon" /> Database
        </button>

        <button 
          className={`nav-link groq-key-btn ${groqKey ? 'has-key' : ''}`}
          onClick={onOpenGroqModal}
          title="Configure Groq AI API Key"
        >
          <Key className="key-icon" /> {groqKey ? 'Groq Active' : 'Add Groq Key'}
        </button>
      </nav>

      {/* Right User Avatar & Profile */}
      <div className="nav-right">
        {user ? (
          <div className="nav-user-profile-group">
            <button 
              className="user-profile-pill"
              onClick={() => setActiveTab('database')}
              title={`Logged in as ${user.email}`}
            >
              <div className="user-avatar-small">
                <User size={14} />
              </div>
              <span className="user-email-text">{user.email?.split('@')[0]}</span>
            </button>
            <button 
              className="signout-icon-btn" 
              onClick={onSignOut}
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button 
            className="nav-signin-btn"
            onClick={onOpenLogin}
          >
            <LogIn size={15} /> Sign In
          </button>
        )}
      </div>
    </header>
  );
};
