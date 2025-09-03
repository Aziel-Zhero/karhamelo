
'use client';

import { useState, useEffect } from 'react';
import type { Portfolio, PageTheme } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { KLogo } from '@/components/KLogo';
import { Mail, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

export default function PublicPortfolioPage() {
  const [data, setData] = useState<{ portfolio: Portfolio; theme: PageTheme } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. I'll get back to you soon.",
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
    '--custom-primary': theme.primaryColor,
    '--custom-bg': theme.backgroundColor,
  } as React.CSSProperties;

  return (
    <div style={customStyle} className="bg-[var(--custom-bg)] text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <KLogo />
        <Button asChild style={{ backgroundColor: 'var(--custom-primary)', color: 'white' }}>
            <a href={portfolio.ctaButtonUrl}>
                {portfolio.ctaButtonText} <ArrowRight className="ml-2" />
            </a>
        </Button>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {portfolio.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            {portfolio.description}
          </p>
          <div className="mt-10">
            <Button size="lg" asChild style={{ backgroundColor: 'var(--custom-primary)', color: 'white' }}>
              <a href={portfolio.ctaButtonUrl}>{portfolio.ctaButtonText}</a>
            </Button>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-12">
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <Image
                src={portfolio.imageUrl}
                alt={portfolio.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                data-ai-hint="website product screenshot"
            />
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 lg:py-24">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-bold text-center mb-2">Entre em contato</h2>
                        <p className="text-center text-muted-foreground mb-8">Envie uma mensagem e vamos conversar.</p>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                            <Input type="text" placeholder="Seu Nome" required />
                            <Input type="email" placeholder="Seu E-mail" required />
                            <Textarea placeholder="Sua Mensagem" required rows={5} />
                            <Button type="submit" className="w-full" style={{ backgroundColor: 'var(--custom-primary)', color: 'white' }}>
                                <Mail className="mr-2"/> Enviar Mensagem
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>

      <footer className="w-full py-6 mt-auto">
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
    </div>
  );
}
