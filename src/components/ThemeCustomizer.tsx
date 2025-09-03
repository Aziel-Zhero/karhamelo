
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
    name: 'Padrão',
    theme: {
      primaryColor: 'hsl(199 76% 52%)',
      backgroundColor: 'hsl(216 28% 95%)',
      accentColor: 'hsl(207 88% 68%)',
    },
  },
  {
    name: 'Floresta',
    theme: {
      primaryColor: 'hsl(158 36% 52%)',
      backgroundColor: 'hsl(155 26% 95%)',
      accentColor: 'hsl(158 29% 78%)',
    },
  },
  {
    name: 'Oceano',
    theme: {
      primaryColor: 'hsl(210 55% 55%)',
      backgroundColor: 'hsl(210 50% 98%)',
      accentColor: 'hsl(210 40% 75%)',
    },
  },
  {
    name: 'Pôr do Sol',
    theme: {
      primaryColor: 'hsl(25 85% 58%)',
      backgroundColor: 'hsl(25 50% 98%)',
      accentColor: 'hsl(25 70% 75%)',
    },
  },
];

const heroPatterns = [
  'none', 'jigsaw', 'overcast', 'formal-invitation', 'topography', 'texture', 
  'endless-clouds', 'wiggle', 'diagonal-stripes', 'rain', 'polka-dots'
];

export default function ThemeCustomizer({
  currentTheme,
  onThemeChange,
  profile,
  links,
}: ThemeCustomizerProps) {
  const [isAiRecommenderOpen, setIsAiRecommenderOpen] = useState(false);

  const handleColorChange = (colorName: keyof PageTheme, value: string) => {
    onThemeChange({ ...currentTheme, [colorName]: value });
  };
  
  const handlePatternChange = (value: string) => {
    onThemeChange({ ...currentTheme, backgroundPattern: value });
  };


  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Personalize Sua Página</CardTitle>
          <CardDescription>
            Escolha um tema predefinido, um padrão de fundo ou defina suas próprias cores.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className='mb-2 block'>Temas Predefinidos</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="background-pattern">Padrão de Fundo</Label>
            <Select onValueChange={handlePatternChange} value={currentTheme.backgroundPattern || 'none'}>
              <SelectTrigger id="background-pattern">
                <SelectValue placeholder="Selecione um padrão" />
              </SelectTrigger>
              <SelectContent>
                {heroPatterns.map((pattern) => (
                  <SelectItem key={pattern} value={pattern}>
                    <span className="capitalize">{pattern.replace(/-/g, ' ')}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Cores Personalizadas</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Input type="color" value={currentTheme.primaryColor.startsWith('hsl') ? '#000000' : currentTheme.primaryColor} onChange={(e) => handleColorChange('primaryColor', e.target.value)} className="p-1 h-10 w-14" />
                <div className='flex-1'>
                  <Label htmlFor="primaryColor" className="text-xs">Primária</Label>
                  <Input id="primaryColor" value={currentTheme.primaryColor} onChange={(e) => handleColorChange('primaryColor', e.target.value)} placeholder="#29ABE2"/>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input type="color" value={currentTheme.backgroundColor.startsWith('hsl') ? '#ffffff' : currentTheme.backgroundColor} onChange={(e) => handleColorChange('backgroundColor', e.target.value)} className="p-1 h-10 w-14" />
                <div className='flex-1'>
                  <Label htmlFor="backgroundColor" className="text-xs">Fundo</Label>
                  <Input id="backgroundColor" value={currentTheme.backgroundColor} onChange={(e) => handleColorChange('backgroundColor', e.target.value)} placeholder="#F0F2F5" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input type="color" value={currentTheme.accentColor.startsWith('hsl') ? '#000000' : currentTheme.accentColor} onChange={(e) => handleColorChange('accentColor', e.target.value)} className="p-1 h-10 w-14" />
                <div className='flex-1'>
                  <Label htmlFor="accentColor" className="text-xs">Destaque</Label>
                  <Input id="accentColor" value={currentTheme.accentColor} onChange={(e) => handleColorChange('accentColor', e.target.value)} placeholder="#64B5F6"/>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() => setIsAiRecommenderOpen(true)}
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Obter Recomendações com IA
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
