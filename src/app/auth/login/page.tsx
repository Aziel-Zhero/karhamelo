
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { KLogo } from '@/components/KLogo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

const GoogleIcon = () => (
<<<<<<< HEAD
  <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" width="48px" height="48px">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

=======
    <svg className="mr-3 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 54.7l-73.4 69.4C322.2 100.9 288.4 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c97.2 0 132.8-62.4 137.9-92.4H248v-72h239.5c1.4 9.3 2.5 19.1 2.5 29.8z"></path>
  </svg>
)
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f

export default function LoginPage() {
  const router = useRouter();

<<<<<<< HEAD
  const handleGoogleLogin = () => {
    // Em uma aplicação real, aqui você iniciaria o fluxo de login do Google.
    // Para o protótipo, vamos apenas redirecionar para o dashboard.
=======
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f
    router.push('/dashboard');
  };

  const handleGoogleLogin = () => {
    // Futuramente, aqui será a lógica de auth com Supabase
    router.push('/dashboard');
  }

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
            <CardDescription>Faça login com sua conta Google para continuar.</CardDescription>
          </CardHeader>
<<<<<<< HEAD
          <CardContent>
            <Button onClick={handleGoogleLogin} className="w-full" variant="outline">
              <GoogleIcon />
              Entrar com o Google
            </Button>
=======
          <CardContent className="space-y-4">
             <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                <GoogleIcon />
                Entrar com o Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com seu e-mail
                    </span>
                </div>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Entrar com E-mail</Button>
            </form>
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f
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
<<<<<<< HEAD
      <Chatbot messages={['É só um clique para entrar!', 'Bem-vindo de volta!']} />
=======
      <Chatbot messages={['Au au! Vamos logar!']} />
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f
    </div>
  );
}
