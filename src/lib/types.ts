import type { LucideIcon } from 'lucide-react';

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface Profile {
  name: string;
  bio: string;
  avatarUrl:string;
}

export interface PageTheme {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  backgroundPattern?: string;
}
