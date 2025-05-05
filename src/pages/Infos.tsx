
import React from 'react';
import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Calendar } from 'lucide-react';

const Infos = () => {
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-center mb-4 text-artPath-text">Infos pratiques</h1>
          <p className="text-center text-gray-600 mb-8">
            Tout ce que vous devez savoir pour profiter pleinement du Chemin des Arts
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
                <p>Du 1er mai au 30 septembre 2025</p>
                <p className="text-sm text-muted-foreground mt-1">Parcours accessible 7j/7, 24h/24</p>
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
                <p>Polémieux-au-Mont-d'Or</p>
                <p className="text-sm text-muted-foreground mt-1">Région lyonnaise</p>
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
                <p>Parcours en extérieur accessible à toute heure</p>
                <p className="text-sm text-muted-foreground mt-1">Visite guidée tous les samedis à 14h</p>
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
                  <a href="mailto:contact@chemindesarts.fr" className="text-artPath-accent hover:underline">
                    contact@chemindesarts.fr
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">Réponse sous 48h</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-xl mb-4 font-medium">Accès et stationnement</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">En voiture</h3>
              <p className="mb-2">Depuis Lyon, prendre la direction de Polémieux-au-Mont-d'Or (20 minutes).</p>
              <p>Parkings gratuits disponibles :</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Place du village (10 places)</li>
                <li>Parking des écoles (30 places)</li>
                <li>Parking de la salle des fêtes (50 places)</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">En transports en commun</h3>
              <p className="mb-2">Bus TCL ligne 84 depuis la gare de Vaise, arrêt "Polémieux Centre"</p>
              <p>Fréquence : toutes les 30 minutes en semaine, toutes les heures le week-end</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">À vélo</h3>
              <p>Piste cyclable depuis Lyon (15 km). Racks à vélos disponibles sur la place du village.</p>
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-xl mb-6 font-medium">Foire aux questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Le parcours est-il accessible aux personnes à mobilité réduite ?</AccordionTrigger>
                <AccordionContent>
                  Oui, la majorité du parcours est accessible aux personnes à mobilité réduite. 
                  Certains points peuvent nécessiter une assistance. Une carte détaillée des accès PMR 
                  est disponible à l'office du tourisme ou sur demande par email.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>L'événement est-il gratuit ?</AccordionTrigger>
                <AccordionContent>
                  Oui, l'accès au Chemin des Arts est entièrement gratuit pour tous les visiteurs. 
                  Les visites guidées du samedi sont également gratuites mais sur réservation 
                  (places limitées).
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Puis-je venir avec mon chien ?</AccordionTrigger>
                <AccordionContent>
                  Les chiens tenus en laisse sont acceptés sur le parcours extérieur. 
                  Merci de respecter la propreté des lieux.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Y a-t-il des toilettes sur le parcours ?</AccordionTrigger>
                <AccordionContent>
                  Des toilettes publiques sont disponibles sur la place du village et près 
                  du parking de la salle des fêtes. Leurs emplacements sont indiqués sur le plan du parcours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Comment participer en tant qu'artiste à la prochaine édition ?</AccordionTrigger>
                <AccordionContent>
                  Les candidatures pour l'édition 2026 seront ouvertes en octobre 2025. 
                  Vous pouvez envoyer une demande d'information à artistes@chemindesarts.fr 
                  pour être notifié de l'ouverture des inscriptions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Infos;
