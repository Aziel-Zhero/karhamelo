
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { IconDefinition } from '@/lib/icon-map';
import { ScrollArea } from './ui/scroll-area';

interface IconPickerProps {
  iconKeys: string[];
  iconMap: Record<string, IconDefinition>;
  selectedIcon: string;
  onIconSelect: (iconKey: string) => void;
}

export function IconPicker({ iconKeys, iconMap, selectedIcon, onIconSelect }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredIcons = iconKeys.filter((key) =>
    iconMap[key].label.toLowerCase().includes(search.toLowerCase())
  );

  const CurrentIcon = iconMap[selectedIcon]?.component || null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          {CurrentIcon && <CurrentIcon />}
          <span>{iconMap[selectedIcon]?.label || 'Selecione um ícone'}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selecione um Ícone</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
            <Input
            placeholder="Buscar ícones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <ScrollArea className="h-72">
          <div className="grid grid-cols-8 gap-2 pr-4">
            {filteredIcons.map((key) => {
              const Icon = iconMap[key].component;
              return (
                <Button
                  key={key}
                  variant="outline"
                  className="h-14 flex flex-col items-center justify-center gap-1"
                  onClick={() => {
                    onIconSelect(key);
                    setIsOpen(false);
                  }}
                  title={iconMap[key].label}
                >
                  <Icon className="h-6 w-6" />
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
