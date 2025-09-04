
'use client';
import React from 'react';
import Header from '@/components/Header';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full container mx-auto p-4 md:p-8">
          {children}
        </main>
    </div>
  );
}
