
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Leaf } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518723276788-13ecb9e00076?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.9)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-artPath-lightBg via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="h-6 w-6 text-artPath-cream" />
            <h1 className="text-4xl md:text-5xl font-bold text-shadow">
              Le Chemin des Arts – 2025
            </h1>
          </div>
          <p className="text-xl md:text-2xl max-w-2xl text-shadow">
            Expositions artistiques dans les paysages de Poleymieux-au-Mont-d'Or
          </p>
        </div>
      </div>
      
      <div className="container-custom py-12 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card mb-8">
            <p className="text-lg mb-6">
              Bienvenue dans cette aventure artistique à travers notre village. Découvrez des créations 
              uniques nichées dans les paysages pittoresques de Poleymieux-au-Mont-d'Or.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <Link to="/explore" className="btn-primary">
                Découvrir le parcours
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
