
'use client';

import type { Profile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Save } from 'lucide-react';

interface ProfileEditorProps {
  profile: Profile;
  onProfileChange: (newProfile: Profile) => void;
}

export default function ProfileEditor({ profile, onProfileChange }: ProfileEditorProps) {
  const { toast } = useToast();
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
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
          Atualize seu nome, biografia e avatar. A biografia é opcional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Seu Nome"
            value={editedProfile.name}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="bio"
            placeholder="Sua Biografia (opcional)"
            value={editedProfile.bio}
            onChange={handleInputChange}
          />
          <Input
            name="avatarUrl"
            type="url"
            placeholder="https://exemplo.com/avatar.png"
            value={editedProfile.avatarUrl}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" className="w-full">
            <Save className="mr-2" /> Salvar Perfil
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
