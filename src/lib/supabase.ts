
import { createClient } from '@supabase/supabase-js';

// These will be replaced by environment variables in a production environment
// For now, we're using public keys which are safe to include in the client
const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase connection is working
export const checkSupabaseConnection = async () => {
  try {
    // Try to get a small amount of data to verify connection
    const { data, error } = await supabase
      .from('locations')
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
  id?: number;
  email: string;
  role?: string;
  created_at?: string;
  last_login?: string;
};
