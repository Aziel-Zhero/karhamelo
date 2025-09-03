
'use client';

import type { Portfolio, PortfolioFeature, PortfolioStep, PortfolioProject } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onPortfolioChange: (newPortfolio: Portfolio) => void;
}

export default function PortfolioEditor({ portfolio, onPortfolioChange }: PortfolioEditorProps) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onPortfolioChange({ ...portfolio, [name]: value });
  };
  
  const handleSwitchChange = (name: keyof Portfolio, checked: boolean) => {
    onPortfolioChange({ ...portfolio, [name]: checked });
  }

  const handleSelectChange = (name: keyof Portfolio, value: string) => {
    onPortfolioChange({ ...portfolio, [name]: value });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUri = loadEvent.target?.result as string;
        onPortfolioChange({ ...portfolio, [name]: dataUri });
      };
      reader.readAsDataURL(files[0]);
    }
  };
  
  const handleFeatureChange = (index: number, field: keyof PortfolioFeature, value: string) => {
    const newFeatures = [...(portfolio.features || [])];
    newFeatures[index] = {...newFeatures[index], [field]: value};
    onPortfolioChange({...portfolio, features: newFeatures});
  }

  const handleStepChange = (index: number, field: keyof PortfolioStep, value: string) => {
    const newSteps = [...(portfolio.steps || [])];
    newSteps[index] = {...newSteps[index], [field]: value};
    onPortfolioChange({...portfolio, steps: newSteps});
  }

  const handleProjectChange = (index: number, field: keyof PortfolioProject, value: string) => {
    const newProjects = [...(portfolio.projects || [])];
    const projectToUpdate = { ...newProjects[index], [field]: value };
    newProjects[index] = projectToUpdate;
    onPortfolioChange({ ...portfolio, projects: newProjects });
  };

  const addProject = () => {
    const newProject: PortfolioProject = { id: crypto.randomUUID(), title: '', imageUrl: 'https://picsum.photos/800/600' };
    onPortfolioChange({ ...portfolio, projects: [...(portfolio.projects || []), newProject] });
  };

  const deleteProject = (id: string) => {
    onPortfolioChange({ ...portfolio, projects: (portfolio.projects || []).filter(p => p.id !== id) });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-md overflow-hidden">
        <CardHeader>
          <CardTitle>Edite sua LP de Portfólio</CardTitle>
          <CardDescription>
            Personalize o conteúdo da sua página de destino. As alterações são refletidas em tempo real.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            
            {/* Seção Hero */}
            <div className='space-y-4 p-4 border rounded-lg'>
               <h3 className="font-semibold text-lg">Seção Principal (Hero)</h3>
               <div className="space-y-2">
                  <Label htmlFor="title">Título Principal</Label>
                  <Input id="title" name="title" placeholder="O Título da Sua Página" value={portfolio.title} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" name="description" placeholder="Uma descrição curta e impactante." value={portfolio.description} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Imagem Principal</Label>
                  <p className="text-xs text-muted-foreground">Recomendado: 1200x800 pixels.</p>
                  <Input id="imageUrl" name="imageUrl" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="ctaButtonText">Texto do Botão (CTA)</Label>
                      <Input id="ctaButtonText" name="ctaButtonText" placeholder="Começar" value={portfolio.ctaButtonText} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="ctaButtonUrl">URL do Botão (CTA)</Label>
                      <Input id="ctaButtonUrl" name="ctaButtonUrl" type="url" placeholder="#contato" value={portfolio.ctaButtonUrl} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonIcon">Ícone do Botão (CTA)</Label>
                  <Select name="ctaButtonIcon" onValueChange={(value) => handleSelectChange('ctaButtonIcon', value)} value={portfolio.ctaButtonIcon || 'arrowRight'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arrowRight">Seta</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="none">Nenhum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>

            {/* Seção de Benefícios */}
            <div className='space-y-4 p-4 border rounded-lg'>
              <div className='flex items-center justify-between'>
                <h3 className="font-semibold text-lg">Seção de Benefícios</h3>
                <div className='flex items-center gap-2'>
                  <Label htmlFor='isFeaturesEnabled' className='text-sm'>Ativar</Label>
                  <Switch id='isFeaturesEnabled' checked={portfolio.isFeaturesEnabled} onCheckedChange={(checked) => handleSwitchChange('isFeaturesEnabled', checked)} />
                </div>
              </div>
              {portfolio.isFeaturesEnabled && Array.isArray(portfolio.features) && portfolio.features.map((feature, index) => (
                  <div key={index} className="space-y-3 p-3 border rounded-md relative">
                      <Label>Card de Benefício #{index+1}</Label>
                      <Input placeholder="Título do Card" value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                      <Textarea placeholder="Descrição do Card" value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} />
                  </div>
              ))}
            </div>

            {/* Seção Como Funciona */}
            <div className='space-y-4 p-4 border rounded-lg'>
              <div className='flex items-center justify-between'>
                <h3 className="font-semibold text-lg">Seção "Como Funciona"</h3>
                <div className='flex items-center gap-2'>
                  <Label htmlFor='isHowItWorksEnabled' className='text-sm'>Ativar</Label>
                  <Switch id='isHowItWorksEnabled' checked={portfolio.isHowItWorksEnabled} onCheckedChange={(checked) => handleSwitchChange('isHowItWorksEnabled', checked)} />
                </div>
              </div>
               {portfolio.isHowItWorksEnabled && (<>
                <div className="space-y-2">
                    <Label>Título da Seção</Label>
                    <Input name="howItWorksTitle" placeholder="Título da seção" value={portfolio.howItWorksTitle} onChange={handleInputChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição da Seção</Label>
                    <Textarea name="howItWorksDescription" placeholder="Descrição da seção" value={portfolio.howItWorksDescription} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Imagem da Seção</Label>
                    <p className="text-xs text-muted-foreground">Recomendado: 1200x1000 pixels.</p>
                    <Input id="howItWorksImageUrl" name="howItWorksImageUrl" type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                  </div>
                  <Separator />
                  <Label>Passos</Label>
                  {Array.isArray(portfolio.steps) && portfolio.steps.map((step, index) => (
                    <div key={index} className="space-y-2 p-3 border rounded-md">
                        <Label>Passo #{index+1}</Label>
                        <Input placeholder="Título do Passo" value={step.title} onChange={(e) => handleStepChange(index, 'title', e.target.value)} />
                        <Input placeholder="Descrição do Passo" value={step.description} onChange={(e) => handleStepChange(index, 'description', e.target.value)} />
                    </div>
                ))}
              </>)}
            </div>

            {/* Seção Galeria */}
            <div className='space-y-4 p-4 border rounded-lg'>
              <div className='flex items-center justify-between'>
                <h3 className="font-semibold text-lg">Seção de Galeria (Carrossel)</h3>
                 <div className='flex items-center gap-2'>
                  <Label htmlFor='isGalleryEnabled' className='text-sm'>Ativar</Label>
                  <Switch id='isGalleryEnabled' checked={portfolio.isGalleryEnabled} onCheckedChange={(checked) => handleSwitchChange('isGalleryEnabled', checked)} />
                </div>
              </div>
              {portfolio.isGalleryEnabled && (<>
                <div className="space-y-2">
                    <Label>Título da Galeria</Label>
                    <Input name="galleryTitle" placeholder="Título da Seção de Galeria" value={portfolio.galleryTitle || ''} onChange={handleInputChange}/>
                </div>
                <div className="space-y-2">
                    <Label>Descrição da Galeria</Label>
                    <Textarea name="galleryDescription" placeholder="Descrição da Seção de Galeria" value={portfolio.galleryDescription || ''} onChange={handleInputChange} />
                </div>
                <Separator />
                <Label>Projetos da Galeria</Label>
                <p className="text-xs text-muted-foreground">Recomendado: 800x600 pixels.</p>
                {(portfolio.projects || []).map((project, index) => (
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
              </>)}
            </div>

             {/* Seção do Banner CTA */}
             <div className='space-y-4 p-4 border rounded-lg'>
               <h3 className="font-semibold text-lg">Seção do Banner de CTA</h3>
               <div className="space-y-2">
                  <Label>Título do Banner</Label>
                  <Input name="ctaBannerTitle" placeholder="Título do Banner" value={portfolio.ctaBannerTitle} onChange={handleInputChange}/>
                </div>
                <div className="space-y-2">
                  <Label>Descrição do Banner</Label>
                  <Textarea name="ctaBannerDescription" placeholder="Descrição do banner" value={portfolio.ctaBannerDescription} onChange={handleInputChange} />
                </div>
                 <div className="space-y-2">
                  <Label>Texto do Botão do Banner</Label>
                  <Input name="ctaBannerButtonText" placeholder="Texto do Botão" value={portfolio.ctaBannerButtonText} onChange={handleInputChange}/>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
