
'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme, Portfolio } from '@/lib/types';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import PortfolioEditor from '@/components/PortfolioEditor';
import PortfolioPreview from '@/components/PortfolioPreview';
import { Button } from '@/components/ui/button';
import { Eye, UploadCloud, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function PortfolioEditorPage() {
  const { toast } = useToast();
  const [isPublished, setIsPublished] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  const publicUrl = typeof window !== 'undefined' && userId ? `${window.location.origin}/portfolio/${userId}` : '';

  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
    buttonStyle: 'filled',
    buttonRadius: 'full',
    buttonShadow: true,
  });

  const [portfolio, setPortfolio] = useState<Portfolio>({
    logoType: 'text',
    logoText: 'Karhamelo',
    title: 'Venda tudo em um só lugar',
    description: 'Lance seu marketplace com checkout rápido, gestão de sellers, vitrine moderna e integração simples.',
    imageUrl: 'https://picsum.photos/1200/800',
    ctaButtonText: 'Criar minha conta',
    ctaButtonUrl: '#contact',
    isFeaturesEnabled: true,
    features: [
      { title: 'Mostre seu Trabalho', description: 'Convide, aprove e gerencie lojistas com comissões, estoque e contratos.' },
      { title: 'Checkout Ultra-rápido', description: 'Pix, cartão e boleto com antifraude e split de pagamento automático.' },
      { title: 'Catálogo Inteligente', description: 'Variações, kits, SEO automático e vitrines personalizáveis por seller.' },
    ],
    isHowItWorksEnabled: true,
    howItWorksTitle: 'Comece em 3 passos',
    howItWorksDescription: 'Um fluxo simples para tirar sua ideia do papel rapidamente.',
    steps: [
      { title: 'Crie sua Conta', description: 'Personalize sua marca e detalhes.' },
      { title: 'Adicione seu Conteúdo', description: 'Faça upload de projetos, links e informações.' },
      { title: 'Publique e Divulgue', description: 'Compartilhe sua nova página com o mundo.' },
    ],
    howItWorksImageUrl: 'https://picsum.photos/seed/workflow/1200/1000',
    isGalleryEnabled: true,
    galleryTitle: 'Conheça nossos projetos',
    galleryDescription: 'Veja alguns dos marketplaces incríveis que nossos clientes criaram com a Karhamelo.',
    projects: [
      { id: 'proj1', title: 'Marketplace de Arte Local', imageUrl: 'https://picsum.photos/seed/proj1/800/600' },
      { id: 'proj2', title: 'Loja de Produtos Orgânicos', imageUrl: 'https://picsum.photos/seed/proj2/800/600' },
      { id: 'proj3', title: 'Plataforma de Cursos Online', imageUrl: 'https://picsum.photos/seed/proj3/800/600' },
      { id: 'proj4', title: 'Brechó de Luxo Colaborativo', imageUrl: 'https://picsum.photos/seed/proj4/800/600' },
    ],
    isCtaBannerEnabled: true,
    ctaBannerTitle: 'Pronto para criar seu espaço?',
    ctaBannerDescription: 'Crie sua conta em menos de 2 minutos e comece a divulgar.',
    ctaBannerButtonText: 'Começar agora',
  });

  // Note: These are dummy states needed by ThemeCustomizer
  const [profile] = useState<Profile>({name: '', bio: '', avatarUrl: ''});
  const [links] = useState<Link[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
     const fetchUserAndData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserId(user.id);
        }

        const storedData = localStorage.getItem('karhamelo-portfolio-data');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setPortfolio(parsedData.portfolio);
            setTheme(parsedData.theme);
          } catch (e) {
            console.error("Failed to parse portfolio data from localStorage", e);
          }
        }

        const publishedData = localStorage.getItem('karhamelo-published-portfolio-data');
        if(publishedData) {
          setIsPublished(true);
        }
    };
    fetchUserAndData();
  }, [supabase]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const portfolioData = { portfolio, theme };
    localStorage.setItem('karhamelo-portfolio-data', JSON.stringify(portfolioData));
  }, [portfolio, theme]);
  
  const handlePublish = () => {
    const portfolioData = { portfolio, theme };
    localStorage.setItem('karhamelo-published-portfolio-data', JSON.stringify(portfolioData));
    setIsPublished(true);
    toast({
      title: 'Portfólio Publicado!',
      description: 'Sua página de portfólio está no ar e o link pode ser compartilhado.',
    });
  };

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: 'Link Copiado!',
      description: 'O link para seu portfólio foi copiado para a área de transferência.',
    });
  };


  const handleViewPreview = () => {
    if (!userId) return;
    window.open(`/portfolio/preview`, '_blank');
  };

  return (
     <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold">Editor de Portfólio (LP)</h1>
          <p className="text-sm text-muted-foreground">Personalize o conteúdo e a aparência da sua Landing Page.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleViewPreview} disabled={!userId}>
              <Eye className="mr-2 h-4 w-4" />
              Ver Preview
            </Button>
             <Button onClick={handlePublish} disabled={!userId}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Publicar
            </Button>
        </div>
      </div>

       {isPublished && (
          <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                  <CardTitle className="text-lg">Seu portfólio está no ar!</CardTitle>
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
            <PortfolioEditor portfolio={portfolio} onPortfolioChange={setPortfolio} />
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
            <PortfolioPreview portfolio={portfolio} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}
