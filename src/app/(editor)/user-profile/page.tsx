
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarEditorDialog from '@/components/AvatarEditorDialog';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

export default function UserProfilePage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<{ name: string; subscription: string; } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);
      if (authUser) {
        // Fetch additional user data from our 'users' table
        const { data: dbUserData, error } = await supabase
          .from('users')
          .select('name, avatar_url, subscription_plan')
          .eq('id', authUser.id)
          .single();

        if (error) {
          console.error("Error fetching user from DB", error);
        } else if (dbUserData) {
          setName(dbUserData.name || authUser.user_metadata.full_name || '');
          setAvatarUrl(dbUserData.avatar_url || authUser.user_metadata.avatar_url || 'https://picsum.photos/100/100');
          setDbUser({
            name: dbUserData.name,
            subscription: dbUserData.subscription_plan || 'Plano Básico'
          })
        }
      }
    };
    fetchUserData();
  }, [supabase]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update({ 
        name: name, 
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString() 
      })
      .eq('id', user.id);
    
    if (error) {
      toast({ variant: 'destructive', title: 'Erro!', description: 'Não foi possível atualizar o perfil.' });
    } else {
      toast({ title: 'Sucesso!', description: 'Seu perfil foi atualizado.' });
    }
  };
  
  const handleUpdatePassword = () => {
      toast({ title: 'Em breve!', description: 'A funcionalidade de alteração de senha será implementada.' });
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse font-bold text-primary text-xl">Carregando perfil...</div>
      </div>
    );
  }

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
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
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
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Endereço de E-mail</Label>
              <Input id="email" type="email" value={user.email} disabled />
            </div>
          </CardContent>
           <CardFooter>
            <Button onClick={handleUpdateProfile}>Salvar Alterações</Button>
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
            <Button onClick={handleUpdatePassword}>Alterar Senha</Button>
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
                        <p className="font-semibold">Você está no <span className="text-primary">{dbUser?.subscription || 'Plano Básico'}</span>.</p>
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
