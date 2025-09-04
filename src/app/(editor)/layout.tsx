
'use client';
import React from 'react';
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import Header from '@/components/Header';
import { Home, Link, Briefcase, Settings, User, CreditCard } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
    <SidebarProvider>
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="/dashboard" isActive={pathname === '/dashboard'} tooltip="Dashboard">
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="/links" isActive={pathname === '/links'} tooltip="Links">
              <Link />
              <span>Links</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="/portfolio/editor" isActive={pathname === '/portfolio/editor'} tooltip="Portfolio">
              <Briefcase />
              <span>Portfólio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header onViewPage={handleViewPage} />
        <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
