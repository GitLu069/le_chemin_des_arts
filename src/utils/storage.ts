
import { supabase } from '@/integrations/supabase/client';

// Type definition for feedback entries
export type FeedbackEntry = {
  locationId: number;
  groupSize: number;
  rating: number;
  comment: string;
  name: string;
  timestamp: string;
};

// Flag to enable/disable Supabase usage
// Using import.meta.env instead of process.env for Vite compatibility
const supabaseEnabled = import.meta.env.VITE_SUPABASE_ENABLED === 'true';

// Function to save feedback to local storage
export const saveFeedbackLocally = (feedback: FeedbackEntry): void => {
  const key = `feedback_${feedback.locationId}`;
  let existingFeedback = localStorage.getItem(key);
  let feedbackArray: FeedbackEntry[] = existingFeedback ? JSON.parse(existingFeedback) : [];
  feedbackArray.push(feedback);
  localStorage.setItem(key, JSON.stringify(feedbackArray));
};

// Async function to save feedback to Supabase
export const saveFeedbackToSupabase = async (feedback: Omit<FeedbackEntry, 'locationId'> & { location_id: number }): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error saving feedback to Supabase:", error);
    throw error; // Re-throw to be caught by the caller
  }
};

// Unified function to save feedback, using Supabase if enabled
export const saveFeedback = async (feedback: FeedbackEntry): Promise<void> => {
  if (supabaseEnabled) {
    try {
      // Transform locationId to location_id for Supabase
      await saveFeedbackToSupabase({ 
        location_id: feedback.locationId, 
        groupSize: feedback.groupSize, 
        rating: feedback.rating, 
        comment: feedback.comment, 
        name: feedback.name,
        timestamp: feedback.timestamp
      });
      return;
    } catch (supabaseError) {
      console.error("Failed to save to Supabase, falling back to local storage:", supabaseError);
      // If Supabase fails, fall back to local storage
      saveFeedbackLocally(feedback);
    }
  } else {
    // If Supabase is disabled, save to local storage
    saveFeedbackLocally(feedback);
  }
};

// Function to get all feedback from local storage
export const getAllFeedback = async (): Promise<FeedbackEntry[]> => {
  let allFeedback: FeedbackEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('feedback_')) {
      const feedback = localStorage.getItem(key);
      if (feedback) {
        try {
          const parsedFeedback: FeedbackEntry[] = JSON.parse(feedback);
          allFeedback = allFeedback.concat(parsedFeedback);
        } catch (e) {
          console.error(`Failed to parse feedback from local storage key ${key}`, e);
        }
      }
    }
  }
  return allFeedback;
};

// Function to get feedback by location from local storage
export const getFeedbackByLocation = async (locationId: number): Promise<FeedbackEntry[]> => {
  try {
    // Try to get from Supabase first
    if (supabaseEnabled) {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('location_id', locationId);
      
      if (error) throw error;
      
      // Map Supabase data to our FeedbackEntry type
      return data.map((item: any) => ({
        locationId: item.location_id,
        groupSize: item.group_size,
        rating: item.rating,
        comment: item.comment || '',
        name: item.name || '',
        timestamp: item.timestamp
      }));
    }
  } catch (error) {
    console.error('Error getting feedback from Supabase:', error);
  }
  
  // Fallback to localStorage
  const feedback = await getAllFeedback();
  return feedback.filter(entry => entry.locationId === locationId);
};

// Function to calculate average rating and total visitors
export const getFeedbackStats = async () => {
  try {
    // Try to get from Supabase first
    if (supabaseEnabled) {
      const { data: statsData, error: statsError } = await supabase.rpc('get_feedback_stats');
      
      if (statsError) {
        throw statsError;
      }
      
      return statsData;
    }
  } catch (error) {
    console.error('Error getting feedback stats from Supabase:', error);
  }
  
  // Fallback to localStorage
  const allFeedback = await getAllFeedback();
  
  // Group feedback by locationId
  const groupedFeedback: { [locationId: number]: FeedbackEntry[] } = allFeedback.reduce((acc: { [locationId: number]: FeedbackEntry[] }, feedback) => {
    if (!acc[feedback.locationId]) {
      acc[feedback.locationId] = [];
    }
    acc[feedback.locationId].push(feedback);
    return acc;
  }, {});
  
  // Calculate stats for each location
  const stats = Object.entries(groupedFeedback).map(([locationId, feedbackArray]) => {
    const totalFeedbacks = feedbackArray.length;
    const totalRating = feedbackArray.reduce((sum, feedback) => sum + feedback.rating, 0);
    const avgRating = totalFeedbacks > 0 ? totalRating / totalFeedbacks : 0;
    const totalVisitors = feedbackArray.reduce((sum, feedback) => sum + feedback.groupSize, 0);
    
    // Calculate group size distribution
    const groupSizeDistribution: { [groupSize: number]: number } = feedbackArray.reduce((acc: { [groupSize: number]: number }, feedback) => {
      const groupSize = feedback.groupSize;
      acc[groupSize] = (acc[groupSize] || 0) + 1;
      return acc;
    }, {});
    
    return {
      locationId: parseInt(locationId),
      totalFeedbacks,
      avgRating,
      totalVisitors,
      groupSizeDistribution,
    };
  });
  
  return stats;
};

// Function to download data as CSV
export const downloadCSV = async () => {
  const stats = await getFeedbackStats();
  
  if (!stats || stats.length === 0) {
    console.warn("No stats available to download.");
    return;
  }
  
  // CSV header
  const header = "Location ID,Total Feedbacks,Average Rating,Total Visitors,Group Size Distribution\n";
  
  // CSV rows
  const rows = stats.map(stat => {
    const groupSizeDistribution = Object.entries(stat.groupSizeDistribution)
      .map(([size, count]) => `${size}:${count}`)
      .join(';');
    
    return `${stat.locationId},${stat.totalFeedbacks},${stat.avgRating},${stat.totalVisitors},"${groupSizeDistribution}"`;
  }).join('\n');
  
  // Combine header and rows
  const csvContent = header + rows;
  
  // Create a download link
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  // Create a link element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = 'feedback_stats.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Revoke the URL
  URL.revokeObjectURL(url);
};
