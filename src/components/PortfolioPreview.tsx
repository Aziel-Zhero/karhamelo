
import type { Portfolio, PageTheme } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PortfolioPreviewProps {
  portfolio: Portfolio;
  theme: PageTheme;
}

export default function PortfolioPreview({
  portfolio,
  theme,
}: PortfolioPreviewProps) {
  const customStyle = {
    '--preview-bg': theme.backgroundColor,
    '--preview-primary': theme.primaryColor,
  } as React.CSSProperties;

  return (
    <div
      className="relative aspect-[9/19.5] w-full max-w-sm mx-auto rounded-[2.5rem] border-[10px] sm:border-[14px] border-black bg-[var(--preview-bg)] overflow-hidden shadow-2xl"
      style={customStyle}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-5 sm:h-6 bg-black rounded-b-xl z-20"></div>
      <div className="absolute inset-0 pt-8 sm:pt-10 overflow-y-auto">
        <div className="px-4 text-center">
            <h1 className="text-xl font-bold leading-tight">{portfolio.title}</h1>
            <p className="text-xs text-muted-foreground mt-1">{portfolio.description}</p>
        </div>
        <div className="mt-4 px-2">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={portfolio.imageUrl}
                    alt={portfolio.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
        <div className="px-4 mt-4">
             <Button className="w-full h-10 text-sm font-semibold" style={{ backgroundColor: 'var(--preview-primary)', color: 'white' }}>
                {portfolio.ctaButtonText}
            </Button>
        </div>
      </div>
    </div>
  );
}
