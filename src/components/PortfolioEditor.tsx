
'use client';

import type { Portfolio, PortfolioFeature, PortfolioStep } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Save, PlusCircle, Trash2 } from 'lucide-react';
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
  
  const handleFeatureChange = (index: number, field: keyof PortfolioFeature, value: string) => {
    const newFeatures = [...editedPortfolio.features];
    newFeatures[index][field] = value;
    setEditedPortfolio(prev => ({...prev, features: newFeatures}));
  }

  const handleStepChange = (index: number, field: keyof PortfolioStep, value: string) => {
    const newSteps = [...editedPortfolio.steps];
    newSteps[index][field] = value;
    setEditedPortfolio(prev => ({...prev, steps: newSteps}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPortfolioChange(editedPortfolio);
    toast({
      title: 'Portfolio Updated!',
      description: 'Your portfolio details have been saved.',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Edit Your Portfolio LP</CardTitle>
        <CardDescription>
          Customize the content of your personal landing page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Hero Section */}
          <div className='space-y-4 p-4 border rounded-lg'>
             <h3 className="font-semibold text-lg">Hero Section</h3>
             <div className="space-y-2">
                <Label htmlFor="title">Headline Title</Label>
                <Input id="title" name="title" placeholder="Your Awesome Title" value={editedPortfolio.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A short and catchy description." value={editedPortfolio.description} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Main Image URL</Label>
                <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/image.png" value={editedPortfolio.imageUrl} onChange={handleInputChange} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="ctaButtonText">CTA Button Text</Label>
                    <Input id="ctaButtonText" name="ctaButtonText" placeholder="Get Started" value={editedPortfolio.ctaButtonText} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ctaButtonUrl">CTA Button URL</Label>
                    <Input id="ctaButtonUrl" name="ctaButtonUrl" type="url" placeholder="https://example.com/contact" value={editedPortfolio.ctaButtonUrl} onChange={handleInputChange} required />
                </div>
              </div>
          </div>

          {/* Features Section */}
          <div className='space-y-4 p-4 border rounded-lg'>
            <h3 className="font-semibold text-lg">Features Section (Benefits)</h3>
            {editedPortfolio.features.map((feature, index) => (
                <div key={index} className="space-y-3 p-3 border rounded-md relative">
                    <Label>Feature Card #{index+1}</Label>
                    <Input placeholder="Card Title" value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
                    <Textarea placeholder="Card Description" value={feature.description} onChange={(e) => handleFeatureChange(index, 'description', e.target.value)} />
                </div>
            ))}
          </div>

          {/* How It Works Section */}
          <div className='space-y-4 p-4 border rounded-lg'>
             <h3 className="font-semibold text-lg">"How It Works" Section</h3>
             <div className="space-y-2">
                <Label>Section Title</Label>
                <Input name="howItWorksTitle" placeholder="Section title" value={editedPortfolio.howItWorksTitle} onChange={handleInputChange}/>
              </div>
              <div className="space-y-2">
                <Label>Section Description</Label>
                <Textarea name="howItWorksDescription" placeholder="Section description" value={editedPortfolio.howItWorksDescription} onChange={handleInputChange} />
              </div>
               <div className="space-y-2">
                <Label>Image URL</Label>
                <Input name="howItWorksImageUrl" type="url" placeholder="https://example.com/image.png" value={editedPortfolio.howItWorksImageUrl} onChange={handleInputChange}/>
              </div>
              <Separator />
              <Label>Steps</Label>
               {editedPortfolio.steps.map((step, index) => (
                <div key={index} className="space-y-2 p-3 border rounded-md">
                    <Label>Step #{index+1}</Label>
                    <Input placeholder="Step Title" value={step.title} onChange={(e) => handleStepChange(index, 'title', e.target.value)} />
                    <Input placeholder="Step Description" value={step.description} onChange={(e) => handleStepChange(index, 'description', e.target.value)} />
                </div>
            ))}
          </div>

           {/* CTA Banner Section */}
           <div className='space-y-4 p-4 border rounded-lg'>
             <h3 className="font-semibold text-lg">CTA Banner Section</h3>
             <div className="space-y-2">
                <Label>Banner Title</Label>
                <Input name="ctaBannerTitle" placeholder="Banner Title" value={editedPortfolio.ctaBannerTitle} onChange={handleInputChange}/>
              </div>
              <div className="space-y-2">
                <Label>Banner Description</Label>
                <Textarea name="ctaBannerDescription" placeholder="Banner description" value={editedPortfolio.ctaBannerDescription} onChange={handleInputChange} />
              </div>
               <div className="space-y-2">
                <Label>Banner Button Text</Label>
                <Input name="ctaBannerButtonText" placeholder="Button Text" value={editedPortfolio.ctaBannerButtonText} onChange={handleInputChange}/>
              </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Save className="mr-2" /> Save Portfolio
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
