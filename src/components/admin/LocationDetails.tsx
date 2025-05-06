
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LocationDetailsProps {
  selectedLocation: number;
  stats: any[];
  onClose: () => void;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ selectedLocation, stats, onClose }) => {
  const getGroupSizeData = (locationId: number) => {
    const location = stats.find(s => s.locationId === locationId);
    if (!location) return [];
    
    return Object.entries(location.groupSizeDistribution).map(([size, count]) => ({
      name: `${size} personne${Number(size) > 1 ? 's' : ''}`,
      valeur: count
    }));
  };

  const currentLocation = stats.find(s => s.locationId === selectedLocation);
  
  if (!currentLocation) return null;

  return (
    <div className="card mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2>
          Détails - {currentLocation.title}
        </h2>
        <button 
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Fermer
        </button>
      </div>
      
      <h3 className="text-lg font-medium mb-3">Répartition des groupes</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getGroupSizeData(selectedLocation)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valeur" fill="#8884d8" name="Nombre de groupes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LocationDetails;
