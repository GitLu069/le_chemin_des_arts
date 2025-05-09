
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">À propos de "les chemins d'art"</h1>
          <p className="text-center text-gray-600 mb-8">
            l'événement artistique annuel de Poleymieux-au-Mont-d'Or
          </p>
          
          <div className="card mb-8">
            <p className="mb-6">
              "les chemins d'art" est un parcours artistique à ciel ouvert organisé par le Comité des fêtes 
              de Poleymieux-au-Mont-d'Or, avec le soutien des habitants et des artistes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-artPath-accent font-medium">🧑‍🎨 Organisé par :</span>
                <span>le comité des fêtes dirigé par Evelyne Riou</span>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-artPath-accent font-medium">🤝 Sponsors :</span>
                <div>
                  <p className="mb-1">SAAMA (Les Amis d'Ampère)</p>
                  <p>Crédit Agricole</p>
                </div>
              </div>
            </div>
            
            <p>
              Ce projet est porté par des habitants bénévoles, des artistes engagés, et des amoureux du territoire.
              Le parcours est réparti dans 8 lieux emblématiques du village et met en lumière 
              des artistes contemporains dans un dialogue avec le patrimoine local et la nature.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
