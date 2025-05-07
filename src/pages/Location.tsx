
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLocations, Location as LocationType } from '@/data/locations';
import { MapPin, ArrowRight } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locations = await getLocations();
        const foundLocation = locations.find(loc => loc.slug === slug);
        if (foundLocation) {
          setLocation(foundLocation);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocation();
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="text-center">
            <p>Chargement du lieu...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (notFound || !location) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="card text-center">
            <h1 className="mb-4">Lieu non trouvé</h1>
            <p className="mb-6">
              Désolé, le lieu que vous recherchez n'existe pas dans notre parcours artistique.
            </p>
            <Link to="/explore" className="btn-primary">
              Retour au parcours
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="mb-6">
          <Link to="/explore" className="text-artPath-accent hover:underline flex items-center gap-1">
            <ArrowRight className="h-4 w-4 rotate-180" /> 
            Retour au parcours
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="card mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-artPath-accent" />
              <h1 className="text-artPath-text">{location.name}</h1>
            </div>
            
            <div className="mb-6">
              <img 
                src={location.image} 
                alt={location.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            </div>
            
            {location.artists.length > 0 ? (
              <div className="p-4 bg-artPath-cream/30 rounded-lg">
                <h3 className="mb-2">Artistes présents à cet endroit :</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {location.artists.map((artist, index) => (
                    <li key={index}>{artist}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 bg-artPath-cream/30 rounded-lg">
                <p className="italic text-gray-600">
                  Ce lieu accueille des expositions ponctuelles tout au long de l'événement.
                </p>
              </div>
            )}
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl font-medium mb-4">Votre avis nous intéresse</h2>
            <FeedbackForm locationId={location.id} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Location;
