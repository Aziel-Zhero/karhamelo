
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  getAIStyleRecommendations,
  type AIStyleRecommendationsOutput,
} from '@/ai/flows/ai-style-recommendations';
import type { PageTheme, Profile, Link } from '@/lib/types';
import { Loader2, Sparkles, Paintbrush } from 'lucide-react';

interface AIStyleRecommenderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onThemeApply: (theme: PageTheme) => void;
  profile: Profile;
  links: Link[];
}

function hexToHsl(hex: string): string {
    if (!hex || !hex.startsWith('#')) return 'hsl(0 0% 0%)';
    hex = hex.slice(1);
    
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    }
    
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
}


export default function AIStyleRecommender({
  open,
  onOpenChange,
  onThemeApply,
  profile,
  links,
}: AIStyleRecommenderProps) {
  const { toast } = useToast();
  const [preferredThemes, setPreferredThemes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<
    (AIStyleRecommendationsOutput & { theme: PageTheme }) | null
  >(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getAIStyleRecommendations({
        bio: profile.bio,
        existingLinks: links.map((l) => l.url),
        preferredThemes: preferredThemes
          ? preferredThemes.split(',').map((t) => t.trim())
          : [],
      });

      const newTheme: PageTheme = {
        primaryColor: `hsl(${hexToHsl(result.colorSchemeSuggestion.primaryColor)})`,
        backgroundColor: `hsl(${hexToHsl(result.colorSchemeSuggestion.backgroundColor)})`,
        accentColor: `hsl(${hexToHsl(result.colorSchemeSuggestion.accentColor)})`,
      };

      setRecommendation({ ...result, theme: newTheme });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao obter recomendações da IA. Por favor, tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyTheme = () => {
    if (recommendation) {
      onThemeApply(recommendation.theme);
      onOpenChange(false);
      toast({
        title: 'Tema Aplicado!',
        description: `O tema "${recommendation.themeSuggestion}" foi aplicado à sua página.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Recomendador de Estilo com IA
          </DialogTitle>
          <DialogDescription>
            Deixe nossa IA sugerir um tema com base no seu conteúdo. Adicione palavras-chave para temas que você gosta.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <Textarea
            placeholder="ex: minimalista, futurista, retrô, profissional"
            value={preferredThemes}
            onChange={(e) => setPreferredThemes(e.target.value)}
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {recommendation && !isLoading && (
          <div className="space-y-4 rounded-lg border p-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Paintbrush className="h-4 w-4" /> Tema Sugerido:{' '}
              {recommendation.themeSuggestion}
            </h4>
            <div className="flex gap-2 w-full">
              <div
                className="w-1/3 rounded p-2 text-center text-xs text-white"
                style={{ backgroundColor: recommendation.theme.primaryColor }}
              >
                Primária
              </div>
              <div
                className="w-1/3 rounded p-2 text-center text-xs border"
                style={{ backgroundColor: recommendation.theme.backgroundColor }}
              >
                Fundo
              </div>
              <div
                className="w-1/3 rounded p-2 text-center text-xs text-white"
                style={{ backgroundColor: recommendation.theme.accentColor }}
              >
                Destaque
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {recommendation.reasoning}
            </p>
            <Button className="w-full" onClick={handleApplyTheme}>
              Aplicar este tema
            </Button>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Gerar Sugestão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
