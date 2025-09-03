
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
      title: 'Profile Updated!',
      description: 'Your profile details have been saved.',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
        <CardDescription>
          Update your name, bio, and avatar. The bio is optional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={editedProfile.name}
            onChange={handleInputChange}
            required
          />
          <Textarea
            name="bio"
            placeholder="Your Bio (optional)"
            value={editedProfile.bio}
            onChange={handleInputChange}
          />
          <Input
            name="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.png"
            value={editedProfile.avatarUrl}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" className="w-full">
            <Save className="mr-2" /> Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
