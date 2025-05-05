
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Concours = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez saisir votre adresse email pour participer.",
        variant: "destructive",
      });
      return;
    }
    
    if (!photo) {
      toast({
        title: "Photo requise",
        description: "Veuillez téléverser une photo pour participer au concours.",
        variant: "destructive",
      });
      return;
    }
    
    if (!consent) {
      toast({
        title: "Autorisation requise",
        description: "Vous devez autoriser l'utilisation de votre photo.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: "Participation enregistrée !",
        description: "Votre photo a bien été envoyée. Merci pour votre participation !",
      });
      setName('');
      setEmail('');
      setPhoto(null);
      setConsent(false);
      setLoading(false);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">Concours Photo</h1>
          <p className="text-center text-gray-600 mb-8">
            Tentez de remporter un agrandissement 100x100 cm de votre photo et une visibilité dans notre exposition.
          </p>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Comment participer ?</h2>
            <ol className="list-decimal pl-5 mb-6 space-y-2">
              <li>Prenez une photo originale pendant votre parcours sur le Chemin des Arts</li>
              <li>Publiez-la sur Instagram avec le hashtag <span className="font-medium">#CheminDesArts2025</span></li>
              <li>Ou envoyez-la directement via le formulaire ci-dessous</li>
            </ol>
            <p className="text-sm text-gray-600 italic">Le/la gagnant(e) sera sélectionné(e) par notre jury d'artistes et annoncé(e) le 30 juin 2025.</p>
          </div>
          
          <div className="card">
            <h2 className="text-xl mb-6 font-medium text-center">Formulaire de participation</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Votre nom (facultatif)</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Prénom Nom" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Votre email <span className="text-red-500">*</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@exemple.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Requis pour vous contacter si vous gagnez</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photo">Votre photo <span className="text-red-500">*</span></Label>
                <Input 
                  id="photo" 
                  type="file" 
                  accept=".jpg,.jpeg,.png" 
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  required
                />
                <p className="text-xs text-gray-500">Formats acceptés : JPG, PNG (max 10 MB)</p>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <Label 
                  htmlFor="consent" 
                  className="text-sm leading-tight cursor-pointer"
                >
                  J'autorise l'association Le Chemin des Arts à utiliser ma photo pour la promotion de l'événement
                  <span className="text-red-500"> *</span>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Envoi en cours...' : 'Participer au concours'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Concours;
