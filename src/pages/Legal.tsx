
import React from 'react';
import Layout from '@/components/Layout';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

const Legal = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-center">Mentions légales</h1>
          
          <div className="card mb-8">
            <p className="font-medium text-lg mb-4">Nom du site : les chemins d'art</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Éditeur du site</h2>
              <p className="mb-1">Comité des fêtes de Poleymieux-au-Mont-d'Or</p>
              <p className="mb-3">Responsable de publication : Evelyne Riou – Présidente</p>
              
              <div className="space-y-2 ml-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-artPath-accent" />
                  <p>Contact : lescheminsdart.poleymieux@gmail.com</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-artPath-accent" />
                  <p>Adresse : Mairie de Poleymieux-au-Mont-d'Or, 69250</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-artPath-accent" />
                  <p>Téléphone : 04 78 91 90 09</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-artPath-accent" />
                  <p>Site officiel : <a href="https://www.poleymieux.fr" target="_blank" rel="noopener noreferrer" className="text-artPath-accent hover:underline">www.poleymieux.fr</a></p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Création et développement du site</h2>
              <p className="mb-1">Lucas Vincent – habitant de Poleymieux</p>
              <div className="flex items-center gap-2 ml-1">
                <Mail className="h-4 w-4 text-artPath-accent" />
                <p>Contact : lucasvincent69250@gmail.com</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Hébergement</h2>
              <p className="mb-1">Le site est hébergé gratuitement via GitHub Pages</p>
              <p className="mb-1">GitHub, Inc. – 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA</p>
              <div className="flex items-center gap-2 ml-1">
                <Globe className="h-4 w-4 text-artPath-accent" />
                <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" className="text-artPath-accent hover:underline">https://pages.github.com</a>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-2">Protection des données</h2>
              <p className="mb-2">Les données collectées via les formulaires sont utilisées uniquement à des fins statistiques internes.</p>
              <p className="mb-2">Aucune donnée n'est revendue ni exploitée commercialement.</p>
              <p>Conformément au RGPD, vous pouvez demander la suppression de vos données à l'adresse suivante : lescheminsdart.poleymieux@gmail.com.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
