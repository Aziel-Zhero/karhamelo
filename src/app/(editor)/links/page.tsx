'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme, PageData, Portfolio } from '@/lib/types';
import LinkEditor from '@/components/LinkEditor';
import { Eye, UploadCloud, Copy, Loader2 } from 'lucide-react';
import LinkList from '@/components/LinkList';
import ProfilePreview from '@/components/ProfilePreview';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ProfileEditor from '@/components/ProfileEditor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { loadPageData, savePageData } from '@/lib/data-services';


export default function LinksPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  
  const publicUrl = typeof window !== 'undefined' && userId ? `${window.location.origin}/profile/${userId}` : '';

  const [profile, setProfile] = useState<Profile>({
    name: '',
    bio: '',
    avatarUrl: '',
  });

  const [links, setLinks] = useState<Link[]>([]);
  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
    buttonStyle: 'filled',
    buttonRadius: 'full',
    buttonShadow: true,
  });
  
  // Dummy state needed for ThemeCustomizer
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);


  useEffect(() => {
    const fetchUserAndData = async () => {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserId(user.id);
            const pageData = await loadPageData(user.id);
            if(pageData) {
                setProfile(pageData.profile);
                setLinks(pageData.links);
                setTheme(pageData.theme);
                setPortfolio(pageData.portfolio);

                // Heuristic to check if it has been published before
                if (pageData.links.length > 0 || pageData.profile.bio) {
                  setIsPublished(true);
                }
            }
        }
        setIsLoading(false);
    };
    fetchUserAndData();
  }, [supabase]);
  
  const handlePublish = async () => {
    if (!userId || !portfolio) return;
    setIsSaving(true);
    try {
      const pageData: PageData = { profile, links, theme, portfolio };
      await savePageData(userId, pageData);
      setIsPublished(true);
      toast({
        title: 'Página Publicada!',
        description: 'Sua página de links está no ar e o link pode ser compartilhado.',
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Erro ao publicar!',
        description: error instanceof Error ? error.message : 'Não foi possível salvar os dados.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: 'Link Copiado!',
      description: 'O link para sua página foi copiado para a área de transferência.',
    });
  };

  const addLink = (link: Omit<Link, 'id' | 'click_count'>) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID(), click_count: 0 }]);
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
    if (!userId) return;
    // We need to save draft data to localStorage for the preview page to access it
    const pageData = { profile, links, theme };
    localStorage.setItem('karhamelo-preview-data', JSON.stringify(pageData));
    window.open(`/profile/preview`, '_blank');
  };
  
  const updateFullProfile = (newProfile: Profile) => {
    setProfile(newProfile);
  };

  const updateTheme = (newTheme: PageTheme) => {
    setTheme(newTheme);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">Editor de Links</h1>
          <p className="text-sm text-muted-foreground">Adicione e gerencie os links da sua página principal.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleViewPreview} disabled={!userId}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Preview
            </Button>
            <Button onClick={handlePublish} disabled={!userId || isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UploadCloud className="mr-2 h-4 w-4" />
              )}
              {isSaving ? 'Publicando...' : 'Publicar'}
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
                      <Button onClick={handleCopyLink} variant="outline" size="icon" disabled={!publicUrl}>
                          <Copy className="h-4 w-4" />
                      </Button>
                  </div>
              </CardContent>
          </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <ProfileEditor profile={profile} onProfileChange={updateFullProfile} />
          <LinkEditor onAddLink={addLink} />
          <LinkList
            links={links}
            onUpdateLink={updateLink}
            onDeleteLink={deleteLink}
          />
          <ThemeCustomizer
            currentTheme={theme}
            onThemeChange={updateTheme}
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
