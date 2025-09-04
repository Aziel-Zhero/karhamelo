
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { KLogo } from '@/components/KLogo';
import { ArrowRight, CheckCircle, Star, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <KLogo />
          <span className="font-bold text-xl">Karhamelo</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Criar Conta</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32 container mx-auto px-6" aria-labelledby="main-heading">
          <div className="max-w-4xl mx-auto">
            <h1 id="main-heading" className="text-4xl lg:text-6xl font-extrabold tracking-tight">
              Seu universo de links em um só lugar.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Crie uma página de links personalizada, um portfólio profissional e gerencie tudo em uma plataforma simples e poderosa. Karhamelo é a forma mais doce de marcar sua presença online.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Comece Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Image Preview Section */}
        <section className="container mx-auto px-6" aria-label="Pré-visualização da plataforma">
           <div className="relative">
              <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br from-accent to-primary"></div>
              <Image 
                src="https://picsum.photos/seed/landing-hero/1200/600" 
                alt="Pré-visualização de uma página de links criada com Karhamelo" 
                width={1200} 
                height={600} 
                className="relative rounded-2xl shadow-2xl ring-1 ring-black/5 mx-auto"
                data-ai-hint="link in bio screenshot"
                priority
              />
           </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 container mx-auto px-6" aria-labelledby="features-heading">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl lg:text-4xl font-bold">Tudo que você precisa para crescer</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Ferramentas intuitivas para você criar, personalizar e analisar sua presença online sem complicações.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Links Personalizados</h3>
              <p className="text-muted-foreground">
                Adicione quantos links quiser e personalize a aparência da sua página com temas, cores e fontes.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg">
                  <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Portfólio Profissional (LP)</h3>
              <p className="text-muted-foreground">
                Crie uma Landing Page completa para mostrar seus projetos, serviços e habilidades com um visual incrível.
              </p>
            </div>
            <div className="space-y-3">
              <div className="inline-flex p-3 bg-primary/10 rounded-lg">
                  <BarChart2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics Simples</h3>
              <p className="text-muted-foreground">
                Acompanhe as visualizações do seu perfil e os cliques em seus links para entender o que mais atrai seu público.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Karhamelo. Todos os direitos reservados.</p>
           <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="/termos" className="hover:text-primary">Termos</Link>
              <Link href="/privacidade" className="hover:text-primary">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
