
import { supabase } from '@/lib/supabase';

// Type definition for feedback entries
export type FeedbackEntry = {
  locationId: number;
  groupSize: number;
  rating: number;
  comment: string;
  name: string;
  timestamp: string;
};

// Flag to enable Supabase usage
const supabaseEnabled = true;

// Function to save feedback to local storage
export const saveFeedbackLocally = (feedback: FeedbackEntry): void => {
  const key = `feedback_${feedback.locationId}`;
  let existingFeedback = localStorage.getItem(key);
  let feedbackArray: FeedbackEntry[] = existingFeedback ? JSON.parse(existingFeedback) : [];
  feedbackArray.push(feedback);
  localStorage.setItem(key, JSON.stringify(feedbackArray));
};

// Async function to save feedback to Supabase
export const saveFeedbackToSupabase = async (feedback: {
  location_id: number;
  group_size: number;
  rating: number;
  comment: string;
  name: string;
  timestamp: string;
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('feedback')
      .insert([feedback]) as { error: any };
    
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
      // Transform FeedbackEntry to Supabase format
      await saveFeedbackToSupabase({ 
        location_id: feedback.locationId, 
        group_size: feedback.groupSize, 
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

// Function to get feedback by location
export const getFeedbackByLocation = async (locationId: number): Promise<FeedbackEntry[]> => {
  try {
    // Try to get from Supabase first if enabled
    if (supabaseEnabled) {
      console.log(`Fetching feedback for location ${locationId} from Supabase`);
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('location_id', locationId) as { data: any[], error: any };
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log(`Received ${data?.length || 0} feedbacks from Supabase`);
      
      if (data && data.length > 0) {
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
    }
  } catch (error) {
    console.error('Error getting feedback from Supabase:', error);
  }
  
  console.log('Falling back to localStorage');
  // Fallback to localStorage or if no data was found in Supabase
  const feedback = await getAllFeedback();
  return feedback.filter(entry => entry.locationId === locationId);
};

// Function to calculate statistics for feedback data
export const getFeedbackStats = async () => {
  try {
    // Try to get from Supabase first if enabled
    if (supabaseEnabled) {
      console.log('Fetching feedback stats from Supabase RPC');
      const { data, error } = await supabase.rpc('get_feedback_stats') as { data: any[], error: any };
      
      if (error) {
        console.error('Error from Supabase RPC:', error);
        throw error;
      }
      
      console.log(`Received stats for ${data?.length || 0} locations from Supabase RPC`);
      
      if (data && data.length > 0) {
        // Transform data to match our expected format
        return data.map((item: any) => ({
          locationId: item.location_id,
          totalFeedbacks: item.total_feedbacks,
          avgRating: item.avg_rating,
          totalVisitors: item.total_visitors,
          groupSizeDistribution: item.group_size_distribution
        }));
      }
      
      // If no data from RPC, try direct query
      console.log('No data from RPC, trying direct query');
      const { data: feedbackData, error: feedbackError } = await supabase
        .from('feedback')
        .select('*') as { data: any[], error: any };
        
      if (feedbackError) {
        console.error('Error from direct query:', feedbackError);
        throw feedbackError;
      }
      
      console.log(`Received ${feedbackData?.length || 0} feedbacks from direct query`);
      
      if (feedbackData && feedbackData.length > 0) {
        // Get all locations
        const { data: locationsData } = await supabase
          .from('locations')
          .select('id, name, description') as { data: any[] };
          
        console.log(`Received ${locationsData?.length || 0} locations`);
        
        // Group by location
        const groupedByLocation: Record<number, any[]> = {};
        feedbackData.forEach((item: any) => {
          const locationId = item.location_id;
          if (!groupedByLocation[locationId]) {
            groupedByLocation[locationId] = [];
          }
          groupedByLocation[locationId].push(item);
        });
        
        console.log(`Found feedback for ${Object.keys(groupedByLocation).length} locations`);
        
        // Calculate stats for each location
        return Object.entries(groupedByLocation).map(([locationId, feedbacks]) => {
          const location = locationsData?.find((loc: any) => loc.id === parseInt(locationId));
          
          const totalFeedbacks = feedbacks.length;
          const totalRating = feedbacks.reduce((sum: number, item: any) => sum + item.rating, 0);
          const avgRating = totalRating / totalFeedbacks;
          const totalVisitors = feedbacks.reduce((sum: number, item: any) => sum + item.group_size, 0);
          
          // Group size distribution
          const groupSizeDistribution: Record<number, number> = {};
          feedbacks.forEach((item: any) => {
            const groupSize = item.group_size;
            groupSizeDistribution[groupSize] = (groupSizeDistribution[groupSize] || 0) + 1;
          });
          
          return {
            locationId: parseInt(locationId),
            title: location?.name || `Lieu ${locationId}`,
            description: location?.description || '',
            totalFeedbacks,
            avgRating,
            totalVisitors,
            groupSizeDistribution
          };
        });
      }
    }
  } catch (error) {
    console.error('Error getting feedback stats from Supabase:', error);
  }
  
  console.log('Falling back to localStorage for stats calculation');
  // Fallback to localStorage calculation or if no data was found in Supabase
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
