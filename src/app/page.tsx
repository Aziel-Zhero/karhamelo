
'use client';

import { useState } from 'react';
import type { Link, Profile, PageTheme, Portfolio } from '@/lib/types';
import Header from '@/components/Header';
import LinkEditor from '@/components/LinkEditor';
import { Github, Linkedin, Link2 as LinkIcon, Twitter } from 'lucide-react';
import LinkList from '@/components/LinkList';
import ProfilePreview from '@/components/ProfilePreview';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ProfileEditor from '@/components/ProfileEditor';
import Footer from '@/components/Footer';
import { KLogo } from '@/components/KLogo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioEditor from '@/components/PortfolioEditor';
import PortfolioPreview from '@/components/PortfolioPreview';

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Karhamelo',
    bio: 'Seu hub de links em uma única página, lindamente personalizado. Construído com Next.js e ❤️.',
    avatarUrl: 'https://picsum.photos/128/128',
  });

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Meu Website',
      url: 'https://example.com',
      icon: LinkIcon,
    },
    { id: '2', title: 'GitHub', url: 'https://github.com', icon: Github },
    { id: '3', title: 'Twitter', url: 'https://twitter.com', icon: Twitter },
    {
      id: '4',
      title: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
    },
  ]);

  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
  });

  const [portfolio, setPortfolio] = useState<Portfolio>({
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
    ctaBannerTitle: 'Pronto para criar seu espaço?',
    ctaBannerDescription: 'Crie sua conta em menos de 2 minutos e comece a divulgar.',
    ctaBannerButtonText: 'Começar agora',
  });


  const addLink = (link: Omit<Link, 'id'>) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID() }]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };
  
  const handleViewPage = (page: 'links' | 'portfolio') => {
    if (page === 'links') {
      const pageData = {
        profile,
        links,
        theme,
      };
      localStorage.setItem('karhamelo-page-data', JSON.stringify(pageData));
      window.open('/profile/preview', '_blank');
    } else {
      localStorage.setItem('karhamelo-portfolio-data', JSON.stringify({portfolio, theme}));
      window.open('/portfolio', '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onViewPage={handleViewPage} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="links">Página de Links</TabsTrigger>
            <TabsTrigger value="portfolio">LP de Portfólio</TabsTrigger>
          </TabsList>
          <TabsContent value="links">
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
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
                  <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                    Pré-visualização Ao Vivo
                  </h2>
                  <ProfilePreview profile={profile} links={links} theme={theme} />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="portfolio">
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
              <div className="lg:col-span-3">
                 <PortfolioEditor portfolio={portfolio} onPortfolioChange={setPortfolio} />
              </div>
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-24">
                  <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
                    Pré-visualização Ao Vivo
                  </h2>
                  <PortfolioPreview portfolio={portfolio} theme={theme} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
