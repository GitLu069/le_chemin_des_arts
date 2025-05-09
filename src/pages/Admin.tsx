
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { supabase, checkIsAdmin, cleanupAuthState } from '@/lib/supabase';
import { getLocations } from '@/data/locations';
import { getFeedbackStats, downloadCSV } from '@/utils/storage';
import LoginForm from '@/components/admin/LoginForm';
import StatsOverview from '@/components/admin/StatsOverview';
import LocationDetails from '@/components/admin/LocationDetails';

const Admin = () => {
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
      try {
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
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Only synchronous state updates here
        if (session?.user?.email) {
          setUserEmail(session.user.email);
          // Defer checking admin status with setTimeout to prevent deadlocks
          setTimeout(async () => {
            const isAdmin = await checkIsAdmin(session.user.email!);
            setIsAuthorized(isAdmin);
            if (isAdmin) loadData();
          }, 0);
        } else {
          setIsAuthorized(false);
          setUserEmail(null);
        }
      }
    );
    
    checkSession();
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);
  
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
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Sign out with Supabase
      await supabase.auth.signOut({ scope: 'global' });
      
      setIsAuthorized(false);
      setUserEmail(null);
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur",
        description: "Problème lors de la déconnexion.",
        variant: "destructive"
      });
    }
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
