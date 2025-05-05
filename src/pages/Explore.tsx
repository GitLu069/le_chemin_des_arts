
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworks';
import QRCodeGenerator from '@/components/QRCodeGenerator';

const Explore = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <h1 className="text-center mb-8 text-artPath-text">Explorez les Œuvres</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="card hover:shadow-md transition-shadow animate-scale-in">
              <img 
                src={`${artwork.image}?auto=format&fit=crop&w=600&h=400&q=80`} 
                alt={artwork.title} 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              
              <h3 className="mb-2">{artwork.title}</h3>
              <p className="text-gray-600 mb-3">par {artwork.artist}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link 
                  to={`/${artwork.slug}`} 
                  className="btn-primary py-2 min-w-0 flex-1 text-center"
                >
                  Découvrir
                </Link>
                <div className="flex-1 flex justify-center">
                  <QRCodeGenerator url={`/${artwork.slug}`} size={80} />
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
