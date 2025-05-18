
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getLocations, fallbackLocations, Location as LocationType } from '@/data/locations';
import { MapPin, ArrowRight } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Location = () => {
  const { slug } = useParams<{ slug: string }>();
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        console.log(`Fetching location with slug: ${slug}`);
        // Try to get locations from API
        const locations = await getLocations();
        console.log('Fetched locations for location page:', locations);
        
        // Try to find the location in the fetched data
        let foundLocation = locations.find(loc => loc.slug === slug);
        
        // If not found in fetched data but we have fallback data, try there
        if (!foundLocation && fallbackLocations.length > 0) {
          console.log('Location not found in fetched data, checking fallback data');
          foundLocation = fallbackLocations.find(loc => loc.slug === slug);
        }
        
        if (foundLocation) {
          console.log('Found location:', foundLocation);
          setLocation(foundLocation);
        } else {
          console.log('Location not found with slug:', slug);
          setNotFound(true);
          toast({
            title: "Lieu non trouvé",
            description: "Ce lieu n'existe pas dans notre parcours.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        
        // If we have fallback data, try to find there
        if (fallbackLocations.length > 0) {
          console.log('Error occurred, checking fallback data');
          const fallbackLocation = fallbackLocations.find(loc => loc.slug === slug);
          if (fallbackLocation) {
            console.log('Found location in fallback data:', fallbackLocation);
            setLocation(fallbackLocation);
          } else {
            setNotFound(true);
            toast({
              title: "Lieu non trouvé",
              description: "Ce lieu n'existe pas dans notre parcours.",
              variant: "destructive",
            });
          }
        } else {
          setNotFound(true);
          toast({
            title: "Erreur",
            description: "Impossible de charger les détails du lieu.",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocation();
  }, [slug, toast]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="mb-6">
            <div className="w-32">
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64 mb-2" />
              </CardHeader>
              
              <CardContent>
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (notFound || !location) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <Card className="text-center p-8">
            <CardContent>
              <h1 className="text-2xl font-bold mb-4">Lieu non trouvé</h1>
              <p className="mb-6 text-gray-600">
                Désolé, le lieu que vous recherchez n'existe pas dans notre parcours artistique.
              </p>
              <Link to="/explore" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-artPath-accent text-white hover:bg-green-700 transition-colors">
                Retour au parcours
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="mb-6">
          <Link to="/explore" className="text-artPath-accent hover:underline flex items-center gap-1">
            <ArrowRight className="h-4 w-4 rotate-180" /> 
            Retour au parcours
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-artPath-accent" />
                <h1 className="text-2xl font-bold text-artPath-text">{location.name}</h1>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error(`Error loading image for ${location.name}`);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <p className="text-gray-700 mb-4">{location.description}</p>
                
                {location.artists && location.artists.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-medium mb-3">Artistes présents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {location.artists.map((artist, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-artPath-accent">{artist}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-medium">Exprimez votre avis sur les créations artistiques de ce lieu</h2>
            </CardHeader>
            <CardContent>
              <FeedbackForm locationId={location.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Location;
