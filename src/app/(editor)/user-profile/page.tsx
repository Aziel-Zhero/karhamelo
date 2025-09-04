'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarEditorDialog from '@/components/AvatarEditorDialog';
import Link from 'next/link';

export default function UserProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState('https://picsum.photos/100/100');
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
  
  // Hardcoded user data for demonstration
  const user = {
    name: 'Karhamelo',
    email: 'karhamelo@example.com',
    subscription: 'Plano Pro',
  };

  return (
    <>
      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>

        <Card>
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
            <CardDescription>Atualize sua foto de perfil. Ela será exibida publicamente.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => setIsAvatarEditorOpen(true)}>
              Alterar Foto
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>Gerencie as informações da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Endereço de E-mail</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
          </CardContent>
           <CardFooter>
            <Button>Salvar Alterações</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Altere sua senha.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Alterar Senha</Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Sua Assinatura</CardTitle>
                <CardDescription>Gerencie seu plano e informações de faturamento.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div>
                        <p className="font-semibold">Você está no <span className="text-primary">{user.subscription}</span>.</p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="/billing">Gerenciar Plano</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

      </div>
      <AvatarEditorDialog
        open={isAvatarEditorOpen}
        onOpenChange={setIsAvatarEditorOpen}
        currentAvatar={avatarUrl}
        onAvatarSave={setAvatarUrl}
      />
    </>
  );
}
