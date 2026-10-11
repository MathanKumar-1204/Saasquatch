import React, { useState } from 'react';
import { Key, X, Check, ShieldCheck } from 'lucide-react';

export const GroqKeyModal = ({ isOpen, onClose, groqKey, setGroqKey }) => {
  const [tempKey, setTempKey] = useState(groqKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setGroqKey(tempKey.trim());
    localStorage.setItem('groq_api_key', tempKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="groq-modal-backdrop" onClick={onClose}>
      <div className="groq-modal-card" onClick={e => e.stopPropagation()}>
        <div className="groq-modal-header">
          <div className="groq-title">
            <Key className="icon" /> Groq AI API Key Configuration
          </div>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="groq-modal-body">
          <p className="groq-desc">
            Add your Groq Cloud API key (`gsk_...`) to power instant Llama 3.3 70B cold outreach email generation directly in SaaSquatch Leads.
          </p>

          <div className="form-group">
            <label className="form-label">Groq API Key</label>
            <input 
              type="password" 
              placeholder="gsk_..." 
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              className="groq-key-input"
            />
          </div>

          <div className="groq-info-box">
            <ShieldCheck className="info-icon" />
            <span>Your Groq key is stored securely in local browser memory and never shared.</span>
          </div>
        </div>

        <div className="groq-modal-footer">
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={handleSave}>
            {saved ? <Check className="btn-icon" /> : <Key className="btn-icon" />}
            {saved ? 'Key Saved Successfully!' : 'Save Groq Key'}
          </button>
        </div>
      </div>
    </div>
  );
};
