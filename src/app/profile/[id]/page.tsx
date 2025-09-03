
'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme } from '@/lib/types';
import { Github, Linkedin, Link2, Twitter } from 'lucide-react';
import ProfilePreview from '@/components/ProfilePreview';
import { KLogo } from '@/components/KLogo';

const iconMap: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
  Twitter,
  Link2,
};

// A helper function to reconstruct the icon components from strings
const hydrateLinks = (links: any[]): Link[] => {
  return links.map(link => {
    const IconComponent = Object.values(iconMap).find(
      icon => icon.displayName === link.icon?.displayName
    );
    // Find the icon in the map based on its name if it exists
    const linkIconName = (link.icon as any)?.displayName?.replace('LucideIcon', '');
    const foundIcon = linkIconName ? iconMap[linkIconName] : Link2;

    return {
      ...link,
      icon: foundIcon || Link2,
    };
  });
};


export default function PublicProfilePage() {
  const [data, setData] = useState<{
    profile: Profile;
    links: Link[];
    theme: PageTheme;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('karhamelo-page-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // We need to re-hydrate the links to convert icon names back to components
        const hydratedLinks = hydrateLinks(parsedData.links);
        setData({ ...parsedData, links: hydratedLinks });
      } catch (error) {
        console.error("Failed to parse page data from localStorage", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <KLogo />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
        <KLogo />
        <h1 className="mt-8 text-2xl font-bold">Página não encontrada</h1>
        <p className="text-muted-foreground">Não foi possível carregar os dados do perfil.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: data.theme.backgroundColor }}>
      <ProfilePreview profile={data.profile} links={data.links} theme={data.theme} />
       <footer className="w-full py-6 mt-auto absolute bottom-4">
        <div className="container mx-auto text-center text-muted-foreground/80">
          <p>
            Powered by{' '}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary/80 hover:underline"
            >
              Karhamelo
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
