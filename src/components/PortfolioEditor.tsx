
'use client';

import type { Portfolio, PortfolioFeature, PortfolioStep, PortfolioProject } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Save, Trash2, PlusCircle, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from './ui/separator';

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onPortfolioChange: (newPortfolio: Portfolio) => void;
}

export default function PortfolioEditor({ portfolio, onPortfolioChange }: PortfolioEditorProps) {
  const { toast } = useToast();
  const [editedPortfolio, setEditedPortfolio] = useState<Portfolio>(portfolio);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPortfolio(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUri = loadEvent.target?.result as string;
        setEditedPortfolio(prev => ({ ...prev, [name]: dataUri }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  const handleFeatureChange = (index: number, field: keyof PortfolioFeature, value: string) => {
    const newFeatures = [...(editedPortfolio.features || [])];
    newFeatures[index][field] = value;
    setEditedPortfolio(prev => ({...prev, features: newFeatures}));
  }

  const handleStepChange = (index: number, field: keyof PortfolioStep, value: string) => {
    const newSteps = [...(editedPortfolio.steps || [])];
    newSteps[index][field] = value;
    setEditedPortfolio(prev => ({...prev, steps: newSteps}));
  }

  const handleProjectChange = (index: number, field: keyof PortfolioProject, value: string) => {
    const newProjects = [...(editedPortfolio.projects || [])];
    const projectToUpdate = { ...newProjects[index], [field]: value };
    newProjects[index] = projectToUpdate;
    setEditedPortfolio(prev => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    const newProject: PortfolioProject = { id: crypto.randomUUID(), title: '', imageUrl: 'https://picsum.photos/800/600' };
    setEditedPortfolio(prev => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
  };

  const deleteProject = (id: string) => {
    setEditedPortfolio(prev => ({ ...prev, projects: (prev.projects || []).filter(p => p.id !== id) }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPortfolioChange(editedPortfolio);
    toast({
      title: 'Portfólio Atualizado!',
      description: 'Os detalhes do seu portfólio foram salvos.',
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Edite sua LP de Portfólio</CardTitle>
          <CardDescription>
            Personalize o conteúdo da sua página de destino pessoal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Seção Hero */}
            <div className='space-y-4 p-4 border rounded-lg'>
               <h3 className="font-semibold text-lg">Seção Principal (Hero)</h3>
               <div className="space-y-2">
                  <Label htmlFor="title">Título Principal</Label>
                  <Input id="title" name="title" placeholder="O Título da Sua Página" value={editedPortfolio.title} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" placeholder="Uma descrição curta e impactante." value={editedPortfolio.description} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Imagem Principal</Label>
                   <p className="text-xs text-muted-foreground">Recomendado: 1200x800 pixels.</p>
                  <Input id="imageUrl" name="imageUrl" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                  {editedPortfolio.imageUrl && <img src={editedPortfolio.imageUrl} alt="Preview" className="mt-2 rounded-md max-h-40" />}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="ctaButtonText">Texto do Botão (CTA)</Label>
                      <Input id="ctaButtonText" name="ctaButtonText" placeholder="Começar" value={editedPortfolio.ctaButtonText} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="ctaButtonUrl">URL do Botão (CTA)</Label>
                      <Input id="ctaButtonUrl" name="ctaButtonUrl" type="url" placeholder="#contato" value={editedPortfolio.ctaButtonUrl} onChange={handleInputChange} required />
                  </div>
                </div>
            </div>

            {/* Seção de Benefícios */}
            <div className='space-y-4 p-4 border rounded-lg'>
              <h3 className="font-semibold text-lg">Seção de Benefícios</h3>
              {editedPortfolio.features && editedPortfolio.features.map((feature, index) => (
                  <div key={index} className="space-y-3 p-3 border rounded-md relative">
                      <Label>Card de Benefício #{index+1}</Label>
                      <Input placeholder="Título do Card" value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                      <Textarea placeholder="Descrição do Card" value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} />
                  </div>
              ))}
            </div>

            {/* Seção Como Funciona */}
            <div className='space-y-4 p-4 border rounded-lg'>
               <h3 className="font-semibold text-lg">Seção "Como Funciona"</h3>
               <div className="space-y-2">
                  <Label>Título da Seção</Label>
                  <Input name="howItWorksTitle" placeholder="Título da seção" value={editedPortfolio.howItWorksTitle} onChange={handleInputChange}/>
                </div>
                <div className="space-y-2">
                  <Label>Descrição da Seção</Label>
                  <Textarea name="howItWorksDescription" placeholder="Descrição da seção" value={editedPortfolio.howItWorksDescription} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                  <Label>URL da Imagem</Label>
                   <p className="text-xs text-muted-foreground">Recomendado: 1200x1000 pixels.</p>
                  <Input name="howItWorksImageUrl" type="url" placeholder="https://exemplo.com/imagem.png" value={editedPortfolio.howItWorksImageUrl} onChange={handleInputChange}/>
                </div>
                <Separator />
                <Label>Passos</Label>
                 {editedPortfolio.steps && editedPortfolio.steps.map((step, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-md">
                      <Label>Passo #{index+1}</Label>
                      <Input placeholder="Título do Passo" value={step.title} onChange={(e) => handleStepChange(index, 'title', e.target.value)} />
                      <Input placeholder="Descrição do Passo" value={step.description} onChange={(e) => handleStepChange(index, 'description', e.target.value)} />
                  </div>
              ))}
            </div>

            {/* Seção Galeria */}
            <div className='space-y-4 p-4 border rounded-lg'>
              <h3 className="font-semibold text-lg">Seção de Galeria (Carrossel)</h3>
              <div className="space-y-2">
                  <Label>Título da Galeria</Label>
                  <Input name="galleryTitle" placeholder="Título da Seção de Galeria" value={editedPortfolio.galleryTitle || ''} onChange={handleInputChange}/>
              </div>
              <div className="space-y-2">
                  <Label>Descrição da Galeria</Label>
                  <Textarea name="galleryDescription" placeholder="Descrição da Seção de Galeria" value={editedPortfolio.galleryDescription || ''} onChange={handleInputChange} />
              </div>
              <Separator />
              <Label>Projetos da Galeria</Label>
               <p className="text-xs text-muted-foreground">Recomendado: 800x800 pixels (quadrado).</p>
              {(editedPortfolio.projects || []).map((project, index) => (
                <div key={project.id} className="space-y-2 p-3 border rounded-md relative">
                  <Label>Projeto #{index + 1}</Label>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => deleteProject(project.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <Input placeholder="Título do Projeto" value={project.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} />
                  <Input type="url" placeholder="URL da Imagem do Projeto" value={project.imageUrl} onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)} />
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addProject} className="w-full">
                <PlusCircle className="mr-2" /> Adicionar Projeto
              </Button>
            </div>

             {/* Seção do Banner CTA */}
             <div className='space-y-4 p-4 border rounded-lg'>
               <h3 className="font-semibold text-lg">Seção do Banner de CTA</h3>
               <div className="space-y-2">
                  <Label>Título do Banner</Label>
                  <Input name="ctaBannerTitle" placeholder="Título do Banner" value={editedPortfolio.ctaBannerTitle} onChange={handleInputChange}/>
                </div>
                <div className="space-y-2">
                  <Label>Descrição do Banner</Label>
                  <Textarea name="ctaBannerDescription" placeholder="Descrição do banner" value={editedPortfolio.ctaBannerDescription} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                  <Label>Texto do Botão do Banner</Label>
                  <Input name="ctaBannerButtonText" placeholder="Texto do Botão" value={editedPortfolio.ctaBannerButtonText} onChange={handleInputChange}/>
                </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Save className="mr-2" /> Salvar Portfólio
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

    