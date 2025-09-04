
'use client';
import React from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
       if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setIsLoading(false);
       }
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { user, isLoading };
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/login');
    }
  }, [isLoading, user, router]);
  
  if (isLoading || !user) {
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
