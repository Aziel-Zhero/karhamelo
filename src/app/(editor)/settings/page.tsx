
'use client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bell, HelpCircle, Settings, BarChart2, Link as LinkIcon, BookOpen, Palette, CreditCard, User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Configurações e Ajuda</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e encontre respostas.</p>
      </div>
      
      {/* Seção de Configurações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings />
            <span>Configurações Gerais</span>
          </CardTitle>
          <CardDescription>Ajuste as preferências de notificação do aplicativo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="click-milestone-notifications" className="font-semibold">Notificações de Marcos de Cliques</Label>
                <p className="text-sm text-muted-foreground">
                  Receba uma notificação a cada 50 cliques em qualquer um dos seus links.
                </p>
              </div>
              <Switch id="click-milestone-notifications" />
            </div>
        </CardContent>
      </Card>
      
      {/* Seção de Ajuda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle />
            <span>Central de Ajuda</span>
          </CardTitle>
          <CardDescription>
            Encontre respostas para as perguntas mais comuns sobre o sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger><div className="flex items-center gap-2"><BarChart2 className="h-4 w-4"/><span>O que é o Dashboard?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                O Dashboard é sua central de controle. Ele oferece uma visão geral e rápida das métricas mais importantes da sua página, como o número total de links ativos, a soma de todos os cliques que seus links receberam e o total de visualizações do seu perfil. Use esses dados para entender o que está funcionando e o que pode ser melhorado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger><div className="flex items-center gap-2"><LinkIcon className="h-4 w-4"/><span>Como gerenciar meus Links?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Na seção "Links", você pode adicionar, editar e excluir os links que aparecem na sua página pública. Você também pode personalizar completamente a aparência da sua página, alterando cores, padrões de fundo e até o estilo dos botões (com ou sem preenchimento, bordas arredondadas e sombras). Além disso, pode adicionar seus perfis de redes sociais que aparecerão com seus respectivos ícones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger><div className="flex items-center gap-2"><BookOpen className="h-4 w-4"/><span>O que é a página de Portfólio (LP)?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                A página de Portfólio (ou Landing Page) é um site de uma página, mais completo e visual, ideal para apresentar seus trabalhos, projetos e serviços de forma profissional. Você pode personalizar seções como "Benefícios", "Como Funciona", uma galeria de projetos e chamadas para ação (CTAs). A aparência dela também pode ser totalmente personalizada no editor de temas.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger><div className="flex items-center gap-2"><Palette className="h-4 w-4"/><span>Como funciona a personalização de tema?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                O personalizador de tema permite que você altere o visual tanto da sua página de Links quanto da sua página de Portfólio. Você pode escolher temas pré-definidos, selecionar cores personalizadas, aplicar padrões de fundo e definir o estilo dos botões. Nossa IA também pode sugerir um tema com base no conteúdo do seu perfil para uma experiência ainda mais rápida. As alterações são aplicadas em tempo real na pré-visualização.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger><div className="flex items-center gap-2"><CreditCard className="h-4 w-4"/><span>Como gerencio meu Faturamento?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                A página de Faturamento é onde você pode ver e gerenciar seus planos de assinatura e compras. Lá você encontrará detalhes sobre sua assinatura atual, como status e data de expiração, além de poder comparar e selecionar outros planos. Compras únicas, como o acesso vitalício à página de Portfólio, também são gerenciadas nesta seção.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger><div className="flex items-center gap-2"><User className="h-4 w-4"/><span>O que posso fazer no Perfil do Usuário?</span></div></AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Na página de Perfil, você pode gerenciar todas as informações da sua conta. Isso inclui alterar sua foto de perfil (com ferramentas de recorte e zoom), atualizar seu nome e e-mail, alterar sua senha de acesso e visualizar seu plano de assinatura atual.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
