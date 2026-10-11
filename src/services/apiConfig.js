// Centralized Backend API Configuration
export const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'https://saasback.vercel.app').replace(/\/+$/, '');

export const API_ENDPOINTS = {
  HEALTH: `${BACKEND_URL}/api/health`,
  SEARCH_LEADS: `${BACKEND_URL}/api/search_leads`,
  GENERATE_EMAIL: `${BACKEND_URL}/api/generate_email`
};
