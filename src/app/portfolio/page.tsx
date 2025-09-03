
'use client';

import { useState, useEffect } from 'react';
import type { Portfolio, PageTheme } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { KLogo } from '@/components/KLogo';
import { Mail, ArrowRight, Check, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ctaIconsMap, featureIconsMap } from '@/lib/icon-map';


export default function PublicPortfolioPage() {
  const [data, setData] = useState<{ portfolio: Portfolio; theme: PageTheme } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('karhamelo-portfolio-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse portfolio data from localStorage", error);
      }
    }
    setIsLoading(false);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    toast({
        title: 'Obrigado!',
        description: `Enviaremos o acesso para: ${email}`,
    });
    (e.target as HTMLFormElement).reset();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse"><KLogo /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
        <KLogo />
        <h1 className="mt-8 text-2xl font-bold">Página não encontrada</h1>
        <p className="text-muted-foreground">Não foi possível carregar os dados do portfólio.</p>
      </div>
    );
  }

  const { portfolio, theme } = data;
  const CtaIcon = ctaIconsMap[portfolio.ctaButtonIcon || 'arrowRight'].component;


  const customStyle = {
    '--custom-primary-hsl': theme.primaryColor.startsWith('hsl') ? theme.primaryColor.replace('hsl(','').replace(')','') : '199 76% 52%',
    '--custom-primary': theme.primaryColor,
    '--custom-bg': theme.backgroundColor,
    '--custom-accent': theme.accentColor,
  } as React.CSSProperties;

  const primaryColorForGradient = `hsl(var(--custom-primary-hsl))`;

  return (
    <div style={customStyle} className="bg-[var(--custom-bg)] text-foreground antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-extrabold text-xl">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: 'var(--custom-primary)'}}>K</span>
                    <span>Karhamelo</span>
                </a>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {portfolio.isFeaturesEnabled && <a href="#beneficios" className="hover:text-[var(--custom-primary)]">Benefícios</a>}
                    {portfolio.isHowItWorksEnabled && <a href="#como-funciona" className="hover:text-[var(--custom-primary)]">Como funciona</a>}
                    <a href="#cta" className="hover:text-[var(--custom-primary)]">Começar</a>
                </nav>
                <div className="hidden md:flex items-center gap-3">
                     <Button asChild style={{ backgroundColor: 'var(--custom-primary)', color: 'white' }}><a href={portfolio.ctaButtonUrl}>{portfolio.ctaButtonText}</a></Button>
                </div>
                 <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="md:hidden">
                    {isMenuOpen ? <X /> : <Menu />}
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </div>
             {isMenuOpen && (
                <div className="md:hidden pb-4">
                    <nav className="flex flex-col gap-2 text-sm font-medium">
                       {portfolio.isFeaturesEnabled && <a href="#beneficios" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Benefícios</a>}
                        {portfolio.isHowItWorksEnabled && <a href="#como-funciona" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Como funciona</a>}
                        <a href="#cta" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Começar</a>
                    </nav>
                </div>
            )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background/50">
            <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(135deg, var(--custom-accent), var(--custom-primary))`}}/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                         <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {portfolio.title}
                        </h1>
                        <p className="mt-4 text-muted-foreground text-lg">
                           {portfolio.description}
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Button asChild size="lg" className="px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: 'var(--custom-primary)'}}>
                                <a href={portfolio.ctaButtonUrl}>
                                  {portfolio.ctaButtonText}
                                  <CtaIcon className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                        <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Checkout Rápido</div>
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> 100% Customizável</div>
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Analytics</div>
                        </div>
                    </div>
                     <div className="relative">
                        <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-30" style={{background: `radial-gradient(600px 200px at 70% 10%, var(--custom-accent), transparent), radial-gradient(400px 120px at 10% 80%, var(--custom-primary), transparent)`}}></div>
                         {portfolio.imageUrl && <Image src={portfolio.imageUrl} alt={portfolio.title} width={1200} height={800} className="relative rounded-3xl shadow-2xl ring-1 ring-black/5" data-ai-hint="website product screenshot" />}
                    </div>
                </div>
            </div>
        </section>
        
        {/* Benefícios / Cards */}
        {portfolio.isFeaturesEnabled && (
            <section id="beneficios" className="py-16 lg:py-24" style={{backgroundColor: `hsl(var(--custom-primary-hsl) / 0.05)`}}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-extrabold">Tudo que você precisa</h2>
                        <p className="mt-3 text-muted-foreground">Ferramentas poderosas e simples de usar para mostrar seu trabalho.</p>
                    </div>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => {
                        const Icon = featureIconsMap[feature.icon || 'seller']?.component || featureIconsMap['seller'].component;
                        return (
                        <Card key={index} className="bg-background/80">
                            <CardContent className="p-6">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center" style={{backgroundColor: `hsl(var(--custom-primary-hsl) / 0.1)`, color: `hsl(var(--custom-primary-hsl))`}}><Icon /></div>
                                <h3 className="mt-4 font-bold text-lg">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    )})}
                    </div>
                </div>
            </section>
        )}

        {/* Como Funciona */}
        {portfolio.isHowItWorksEnabled && (
            <section id="como-funciona" className="py-16 lg:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold">{portfolio.howItWorksTitle}</h2>
                            <p className="mt-3 text-muted-foreground">{portfolio.howItWorksDescription}</p>
                            <ol className="mt-6 space-y-4">
                                {Array.isArray(portfolio.steps) && portfolio.steps.map((step, index) => (
                                    <li key={index} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-lg text-white flex-shrink-0 flex items-center justify-center font-bold" style={{backgroundColor: 'var(--custom-primary)'}}>{index + 1}</div>
                                        <div><h3 className="font-bold">{step.title}</h3><p className="text-muted-foreground">{step.description}</p></div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className="relative">
                            {portfolio.howItWorksImageUrl && <Image src={portfolio.howItWorksImageUrl} width={1200} height={1000} alt="Fluxo de trabalho" className="rounded-3xl shadow-2xl ring-1 ring-black/5" data-ai-hint="team workflow" />}
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Gallery Carousel */}
        {portfolio.isGalleryEnabled && portfolio.projects && portfolio.projects.length > 0 && (
          <section id="gallery" className="py-16 lg:py-24" style={{backgroundColor: `hsl(var(--custom-primary-hsl) / 0.05)`}}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-extrabold">{portfolio.galleryTitle}</h2>
                      <p className="mt-3 text-muted-foreground">{portfolio.galleryDescription}</p>
                  </div>
                  <div className="mt-10">
                      <Carousel
                        opts={{
                          align: "start",
                          loop: true,
                        }}
                        className="w-full"
                      >
                        <CarouselContent>
                          {portfolio.projects.map((project) => (
                            <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1">
                                <Card>
                                  <CardContent className="flex flex-col aspect-square items-center justify-center p-0 rounded-lg overflow-hidden">
                                     <Image src={project.imageUrl} alt={project.title} width={800} height={600} className="w-full h-full object-cover"/>
                                     <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                     </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                  </div>
              </div>
          </section>
        )}

        {/* CTA banner */}
        <section id="cta" className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6" style={{background: `linear-gradient(135deg, var(--custom-accent), var(--custom-primary))`}}>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-extrabold">{portfolio.ctaBannerTitle}</h3>
                        <p className="mt-2 text-white/90">{portfolio.ctaBannerDescription}</p>
                    </div>
                     <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold flex-shrink-0"><a href="#">{portfolio.ctaBannerButtonText} <ArrowRight className="ml-2"/></a></Button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
       <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                     <a href="#" className="flex items-center gap-2 font-extrabold text-xl">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: 'var(--custom-primary)'}}>K</span>
                        <span>Karhamelo</span>
                    </a>
                    <p className="mt-3 text-sm text-muted-foreground">A forma mais doce de criar seu espaço na web. Simples, seguro e escalável.</p>
                </div>
                <div>
                    <div className="font-semibold">Produto</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="#beneficios" className="hover:text-[var(--custom-primary)]">Funcionalidades</a></li>
                        <li><a href="#como-funciona" className="hover:text-[var(--custom-primary)]">Como funciona</a></li>
                        <li><a href="#cta" className="hover:text-[var(--custom-primary)]">Começar</a></li>
                    </ul>
                </div>
                 <div>
                    <div className="font-semibold">Recursos</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-[var(--custom-primary)]">Documentação</a></li>
                        <li><a href="#" className="hover:text-[var(--custom-primary)]">Status</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold">Fale conosco</div>
                     <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="mailto:contato@karhamelo.app" className="hover:text-[var(--custom-primary)]">contato@karhamelo.app</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Karhamelo — Todos os direitos reservados.</p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-[var(--custom-primary)]">Termos</a>
                    <a href="#" className="hover:text-[var(--custom-primary)]">Privacidade</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
}
