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

export interface PortfolioFeature {
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
  title: string;
  description: string;
  imageUrl: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
  
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
  
  ctaBannerTitle: string;
  ctaBannerDescription: string;
  ctaBannerButtonText: string;
}
