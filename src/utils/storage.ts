
import { toast } from "@/hooks/use-toast";

export interface FeedbackEntry {
  locationId: number;
  groupSize: number;
  rating: number;
  comment: string;
  name?: string;
  timestamp: string;
}

const STORAGE_KEY = 'artpath_feedback_data';

// Save feedback to local storage
export const saveFeedback = (feedback: FeedbackEntry): void => {
  try {
    const existingData: FeedbackEntry[] = getFeedbackData();
    const updatedData = [...existingData, feedback];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
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
export const getFeedbackData = (): FeedbackEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error retrieving feedback data:', error);
    return [];
  }
};

// Get feedback for a specific location
export const getLocationFeedback = (locationId: number): FeedbackEntry[] => {
  const allFeedback = getFeedbackData();
  return allFeedback.filter(entry => entry.locationId === locationId);
};

// Clear all feedback data (for testing purposes)
export const clearFeedbackData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  console.log('All feedback data cleared');
};

// Get statistics for all locations
export const getFeedbackStats = () => {
  const allFeedback = getFeedbackData();
  
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
export const exportFeedbackCSV = (): string => {
  const allFeedback = getFeedbackData();
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
export const downloadCSV = () => {
  const csvContent = exportFeedbackCSV();
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
