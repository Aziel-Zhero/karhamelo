
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2 } from 'lucide-react';
import type { Link } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface LinkEditorProps {
  onAddLink: (link: Omit<Link, 'id'>) => void;
}

export default function LinkEditor({ onAddLink }: LinkEditorProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAddLink({ title, url, icon: Link2 });
      setTitle('');
      setUrl('');
      toast({
        title: 'Link adicionado!',
        description: `"${title}" foi adicionado ao seu perfil.`,
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Adicionar Novo Link</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <Input
            placeholder="Título do Link"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="flex-1"
          />
          <Input
            type="url"
            placeholder="https://exemplo.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">Adicionar Link</Button>
        </form>
      </CardContent>
    </Card>
  );
}
