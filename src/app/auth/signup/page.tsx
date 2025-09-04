
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { KLogo } from '@/components/KLogo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" width="48px" height="48px">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

export default function SignupPage() {
    const router = useRouter();

    const handleGoogleSignup = () => {
        // Em uma aplicação real, aqui você iniciaria o fluxo de cadastro do Google.
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
            <CardTitle>Crie sua Conta</CardTitle>
            <CardDescription>Comece em segundos usando sua conta do Google.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoogleSignup} className="w-full" variant="outline">
                <GoogleIcon />
                Criar conta com o Google
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm">
             <p className="w-full">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <Chatbot messages={["Vamos começar?", "É super rápido, eu prometo!"]} />
    </div>
  );
}
