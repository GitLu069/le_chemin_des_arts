
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const ThankYou = () => {
  const location = useLocation();
  const { from } = location.state || { from: undefined };

  // Ne redirige plus si la page est accédée directement
  // Permettant une meilleure expérience utilisateur
  
  return (
    <Layout>
      <div className="container-custom py-12 animate-fade-in">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-artPath-success mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-24 w-24 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h1 className="mb-6 text-artPath-text">Merci pour votre participation !</h1>
          
          <div className="card mb-8">
            <p className="text-lg mb-6">
              Votre retour d'expérience est précieux et contribue à l'amélioration 
              de cet événement artistique local.
            </p>
            
            <p className="text-lg mb-8">
              N'hésitez pas à découvrir d'autres œuvres du parcours et à partager 
              vos impressions pour chacune d'entre elles.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/explore" className="btn-primary">
                Découvrir d'autres œuvres
              </Link>
              <Link to="/" className="btn-secondary">
                Retour à l'accueil
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600">
              Vous pouvez également partager cette expérience sur les réseaux sociaux
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button 
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                aria-label="Partager sur Facebook"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </button>
              <button 
                className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
                aria-label="Partager sur Twitter"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button 
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                aria-label="Partager sur WhatsApp"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou;
