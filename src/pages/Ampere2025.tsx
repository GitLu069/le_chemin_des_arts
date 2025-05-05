
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Ampere2025 = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">Ampère 2025</h1>
          <p className="text-center text-gray-600 mb-8">
            Célébration spéciale du bicentenaire des travaux d'André-Marie Ampère
          </p>
          
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Dans la tête d'Ampère" 
                  className="w-full h-64 object-cover rounded-lg" 
                />
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-xl mb-2 font-medium">Dans la tête d'Ampère</h2>
                <p className="text-gray-600 italic mb-4">Par Marie Fontaine</p>
                
                <p className="mb-4">
                  Cette œuvre monumentale représente la fusion entre art et science, 
                  rendant hommage aux découvertes révolutionnaires d'André-Marie Ampère 
                  sur l'électromagnétisme.
                </p>
                
                <Link to="/oeuvre-7" className="btn-primary inline-block py-2">
                  Découvrir l'œuvre
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl mb-4 font-medium">André-Marie Ampère et l'électromagnétisme</h2>
            
            <p className="mb-4">
              André-Marie Ampère (1775-1836), physicien et mathématicien français, est considéré 
              comme l'un des fondateurs de l'électrodynamique. En 1825, il publie sa théorie 
              mathématique des phénomènes électrodynamiques, révolutionnant notre compréhension 
              de l'électricité et du magnétisme.
            </p>
            
            <p className="mb-4">
              L'année 2025 marque le bicentenaire de cette publication majeure, et le Chemin des Arts 
              s'associe aux célébrations nationales "Ampère 2025" pour rendre hommage à ce génie 
              scientifique à travers l'art contemporain.
            </p>
            
            <p className="mb-6">
              L'artiste Marie Fontaine a créé une installation interactive qui permet aux visiteurs 
              d'explorer les concepts d'électromagnétisme de façon visuelle et sensorielle, 
              créant un pont entre science, histoire et création artistique.
            </p>
            
            <div className="flex justify-center">
              <Link to="/explore" className="btn-secondary">
                Explorer les autres œuvres
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ampere2025;
