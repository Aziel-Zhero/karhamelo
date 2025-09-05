
'use client';

import type { Profile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { Github, Twitter, Linkedin, Instagram, Youtube, Facebook, Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import AvatarEditorDialog from './AvatarEditorDialog';

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
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);

  const handleSwitchChange = (name: keyof Profile, checked: boolean) => {
    onProfileChange({ ...profile, [name]: checked });
  };
  
  const handleSocialLinkChange = (key: keyof NonNullable<Profile['socialLinks']>, value: string) => {
    onProfileChange({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [key]: value,
      },
    });
  };

  const handleAvatarSave = (newAvatarUrl: string) => {
    onProfileChange({ ...profile, avatarUrl: newAvatarUrl });
    setIsAvatarEditorOpen(false); 
  };


  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Edite seu Perfil</CardTitle>
          <CardDescription>
            Atualize seus dados pessoais e links de redes sociais. As alterações são refletidas em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Foto de Perfil</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" onClick={() => setIsAvatarEditorOpen(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Alterar Foto
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu Nome"
                  value={profile.name}
                  onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Sua Biografia (opcional)"
                  value={profile.bio}
                  onChange={(e) => onProfileChange({ ...profile, bio: e.target.value })}
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
                      value={profile.socialLinks?.[key] || ''}
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
                  checked={!!profile.isPortfolioLinkEnabled}
                  onCheckedChange={(checked) => handleSwitchChange('isPortfolioLinkEnabled', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AvatarEditorDialog
        open={isAvatarEditorOpen}
        onOpenChange={setIsAvatarEditorOpen}
        currentAvatar={profile.avatarUrl}
        onAvatarSave={handleAvatarSave}
      />
    </>
  );
}
