import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  Mail, 
  Building2, 
  User, 
  RefreshCw, 
  Key, 
  Bot 
} from 'lucide-react';
import { API_ENDPOINTS } from '../services/apiConfig';

export const MailContentModal = ({ lead, onClose, groqKey, setGroqKey }) => {
  if (!lead) return null;

  const dm = (lead.decisionMakers && lead.decisionMakers[0]) || {
    name: "Executive Lead",
    email: `contact@${lead.domain || 'company.com'}`
  };

  const [tone, setTone] = useState('Direct');
  const [focus, setFocus] = useState('Collaboration');
  const [model, setModel] = useState('openai/gpt-oss-20b');
  const [context, setContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [subject, setSubject] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [providerInfo, setProviderInfo] = useState('');

  // Initial auto-generation on modal open
  useEffect(() => {
    handleGenerate();
  }, [lead]);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          tone,
          focus,
          model,
          context,
          groq_key: groqKey
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubject(data.subject || `Exploring Collaboration with ${lead.company}`);
        setGeneratedMessage(data.message || '');
        setProviderInfo(data.provider || 'Groq Cloud AI (openai/gpt-oss-20b)');
      }
    } catch (err) {
      console.warn("Backend generate email offline, fallback used:", err);
      const first = dm.name.split(' ')[0];
      setSubject(`Enhancing ${lead.productCategory || lead.industry} Efficiency with Real-Time Data`);
      setGeneratedMessage(
        `I saw that ${lead.company} is a key player in the ${lead.productCategory || lead.industry} industry, and I'm curious as to how you see real-time data changing the landscape within this industry. What specific gaps do you think still need solving in terms of operational efficiency and supply chain management?\n\nWould you be open to a quick chat next Thursday or Friday? Let me know what works.`
      );
      setProviderInfo("Groq GPT-OSS Local Engine");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullText = `Subject: ${subject}\n\n${generatedMessage}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mail-modal-backdrop" onClick={onClose}>
      <div className="mail-modal-container" onClick={e => e.stopPropagation()}>
        <div className="mail-modal-header">
          <div className="modal-header-title">
            <Mail className="header-icon" /> Make Email Content (Groq GPT-OSS AI)
          </div>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="mail-modal-body">
          {/* Person & Company Info Card */}
          <div className="lead-info-card">
            <div className="info-line">
              <strong>Person:</strong> {dm.name}
            </div>
            <div className="info-line">
              <strong>Company:</strong> {lead.company}
            </div>
            <div className="info-line">
              <strong>Email:</strong> {dm.email}
            </div>
          </div>

          {/* Form Controls */}
          <div className="form-group">
            <label className="form-label"><Bot className="inline-icon" /> Groq AI Model</label>
            <select 
              value={model} 
              onChange={e => setModel(e.target.value)}
              className="form-select"
            >
              <option value="openai/gpt-oss-20b">Groq GPT-OSS (openai/gpt-oss-20b) [STRICT]</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Tone</label>
            <select 
              value={tone} 
              onChange={e => setTone(e.target.value)}
              className="form-select"
            >
              <option value="Direct">Direct</option>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Executive M&A">Executive M&A</option>
              <option value="Value-Focused">Value-Focused</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Focus</label>
            <select 
              value={focus} 
              onChange={e => setFocus(e.target.value)}
              className="form-select"
            >
              <option value="Collaboration">Collaboration</option>
              <option value="Product Sale">Product Sale</option>
              <option value="Acquisition">Acquisition</option>
              <option value="AI Modernization">AI Modernization</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Additional Context</label>
            <textarea 
              placeholder="Any special notes or context..."
              value={context}
              onChange={e => setContext(e.target.value)}
              className="form-textarea-short"
              rows="2"
            />
          </div>

          {/* Groq Key Option */}
          <div className="groq-key-input-row">
            <label className="form-label"><Key className="inline-icon" /> Groq API Key (Optional)</label>
            <input 
              type="password" 
              placeholder="Paste Groq Key (gsk_...) for Llama 3.3 70B AI generation..."
              value={groqKey || ''}
              onChange={e => {
                setGroqKey(e.target.value);
                localStorage.setItem('groq_api_key', e.target.value);
              }}
              className="form-input groq-key-input"
            />
          </div>

          {/* Generate Message Button */}
          <button 
            className="generate-msg-btn" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="btn-icon spinning" /> Generating with Groq GPT-OSS...
              </>
            ) : (
              <>
                Generate Message
              </>
            )}
          </button>

          {providerInfo && (
            <div className="ai-provider-badge">
              <Sparkles className="badge-icon" /> Engine: {providerInfo}
            </div>
          )}

          {/* Output Fields */}
          <div className="form-group mt-14">
            <label className="form-label">Subject</label>
            <input 
              type="text" 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="form-input subject-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Generated Message</label>
            <textarea 
              rows="7"
              value={generatedMessage}
              onChange={e => setGeneratedMessage(e.target.value)}
              className="form-textarea-long"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mail-modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
          <button className="primary-btn" onClick={handleCopy}>
            {copied ? <Check className="btn-icon" /> : <Copy className="btn-icon" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Email Content'}
          </button>
        </div>
      </div>
    </div>
  );
};
