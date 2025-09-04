
'use client';
import React from 'react';
import Header from '@/components/Header';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleViewPage = (page: 'links' | 'portfolio') => {
    if (page === 'links') {
      const pageData = localStorage.getItem('karhamelo-page-data');
      if (pageData) {
        window.open('/profile/preview', '_blank');
      }
    } else {
      const portfolioData = localStorage.getItem('karhamelo-portfolio-data');
      if(portfolioData) {
        window.open('/portfolio/preview', '_blank');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
        <Header onViewPage={handleViewPage} />
        <main className="flex-1 w-full container mx-auto p-4 md:p-8">
          {children}
        </main>
    </div>
  );
}
