'use client';

import { useState, useEffect } from 'react';
import type { Link } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link as LinkIcon, MousePointerClick, Users, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { loadPageData } from '@/lib/data-services';

export default function DashboardPage() {
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [profileViews, setProfileViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if(user) {
        const pageData = await loadPageData(user.id);
        if (pageData) {
            const links = pageData.links || [];
            setTotalLinks(links.length);
            const clicks = links.reduce((acc, link) => acc + (link.click_count || 0), 0);
            setTotalClicks(clicks);
             // Since profile views are not stored in the DB for this prototype,
             // we'll simulate it by reading from localStorage.
             // In a real app, this would be a value from your database.
            const views = parseInt(localStorage.getItem(`karhamelo-profile-views-${user.id}`) || '0', 10);
            setProfileViews(views);
        }
      }
      setIsLoading(false);
    };

    fetchStats();
  }, [supabase]);

  if (isLoading) {
    return (
       <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
