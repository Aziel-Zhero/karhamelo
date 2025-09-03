
import type { Portfolio, PageTheme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ctaIconsMap, featureIconsMap } from '@/lib/icon-map';


interface PortfolioPreviewProps {
  portfolio: Portfolio;
  theme: PageTheme;
}

export default function PortfolioPreview({
  portfolio,
  theme,
}: PortfolioPreviewProps) {
  const customStyle = {
    '--preview-bg': theme.backgroundColor,
    '--preview-primary': theme.primaryColor,
    '--preview-primary-hsl': theme.primaryColor.startsWith('hsl') ? theme.primaryColor.replace('hsl(','').replace(')','') : '199 76% 52%',
    '--preview-accent': theme.accentColor,
  } as React.CSSProperties;

  const CtaIcon = ctaIconsMap[portfolio.ctaButtonIcon || 'arrowRight'].component;


  return (
    <div
      className="relative aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2rem] border-8 sm:border-[10px] border-black bg-[var(--preview-bg)] overflow-hidden shadow-2xl"
      style={customStyle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 sm:h-5 bg-black rounded-b-lg z-20"></div>
      <div className="absolute inset-0 overflow-y-auto scrollbar-hide text-[5px] sm:text-[6px] leading-tight">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200">
            <div className="flex h-8 items-center justify-between px-2">
                <div className="flex items-center gap-1 font-extrabold text-[8px]">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-md text-white" style={{backgroundColor: 'var(--preview-primary)'}}>K</span>
                    <span className="hidden sm:inline">Karhamelo</span>
                </div>
                <div className="flex items-center gap-1">
                     <Button asChild size="sm" className="h-5 px-1.5 text-[6px] rounded-md" style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}><a href={portfolio.ctaButtonUrl}>{portfolio.ctaButtonText}</a></Button>
                </div>
            </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden py-6 px-2">
           <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}/>
           <div className="relative">
              <h1 className="text-xl sm:text-2xl font-extrabold leading-tight">{portfolio.title}</h1>
              <p className="mt-1 text-slate-600">{portfolio.description}</p>
              <div className="mt-2 flex gap-1">
                <Button asChild className="h-auto px-2 py-1 rounded-md text-white font-semibold" style={{ backgroundColor: 'var(--preview-primary)'}}>
                    <a href={portfolio.ctaButtonUrl} className="flex items-center">
                      {portfolio.ctaButtonText}
                      <CtaIcon className="ml-1 h-2 w-2" />
                    </a>
                </Button>
              </div>
              <div className="mt-2 flex items-center gap-2 text-[6px] text-slate-500">
                <div className="flex items-center gap-1"><Check className="h-2 w-2 text-green-500"/> Checkout Rápido</div>
                <div className="flex items-center gap-1"><Check className="h-2 w-2 text-green-500"/> Customizável</div>
              </div>
               {portfolio.imageUrl && <Image src={portfolio.imageUrl} alt={portfolio.title} width={400} height={225} className="mt-4 w-full h-auto object-cover rounded-lg shadow-lg" data-ai-hint="website product screenshot" />}
           </div>
        </section>

        {/* Benefícios */}
        {portfolio.isFeaturesEnabled && 
          <section className="py-6 px-2" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-lg sm:text-xl font-extrabold">Tudo que você precisa</h2>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => {
                  const Icon = featureIconsMap[feature.icon || 'seller']?.component || featureIconsMap['seller'].component;
                  return (
                    <Card key={index} className="bg-white/80 p-2 text-center">
                        <div className="h-6 w-6 mx-auto rounded-md bg-primary/10 flex items-center justify-center" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.1)`}}>
                           <Icon className="h-4 w-4 text-primary" style={{color: 'var(--preview-primary)'}}/>
                        </div>
                        <h3 className="mt-1 font-bold text-[7px]">{feature.title}</h3>
                        <p className="mt-1 text-slate-600 text-[6px] leading-tight">{feature.description}</p>
                    </Card>
                  )
                })}
              </div>
          </section>
        }

         {/* Como Funciona */}
        {portfolio.isHowItWorksEnabled &&
          <section className="py-6 px-2 bg-white">
              <div className="grid grid-cols-2 gap-2 items-center">
                  <div>
                      <h2 className="text-lg font-extrabold">{portfolio.howItWorksTitle}</h2>
                      <ol className="mt-2 space-y-1.5">
                          {Array.isArray(portfolio.steps) && portfolio.steps.map((step, index) => (
                              <li key={index} className="flex gap-1.5">
                                  <div className="h-4 w-4 rounded-sm text-[6px] text-white flex-shrink-0 flex items-center justify-center font-bold" style={{backgroundColor: 'var(--preview-primary)'}}>{index + 1}</div>
                                  <div>
                                    <h3 className="font-bold text-[7px]">{step.title}</h3>
                                    <p className="text-slate-600 text-[6px] leading-tight">{step.description}</p>
                                  </div>
                              </li>
                          ))}
                      </ol>
                  </div>
                  <div className="relative">
                      {portfolio.howItWorksImageUrl && <Image src={portfolio.howItWorksImageUrl} width={400} height={300} alt="Fluxo de trabalho" className="rounded-lg shadow-md" data-ai-hint="team workflow" />}
                  </div>
              </div>
          </section>
        }

        {/* Gallery */}
         {portfolio.isGalleryEnabled && portfolio.projects && portfolio.projects.length > 0 && (
          <section className="py-6 px-2" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-lg font-extrabold">{portfolio.galleryTitle}</h2>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1">
                {portfolio.projects.slice(0,3).map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-0 rounded-md overflow-hidden aspect-square">
                         <Image src={project.imageUrl} alt={project.title} width={100} height={100} className="w-full h-full object-cover"/>
                      </CardContent>
                    </Card>
                ))}
              </div>
          </section>
         )}

         {/* CTA Banner */}
         <section className="p-2">
            <div className="rounded-lg p-3 text-white flex flex-col items-center text-center gap-2" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}>
                <h3 className="text-md font-extrabold">{portfolio.ctaBannerTitle}</h3>
                <Button size="sm" className="h-5 px-1.5 text-[6px] rounded-md bg-white text-black hover:bg-white/90 font-semibold">
                  {portfolio.ctaBannerButtonText} <ArrowRight className="ml-1 h-2 w-2"/>
                </Button>
            </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-2 text-center">
            <p className="text-[6px] text-slate-500">© {new Date().getFullYear()} Karhamelo — Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
