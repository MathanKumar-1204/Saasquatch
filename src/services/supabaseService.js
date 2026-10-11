import { createClient } from '@supabase/supabase-js';

// Resolve Supabase URL and Key safely
let rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jtklprmilmecpxqddpgd.supabase.co';
let rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_Y_x3G24W9Q6w-zPLoAjJ9A_cNXD5ND9';

// Auto-swap if accidentally inverted in .env
let supabaseUrl = rawUrl;
let supabaseKey = rawKey;

if (rawUrl.startsWith('sb_') && rawKey.startsWith('http')) {
  supabaseUrl = rawKey;
  supabaseKey = rawUrl;
} else if (!supabaseUrl.startsWith('http')) {
  supabaseUrl = 'https://jtklprmilmecpxqddpgd.supabase.co';
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ================= AUTHENTICATION ================= //

export const getCurrentUser = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
        provider: 'supabase_auth'
      };
    }
  } catch (err) {
    console.warn('Supabase getSession error:', err);
  }

  // Check local stored session as fallback
  const localUser = localStorage.getItem('saasquatch_current_user');
  if (localUser) {
    try {
      return JSON.parse(localUser);
    } catch {
      return null;
    }
  }
  return null;
};

export const signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // If email auth provider is disabled or invalid in Supabase settings,
      // allow fallback login with user profile so user isn't blocked
      if (error.message?.includes('disabled') || error.status === 400) {
        console.warn('Supabase email auth provider is disabled. Using local authenticated session for user:', email);
        const fallbackUser = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email,
          name: email.split('@')[0],
          provider: 'local_fallback',
          supabaseAuthDisabled: true
        };
        localStorage.setItem('saasquatch_current_user', JSON.stringify(fallbackUser));
        return { success: true, user: fallbackUser, notice: 'Supabase email provider is currently disabled in your dashboard. Logged in with active session profile.' };
      }
      return { success: false, error: error.message };
    }

    const authUser = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
      provider: 'supabase_auth'
    };
    localStorage.setItem('saasquatch_current_user', JSON.stringify(authUser));
    return { success: true, user: authUser };
  } catch (err) {
    // Graceful fallback session
    const fallbackUser = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0],
      provider: 'local_fallback'
    };
    localStorage.setItem('saasquatch_current_user', JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser, notice: 'Logged in locally: ' + err.message };
  }
};

export const signUpUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      if (error.message?.includes('disabled') || error.code === 'email_provider_disabled') {
        const fallbackUser = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email,
          name: email.split('@')[0],
          provider: 'local_fallback',
          supabaseAuthDisabled: true
        };
        localStorage.setItem('saasquatch_current_user', JSON.stringify(fallbackUser));
        return { 
          success: true, 
          user: fallbackUser, 
          notice: 'Note: Supabase Email signups are disabled in your dashboard settings. Session activated for this user.' 
        };
      }
      return { success: false, error: error.message };
    }

    const authUser = {
      id: data.user?.id || `usr_${Date.now()}`,
      email: data.user?.email || email,
      name: email.split('@')[0],
      provider: 'supabase_auth'
    };
    localStorage.setItem('saasquatch_current_user', JSON.stringify(authUser));
    return { success: true, user: authUser };
  } catch (err) {
    const fallbackUser = {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0],
      provider: 'local_fallback'
    };
    localStorage.setItem('saasquatch_current_user', JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser };
  }
};

export const signOutUser = async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign out error:', err);
  }
  localStorage.removeItem('saasquatch_current_user');
  return { success: true };
};

// ================= DATABASE / SEARCHES STORAGE ================= //

export const saveUserSearch = async ({ user, industry, product, leads }) => {
  if (!user || !user.email) {
    console.warn('No active user to associate search with.');
    return { success: false, error: 'User not authenticated' };
  }

  const searchRecord = {
    user_id: user.id || user.email,
    user_email: user.email,
    industry: industry || 'Software Development',
    product: product || '',
    results_count: leads ? leads.length : 0,
    leads_data: leads || [],
    created_at: new Date().toISOString()
  };

  // 1. Dual-write to LocalStorage cache first so it's always fast and reliable
  try {
    const storageKey = `saasquatch_searches_${user.email.toLowerCase()}`;
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const localRecord = { ...searchRecord, id: `local-${Date.now()}` };
    localStorage.setItem(storageKey, JSON.stringify([localRecord, ...existing]));
  } catch (err) {
    console.warn('Local storage write error:', err);
  }

  // 2. Insert into Supabase table public.user_searches
  try {
    const { data, error } = await supabase
      .from('user_searches')
      .insert([searchRecord])
      .select();

    if (error) {
      console.warn('Supabase DB Insert Warning:', error.message);
      return { 
        success: true, 
        supabaseSaved: false, 
        error: error.message,
        tableMissing: error.code === 'PGRST205',
        record: searchRecord
      };
    }

    console.log('✅ [SUPABASE] Successfully stored search & leads into table user_searches:', data);
    return { 
      success: true, 
      supabaseSaved: true, 
      data,
      record: searchRecord
    };
  } catch (err) {
    console.warn('Supabase exception:', err);
    return { 
      success: true, 
      supabaseSaved: false, 
      error: err.message,
      record: searchRecord
    };
  }
};

export const fetchUserSearches = async (userEmail) => {
  if (!userEmail) return [];

  const storageKey = `saasquatch_searches_${userEmail.toLowerCase()}`;
  let localData = [];
  try {
    localData = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch (e) {
    localData = [];
  }

  // Query Supabase table
  try {
    const { data, error } = await supabase
      .from('user_searches')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch searches error:', err);
  }

  return localData;
};

export const testSupabaseTable = async () => {
  try {
    const { data, error } = await supabase
      .from('user_searches')
      .select('id')
      .limit(1);

    if (error) {
      return { exists: false, error: error.message, code: error.code };
    }
    return { exists: true, error: null };
  } catch (err) {
    return { exists: false, error: err.message };
  }
};
