
import type { LucideIcon } from 'lucide-react';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          google_id: string | null
          email: string | null
          name: string | null
          avatar_url: string | null
          subscription_plan: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          google_id?: string | null
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          subscription_plan?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          google_id?: string | null
          email?: string | null
          name?: string | null
          avatar_url?: string | null
          subscription_plan?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      links: {
        Row: {
          id: string
          user_id: string
          title: string
          url: string
          icon: string | null
          order: number | null
          click_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          url: string
          icon?: string | null
          order?: number | null
          click_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          url?: string
          icon?: string | null
          order?: number | null
          click_count?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      pages: {
        Row: {
          id: string
          user_id: string
          profile_bio: string | null
          social_links: Json | null
          theme: Json | null
          portfolio: Json | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          profile_bio?: string | null
          social_links?: Json | null
          theme?: Json | null
          portfolio?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          profile_bio?: string | null
          social_links?: Json | null
          theme?: Json | null
          portfolio?: Json | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  clickCount?: number;
}

export interface Profile {
  name: string;
  bio: string;
  avatarUrl:string;
  isPortfolioLinkEnabled?: boolean;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
}

export interface PageTheme {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  backgroundPattern?: string;
  buttonStyle?: 'filled' | 'outline';
  buttonRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonShadow?: boolean;
}

export interface PortfolioFeature {
  icon?: string;
  title: string;
  description: string;
}

export interface PortfolioStep {
  title: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Portfolio {
  logoType: 'text' | 'image';
  logoText?: string;
  logoImageUrl?: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  ctaButtonIcon?: string;
  
  isFeaturesEnabled: boolean;
  features: PortfolioFeature[];
  
  isHowItWorksEnabled: boolean;
  howItWorksTitle: string;
  howItWorksDescription: string;
  steps: PortfolioStep[];
  howItWorksImageUrl: string;
  
  isGalleryEnabled: boolean;
  galleryTitle?: string;
  galleryDescription?: string;
  projects?: PortfolioProject[];
  
  isCtaBannerEnabled: boolean;
  ctaBannerTitle: string;
  ctaBannerDescription: string;
  ctaBannerButtonText: string;
}
