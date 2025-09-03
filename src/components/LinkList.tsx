'use client';

import type { Link } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  GripVertical,
  Trash2,
  Edit,
  Save,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface LinkListProps {
  links: Link[];
  onUpdateLink: (link: Link) => void;
  onDeleteLink: (id: string) => void;
}

export default function LinkList({
  links,
  onUpdateLink,
  onDeleteLink,
}: LinkListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  const handleEdit = (link: Link) => {
    setEditingId(link.id);
    setEditedTitle(link.title);
    setEditedUrl(link.url);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (id: string) => {
    const originalLink = links.find(l => l.id === id);
    if (originalLink) {
        onUpdateLink({ ...originalLink, id, title: editedTitle, url: editedUrl });
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Links</h3>
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
              <div className="flex-1 space-y-1">
                {editingId === link.id ? (
                  <div className="flex flex-col md:flex-row gap-2">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                      placeholder="URL"
                      type="url"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.url}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                {editingId === link.id ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSave(link.id)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(link)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteLink(link.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No links yet. Add one above to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
