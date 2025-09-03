
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

// Icons for feature cards (as inline SVGs for simplicity)
const SellerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const CheckoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>;
const CatalogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"></path><path d="M15 2v20"></path><path d="M15 7h-5"></path></svg>;

const featureIcons = [<SellerIcon key="1"/>, <CheckoutIcon key="2"/>, <CatalogIcon key="3"/>];

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

  const customStyle = {
    '--custom-primary-hsl': theme.primaryColor.startsWith('hsl') ? theme.primaryColor.replace('hsl(','').replace(')','') : '199 76% 52%',
    '--custom-primary': theme.primaryColor,
    '--custom-bg': theme.backgroundColor,
  } as React.CSSProperties;

  const primaryColorForGradient = `hsl(var(--custom-primary-hsl))`;

  return (
    <div style={customStyle} className="bg-background text-foreground antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <a href="#" className="flex items-center gap-2 font-extrabold text-xl">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: primaryColorForGradient}}>K</span>
                    <span>Karhamelo</span>
                </a>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#beneficios" className="hover:text-primary">Benefícios</a>
                    <a href="#como-funciona" className="hover:text-primary">Como funciona</a>
                    <a href="#cta" className="hover:text-primary">Começar</a>
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
                       <a href="#beneficios" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Benefícios</a>
                        <a href="#como-funciona" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Como funciona</a>
                        <a href="#cta" onClick={()=>setIsMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted">Começar</a>
                    </nav>
                </div>
            )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background/50">
            <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(135deg, ${theme.accentColor}, ${theme.primaryColor})`}}/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
                 <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                         <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            {portfolio.title}
                        </h1>
                        <p className="mt-4 text-muted-foreground text-lg">
                           {portfolio.description}
                        </p>
                        <form onSubmit={handleContactSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Input required type="email" name="email" placeholder="Seu melhor e-mail" className="w-full sm:w-80 px-4 py-3 rounded-xl border-border focus:outline-none focus:ring-2 focus:ring-ring" />
                            <Button type="submit" className="px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: 'var(--custom-primary)'}}>
                                {portfolio.ctaButtonText}
                            </Button>
                        </form>
                        <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Checkout Rápido</div>
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> 100% Customizável</div>
                            <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Analytics</div>
                        </div>
                    </div>
                     <div className="relative">
                        <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-30" style={{background: `radial-gradient(600px 200px at 70% 10%, ${theme.accentColor}, transparent), radial-gradient(400px 120px at 10% 80%, ${theme.primaryColor}, transparent)`}}></div>
                        <Image src={portfolio.imageUrl} alt={portfolio.title} width={1200} height={800} className="relative rounded-3xl shadow-2xl ring-1 ring-black/5" data-ai-hint="website product screenshot" />
                    </div>
                </div>
            </div>
        </section>
        
        {/* Benefícios / Cards */}
        <section id="beneficios" className="py-16 lg:py-24" style={{backgroundColor: `hsl(var(--custom-primary-hsl) / 0.05)`}}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold">Tudo que você precisa</h2>
                    <p className="mt-3 text-muted-foreground">Ferramentas poderosas e simples de usar para mostrar seu trabalho.</p>
                </div>
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => (
                     <Card key={index} className="bg-background/80">
                        <CardContent className="p-6">
                             <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">{featureIcons[index % featureIcons.length]}</div>
                            <h3 className="mt-4 font-bold text-lg">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                   ))}
                </div>
            </div>
        </section>

        {/* Como Funciona */}
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
                        <Image src={portfolio.howItWorksImageUrl} width={1200} height={1000} alt="Fluxo de trabalho" className="rounded-3xl shadow-2xl ring-1 ring-black/5" data-ai-hint="team workflow" />
                    </div>
                </div>
            </div>
        </section>

        {/* CTA banner */}
        <section id="cta" className="py-12" style={{backgroundColor: `hsl(var(--custom-primary-hsl) / 0.05)`}}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6" style={{background: `linear-gradient(135deg, ${theme.accentColor}, ${theme.primaryColor})`}}>
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
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: primaryColorForGradient}}>K</span>
                        <span>Karhamelo</span>
                    </a>
                    <p className="mt-3 text-sm text-muted-foreground">A forma mais doce de criar seu espaço na web. Simples, seguro e escalável.</p>
                </div>
                <div>
                    <div className="font-semibold">Produto</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="#beneficios" className="hover:text-primary">Funcionalidades</a></li>
                        <li><a href="#como-funciona" className="hover:text-primary">Como funciona</a></li>
                        <li><a href="#cta" className="hover:text-primary">Começar</a></li>
                    </ul>
                </div>
                 <div>
                    <div className="font-semibold">Recursos</div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-primary">Documentação</a></li>
                        <li><a href="#" className="hover:text-primary">Status</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold">Fale conosco</div>
                     <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li><a href="mailto:contato@karhamelo.app" className="hover:text-primary">contato@karhamelo.app</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Karhamelo — Todos os direitos reservados.</p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-primary">Termos</a>
                    <a href="#" className="hover:text-primary">Privacidade</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  );
}
