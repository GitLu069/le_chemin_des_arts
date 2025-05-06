import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';
import { getLocations } from '@/data/locations';
import { getFeedbackStats, downloadCSV } from '@/utils/storage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Admin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [locationsData, setLocationsData] = useState<any[]>([]);
  
  // Check if user is already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        setIsAuthorized(true);
        loadData();
      } else {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    };
    
    checkSession();
  }, []);
  
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
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      setIsAuthorized(true);
      toast({
        title: "Accès autorisé",
        description: "Bienvenue dans l'interface d'administration."
      });
      
      // Load data after successful login
      loadData();
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Accès refusé",
        description: error.message || "Identifiants incorrects.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthorized(false);
    navigate('/');
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès."
    });
  };
  
  const getChartData = () => {
    return stats.map(stat => ({
      name: stat.title.length > 15 ? stat.title.substring(0, 15) + '...' : stat.title,
      visiteurs: stat.totalVisitors,
      note: parseFloat(stat.avgRating.toFixed(1))
    }));
  };
  
  const getGroupSizeData = (locationId: number) => {
    const location = stats.find(s => s.locationId === locationId);
    if (!location) return [];
    
    return Object.entries(location.groupSizeDistribution).map(([size, count]) => ({
      name: `${size} personne${Number(size) > 1 ? 's' : ''}`,
      valeur: count
    }));
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
          <div className="max-w-md mx-auto card">
            <h1 className="mb-6 text-center">Administration</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
                  placeholder="Entrez votre email"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
              
              <div className="flex justify-center">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1>Tableau de bord</h1>
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
            <div className="card mb-8">
              <h2 className="mb-6 text-center">Statistiques générales</h2>
              
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getChartData()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                  >
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="visiteurs" name="Nombre de visiteurs" fill="#3B82F6" />
                    <Bar yAxisId="right" dataKey="note" name="Note moyenne" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <h2 className="mb-4">Détails par lieu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.locationId} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedLocation(stat.locationId)}>
                  <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
                  <p className="text-gray-600 mb-3">{stat.description.substring(0, 100)}{stat.description.length > 100 ? '...' : ''}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-sm">Visiteurs</p>
                      <p className="text-2xl font-bold text-artPath-accent">{stat.totalVisitors}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-gray-500 text-sm">Note moyenne</p>
                      <p className="text-2xl font-bold text-artPath-success">
                        {stat.avgRating.toFixed(1)}/5
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Avis soumis</p>
                    <p className="text-lg font-medium">{stat.totalFeedbacks} formulaires</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedLocation && (
              <div className="card mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2>
                    Détails - {stats.find(s => s.locationId === selectedLocation)?.title}
                  </h2>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Fermer
                  </button>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Répartition des groupes</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getGroupSizeData(selectedLocation)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valeur" fill="#8884d8" name="Nombre de groupes" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
