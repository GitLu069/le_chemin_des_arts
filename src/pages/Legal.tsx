
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
            <h2 className="text-xl font-medium mb-4">Éditeur du site</h2>
            <div className="space-y-4 mb-6">
              <p>
                <span className="font-semibold">Nom du site :</span> les chemins d'art
              </p>
              <p>
                <span className="font-semibold">Éditeur :</span> Comité des fêtes de Poleymieux-au-Mont-d'Or
              </p>
              <p>
                <span className="font-semibold">Responsable de publication :</span> Evelyne Riou – Présidente
              </p>
              <p>
                <span className="font-semibold">Contact :</span>{" "}
                <a href="mailto:lescheminsdart.poleymieux@gmail.com" className="text-artPath-accent hover:underline">
                  lescheminsdart.poleymieux@gmail.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Adresse :</span> Mairie de Poleymieux-au-Mont-d'Or, 69250
              </p>
              <p>
                <span className="font-semibold">Téléphone :</span> 04 78 91 90 09
              </p>
              <p>
                <span className="font-semibold">Site officiel :</span>{" "}
                <a href="http://www.poleymieux.fr" target="_blank" rel="noopener noreferrer" className="text-artPath-accent hover:underline">
                  www.poleymieux.fr
                </a>
              </p>
            </div>
            
            <h2 className="text-xl font-medium mb-4">Création et développement du site</h2>
            <div className="space-y-4 mb-6">
              <p>
                <span className="font-semibold">Développement :</span> Lucas VINCENT, habitant de Poleymieux
              </p>
              <p>
                <span className="font-semibold">Contact :</span>{" "}
                <a href="mailto:lucasvincent69250@gmail.com" className="text-artPath-accent hover:underline">
                  lucasvincent69250@gmail.com
                </a>
              </p>
            </div>
            
            <h2 className="text-xl font-medium mb-4">Hébergement</h2>
            <div className="space-y-4 mb-6">
              <p>
                <span className="font-semibold">Prestataire :</span> GitHub Pages
              </p>
              <p>
                <span className="font-semibold">Société :</span> GitHub, Inc. – 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA
              </p>
              <p>
                <span className="font-semibold">Site :</span>{" "}
                <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" className="text-artPath-accent hover:underline">
                  https://pages.github.com
                </a>
              </p>
            </div>
            
            <h2 className="text-xl font-medium mb-4">Protection des données</h2>
            <div className="space-y-4">
              <p>
                Les données collectées via les formulaires sont utilisées uniquement à des fins statistiques internes.
              </p>
              <p>
                Aucune donnée n'est revendue ni exploitée commercialement.
              </p>
              <p>
                Conformément au RGPD, vous pouvez demander la suppression de vos données à l'adresse suivante : 
                <a href="mailto:lescheminsdart.poleymieux@gmail.com" className="text-artPath-accent hover:underline ml-1">
                  lescheminsdart.poleymieux@gmail.com
                </a>.
              </p>
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
