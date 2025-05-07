
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { supabase, checkIsAdmin } from '@/lib/supabase';
import { getLocations } from '@/data/locations';
import { getFeedbackStats, downloadCSV } from '@/utils/storage';
import LoginForm from '@/components/admin/LoginForm';
import StatsOverview from '@/components/admin/StatsOverview';
import LocationDetails from '@/components/admin/LocationDetails';

const Admin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [locationsData, setLocationsData] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      // Get current session
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const email = data.session.user.email;
        setUserEmail(email || null);
        
        // Check if user is an admin
        if (email) {
          const isAdmin = await checkIsAdmin(email);
          setIsAuthorized(isAdmin);
          
          if (isAdmin) {
            loadData();
          } else {
            toast({
              title: "Accès refusé",
              description: "Vous n'avez pas les droits d'administration.",
              variant: "destructive"
            });
          }
        }
      } else {
        // Check if token is in URL (for direct access)
        const token = searchParams.get('token');
        if (token === 'artpath2025') {
          setIsAuthorized(true);
          loadData();
          
          toast({
            title: "Accès direct",
            description: "Mode administrateur activé via token.",
          });
        } else {
          setIsAuthorized(false);
        }
      }
      
      setIsLoading(false);
    };
    
    checkSession();
  }, [searchParams, toast]);
  
  // Load all data if authorized
  const loadData = async () => {
    try {
      // Load locations
      const locations = await getLocations();
      setLocationsData(locations);
      
      // Load stats
      const statsData = await getFeedbackStats();
      
      // Merge location info with stats
      const statsWithInfo = statsData.map(stat => {
        const location = locations.find(l => l.id === stat.locationId);
        return {
          ...stat,
          title: location ? location.name : `Lieu ${stat.locationId}`,
          description: location ? location.description : 'Description non disponible'
        };
      });
      
      setStats(statsWithInfo);
      
      if (statsWithInfo.length === 0) {
        toast({
          title: "Information",
          description: "Aucune donnée n'est disponible pour le moment."
        });
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données.",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthorized(false);
    setUserEmail(null);
    navigate('/');
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès."
    });
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <p>Chargement en cours...</p>
        </div>
      </Layout>
    );
  }
  
  if (!isAuthorized) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <LoginForm 
            onLoginSuccess={() => {
              setIsAuthorized(true);
              loadData();
            }}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1>Tableau de bord</h1>
            {userEmail && <p className="text-sm text-gray-500">Connecté en tant que {userEmail}</p>}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={downloadCSV}
              className="btn-secondary"
            >
              Exporter CSV
            </button>
            <button 
              onClick={handleLogout}
              className="btn-secondary"
            >
              Déconnexion
            </button>
          </div>
        </div>
        
        {stats.length === 0 ? (
          <div className="card text-center py-12">
            <h2 className="mb-4">Aucune donnée disponible</h2>
            <p>Les statistiques s'afficheront ici lorsque les visiteurs commenceront à soumettre leurs avis.</p>
          </div>
        ) : (
          <>
            <StatsOverview 
              stats={stats}
              onLocationSelect={setSelectedLocation}
            />
            
            {selectedLocation && (
              <LocationDetails
                selectedLocation={selectedLocation}
                stats={stats}
                onClose={() => setSelectedLocation(null)}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
