
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import StarRating from '@/components/StarRating';
import { artworks } from '@/data/artworks';
import { saveFeedback } from '@/utils/storage';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Link as LinkIcon } from 'lucide-react';

const Artwork = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const artwork = artworks.find(art => art.slug === slug);
  
  const [groupSize, setGroupSize] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  if (!artwork) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="mb-4">Œuvre non trouvée</h1>
          <p className="mb-6">L'œuvre que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </Layout>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Attention",
        description: "Veuillez attribuer une note à cette œuvre.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const feedback = {
      locationId: artwork.id,
      groupSize,
      rating,
      comment,
      name,
      timestamp: new Date().toISOString()
    };
    
    try {
      saveFeedback(feedback);
      
      toast({
        title: "Merci !",
        description: "Votre feedback a bien été enregistré.",
      });
      
      // Navigate to thank you page
      setTimeout(() => {
        navigate('/merci', { state: { from: artwork.slug } });
      }, 1000);
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'enregistrement de votre feedback.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={`${artwork.image}?auto=format&fit=crop&w=500&h=500&q=80`} 
                  alt={artwork.title} 
                  className="w-full h-64 md:h-full object-cover rounded-lg" 
                />
              </div>
              
              <div className="md:w-2/3">
                <h1 className="mb-2">{artwork.title}</h1>
                <p className="text-gray-600 text-lg mb-4">par {artwork.artist}</p>
                <p className="mb-4">{artwork.description}</p>
                
                <div className="hidden md:block mt-4">
                  <QRCodeGenerator url={`/${artwork.slug}`} />
                </div>
              </div>
            </div>
          </div>
          
          {artwork.artistInfo && (
            <div className="card mb-6">
              <h2 className="mb-4 text-xl font-medium">À propos de l'artiste</h2>
              <p className="mb-4">{artwork.artistInfo.bio}</p>
              
              {(artwork.artistInfo.email || artwork.artistInfo.phone || artwork.artistInfo.website || artwork.artistInfo.instagram) && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {artwork.artistInfo.email && (
                    <a href={`mailto:${artwork.artistInfo.email}`} className="flex items-center gap-2 text-artPath-accent hover:underline">
                      <Mail size={16} />
                      <span>Contact</span>
                    </a>
                  )}
                  {artwork.artistInfo.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      <span>{artwork.artistInfo.phone}</span>
                    </div>
                  )}
                  {artwork.artistInfo.website && (
                    <a href={`https://${artwork.artistInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-artPath-accent hover:underline">
                      <LinkIcon size={16} />
                      <span>Site web</span>
                    </a>
                  )}
                  {artwork.artistInfo.instagram && (
                    <a href={`https://instagram.com/${artwork.artistInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-artPath-accent hover:underline">
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="card">
            <h2 className="mb-6 text-center">Partagez votre expérience</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="groupSize" className="block mb-2 font-medium">
                  Nombre de personnes dans votre groupe
                </label>
                <input
                  type="number"
                  id="groupSize"
                  min="1"
                  max="20"
                  required
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">
                  Note (de 1 à 5 étoiles)
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              
              <div>
                <label htmlFor="comment" className="block mb-2 font-medium">
                  Commentaire (facultatif)
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
                  placeholder="Partagez vos impressions..."
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Nom (facultatif)
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
                  placeholder="Votre nom"
                />
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Traitement en cours...' : 'Valider mon passage'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Artwork;
