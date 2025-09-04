
'use client';

import { useState, useEffect } from 'react';
import type { Link, Profile, PageTheme } from '@/lib/types';
import LinkEditor from '@/components/LinkEditor';
import { Link as LinkIcon } from 'lucide-react';
import LinkList from '@/components/LinkList';
import ProfilePreview from '@/components/ProfilePreview';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ProfileEditor from '@/components/ProfileEditor';

export default function LinksPage() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Karhamelo',
    bio: 'Seu hub de links em uma única página, lindamente personalizado. Construído com Next.js e ❤️.',
    avatarUrl: 'https://picsum.photos/128/128',
    isPortfolioLinkEnabled: true,
    socialLinks: {
      github: 'https://github.com/karhamelo',
      twitter: 'https://twitter.com/karhamelo',
      linkedin: 'https://linkedin.com/in/karhamelo',
    },
  });

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'Meu Website',
      url: 'https://example.com',
      icon: LinkIcon,
      clickCount: 12,
    },
    { id: '2', title: 'Meu Blog', url: 'https://example.com/blog', icon: LinkIcon, clickCount: 5 },
  ]);

  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
    buttonStyle: 'filled',
    buttonRadius: 'full',
    buttonShadow: true,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('karhamelo-page-data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setProfile(parsedData.profile);
        setLinks(parsedData.links);
        setTheme(parsedData.theme);
      } catch (e) {
        console.error("Failed to parse page data from localStorage", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    const pageData = { profile, links, theme };
    localStorage.setItem('karhamelo-page-data', JSON.stringify(pageData));
  }, [profile, links, theme]);

  const addLink = (link: Omit<Link, 'id' | 'clickCount'>) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID(), clickCount: 0 }]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };
  
  const onLinkClick = (clickedLink: Link) => {
     const updatedLinks = links.map(link => 
        link.id === clickedLink.id 
            ? { ...link, clickCount: (link.clickCount || 0) + 1 } 
            : link
    );
    setLinks(updatedLinks);
  }

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-4">
      <div className="lg:col-span-3 space-y-8">
        <ProfileEditor profile={profile} onProfileChange={setProfile} />
        <LinkEditor onAddLink={addLink} />
        <LinkList
          links={links}
          onUpdateLink={updateLink}
          onDeleteLink={deleteLink}
        />
        <ThemeCustomizer
          currentTheme={theme}
          onThemeChange={setTheme}
          profile={profile}
          links={links}
        />
      </div>
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
            Pré-visualização Ao Vivo
          </h2>
          <ProfilePreview profile={profile} links={links} theme={theme} onLinkClick={onLinkClick} />
        </div>
      </div>
    </div>
  );
}
