
'use client';

import { useState } from 'react';
import type { Link, Profile, PageTheme } from '@/lib/types';
import Header from '@/components/Header';
import LinkEditor from '@/components/LinkEditor';
import { Github, Linkedin, Link2 as LinkIcon, Twitter } from 'lucide-react';
import LinkList from '@/components/LinkList';
import ProfilePreview from '@/components/ProfilePreview';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ProfileEditor from '@/components/ProfileEditor';
import Footer from '@/components/Footer';
import { KLogo } from '@/components/KLogo';

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Karhamelo',
    bio: 'Your one-page link hub, beautifully customized. Built with Next.js and ❤️.',
    avatarUrl: 'https://picsum.photos/128/128',
  });

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'My Website',
      url: 'https://example.com',
      icon: LinkIcon,
    },
    { id: '2', title: 'GitHub', url: 'https://github.com', icon: Github },
    { id: '3', title: 'Twitter', url: 'https://twitter.com', icon: Twitter },
    {
      id: '4',
      title: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: Linkedin,
    },
  ]);

  const [theme, setTheme] = useState<PageTheme>({
    primaryColor: 'hsl(199 76% 52%)',
    backgroundColor: 'hsl(216 28% 95%)',
    accentColor: 'hsl(207 88% 68%)',
    backgroundPattern: 'none',
  });

  const addLink = (link: Omit<Link, 'id'>) => {
    setLinks((prev) => [...prev, { ...link, id: crypto.randomUUID() }]);
  };

  const updateLink = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };

  const deleteLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };
  
  const handleViewPage = () => {
    const pageData = {
      profile,
      links,
      theme,
    };
    localStorage.setItem('karhamelo-page-data', JSON.stringify(pageData));
    window.open('/profile/preview', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onViewPage={handleViewPage} />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                Live Preview
              </h2>
              <ProfilePreview profile={profile} links={links} theme={theme} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
