
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StarRating from '@/components/StarRating';
import { getFeedbackByLocation } from '@/utils/storage';

interface Props {
  selectedLocation: number;
  stats: any[];
  onClose: () => void;
}

const LocationDetails: React.FC<Props> = ({ selectedLocation, stats, onClose }) => {
  const [feedbacks, setFeedbacks] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  
  const locationStat = stats.find(stat => stat.locationId === selectedLocation);
  
  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackData = await getFeedbackByLocation(selectedLocation);
        setFeedbacks(feedbackData);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedbacks();
  }, [selectedLocation]);
  
  return (
    <div className="card mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex-1 font-medium">
          Détails du lieu : {locationStat?.title || `Lieu ${selectedLocation}`}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>
      
      {isLoading ? (
        <p className="text-center py-4">Chargement des avis...</p>
      ) : feedbacks.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="w-32 text-center">Groupe</TableHead>
                <TableHead className="w-32 text-center">Note</TableHead>
                <TableHead>Commentaire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbacks.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {format(new Date(feedback.timestamp), 'dd/MM/yyyy', { locale: fr })}
                  </TableCell>
                  <TableCell>{feedback.name || '-'}</TableCell>
                  <TableCell className="text-center">{feedback.groupSize} pers.</TableCell>
                  <TableCell className="text-center">
                    <StarRating value={feedback.rating} readOnly={true} size="sm" />
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {feedback.comment || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center py-4">Aucun avis pour ce lieu</p>
      )}
      
      {feedbacks.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3">Récapitulatif</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Nombre d'avis</p>
              <p className="font-bold text-lg">{feedbacks.length}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Visiteurs</p>
              <p className="font-bold text-lg">{locationStat?.totalVisitors || feedbacks.reduce((sum, f) => sum + f.groupSize, 0)}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Note moyenne</p>
              <div className="flex items-center gap-2">
                <StarRating value={locationStat?.avgRating || feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length} readOnly={true} size="sm" />
                <span className="font-bold">
                  {(locationStat?.avgRating || feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
