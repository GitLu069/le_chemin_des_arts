
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { locations } from '@/data/locations';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { MapPin, TreeDeciduous } from 'lucide-react';

const Explore = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div key={location.id} className="location-card overflow-hidden flex flex-col h-full animate-scale-in">
              <div className="location-card-header">
                <h3 className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {location.name}
                </h3>
              </div>
              
              <div className="p-5 flex-grow">
                <p className="text-gray-600 mb-4">{location.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <TreeDeciduous className="h-4 w-4 text-artPath-accent" />
                    {location.artists.length > 0 ? 'Artistes présentés' : 'Information'}
                  </h4>
                  
                  {location.artists.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                      {location.artists.map((artist, index) => (
                        <li key={index}>{artist}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      Lieu d'exposition ponctuelle accueillant diverses interventions artistiques.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="p-5 bg-artPath-cream/30 border-t border-artPath-cream flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-shrink-0">
                  <QRCodeGenerator url={`/location/${location.slug}`} size={100} />
                </div>
                <div className="flex-grow text-center sm:text-right">
                  <Link 
                    to={`/location/${location.slug}`} 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-artPath-accent text-white hover:bg-green-700 transition-colors"
                  >
                    Découvrir ce lieu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
