
import { toast } from "@/hooks/use-toast";
import { supabase, checkSupabaseConnection, DbFeedback } from "@/lib/supabase";

export interface FeedbackEntry {
  locationId: number;
  groupSize: number;
  rating: number;
  comment: string;
  name?: string;
  timestamp: string;
}

const STORAGE_KEY = 'artpath_feedback_data';
let useLocalStorage = true;

// Initialize and check if we should use Supabase or localStorage
const initStorage = async () => {
  const connectionCheck = await checkSupabaseConnection();
  useLocalStorage = !connectionCheck.success;
  
  if (useLocalStorage) {
    console.log('Using local storage fallback for data');
  } else {
    console.log('Using Supabase for data storage');
  }
  return !useLocalStorage;
};

// Call this on app init
initStorage();

// Convert FeedbackEntry to DbFeedback format
const toDbFormat = (feedback: FeedbackEntry): DbFeedback => ({
  location_id: feedback.locationId,
  group_size: feedback.groupSize,
  rating: feedback.rating,
  comment: feedback.comment,
  name: feedback.name,
  timestamp: feedback.timestamp
});

// Convert DbFeedback to FeedbackEntry format
const fromDbFormat = (dbFeedback: DbFeedback): FeedbackEntry => ({
  locationId: dbFeedback.location_id,
  groupSize: dbFeedback.group_size,
  rating: dbFeedback.rating,
  comment: dbFeedback.comment || '',
  name: dbFeedback.name,
  timestamp: dbFeedback.timestamp
});

// Save feedback to Supabase or local storage
export const saveFeedback = async (feedback: FeedbackEntry): Promise<void> => {
  try {
    if (!useLocalStorage) {
      // Try to save to Supabase
      const { error } = await supabase
        .from('feedback')
        .insert(toDbFormat(feedback));
      
      if (error) throw error;
    } else {
      // Fallback to localStorage
      const existingData: FeedbackEntry[] = getFeedbackData();
      const updatedData = [...existingData, feedback];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    }
    
    console.log('Feedback saved successfully');
  } catch (error) {
    console.error('Error saving feedback:', error);
    toast({
      title: "Erreur",
      description: "Impossible d'enregistrer votre feedback.",
      variant: "destructive",
    });
  }
};

// Get all feedback data
export const getFeedbackData = async (): Promise<FeedbackEntry[]> => {
  try {
    if (!useLocalStorage) {
      // Get data from Supabase
      const { data, error } = await supabase
        .from('feedback')
        .select('*');
      
      if (error) throw error;
      return data ? data.map(fromDbFormat) : [];
    } else {
      // Get data from localStorage
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
  } catch (error) {
    console.error('Error retrieving feedback data:', error);
    return [];
  }
};

// Get feedback for a specific location
export const getLocationFeedback = async (locationId: number): Promise<FeedbackEntry[]> => {
  try {
    if (!useLocalStorage) {
      // Get data from Supabase
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('location_id', locationId);
      
      if (error) throw error;
      return data ? data.map(fromDbFormat) : [];
    } else {
      // Get data from localStorage
      const allFeedback = await getFeedbackData();
      return allFeedback.filter(entry => entry.locationId === locationId);
    }
  } catch (error) {
    console.error('Error retrieving location feedback:', error);
    return [];
  }
};

// Clear all feedback data (for testing purposes)
export const clearFeedbackData = async (): Promise<void> => {
  try {
    if (!useLocalStorage) {
      // Clear data from Supabase (admin only)
      const { error } = await supabase
        .from('feedback')
        .delete()
        .neq('id', 0); // Delete all rows
      
      if (error) throw error;
    } else {
      // Clear data from localStorage
      localStorage.removeItem(STORAGE_KEY);
    }
    console.log('All feedback data cleared');
  } catch (error) {
    console.error('Error clearing feedback data:', error);
  }
};

// Get statistics for all locations
export const getFeedbackStats = async () => {
  const allFeedback = await getFeedbackData();
  
  // Group by location ID
  const byLocation = allFeedback.reduce((acc, entry) => {
    if (!acc[entry.locationId]) {
      acc[entry.locationId] = [];
    }
    acc[entry.locationId].push(entry);
    return acc;
  }, {} as Record<number, FeedbackEntry[]>);
  
  // Calculate statistics for each location
  const stats = Object.entries(byLocation).map(([locationId, entries]) => {
    const totalVisitors = entries.reduce((sum, entry) => sum + entry.groupSize, 0);
    const avgRating = entries.length 
      ? entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length
      : 0;
    
    // Group size distribution
    const groupSizes = entries.reduce((acc, entry) => {
      if (!acc[entry.groupSize]) {
        acc[entry.groupSize] = 0;
      }
      acc[entry.groupSize]++;
      return acc;
    }, {} as Record<number, number>);
    
    return {
      locationId: Number(locationId),
      totalFeedbacks: entries.length,
      totalVisitors,
      avgRating,
      groupSizeDistribution: groupSizes
    };
  });
  
  return stats;
};

// Export feedback data as CSV
export const exportFeedbackCSV = async (): Promise<string> => {
  const allFeedback = await getFeedbackData();
  if (allFeedback.length === 0) return '';
  
  const headers = "LocationID,GroupSize,Rating,Comment,Name,Timestamp\n";
  const rows = allFeedback.map(entry => {
    const comment = entry.comment ? `"${entry.comment.replace(/"/g, '""')}"` : '';
    const name = entry.name ? `"${entry.name.replace(/"/g, '""')}"` : '';
    return `${entry.locationId},${entry.groupSize},${entry.rating},${comment},${name},${entry.timestamp}`;
  }).join('\n');
  
  return headers + rows;
};

// Download CSV data
export const downloadCSV = async () => {
  const csvContent = await exportFeedbackCSV();
  if (!csvContent) {
    toast({
      title: "Information",
      description: "Aucune donnée à exporter.",
    });
    return;
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `artpath_feedback_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast({
    title: "Téléchargement réussi",
    description: "Les données ont été exportées au format CSV.",
  });
};
