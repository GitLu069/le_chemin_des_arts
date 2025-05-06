
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Mail, Calendar } from 'lucide-react';

const Infos = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">Infos pratiques</h1>
          <p className="text-center text-gray-600 mb-8">
            Tout ce que vous devez savoir pour profiter pleinement des chemins d'art
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-artPath-accent" />
                  Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Du 10 mai au 7 juillet 2025</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-artPath-accent" />
                  Lieu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Poleymieux-au-Mont-d'Or</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-artPath-accent" />
                  Horaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>L'accès aux expositions est libre aux horaires d'ouverture des lieux d'accueil.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-artPath-accent" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <a href="mailto:lescheminsdart.poleymieux@gmail.com" className="text-artPath-accent hover:underline">
                    lescheminsdart.poleymieux@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Accès et stationnement</h2>
            <p className="mb-4">
              Poleymieux-au-Mont-d'Or est accessible en transport en commun via la ligne 84 depuis Gare de Vaise et Neuville-sur-Saône.
            </p>
            <p className="mb-4">
              Des parkings sont disponibles dans l'ensemble du village, à proximité du circuit.
            </p>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Parcours</h2>
            <p className="mb-4">
              Le parcours est repéré par une signalétique dédiée renseignant les 8 lieux d'exposition.
            </p>
            <p className="mb-4">
              Des cartels accompagneront les œuvres, leurs auteurs et les démarches artistiques de chacun.
            </p>
          </div>
          
          <div className="card">
            <h2 className="text-xl mb-4 font-medium">Accessibilité</h2>
            <p>
              Le parcours est accessible aux personnes à mobilité réduite. Une assistance au bon cheminement est possible sur RDV : 04 78 91 90 09 (Secrétariat de la Mairie).
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Infos;
