import { createClient } from '@supabase/supabase-js';

// Using the values from the Supabase integration
const supabaseUrl = "https://bdqbfuyoktvpkhwcejpr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcWJmdXlva3R2cGtod2NlanByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NjIyMDcsImV4cCI6MjA2MjEzODIwN30.ADW5sMJoJqdXVcKqXhbKLPqI5GzPIxc2xWI_vOiALQo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper function to check if Supabase connection is working
export const checkSupabaseConnection = async () => {
  try {
    // Try to get a small amount of data to verify connection
    const { data, error } = await supabase
      .from('feedback')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    return { success: true, message: 'Connected to Supabase' };
  } catch (error) {
    console.error('Supabase connection error:', error);
    return { 
      success: false, 
      message: 'Unable to connect to the database. Falling back to local storage.' 
    };
  }
};

// Clean up auth state - useful to prevent authentication limbo states
export const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// TypeScript Types
export type DbLocation = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  created_at?: string;
};

export type DbArtist = {
  id: number;
  name: string;
  bio?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  instagram?: string;
  created_at?: string;
};

export type DbLocationArtist = {
  id: number;
  location_id: number;
  artist_id: number;
  created_at?: string;
};

export type DbFeedback = {
  id?: number;
  location_id: number;
  group_size: number;
  rating: number;
  comment?: string;
  name?: string;
  timestamp: string;
};

export type DbAdmin = {
  id?: string;
  email: string;
  role?: string;
  created_at?: string;
  last_login?: string;
};

// Helper function to check if a user is an admin
export const checkIsAdmin = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('is_admin', { email });
    
    if (error) throw error;
    return data || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Helper to update the last login timestamp
export const updateAdminLastLogin = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('email', email);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};
