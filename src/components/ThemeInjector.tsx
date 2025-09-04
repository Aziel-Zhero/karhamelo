'use client';

import { useEffect } from 'react';

// Helper to convert hex to HSL string components (e.g., "210 40% 98%")
function hexToHslParts(hex: string): string {
    if (!hex || !hex.startsWith('#')) return '0 0% 0%';
    hex = hex.slice(1);
    
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        return '0 0% 0%';
    }
    
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
}


function convertToHslParts(color: string): string {
    if (color.startsWith('hsl')) {
        return color.replace('hsl(','').replace(')','');
    }
    if (color.startsWith('#')) {
        return hexToHslParts(color);
    }
    // Fallback for named colors or other formats (might not be accurate)
    return '216 28% 95%';
}


interface ThemeInjectorProps {
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

export function ThemeInjector({ primaryColor, backgroundColor, accentColor }: ThemeInjectorProps) {
  useEffect(() => {
    const primary = convertToHslParts(primaryColor);
    const background = convertToHslParts(backgroundColor);
    const accent = convertToHslParts(accentColor);
    const ring = primary; 

    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --primary: ${primary};
        --background: ${background};
        --accent: ${accent};
        --ring: ${ring};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [primaryColor, backgroundColor, accentColor]);

  return null;
}
