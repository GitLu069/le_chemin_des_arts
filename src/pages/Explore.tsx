
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLocations, Location } from '@/data/locations';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { MapPin, Leaf } from 'lucide-react';

const Explore = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationsData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="text-center">
            <p>Chargement des lieux...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="mb-4 text-artPath-text">Parcours Artistique</h1>
          <p className="text-lg mb-6 text-gray-600">
            Découvrez les œuvres d'art à travers différents lieux emblématiques 
            de Poleymieux-au-Mont-d'Or. Scannez le QR code à chaque lieu pour une 
            expérience immersive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="location-card overflow-hidden flex flex-col h-full animate-scale-in">
              <div className="location-card-header">
                <h3 className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {location.name}
                </h3>
              </div>
              
              <div className="h-48 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5 flex flex-col items-center justify-center">
                <div className="mb-4 flex justify-center">
                  <QRCodeGenerator url={`/location/${location.slug}`} size={150} />
                </div>
                
                <Link 
                  to={`/location/${location.slug}`} 
                  className="w-full text-center inline-flex items-center justify-center px-4 py-2 rounded-lg bg-artPath-accent text-white hover:bg-green-700 transition-colors"
                >
                  Découvrir ce lieu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
