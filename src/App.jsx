import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CompanyFinder } from './components/CompanyFinder';
import { SupabaseDatabaseView } from './components/SupabaseDatabaseView';
import { LoginPage } from './components/LoginPage';
import { MailContentModal } from './components/MailContentModal';
import { GroqKeyModal } from './components/GroqKeyModal';
import { LeadDetailsModal } from './components/LeadDetailsModal';
import { CapraeHandbookAnswers } from './components/CapraeHandbookAnswers';
import { getCurrentUser, signOutUser } from './services/supabaseService';
import './App.css';

export default function App() {
  // ZERO STATIC DATA: Starts empty until user enters search criteria!
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [selectedLeadForMail, setSelectedLeadForMail] = useState(null);
  const [selectedInspectLead, setSelectedInspectLead] = useState(null);
  const [isGroqModalOpen, setIsGroqModalOpen] = useState(false);

  // Check initial authenticated user
  useEffect(() => {
    getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
  }, []);

  const handleOpenMail = (lead) => {
    setSelectedLeadForMail(lead);
  };

  const handleInspectLead = (lead) => {
    setSelectedInspectLead(lead);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setIsLoginModalOpen(false);
  };

  // If user is not logged in yet, render the full-screen Login Page
  if (authChecked && !user) {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGroqModal={() => setIsGroqModalOpen(true)}
        groqKey={groqKey}
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Main Body */}
      <main className="main-content">
        {activeTab === 'search' && (
          <CompanyFinder 
            leads={leads}
            setLeads={setLeads}
            user={user}
            onViewDatabase={() => setActiveTab('database')}
            onSelectLeadForMail={handleOpenMail}
            onInspectLead={handleInspectLead}
            onImportData={() => setIsGroqModalOpen(true)}
          />
        )}

        {activeTab === 'database' && (
          <SupabaseDatabaseView 
            user={user}
            onLoadLeadsToFinder={(loadedLeads) => {
              setLeads(loadedLeads);
              setActiveTab('search');
            }}
            onBackToSearch={() => setActiveTab('search')}
          />
        )}

        {activeTab === 'handbook' && (
          <CapraeHandbookAnswers />
        )}
      </main>

      {/* Mail Content Generator Modal */}
      {selectedLeadForMail && (
        <MailContentModal 
          lead={selectedLeadForMail}
          onClose={() => setSelectedLeadForMail(null)}
          groqKey={groqKey}
          setGroqKey={setGroqKey}
        />
      )}

      {/* Inspect Lead Drawer */}
      {selectedInspectLead && (
        <LeadDetailsModal 
          lead={selectedInspectLead}
          onClose={() => setSelectedInspectLead(null)}
          onSelectPitchLead={(lead) => {
            setSelectedInspectLead(null);
            setSelectedLeadForMail(lead);
          }}
        />
      )}

      {/* Groq Key Settings Modal */}
      <GroqKeyModal 
        isOpen={isGroqModalOpen}
        onClose={() => setIsGroqModalOpen(false)}
        groqKey={groqKey}
        setGroqKey={setGroqKey}
      />

      {/* Optional Login Modal */}
      {isLoginModalOpen && (
        <LoginPage 
          isModal={true}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
}
