
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
            <h2 className="text-xl mb-4">Informations générales</h2>
            <p className="mb-4">
              Le présent site "Le Chemin des Arts" est édité par l'Association Culturelle [Nom de l'Association],
              association loi 1901, dont le siège social est situé à [Adresse], représentée par son Président
              [Nom du Président].
            </p>
            <p className="mb-4">
              Contact : chemindelarts@example.com<br />
              Téléphone : 01 23 45 67 89
            </p>
            
            <h2 className="text-xl mb-4 mt-6">Protection des données personnelles</h2>
            <p className="mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), nous vous informons que les
              données collectées via les formulaires de ce site sont destinées uniquement à améliorer l'expérience
              utilisateur et l'organisation de l'événement artistique.
            </p>
            <p className="mb-4">
              Les données collectées sont :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Le nombre de personnes dans votre groupe</li>
              <li>Votre appréciation des œuvres (notes et commentaires)</li>
            </ul>
            <p className="mb-4">
              Ces données sont anonymes et ne permettent pas de vous identifier personnellement.
              Vous disposez d'un droit d'accès, de rectification et d'opposition aux données vous concernant
              que vous pouvez exercer en écrivant à chemindelarts@example.com.
            </p>
            
            <h2 className="text-xl mb-4 mt-6">Cookies</h2>
            <p className="mb-4">
              Ce site utilise des cookies techniques essentiels au fonctionnement du site.
              Aucun cookie publicitaire ou de tracking n'est utilisé.
            </p>
            
            <h2 className="text-xl mb-4 mt-6">Crédits</h2>
            <p className="mb-4">
              Ce site a été développé dans le cadre d'une initiative culturelle locale.
              Les images utilisées proviennent de la plateforme Unsplash et sont libres de droits.
            </p>
            
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
