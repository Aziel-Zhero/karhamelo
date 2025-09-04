
'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme } from '@/lib/types';
import LinkEditor from '@/components/LinkEditor';
import { Eye, Link as LinkIcon, Briefcase, Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Link2, UploadCloud, Copy } from 'lucide-react';
import LinkList from '@/components/LinkList';
import ProfilePreview from '@/components/ProfilePreview';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ProfileEditor from '@/components/ProfileEditor';
import { Button } from '@/components/ui/button';
import { allIconsMap } from '@/lib/icon-map';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const iconMap: { [key: string]: React.ElementType } = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Link2,
};

const hydrateLinks = (links: any[]): Link[] => {
  return links.map(link => {
    const iconName = typeof link.icon === 'string' ? link.icon : 'Link2';
    const IconComponent = allIconsMap[iconName]?.component || Link2;
    return {
      ...link,
      icon: IconComponent,
    };
  });
};

const serializeLinks = (links: Link[]): any[] => {
    return links.map(link => {
        const iconName = Object.keys(allIconsMap).find(key => allIconsMap[key].component === link.icon) || 'link';
        return {
            ...link,
            icon: iconName
        };
    });
};


export default function LinksPage() {
  const { toast } = useToast();
  const [isPublished, setIsPublished] = useState(false);
  
  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/karhamelo-user` : '';

  const [profile, setProfile] = useState<Profile>({
    name: 'Karhamelo',
    bio: 'Seu hub de links em uma única página, lindamente personalizado. Construído com Next.js e ❤️.',
    avatarUrl: 'https://picsum.photos/128/128',
    isPortfolioLinkEnabled: true,
    socialLinks: {
      github: 'https://github.com/karhamelo',
      twitter: 'https://twitter.com/karhamelo',
      linkedin: 'https://linkedin.com/in/karhamelo',
    },
  });

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Meu Website',
      url: 'https://example.com',
      icon: LinkIcon,
      clickCount: 0,
    },
    { id: '2', title: 'Meu Blog', url: 'https://example.com/blog', icon: LinkIcon, clickCount: 0 },
  ]);

  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
    buttonStyle: 'filled',
    buttonRadius: 'full',
    buttonShadow: true,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('karhamelo-page-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setProfile(parsedData.profile);
        setLinks(hydrateLinks(parsedData.links));
        setTheme(parsedData.theme);
      } catch (e) {
        console.error("Failed to parse page data from localStorage", e);
      }
    }
    const publishedData = localStorage.getItem('karhamelo-published-data');
    if (publishedData) {
      setIsPublished(true);
    }
  }, []);

  useEffect(() => {
    const pageData = { 
        profile, 
        links: serializeLinks(links), 
        theme 
    };
    localStorage.setItem('karhamelo-page-data', JSON.stringify(pageData));
  }, [profile, links, theme]);
  
  const handlePublish = () => {
    const pageData = { profile, links: serializeLinks(links), theme };
    localStorage.setItem('karhamelo-published-data', JSON.stringify(pageData));
    setIsPublished(true);
    toast({
      title: 'Página Publicada!',
      description: 'Sua página de links está no ar e o link pode ser compartilhado.',
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: 'Link Copiado!',
      description: 'O link para sua página foi copiado para a área de transferência.',
    });
  };

  const addLink = (link: Omit<Link, 'id' | 'clickCount'>) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID(), clickCount: 0 }]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };
  
  const onLinkClick = (clickedLink: Link) => {
     // This only simulates clicks in the preview
  }

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };
  
  const handleViewPreview = () => {
    // Uses the draft data for previewing
    window.open('/profile/preview', '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">Editor de Links</h1>
          <p className="text-sm text-muted-foreground">Adicione e gerencie os links da sua página principal.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleViewPreview}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Preview
            </Button>
            <Button onClick={handlePublish}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Publicar
            </Button>
        </div>
      </div>
      
      {isPublished && (
          <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                  <CardTitle className="text-lg">Sua página está no ar!</CardTitle>
                  <CardDescription>Compartilhe este link com seu público.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center space-x-2">
                      <Input value={publicUrl} readOnly />
                      <Button onClick={handleCopyLink} variant="outline" size="icon">
                          <Copy className="h-4 w-4" />
                      </Button>
                  </div>
              </CardContent>
          </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <ProfileEditor profile={profile} onProfileChange={setProfile} />
          <LinkEditor onAddLink={addLink} />
          <LinkList
            links={links}
            onUpdateLink={updateLink}
            onDeleteLink={deleteLink}
          />
          <ThemeCustomizer
            currentTheme={theme}
            onThemeChange={setTheme}
            profile={profile}
            links={links}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-4 text-center lg:text-left">
              Pré-visualização
            </h2>
            <ProfilePreview profile={profile} links={links} theme={theme} onLinkClick={onLinkClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
