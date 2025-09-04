
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://karhamelo.app'),
  title: {
    default: 'Karhamelo',
    template: '%s | Karhamelo',
  },
  description: 'Crie uma página de links personalizada, um portfólio profissional e gerencie tudo em uma plataforma simples e poderosa. Ideal para criadores, freelancers e negócios.',
  keywords: ['link na bio', 'página de links', 'portfólio online', 'agregador de links', 'criador de site', 'landing page'],
  authors: [{ name: 'Karhamelo' }],
  creator: 'Karhamelo',
  publisher: 'Karhamelo',
  openGraph: {
    title: 'Karhamelo | Seu universo de links em um só lugar',
    description: 'Crie uma página de links e portfólio personalizados de forma rápida e intuitiva.',
    url: 'https://karhamelo.app',
    siteName: 'Karhamelo',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Karhamelo - Crie sua Página de Links',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karhamelo | Seu universo de links em um só lugar',
    description: 'Crie uma página de links e portfólio personalizados de forma rápida e intuitiva.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
