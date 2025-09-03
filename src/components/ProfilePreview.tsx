import type { Link, Profile, PageTheme } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface ProfilePreviewProps {
  profile: Profile;
  links: Link[];
  theme: PageTheme;
}

const socialIconsMap: { [key: string]: React.ElementType } = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

const getPatternStyle = (pattern: string | undefined, color: string) => {
  if (!pattern || pattern === 'none') return {};

  const patternColor = color.startsWith('hsl') ? 'hsl(var(--foreground))' : color;
  const bgColor = color.startsWith('hsl') ? `hsla(${color.replace('hsl(','').replace(')','').split(' ')[0]}, 20%, 99%, 1)` : color;
  
  // A few simple heropatterns as inline SVGs
  const patterns: {[key: string]: string} = {
    jigsaw: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-rule="evenodd"><path d="M0 40L40 0H20L0 20M40 40V20L20 40"/></g></svg>`,
    overcast: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-opacity="0.2" fill-rule="evenodd"><path d="M0 40L40 0H20L0 20M40 40V20L20 40"/></g></svg>`,
    'formal-invitation': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 20.5c0 .28.22.5.5.5s.5-.22.5-.5-.22-.5-.5-.5-.5.22-.5.5zM21.5 20c.28 0 .5-.22.5-.5s-.22-.5-.5-.5-.5.22-.5.5.22.5.5.5z" fill="${patternColor}" fill-opacity="0.3" fill-rule="evenodd"/></svg>`,
    topography: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 5.5c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zM35 20c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3c.28 0 .5.22.5.5zM8.5 20c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5z" fill="${patternColor}" fill-opacity="0.3" fill-rule="evenodd"/></svg>`,
    texture: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-opacity="0.3" fill-rule="evenodd"><path d="M0 0h40v40H0z" stroke="#000" stroke-width="1" fill="none"/><path d="M20 20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10-5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM10 5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/></g></svg>`,
    'endless-clouds': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 20c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0 10c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm-10-5c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="${patternColor}" fill-opacity="0.2"/></svg>`,
    wiggle: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4zm10 0s2-4 4-4 4 4 4 4-2 4-4 4-4-4-4-4z" fill="${patternColor}" fill-opacity="0.2"/></svg>`,
    'diagonal-stripes': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M-10 40l50-50" stroke="${patternColor}" stroke-width="4" fill="none" fill-rule="evenodd" opacity=".2"/></svg>`,
    rain: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-opacity="0.2" fill-rule="evenodd"><path d="M25 35a5 5 0 010-10 5 5 0 010 10zm-10 0a5 5 0 010-10 5 5 0 010 10zM5 35a5 5 0 010-10 5 5 0 010 10zm20-20a5 5 0 010-10 5 5 0 010 10zM15 5a5 5 0 010-10 5 5 0 010 10z"/></g></svg>`,
    'polka-dots': `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="${patternColor}" fill-opacity="0.2" fill-rule="evenodd"><circle cx="5" cy="5" r="5"/><circle cx="25" cy="25" r="5"/><circle cx="5" cy="25" r="5"/><circle cx="25" cy="5" r="5"/></g></svg>`,
  }

  const svg = patterns[pattern];
  if (!svg) return {};

  return {
    backgroundColor: bgColor,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
  };
};

export default function ProfilePreview({
  profile,
  links,
  theme,
}: ProfilePreviewProps) {

  const patternStyle = getPatternStyle(theme.backgroundPattern, theme.backgroundColor);

  const customStyle = {
    '--preview-bg': theme.backgroundColor,
    '--preview-primary': theme.primaryColor,
    '--preview-accent': theme.accentColor,
    '--preview-primary-fg': '#ffffff', // Assuming primary is dark enough for white text
    ...patternStyle
  } as React.CSSProperties;

  const socialLinks = links.filter((link) =>
    Object.keys(socialIconsMap).some((social) =>
      link.url.toLowerCase().includes(social)
    )
  );
  
  const regularLinks = links.filter(
    (link) =>
      !Object.keys(socialIconsMap).some((social) =>
        link.url.toLowerCase().includes(social)
      )
  );

  return (
    <div
      className="relative aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2.5rem] border-[10px] sm:border-[14px] border-black bg-[var(--preview-bg)] overflow-hidden shadow-2xl"
      style={customStyle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-5 sm:h-6 bg-black rounded-b-xl z-10"></div>
      <div className="pt-12 sm:pt-16 pb-8 px-4 overflow-y-auto h-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-[var(--preview-primary)]">
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
           <div className="flex items-center gap-4 pt-2">
            {socialLinks.map((link) => {
              const socialName = Object.keys(socialIconsMap).find((social) =>
                link.url.toLowerCase().includes(social)
              );
              if (!socialName) return null;
              const Icon = socialIconsMap[socialName];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          <div className="w-full space-y-3 pt-4">
            {regularLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.id}
                  className="w-full h-14 text-base font-semibold transition-transform duration-200 hover:scale-105 active:scale-100"
                  style={{
                    backgroundColor: 'var(--preview-primary)',
                    color: 'var(--preview-primary-fg)',
                  }}
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{link.title}</span>
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
