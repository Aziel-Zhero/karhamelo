'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme, PageData } from '@/lib/types';
import { Github, Linkedin, Link2, Twitter, Instagram, Youtube, Facebook, Briefcase, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { KLogo } from '@/components/KLogo';
import { cn } from '@/lib/utils';
import { PortfolioGlowButton } from '@/components/PortfolioGlowButton';
import { allIconsMap } from '@/lib/icon-map';
import { incrementLinkClick, loadPageData } from '@/lib/data-services';


const socialIconsMap: { [key: string]: React.ElementType } = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

const getPatternStyle = (pattern: string | undefined, color: string) => {
  if (!pattern || pattern === 'none') return { backgroundColor: color };

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
  if (!svg) return { backgroundColor: color };

  return {
    backgroundColor: color,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
  };
};

const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};


export default function PublicProfilePage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = params.id;

  const handleLinkClick = (clickedLink: Link) => {
    if (!data || !clickedLink.id) return;
    incrementLinkClick(clickedLink.id);
  };


  useEffect(() => {
    const fetchDataAndTrackView = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const pageData = await loadPageData(userId);
        setData(pageData);
        if (pageData) {
          // This is a simplified client-side view counter.
          // In a real-world scenario, you'd want a more robust, server-side solution.
          const viewsKey = `karhamelo-profile-views-${userId}`;
          const currentViews = parseInt(localStorage.getItem(viewsKey) || '0', 10);
          localStorage.setItem(viewsKey, (currentViews + 1).toString());
        }
      } catch (error) {
        console.error("Falha ao carregar dados da página", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDataAndTrackView();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
        <KLogo />
        <h1 className="mt-8 text-2xl font-bold">Página não encontrada</h1>
        <p className="text-muted-foreground">Este usuário não publicou uma página ainda.</p>
      </div>
    );
  }

  const { profile, links, theme } = data;

  const patternStyle = getPatternStyle(theme.backgroundPattern, theme.backgroundColor);
  
  const customStyle = {
    '--page-primary': theme.primaryColor,
    '--page-accent': theme.accentColor,
    '--page-primary-fg': '#ffffff', 
    ...patternStyle
  } as React.CSSProperties;

  const buttonRadiusClass = radiusClasses[theme.buttonRadius || 'full'];

  const buttonStyle = {
    backgroundColor: theme.buttonStyle === 'filled' ? 'var(--page-primary)' : 'transparent',
    color: theme.buttonStyle === 'filled' ? 'var(--page-primary-fg)' : 'var(--page-primary)',
    borderColor: theme.buttonStyle === 'outline' ? 'var(--page-primary)' : 'transparent',
    borderWidth: theme.buttonStyle === 'outline' ? '2px' : '0px',
  };


  return (
     <div className="flex flex-col min-h-screen" style={customStyle}>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-[var(--page-primary)]">
                <AvatarImage
                  src={profile.avatarUrl}
                  data-ai-hint="person portrait"
                  alt={profile.name}
                />
                <AvatarFallback>
                  {profile.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground">
                  {profile.name}
                </h1>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-2">
                {profile.socialLinks && Object.entries(profile.socialLinks).map(([key, url]) => {
                  if (!url) return null;
                  const Icon = socialIconsMap[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      title={key.charAt(0).toUpperCase() + key.slice(1)}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
              <div className="w-full space-y-3 pt-4">
                {links.map((link) => {
                  const Icon = allIconsMap[link.icon]?.component || allIconsMap['link'].component;
                  return (
                    <Button
                      key={link.id}
                      className={cn(
                          'w-full h-14 text-base font-semibold transition-transform duration-200 hover:scale-105 active:scale-100',
                          buttonRadiusClass,
                          theme.buttonShadow && 'shadow-lg'
                      )}
                      style={buttonStyle}
                      asChild
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                        onClick={() => handleLinkClick(link)}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        <span>{link.title}</span>
                      </a>
                    </Button>
                  );
                })}
                {profile.isPortfolioLinkEnabled && (
                  <PortfolioGlowButton 
                    href={`/portfolio/${userId}`} 
                    text="Ver Portfólio" 
                    primaryColor={theme.primaryColor}
                    accentColor={theme.accentColor}
                  />
                )}
              </div>
            </div>
        </div>
      </main>
      <footer className="w-full py-6 mt-auto">
        <div className="container mx-auto text-center text-muted-foreground/80">
          <p>
            Desenvolvido por{' '}
            <a
              href="https://karhamelo.app"
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
