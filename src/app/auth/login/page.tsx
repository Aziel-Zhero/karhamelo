
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KLogo } from '@/components/KLogo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma aplicação real, aqui você faria a chamada de autenticação.
    // Para o protótipo, vamos apenas redirecionar para o dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-8 gap-2">
            <KLogo />
            <h1 className="text-2xl font-bold">Karhamelo</h1>
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Bem-vindo de volta!</CardTitle>
            <CardDescription>Faça login para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="w-full">
              Não tem uma conta?{' '}
              <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Chatbot messages={['Estou de olho em você!', 'Lembre-se da sua senha...']} />
    </div>
  );
}
