
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { KLogo } from './KLogo';
import { BookCopy, LayoutDashboard, Link as LinkIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/links', label: 'Links', icon: LinkIcon },
  { href: '/portfolio/editor', label: 'Portfólio', icon: BookCopy },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Em um app real, aqui você limparia o token de autenticação
    router.push('/auth/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <KLogo />
            <span className="font-bold text-xl tracking-tight hidden md:inline">Karhamelo</span>
          </Link>
           <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((navLink) => (
              <Link
                key={navLink.href}
                href={navLink.href}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'font-semibold',
                  pathname.startsWith(navLink.href)
                    ? 'bg-muted text-primary hover:bg-muted'
                    : 'text-muted-foreground'
                )}
              >
                <navLink.icon className="mr-2 h-4 w-4" />
                {navLink.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://picsum.photos/100/100"
                    data-ai-hint="person"
                    alt="@karhamelo"
                  />
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Karhamelo</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    karhamelo@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/user-profile">Perfil</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/billing">Faturamento</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/settings">Configurações</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
