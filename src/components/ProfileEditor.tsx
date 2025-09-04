
'use client';

import type { Profile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Save, Github, Twitter, Linkedin, Instagram, Youtube, Facebook, Pencil } from 'lucide-react';
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
  const { toast } = useToast();
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
  
  // Sincroniza o estado interno se o prop externo mudar
  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof Profile, checked: boolean) => {
    const newProfile = { ...editedProfile, [name]: checked };
    setEditedProfile(newProfile);
    onProfileChange(newProfile); // Atualiza o pai imediatamente
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

  const handleAvatarChange = (newAvatarUrl: string) => {
    const newProfile = { ...editedProfile, avatarUrl: newAvatarUrl };
    setEditedProfile(newProfile);
    onProfileChange(newProfile); // Atualiza o pai imediatamente
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
    <>
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

              <div className="space-y-2">
                  <Label>Foto de Perfil</Label>
                  <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                          <AvatarImage src={editedProfile.avatarUrl} alt={editedProfile.name} />
                          <AvatarFallback>{editedProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
      <AvatarEditorDialog
        open={isAvatarEditorOpen}
        onOpenChange={setIsAvatarEditorOpen}
        currentAvatar={editedProfile.avatarUrl}
        onAvatarSave={handleAvatarChange}
      />
    </>
  );
}
