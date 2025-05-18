import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLocations, Location } from '@/data/locations';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { MapPin, Leaf } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const Explore = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        console.log('Fetching locations for Explore page...');
        const data = await getLocations();
        console.log('Fetched locations:', data);
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les lieux du parcours.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationsData();
  }, [toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <h1 className="mb-4 text-artPath-text">Parcours Artistique</h1>
            <p className="text-lg mb-6 text-gray-600">
              Découvrez les œuvres d'art à travers différents lieux emblématiques 
              de Poleymieux-au-Mont-d'Or. Scannez le QR code à chaque lieu pour une 
              expérience immersive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Skeleton className="h-48 w-full" />
                </CardHeader>
                <CardContent className="p-5 flex flex-col items-center">
                  <Skeleton className="h-[150px] w-[150px] mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="mb-4 text-artPath-text">Parcours Artistique</h1>
          <p className="text-lg mb-6 text-gray-600">
            Découvrez les œuvres d'art à travers différents lieux emblématiques 
            de Poleymieux-au-Mont-d'Or. Scannez le QR code à chaque lieu pour une 
            expérience immersive.
          </p>
        </div>
        
        {locations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500">Aucun lieu n'a été trouvé.</p>
            <Leaf className="h-8 w-8 text-artPath-accent mx-auto mt-4" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="overflow-hidden flex flex-col h-full animate-scale-in">
                <CardHeader className="p-0">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {location.name}
                  </h3>
                  
                  {location.artists && location.artists.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Artistes présents :</h4>
                      <ul className="text-sm">
                        {location.artists.map((artist, index) => (
                          <li key={index} className="mb-1">{artist}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mb-4 flex justify-center flex-1">
                    <QRCodeGenerator url={`/location/${location.slug}`} size={150} />
                  </div>
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Link 
                    to={`/location/${location.slug}`} 
                    className="w-full text-center inline-flex items-center justify-center px-4 py-2 rounded-lg bg-artPath-accent text-white hover:bg-green-700 transition-colors"
                  >
                    Découvrir ce lieu
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Explore;
