
'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Star, Calendar, RefreshCw } from 'lucide-react';

export default function BillingPage() {
  
  // Hardcoded user subscription data for demonstration
  const currentSubscription = {
    planName: 'Plano Pro Anual',
    status: 'Ativo',
    price: 'R$ 199,90/ano',
    renewalDate: '15 de Julho de 2025',
    subscribedDate: '15 de Julho de 2024',
  };

  const subscriptionPlans = [
    {
      name: 'Pro Mensal',
      price: 'R$ 19,90',
      period: '/mês no Pix',
      features: [
        'Links ilimitados',
        'Personalização avançada',
        'Dashboard de analytics',
        'Suporte prioritário',
      ]
    },
    {
      name: 'Pro Anual',
      price: 'R$ 199,90',
      period: '/ano no Pix (2 meses grátis)',
      features: [
        'Todos os benefícios do Pro',
        'Acesso antecipado a novos recursos',
        'Selo de perfil verificado',
      ],
      isPopular: true,
    }
  ];

  const portfolioPurchase = {
      name: 'LP de Portfólio',
      oneTimePrice: 'R$ 300,00',
      installmentPrice: 'R$ 389,90',
      features: [
        'Landing page de portfólio profissional',
        'Seções personalizáveis (Hero, Sobre, Galeria, etc.)',
        'Animações e efeitos visuais',
        'Pagamento único, acesso vitalício',
      ]
  };


  return (
    <div className="container mx-auto py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Faturamento e Assinaturas</h1>
        <p className="text-muted-foreground">Gerencie seus planos e compras.</p>
      </div>

      {/* Current Subscription Card */}
      <Card className="shadow-lg border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="text-primary"/>
            Sua Assinatura Atual
          </CardTitle>
          <CardDescription>
            Detalhes do seu plano atual e ciclo de faturamento.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-muted/50 rounded-lg">
                <div>
                    <h3 className="text-lg font-semibold">{currentSubscription.planName}</h3>
                    <p className="text-muted-foreground">{currentSubscription.price}</p>
                </div>
                <Badge variant={currentSubscription.status === 'Ativo' ? 'default' : 'destructive'} className="mt-2 sm:mt-0">{currentSubscription.status}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Data da assinatura: {currentSubscription.subscribedDate}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <span>Expira em: {currentSubscription.renewalDate}</span>
                </div>
            </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Gerenciar Assinatura</Button>
        </CardFooter>
      </Card>

      {/* Subscription Plans Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Planos de Assinatura</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.isPopular ? 'border-primary' : ''}`}>
              {plan.isPopular && <Badge className="absolute -top-3 self-center px-3 py-1">Mais Popular</Badge>}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                    </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? 'default' : 'outline'}>Selecionar Plano</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Portfolio Purchase Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Compra Única</h2>
         <Card className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 flex flex-col">
              <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2 mb-2"><Crown /> {portfolioPurchase.name}</CardTitle>
                  <CardDescription>Acesso vitalício à sua Landing Page de Portfólio com um pagamento único.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4 flex-grow space-y-3">
                  {portfolioPurchase.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                      </div>
                  ))}
              </CardContent>
            </div>
            <Separator orientation="vertical" className="h-auto hidden md:block" />
            <Separator orientation="horizontal" className="w-auto md:hidden" />
            <div className="md:w-1/2 p-6 space-y-4 bg-muted/30">
                <Card className="bg-background">
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">Pagamento via Pix</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-3xl font-bold mb-2">{portfolioPurchase.oneTimePrice}</p>
                        <Button className="w-full">Pagar com Pix</Button>
                    </CardContent>
                </Card>
                 <Card className="bg-background">
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">Pagamento Parcelado</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <p className="text-3xl font-bold mb-2">{portfolioPurchase.installmentPrice}</p>
                        <Button className="w-full" variant="outline">Pagar Parcelado</Button>
                    </CardContent>
                </Card>
            </div>
        </Card>
      </div>
    </div>
  );
}
