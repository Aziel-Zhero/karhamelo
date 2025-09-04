
'use client';
import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock authentication check
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd verify a token here.
    // For this prototype, we'll simulate a logged-in user.
    const mockAuthCheck = true; 
    setIsAuthenticated(mockAuthCheck);
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);
  
  if (isLoading || !isAuthenticated) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse font-bold text-primary text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full container mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
