
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { locations } from '@/data/locations';
import { MapPin, ArrowRight } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find(loc => loc.slug === slug);
  
  if (!location) {
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
            
            <p className="text-gray-600 mb-6">{location.description}</p>
            
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
