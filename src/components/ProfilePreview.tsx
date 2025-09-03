import type { Link, Profile, PageTheme } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfilePreviewProps {
  profile: Profile;
  links: Link[];
  theme: PageTheme;
}

export default function ProfilePreview({
  profile,
  links,
  theme,
}: ProfilePreviewProps) {
  const customStyle = {
    '--preview-bg': theme.backgroundColor,
    '--preview-primary': theme.primaryColor,
    '--preview-accent': theme.accentColor,
    '--preview-primary-fg': '#ffffff', // Assuming primary is dark enough for white text
  } as React.CSSProperties;

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
          <div className="w-full space-y-3 pt-4">
            {links.map((link) => {
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
                    className="flex items-center gap-3"
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
