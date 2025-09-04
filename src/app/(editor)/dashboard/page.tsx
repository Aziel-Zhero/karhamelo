
'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link as LinkIcon, MousePointerClick, Users } from 'lucide-react';

export default function DashboardPage() {
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [profileViews, setProfileViews] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem('karhamelo-page-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData) as { links: Link[], profile: Profile };
        const links = parsedData.links || [];
        setTotalLinks(links.length);

        const clicks = links.reduce((acc, link) => acc + (link.clickCount || 0), 0);
        setTotalClicks(clicks);

      } catch (error) {
        console.error("Failed to parse page data from localStorage", error);
      }
    }
    
    // Simulating profile views
    const views = parseInt(localStorage.getItem('karhamelo-profile-views') || '0', 10);
    setProfileViews(views);

  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Links Ativos</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLinks}</div>
            <p className="text-xs text-muted-foreground">
              Total de links no seu perfil
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques Totais</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              Soma de todos os cliques nos seus links
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visualizações do Perfil</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileViews}</div>
            <p className="text-xs text-muted-foreground">
              Total de visitas na sua página de links
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
