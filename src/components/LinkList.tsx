
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
  MousePointerClick,
} from 'lucide-react';
import { useState } from 'react';
import { allIconsMap } from '@/lib/icon-map';
import { IconPicker } from './IconPicker';

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
  const [editedIcon, setEditedIcon] = useState('link');

  const handleEdit = (link: Link) => {
    setEditingId(link.id);
    setEditedTitle(link.title);
    setEditedUrl(link.url);
    setEditedIcon(link.icon || 'link');
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = (id: string) => {
    const originalLink = links.find(l => l.id === id);
    if (originalLink) {
        onUpdateLink({ ...originalLink, id, title: editedTitle, url: editedUrl, icon: editedIcon });
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Seus Links</h3>
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          {links.map((link) => {
             const IconComponent = allIconsMap[link.icon]?.component || allIconsMap['link'].component;
            return (
              <div
                key={link.id}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-1 space-y-2">
                  {editingId === link.id ? (
                    <div className="flex flex-col gap-2">
                      <Input
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Título"
                      />
                      <Input
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                        placeholder="URL"
                        type="url"
                      />
                      <IconPicker
                        iconKeys={Object.keys(allIconsMap)}
                        iconMap={allIconsMap}
                        selectedIcon={editedIcon}
                        onIconSelect={setEditedIcon}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                         <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{link.title}</p>
                      </div>
                      <div className="flex items-center gap-4">
                          <p className="text-sm text-muted-foreground truncate pl-6">
                            {link.url}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MousePointerClick className="h-3 w-3" />
                              <span>{link.clickCount || 0}</span>
                          </div>
                      </div>
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
            )})}
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum link ainda. Adicione um acima para começar!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

