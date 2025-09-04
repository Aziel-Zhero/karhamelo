
'use client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function UserProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Perfil do Usuário</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User />
            <span>Página em Construção</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A página de perfil do usuário estará disponível em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
