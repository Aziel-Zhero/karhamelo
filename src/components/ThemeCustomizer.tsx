'use client';

import type { PageTheme, Profile, Link } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import AIStyleRecommender from './AIStyleRecommender';
import { useState } from 'react';

interface ThemeCustomizerProps {
  currentTheme: PageTheme;
  onThemeChange: (theme: PageTheme) => void;
  profile: Profile;
  links: Link[];
}

const presetThemes: { name: string; theme: PageTheme }[] = [
  {
    name: 'Default',
    theme: {
      primaryColor: 'hsl(199 76% 52%)',
      backgroundColor: 'hsl(216 28% 95%)',
      accentColor: 'hsl(207 88% 68%)',
    },
  },
  {
    name: 'Forest',
    theme: {
      primaryColor: 'hsl(158 36% 52%)',
      backgroundColor: 'hsl(155 26% 95%)',
      accentColor: 'hsl(158 29% 78%)',
    },
  },
  {
    name: 'Ocean',
    theme: {
      primaryColor: 'hsl(210 55% 55%)',
      backgroundColor: 'hsl(210 50% 98%)',
      accentColor: 'hsl(210 40% 75%)',
    },
  },
  {
    name: 'Sunset',
    theme: {
      primaryColor: 'hsl(25 85% 58%)',
      backgroundColor: 'hsl(25 50% 98%)',
      accentColor: 'hsl(25 70% 75%)',
    },
  },
];

export default function ThemeCustomizer({
  onThemeChange,
  profile,
  links,
}: ThemeCustomizerProps) {
  const [isAiRecommenderOpen, setIsAiRecommenderOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Customize Your Page</CardTitle>
          <CardDescription>
            Pick a preset theme or let AI suggest one for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {presetThemes.map(({ name, theme }) => (
              <button
                key={name}
                onClick={() => onThemeChange(theme)}
                className="flex flex-col h-20 gap-2 p-2 rounded-lg border-2 hover:border-primary transition-colors"
              >
                <div className="flex gap-1 w-full flex-1">
                  <span
                    className="h-full w-1/3 rounded-sm"
                    style={{ backgroundColor: theme.primaryColor }}
                  ></span>
                  <span
                    className="h-full w-1/3 rounded-sm"
                    style={{ backgroundColor: theme.backgroundColor }}
                  ></span>
                  <span
                    className="h-full w-1/3 rounded-sm"
                    style={{ backgroundColor: theme.accentColor }}
                  ></span>
                </div>
                <span className="text-sm font-medium">{name}</span>
              </button>
            ))}
          </div>
          <Button
            className="w-full"
            onClick={() => setIsAiRecommenderOpen(true)}
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Get AI Style Recommendations
          </Button>
        </CardContent>
      </Card>
      <AIStyleRecommender
        open={isAiRecommenderOpen}
        onOpenChange={setIsAiRecommenderOpen}
        onThemeApply={onThemeChange}
        profile={profile}
        links={links}
      />
    </div>
  );
}
