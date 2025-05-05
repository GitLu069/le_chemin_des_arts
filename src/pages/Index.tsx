
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworks';

const Index = () => {
  return (
    <Layout>
      <div className="container-custom py-12 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-artPath-text">Le Chemin des Arts</h1>
          
          <div className="card mb-8">
            <p className="text-lg mb-6">
              Bienvenue dans cette aventure artistique à travers notre ville. Scannez les QR codes 
              présents à côté des œuvres pour les découvrir, partager votre expérience et contribuer 
              à améliorer cet événement culturel.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Link to="/explore" className="btn-primary">
                Commencer la visite
              </Link>
              <p className="text-sm text-gray-500">ou scannez un QR code près d'une œuvre</p>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="mb-6 text-artPath-text">À propos de l'événement</h2>
            <div className="card">
              <p className="mb-4">
                Le Chemin des Arts est une initiative culturelle visant à promouvoir l'art local et 
                à créer un musée à ciel ouvert accessible à tous. Les œuvres exposées représentent 
                la diversité artistique de notre région et invitent à la réflexion et au dialogue.
              </p>
              <p>
                Votre participation active, à travers vos retours et vos impressions, nous aidera 
                à améliorer cette expérience et à construire ensemble le futur de cet événement culturel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
