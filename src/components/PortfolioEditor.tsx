
'use client';

import type { Portfolio } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Save } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
        <CardTitle>Edit Your Portfolio Landing Page</CardTitle>
        <CardDescription>
          Customize the content of your personal landing page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Headline Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Your Awesome Title"
              value={editedPortfolio.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="A short and catchy description about you or your product."
              value={editedPortfolio.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Main Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/your-image.png"
              value={editedPortfolio.imageUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="ctaButtonText">CTA Button Text</Label>
                <Input
                    id="ctaButtonText"
                    name="ctaButtonText"
                    placeholder="Get Started"
                    value={editedPortfolio.ctaButtonText}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ctaButtonUrl">CTA Button URL</Label>
                <Input
                    id="ctaButtonUrl"
                    name="ctaButtonUrl"
                    type="url"
                    placeholder="https://example.com/contact"
                    value={editedPortfolio.ctaButtonUrl}
                    onChange={handleInputChange}
                    required
                />
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
