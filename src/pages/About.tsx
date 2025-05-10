
import React from 'react';
import Layout from '@/components/Layout';
import { Leaf } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-center">À propos</h1>
          
          <div className="card mb-8">
            <p className="mb-6">
              <span className="font-medium">les chemins d'art</span> est un événement artistique annuel organisé à Poleymieux-au-Mont-d'Or.
              Il vise à faire découvrir des œuvres contemporaines dans des lieux emblématiques du village, en lien avec la nature et le patrimoine local.
            </p>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Organisé par</h2>
              <p>
                Le Comité des fêtes de Poleymieux-au-Mont-d'Or, dirigé par Evelyne Riou, conseillère adjointe à la mairie.
              </p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Soutiens & sponsors</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>SAAMA (Les Amis d'Ampère)</li>
                <li>Crédit Agricole</li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-artPath-accent mt-8">
              <Leaf className="h-5 w-5" />
              <p className="italic">
                Ce projet est porté par des habitants bénévoles, des artistes engagés, et des amoureux du territoire.
              </p>
              <Leaf className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
