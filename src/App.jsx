import React, { useState } from 'react';
import { initialLeads } from './data/initialLeads';
import { calculatePipelineStats } from './services/scraperEngine';
import { Navbar } from './components/Navbar';
import { LeadFinder } from './components/LeadFinder';
import { AiIntelligence } from './components/AiIntelligence';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { DataTools } from './components/DataTools';
import { CapraeHandbookAnswers } from './components/CapraeHandbookAnswers';
import { LeadDetailsModal } from './components/LeadDetailsModal';
import './App.css';

export default function App() {
  const [leads, setLeads] = useState(initialLeads);
  const [activeTab, setActiveTab] = useState('finder');
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedPitchLead, setSelectedPitchLead] = useState(null);

  const stats = calculatePipelineStats(leads);

  const handleOpenPitchLead = (lead) => {
    setSelectedPitchLead(lead);
    setActiveTab('ai');
  };

  return (
    <div className="app-main-wrapper">
      {/* Top Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        stats={stats}
        leadCount={leads.length}
      />

      {/* Main View Switcher */}
      <main className="main-content-body">
        {activeTab === 'finder' && (
          <LeadFinder 
            leads={leads}
            setLeads={setLeads}
            onSelectLead={setSelectedLead}
            onViewHandbook={() => setActiveTab('handbook')}
          />
        )}

        {activeTab === 'ai' && (
          <AiIntelligence 
            leads={leads}
            selectedPitchLead={selectedPitchLead}
            onSelectLead={setSelectedLead}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            leads={leads}
            onSelectLead={setSelectedLead}
          />
        )}

        {activeTab === 'datatools' && (
          <DataTools 
            leads={leads}
            setLeads={setLeads}
          />
        )}

        {activeTab === 'handbook' && (
          <CapraeHandbookAnswers />
        )}
      </main>

      {/* Lead Intelligence Modal Drawer */}
      <LeadDetailsModal 
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSelectPitchLead={handleOpenPitchLead}
      />
    </div>
  );
}
