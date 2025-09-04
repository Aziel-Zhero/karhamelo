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
