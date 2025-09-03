
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

  const CtaIcon = ctaIconsMap[portfolio.ctaButtonIcon || 'arrowRight']?.component || ArrowRight;

  return (
    <div
      className="relative aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2rem] border-8 sm:border-[10px] border-black bg-[var(--preview-bg)] overflow-hidden shadow-2xl"
      style={customStyle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 sm:h-5 bg-black rounded-b-lg z-20"></div>
      <div className="absolute inset-0 h-full w-full overflow-y-auto">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-[var(--preview-bg)]/80 backdrop-blur-sm border-b border-slate-200/50">
              <div className="flex h-12 items-center justify-between px-4">
                  <div className="flex items-center gap-2 font-extrabold text-base">
                      {portfolio.logoType === 'image' && portfolio.logoImageUrl ? (
                        <Image src={portfolio.logoImageUrl} alt={portfolio.logoText || 'Logo'} width={32} height={32} className="h-6 w-auto" />
                      ) : (
                        <>
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-white text-sm" style={{backgroundColor: 'var(--preview-primary)'}}>{(portfolio.logoText || 'K').charAt(0)}</span>
                          <span className="">{portfolio.logoText || 'Karhamelo'}</span>
                        </>
                      )}
                  </div>
                  <div className="flex items-center">
                      <Button asChild size="sm" className="rounded-lg h-7 px-3 text-xs" style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}><a href={portfolio.ctaButtonUrl}>{portfolio.ctaButtonText}</a></Button>
                  </div>
              </div>
          </header>

          <main className="text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden py-10 px-4 text-center">
              <div className="absolute inset-0 opacity-20" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}/>
              <div className="relative">
                  <h1 className="text-3xl font-extrabold leading-tight">{portfolio.title}</h1>
                  <p className="mt-2 text-foreground/80 text-sm">{portfolio.description}</p>
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <Button asChild size="lg" className="h-10 px-5 rounded-lg text-white font-semibold w-full max-w-xs" style={{ backgroundColor: 'var(--preview-primary)'}}>
                        <a href={portfolio.ctaButtonUrl} className="flex items-center justify-center">
                          {portfolio.ctaButtonText}
                          <CtaIcon className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <div className="mt-2 flex items-center justify-center gap-4 text-xs text-foreground/60">
                      <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500"/> Checkout Rápido</div>
                      <div className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500"/> Customizável</div>
                    </div>
                  </div>
              </div>
            </section>
            
            {portfolio.imageUrl && (
              <section className="px-4 py-4">
                  <div className="relative aspect-[12/8] w-full">
                    <Image src={portfolio.imageUrl} alt={portfolio.title} fill className="object-cover rounded-2xl shadow-2xl" data-ai-hint="website product screenshot" />
                  </div>
              </section>
            )}

            {/* Benefícios */}
            {portfolio.isFeaturesEnabled && 
              <section className="py-10 px-4" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
                  <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-xl font-extrabold">Tudo que você precisa</h2>
                      <p className="mt-1 text-xs text-muted-foreground">Ferramentas poderosas e simples de usar.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => {
                      const Icon = featureIconsMap[feature.icon || 'zap']?.component || featureIconsMap['zap'].component;
                      return (
                        <Card key={index} className="bg-background/80">
                          <CardContent className="p-4 flex items-center gap-4">
                              <div className="h-10 w-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.1)`, color: `hsl(var(--preview-primary-hsl))`}}><Icon className="h-5 w-5"/></div>
                              <div>
                                <h3 className="font-bold text-sm">{feature.title}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                              </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
              </section>
            }

            {/* Como Funciona */}
            {portfolio.isHowItWorksEnabled &&
              <section className="py-10 px-4 bg-background">
                  <div className="text-center">
                      <h2 className="text-xl font-extrabold">{portfolio.howItWorksTitle}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{portfolio.howItWorksDescription}</p>
                  </div>
                  {portfolio.howItWorksImageUrl && (
                    <div className="relative aspect-video w-full mt-4">
                      <Image src={portfolio.howItWorksImageUrl} fill alt="Fluxo de trabalho" className="rounded-2xl shadow-xl ring-1 ring-black/5" data-ai-hint="team workflow" />
                    </div>
                  )}
                  <ol className="mt-6 space-y-4">
                      {Array.isArray(portfolio.steps) && portfolio.steps.map((step, index) => (
                          <li key={index} className="flex gap-3 items-start">
                              <div className="h-6 w-6 rounded-lg text-white flex-shrink-0 flex items-center justify-center font-bold text-xs" style={{backgroundColor: 'var(--preview-primary)'}}>{index + 1}</div>
                              <div>
                                <h3 className="font-bold text-sm">{step.title}</h3>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                              </div>
                          </li>
                      ))}
                  </ol>
              </section>
            }

            {/* Gallery */}
            {portfolio.isGalleryEnabled && portfolio.projects && portfolio.projects.length > 0 && (
              <section className="py-10 px-4" style={{backgroundColor: `hsl(var(--preview-primary-hsl) / 0.05)`}}>
                  <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-xl font-extrabold">{portfolio.galleryTitle}</h2>
                      <p className="mt-1 text-xs text-muted-foreground">{portfolio.galleryDescription}</p>
                  </div>
                  <div className="mt-6 -mx-4">
                      <Carousel opts={{ align: "start", loop: true, }} className="w-full">
                        <CarouselContent className="-ml-2">
                          {portfolio.projects.map((project) => (
                            <CarouselItem key={project.id} className="pl-4 basis-2/3">
                              <Card className="overflow-hidden rounded-xl">
                                <CardContent className="p-0 aspect-square relative">
                                    {project.imageUrl && <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />}
                                    <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                                      <h3 className="font-bold text-white text-xs">{project.title}</h3>
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
            <section className="p-4">
                <div className="rounded-2xl p-6 text-white text-center" style={{background: `linear-gradient(135deg, var(--preview-accent), var(--preview-primary))`}}>
                  <div>
                      <h3 className="text-lg font-extrabold">{portfolio.ctaBannerTitle}</h3>
                      <p className="mt-1 text-white/90 text-xs">{portfolio.ctaBannerDescription}</p>
                  </div>
                  <Button asChild size="sm" className="bg-white text-black hover:bg-white/90 font-semibold mt-4 h-9">
                      <a href="#">{portfolio.ctaBannerButtonText} <ArrowRight className="ml-1 h-4 w-4"/></a>
                  </Button>
                </div>
            </section>
            )}

            {/* Footer */}
            <footer className="border-t border-slate-200/50 bg-background py-6 px-4 text-center mt-4">
              <p className="text-xs text-slate-500">© {new Date().getFullYear()} {portfolio.logoText || 'Karhamelo'}</p>
            </footer>
          </main>
      </div>
    </div>
  );
}

