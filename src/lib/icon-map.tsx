import { ArrowRight, ShoppingCart, Users, Settings, Zap, ShieldCheck, BarChart2 } from 'lucide-react';
import * as React from 'react';

// Ícone do WhatsApp
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Ícone do Telegram
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 2 11 13" />
    <path d="m22 2-7 20-4-9-9-4 20-7z" />
  </svg>
);

// Ícone para Vendedor/Gestão
const SellerIcon = () => <Users className="h-6 w-6 text-primary" />;

// Ícone para Checkout
const CheckoutIcon = () => <ShoppingCart className="h-6 w-6 text-primary" />;

// Ícone para Catálogo
const CatalogIcon = () => <Settings className="h-6 w-6 text-primary" />;

interface IconDefinition {
  component: React.ElementType;
  label: string;
}

export const ctaIconsMap: Record<string, IconDefinition> = {
  arrowRight: { component: ArrowRight, label: 'Seta' },
  whatsapp: { component: WhatsappIcon, label: 'WhatsApp' },
  telegram: { component: TelegramIcon, label: 'Telegram' },
  none: { component: () => null, label: 'Nenhum' },
};

export const featureIconsMap: Record<string, IconDefinition> = {
  seller: { component: SellerIcon, label: 'Gestão de Sellers' },
  checkout: { component: CheckoutIcon, label: 'Checkout Rápido' },
  catalog: { component: CatalogIcon, label: 'Catálogo Inteligente' },
  zap: { component: Zap, label: 'Performance' },
  shield: { component: ShieldCheck, label: 'Segurança' },
  chart: { component: BarChart2, label: 'Analytics' },
};
