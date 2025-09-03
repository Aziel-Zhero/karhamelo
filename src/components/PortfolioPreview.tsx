
import type { Portfolio, PageTheme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { ctaIconsMap, featureIconsMap } from '@/lib/icon-map';


interface PortfolioPreviewProps {
  portfolio: Portfolio;
  theme: PageTheme;
}

const getPatternStyle = (pattern: string | undefined, color: string) => {
  if (!pattern || pattern === 'none') return {};

  let patternColor = 'rgba(0,0,0,0.1)';
  let isLight = true;

  if (color.startsWith('hsl')) {
    try {
      const lightness = parseInt(color.split(' ')[2].replace('%',''));
      if (lightness < 50) {
        isLight = false;
      }
    } catch (e) { /* ignore */ }
  } else if (color.startsWith('#')) {
    try {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness < 128) {
        isLight = false;
      }
    } catch (e) { /* ignore */ }
  }
  
  patternColor = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)';

  const patterns: {[key: string]: string} = {
    jigsaw: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><path d="M0 40L40 0H20L0 20M40 40V20L20 40"/></g></svg>`,
    overcast: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><path d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm20 0a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" opacity=".2"/><path d="M10 0a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"/></g></svg>`,
    'formal-invitation': `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 6a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" fill="${patternColor}" fill-rule="evenodd"/><path d="M10 0a10 10 0 1 1 0 20A10 10 0 0 1 10 0z" fill-opacity="0" stroke="${patternColor}" stroke-width="2"/></svg>`,
    topography: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h20v20H0V0zm10 3.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm-3.5 7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm7 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" fill="${patternColor}" fill-rule="evenodd"/></svg>`,
    texture: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-opacity="1" fill-rule="evenodd"><path d="M0 0h40v40H0z" stroke="${patternColor}" stroke-width="1" fill="none"/><path d="M20 20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM10 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/></g></svg>`,
    'endless-clouds': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 20c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0 10c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-10-5c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="${patternColor}"/></svg>`,
    wiggle: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4z" fill="${patternColor}" /></svg>`,
    'diagonal-stripes': `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><path d="M-5 20l25-25" stroke-width="2" stroke="${patternColor}"/><path d="M-5 0l25 25" stroke-width="2" stroke="${patternColor}"/></g></svg>`,
    rain: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><path d="M5 15a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm5 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm5 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM5 5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm5 0a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></g></svg>`,
    'polka-dots': `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><circle cx="5" cy="5" r="3"/><circle cx="15" cy="15" r="3"/><circle cx="5" cy="15" r="3"/><circle cx="15" cy="5" r="3"/></g></svg>`,
  }

  const svg = patterns[pattern];
  if (!svg) return {};

  return {
    backgroundColor: color,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
  };
};

export default function PortfolioPreview({
  portfolio,
  theme,
}: PortfolioPreviewProps) {
  const patternStyle = getPatternStyle(theme.backgroundPattern, theme.backgroundColor);
  const customStyle = {
    '--preview-bg': theme.backgroundColor,
    '--preview-primary': theme.primaryColor,
    '--preview-primary-hsl': theme.primaryColor.startsWith('hsl') ? theme.primaryColor.replace('hsl(','').replace(')','') : '199 76% 52%',
    '--preview-accent': theme.accentColor,
    ...patternStyle
  } as React.CSSProperties;

  const CtaIcon = ctaIconsMap[portfolio.ctaButtonIcon || 'arrowRight'].component;


  return (
    <div
      className="relative aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2rem] border-8 sm:border-[10px] border-black bg-[var(--preview-bg)] overflow-hidden shadow-2xl"
      style={customStyle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 sm:h-5 bg-black rounded-b-lg z-20"></div>
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <div className="h-full w-full origin-top-left scale-[0.22] sm:scale-[0.25] lg:scale-[0.30] -translate-x-[20%] -translate-y-[15%] sm:-translate-x-[15%] sm:-translate-y-[10%] lg:-translate-x-[5%] lg:-translate-y-[5%]">
            <div className='w-[1400px] h-fit transform-gpu'>

        {/* Header */}
        <header className="sticky top-0 z-10 bg-[var(--preview-bg)]/80 backdrop-blur-sm border-b border-slate-200">
            <div className="flex h-16 items-center justify-between px-8">
                <div className="flex items-center gap-2 font-extrabold text-xl">
                    {portfolio.logoType === 'image' && portfolio.logoImageUrl ? (
                       <Image src={portfolio.logoImageUrl} alt={portfolio.logoText || 'Logo'} width={40} height={40} className="h-8 w-auto" />
                    ) : (
                      <>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: 'var(--preview-primary)'}}>{(portfolio.logoText || 'K').charAt(0)}</span>
                        <span className="">{portfolio.logoText || 'Karhamelo'}</span>
                      </>
                    )}
                </div>
                <div className="flex items-center gap-3">
                     <Button asChild size="md" className="rounded-lg" style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}><a href={portfolio.ctaButtonUrl}>{portfolio.ctaButtonText}</a></Button>
                </div>
            </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden py-28 px-8">
           <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}/>
           <div className="relative grid grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-extrabold leading-tight">{portfolio.title}</h1>
                <p className="mt-4 text-slate-600 text-lg">{portfolio.description}</p>
                <div className="mt-6 flex gap-3">
                  <Button asChild size="lg" className="px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: 'var(--preview-primary)'}}>
                      <a href={portfolio.ctaButtonUrl} className="flex items-center">
                        {portfolio.ctaButtonText}
                        <CtaIcon className="ml-2 h-5 w-5" />
                      </a>
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Checkout Rápido</div>
                  <div className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500"/> Customizável</div>
                </div>
              </div>
               {portfolio.imageUrl && <div className="relative"><Image src={portfolio.imageUrl} alt={portfolio.title} width={1200} height={800} className="w-full h-auto object-cover rounded-3xl shadow-2xl" data-ai-hint="website product screenshot" /></div>}
           </div>
        </section>

        {/* Benefícios */}
        {portfolio.isFeaturesEnabled && 
          <section className="py-24 px-8" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl font-extrabold">Tudo que você precisa</h2>
                   <p className="mt-3 text-muted-foreground">Ferramentas poderosas e simples de usar para mostrar seu trabalho.</p>
              </div>
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => {
                  const Icon = featureIconsMap[feature.icon || 'seller']?.component || featureIconsMap['seller'].component;
                  return (
                    <Card key={index} className="bg-background/80">
                      <CardContent className="p-6">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.1)`, color: `hsl(var(--preview-primary-hsl))`}}><Icon /></div>
                          <h3 className="mt-4 font-bold text-lg">{feature.title}</h3>
                          <p className="mt-2 text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
          </section>
        }

         {/* Como Funciona */}
        {portfolio.isHowItWorksEnabled &&
          <section className="py-24 px-8 bg-background">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                      <h2 className="text-4xl font-extrabold">{portfolio.howItWorksTitle}</h2>
                      <p className="mt-3 text-muted-foreground">{portfolio.howItWorksDescription}</p>
                      <ol className="mt-6 space-y-4">
                          {Array.isArray(portfolio.steps) && portfolio.steps.map((step, index) => (
                              <li key={index} className="flex gap-4">
                                  <div className="h-8 w-8 rounded-lg text-white flex-shrink-0 flex items-center justify-center font-bold" style={{backgroundColor: 'var(--preview-primary)'}}>{index + 1}</div>
                                  <div><h3 className="font-bold">{step.title}</h3><p className="text-muted-foreground">{step.description}</p></div>
                              </li>
                          ))}
                      </ol>
                  </div>
                  <div className="relative">
                      {portfolio.howItWorksImageUrl && <Image src={portfolio.howItWorksImageUrl} width={1200} height={1000} alt="Fluxo de trabalho" className="rounded-3xl shadow-2xl ring-1 ring-black/5" data-ai-hint="team workflow" />}
                  </div>
              </div>
          </section>
        }

        {/* Gallery */}
         {portfolio.isGalleryEnabled && portfolio.projects && portfolio.projects.length > 0 && (
          <section className="py-24 px-8" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
              <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl font-extrabold">{portfolio.galleryTitle}</h2>
                   <p className="mt-3 text-muted-foreground">{portfolio.galleryDescription}</p>
              </div>
              <div className="mt-10">
                  <Carousel opts={{ align: "start", loop: true, }} className="w-full">
                    <CarouselContent className="-ml-4">
                      {portfolio.projects.map((project) => (
                        <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                           <Card className="overflow-hidden rounded-xl">
                            <CardContent className="p-0 aspect-video relative">
                                {project.imageUrl && <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />}
                                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                  <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
              </div>
          </section>
         )}

         {/* CTA Banner */}
        {portfolio.isCtaBannerEnabled && (
         <section className="p-8">
            <div className="rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}>
               <div>
                  <h3 className="text-3xl font-extrabold">{portfolio.ctaBannerTitle}</h3>
                  <p className="mt-2 text-white/90">{portfolio.ctaBannerDescription}</p>
              </div>
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-semibold flex-shrink-0">
                  <a href="#">{portfolio.ctaBannerButtonText} <ArrowRight className="ml-2"/></a>
              </Button>
            </div>
        </section>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-background py-12 px-8 text-center">
             <div className="flex justify-center items-center gap-2 font-extrabold text-xl">
                  {portfolio.logoType === 'image' && portfolio.logoImageUrl ? (
                    <Image src={portfolio.logoImageUrl} alt={portfolio.logoText || 'Logo'} width={40} height={40} className="h-8 w-auto" />
                  ) : (
                     <>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{backgroundColor: 'var(--preview-primary)'}}>{(portfolio.logoText || 'K').charAt(0)}</span>
                        <span>{portfolio.logoText || 'Karhamelo'}</span>
                      </>
                  )}
              </div>
            <p className="text-sm text-slate-500 mt-3">© {new Date().getFullYear()} {portfolio.logoText || 'Karhamelo'} — Todos os direitos reservados.</p>
        </footer>
        </div>
        </div>
      </div>
    </div>
  );
}

    