
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">À propos de l'événement</h1>
          <p className="text-center text-gray-600 mb-8">
            Découvrez l'histoire et les valeurs du Chemin des Arts de Polémieux-au-Mont-d'Or
          </p>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Notre histoire</h2>
            
            <p className="mb-4">
              Le Chemin des Arts est né en 2019 de la volonté des habitants et de la municipalité 
              de Polémieux-au-Mont-d'Or de dynamiser la vie culturelle locale tout en valorisant 
              le patrimoine naturel et architectural exceptionnel du village.
            </p>
            
            <p className="mb-4">
              Ce qui a commencé comme une modeste exposition de sculptures en plein air 
              s'est rapidement transformé en un événement majeur, attirant des artistes 
              de renommée nationale et un public toujours plus nombreux.
            </p>
            
            <p>
              L'édition 2025 marque une étape importante avec une sélection élargie d'œuvres, 
              un parcours étendu et des installations numériques innovantes.
            </p>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Notre vision</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2">Culturel</h3>
                <p className="text-sm">
                  Démocratiser l'accès à l'art contemporain en le sortant des musées traditionnels 
                  pour l'amener au cœur des espaces publics et naturels, créant ainsi un dialogue 
                  entre création artistique et environnement quotidien.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Écologique</h3>
                <p className="text-sm">
                  Sensibiliser à la préservation de l'environnement à travers des œuvres qui 
                  questionnent notre rapport à la nature. Les artistes sont encouragés à utiliser 
                  des matériaux durables ou recyclés.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Social</h3>
                <p className="text-sm">
                  Créer du lien entre habitants, artistes et visiteurs autour d'une expérience 
                  culturelle partagée. Les écoles locales sont impliquées dans des ateliers 
                  avec les artistes participants.
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl mb-6 font-medium">L'équipe organisatrice</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Association Le Chemin des Arts</h3>
              <p className="mb-4">
                L'événement est porté par une association loi 1901 composée de bénévoles passionnés, 
                en partenariat avec la municipalité de Polémieux-au-Mont-d'Or et la Métropole de Lyon.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Direction artistique</h4>
                  <p className="text-sm">Claire Fontaine, commissaire d'exposition</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Coordination</h4>
                  <p className="text-sm">Jean Martin, président de l'association</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Communication</h4>
                  <p className="text-sm">Sophie Dubois, responsable relations presse</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Technique</h4>
                  <p className="text-sm">Michel Leblanc, régisseur général</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Nos partenaires</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <li className="text-sm">Municipalité de Polémieux-au-Mont-d'Or</li>
                <li className="text-sm">Métropole de Lyon</li>
                <li className="text-sm">Région Auvergne-Rhône-Alpes</li>
                <li className="text-sm">DRAC Auvergne-Rhône-Alpes</li>
                <li className="text-sm">Fondation pour l'Art Contemporain</li>
                <li className="text-sm">Crédit Mutuel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
