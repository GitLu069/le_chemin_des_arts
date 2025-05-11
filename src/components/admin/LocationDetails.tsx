
import React from 'react';
import { XCircle } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody, TableFooter } from '@/components/ui/table';

interface LocationDetailsProps {
  selectedLocation: number;
  stats: any[];
  onClose: () => void;
}

// Define the feedback type to avoid 'unknown' type errors
interface Feedback {
  id?: number;
  timestamp: string;
  name?: string;
  group_size: number;
  rating: number;
  comment?: string;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ 
  selectedLocation, 
  stats, 
  onClose 
}) => {
  // Find the selected location data
  const locationData = stats.find((stat) => stat.locationId === selectedLocation);
  
  if (!locationData) {
    return (
      <div className="card mt-10 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XCircle className="h-6 w-6" />
        </button>
        <p className="text-center py-10">Aucune donnée trouvée pour ce lieu.</p>
      </div>
    );
  }
  
  return (
    <div className="card mt-10 relative animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <XCircle className="h-6 w-6" />
      </button>
      
      <h3 className="text-xl font-semibold mb-6">{locationData.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Total des visiteurs</p>
          <p className="text-2xl font-bold text-artPath-accent">{locationData.totalVisitors}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Note moyenne</p>
          <p className="text-2xl font-bold text-artPath-success">{locationData.avgRating.toFixed(1)}/5</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">Nombre d'avis</p>
          <p className="text-2xl font-bold text-amber-600">{locationData.totalFeedbacks}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Distribution par taille de groupe</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(locationData.groupSizeDistribution).map(([size, count]) => (
            <div key={size} className="bg-gray-50 p-3 rounded text-center">
              <p className="font-medium">{size} personnes</p>
              <p className="text-gray-600">{String(count)} visite(s)</p>
            </div>
          ))}
        </div>
      </div>
      
      <h4 className="font-medium mb-2">Tous les commentaires</h4>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Taille groupe</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Commentaire</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locationData.feedbacks && locationData.feedbacks.map((feedback: Feedback, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(feedback.timestamp).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>{feedback.name || 'Anonyme'}</TableCell>
                <TableCell>{feedback.group_size} personne(s)</TableCell>
                <TableCell>{feedback.rating}/5</TableCell>
                <TableCell>{feedback.comment || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {(!locationData.feedbacks || locationData.feedbacks.length === 0) && (
          <p className="text-center py-4 text-gray-500">Aucun commentaire pour ce lieu.</p>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
