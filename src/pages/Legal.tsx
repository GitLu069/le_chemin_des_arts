
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Legal = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-8 text-center">Mentions légales</h1>
          
          <div className="card mb-8">
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Événement :</span> les chemins d'art
              </p>
              <p>
                <span className="font-semibold">Organisé par :</span> Comité des fêtes de Poleymieux-au-Mont-d'Or
              </p>
              <p>
                <span className="font-semibold">Présidente :</span> Evelyne Riou – conseillère adjointe à la mairie
              </p>
              <p>
                <span className="font-semibold">Contact :</span>{" "}
                <a href="mailto:lescheminsdart.poleymieux@gmail.com" className="text-artPath-accent hover:underline">
                  lescheminsdart.poleymieux@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Téléphone :</span> 04 78 91 90 09
              </p>
              <p>
                <span className="font-semibold">Site de la mairie :</span>{" "}
                <a href="http://www.poleymieux.fr" target="_blank" rel="noopener noreferrer" className="text-artPath-accent hover:underline">
                  www.poleymieux.fr
                </a>
              </p>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p>
                  <span className="font-semibold">Créateur du site :</span> Lucas VINCENT, habitant de Poleymieux
                </p>
                <p>
                  <span className="font-semibold">Contact :</span>{" "}
                  <a href="mailto:lucasvincent69250@gmail.com" className="text-artPath-accent hover:underline">
                    lucasvincent69250@gmail.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link to="/" className="btn-secondary">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
