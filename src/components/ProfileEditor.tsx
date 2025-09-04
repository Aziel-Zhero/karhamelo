
'use client';

import type { Profile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Save, Github, Twitter, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from './ui/switch';

interface ProfileEditorProps {
  profile: Profile;
  onProfileChange: (newProfile: Profile) => void;
}

const socialPlatforms = [
  { key: 'github', label: 'GitHub', icon: Github },
  { key: 'twitter', label: 'Twitter / X', icon: Twitter },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
] as const;

export default function ProfileEditor({ profile, onProfileChange }: ProfileEditorProps) {
  const { toast } = useToast();
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof Profile, checked: boolean) => {
    setEditedProfile(prev => ({ ...prev, [name]: checked }));
  }
  
  const handleSocialLinkChange = (key: keyof NonNullable<Profile['socialLinks']>, value: string) => {
    setEditedProfile(prev => ({
        ...prev,
        socialLinks: {
            ...prev.socialLinks,
            [key]: value
        }
    }))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileChange(editedProfile);
    toast({
      title: 'Perfil Atualizado!',
      description: 'Os detalhes do seu perfil foram salvos.',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Edite seu Perfil</CardTitle>
        <CardDescription>
          Atualize seus dados pessoais e links de redes sociais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
             <div className='space-y-2'>
                <Label htmlFor="name">Nome</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Seu Nome"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    required
                />
             </div>
             <div className='space-y-2'>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Sua Biografia (opcional)"
                    value={editedProfile.bio}
                    onChange={handleInputChange}
                />
             </div>
            <div className='space-y-2'>
              <Label htmlFor="avatarUrl">URL do Avatar</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                placeholder="https://exemplo.com/avatar.png"
                value={editedProfile.avatarUrl}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Redes Sociais</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialPlatforms.map(({ key, label, icon: Icon }) => (
                    <div key={key} className="space-y-2">
                        <Label htmlFor={`social-${key}`} className="flex items-center gap-2">
                           <Icon className="h-4 w-4" /> {label}
                        </Label>
                        <Input
                            id={`social-${key}`}
                            name={`socialLinks.${key}`}
                            placeholder={`https://...`}
                            value={editedProfile.socialLinks?.[key] || ''}
                            onChange={(e) => handleSocialLinkChange(key, e.target.value)}
                        />
                    </div>
                ))}
            </div>
          </div>

          <Separator />

           <div className="space-y-4">
            <h4 className="text-sm font-medium">Configurações da Página</h4>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div>
                  <Label htmlFor="isPortfolioLinkEnabled">Link para Portfólio</Label>
                  <p className="text-xs text-muted-foreground">Exibe um botão para seu portfólio na página de links.</p>
                </div>
                <Switch
                  id="isPortfolioLinkEnabled"
                  checked={editedProfile.isPortfolioLinkEnabled}
                  onCheckedChange={(checked) => handleSwitchChange('isPortfolioLinkEnabled', checked)}
                />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <Save className="mr-2" /> Salvar Perfil
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
