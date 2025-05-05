
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { artworks } from '@/data/artworks';
import { getFeedbackStats, downloadCSV } from '@/utils/storage';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define a secure token to protect admin page
const ADMIN_TOKEN = "artpath2025";

const Admin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null);
  
  // Check token in URL or localStorage
  useEffect(() => {
    const token = searchParams.get('token');
    const storedToken = localStorage.getItem('admin_token');
    
    if ((token && token === ADMIN_TOKEN) || storedToken === ADMIN_TOKEN) {
      setIsAuthorized(true);
      localStorage.setItem('admin_token', ADMIN_TOKEN);
    }
  }, [searchParams]);
  
  // Load stats if authorized
  useEffect(() => {
    if (isAuthorized) {
      loadStats();
    }
  }, [isAuthorized]);
  
  const loadStats = () => {
    const rawStats = getFeedbackStats();
    
    // Merge artwork info with stats
    const statsWithInfo = rawStats.map(stat => {
      const artwork = artworks.find(a => a.id === stat.artworkId);
      return {
        ...stat,
        title: artwork ? artwork.title : `Œuvre ${stat.artworkId}`,
        artist: artwork ? artwork.artist : 'Inconnu'
      };
    });
    
    setStats(statsWithInfo);
    
    if (statsWithInfo.length === 0) {
      toast({
        title: "Information",
        description: "Aucune donnée n'est disponible pour le moment."
      });
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_TOKEN) {
      setIsAuthorized(true);
      localStorage.setItem('admin_token', ADMIN_TOKEN);
      toast({
        title: "Accès autorisé",
        description: "Bienvenue dans l'interface d'administration."
      });
    } else {
      toast({
        title: "Accès refusé",
        description: "Le mot de passe est incorrect.",
        variant: "destructive"
      });
    }
  };
  
  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('admin_token');
    navigate('/');
  };
  
  const getChartData = () => {
    return stats.map(stat => ({
      name: stat.title.length > 15 ? stat.title.substring(0, 15) + '...' : stat.title,
      visiteurs: stat.totalVisitors,
      note: parseFloat(stat.avgRating.toFixed(1))
    }));
  };
  
  const getGroupSizeData = (artworkId: number) => {
    const artwork = stats.find(s => s.artworkId === artworkId);
    if (!artwork) return [];
    
    return Object.entries(artwork.groupSizeDistribution).map(([size, count]) => ({
      name: `${size} personne${Number(size) > 1 ? 's' : ''}`,
      valeur: count
    }));
  };
  
  if (!isAuthorized) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto card">
            <h1 className="mb-6 text-center">Administration</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
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
                  placeholder="Entrez le mot de passe administrateur"
                />
              </div>
              
              <div className="flex justify-center">
                <button type="submit" className="btn-primary">
                  Se connecter
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
            
            <h2 className="mb-4">Détails par œuvre</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.artworkId} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedArtwork(stat.artworkId)}>
                  <h3 className="text-lg font-medium mb-1">{stat.title}</h3>
                  <p className="text-gray-600 mb-3">par {stat.artist}</p>
                  
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
            
            {selectedArtwork && (
              <div className="card mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2>
                    Détails - {stats.find(s => s.artworkId === selectedArtwork)?.title}
                  </h2>
                  <button 
                    onClick={() => setSelectedArtwork(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Fermer
                  </button>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Répartition des groupes</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getGroupSizeData(selectedArtwork)}
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
