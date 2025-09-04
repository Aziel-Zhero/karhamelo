
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { KLogo } from '@/components/KLogo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

const GoogleIcon = () => (
    <svg className="mr-3 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 173.4 54.7l-73.4 69.4C322.2 100.9 288.4 88 248 88c-88.3 0-160 71.7-160 160s71.7 160 160 160c97.2 0 132.8-62.4 137.9-92.4H248v-72h239.5c1.4 9.3 2.5 19.1 2.5 29.8z"></path>
  </svg>
)

export default function SignupPage() {
    const router = useRouter();

    const handleGoogleSignup = () => {
        // Futuramente, aqui será a lógica de auth com Supabase
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
            <CardDescription>É rápido e fácil. Comece agora!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignup}>
                <GoogleIcon />
                Criar conta com o Google
            </Button>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                    </span>
                </div>
            </div>
             <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
