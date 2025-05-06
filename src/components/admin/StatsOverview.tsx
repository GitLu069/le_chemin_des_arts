
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

interface StatsOverviewProps {
  stats: any[];
  onLocationSelect: (locationId: number) => void;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats, onLocationSelect }) => {
  const getChartData = () => {
    return stats.map(stat => ({
      name: stat.title.length > 15 ? stat.title.substring(0, 15) + '...' : stat.title,
      visiteurs: stat.totalVisitors,
      note: parseFloat(stat.avgRating.toFixed(1))
    }));
  };

  return (
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
          <Card 
            key={stat.locationId} 
            className="hover:shadow-md transition-shadow cursor-pointer" 
            onClick={() => onLocationSelect(stat.locationId)}
          >
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default StatsOverview;
