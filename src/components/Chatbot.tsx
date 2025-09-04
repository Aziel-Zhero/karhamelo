
'use client';

import { KLogo } from './KLogo';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show the chatbot after a short delay to not be too intrusive
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
        <div className="absolute bottom-full right-0 mb-3 w-56">
          <div className="relative bg-primary text-primary-foreground rounded-xl rounded-br-none py-3 px-4 shadow-lg">
             <button 
                onClick={handleDismiss} 
                className="absolute top-1 right-1 p-1 text-primary-foreground/70 hover:text-primary-foreground"
                aria-label="Fechar"
            >
                <X size={16} />
            </button>
            <p className="font-semibold">Au au!</p>
            <p>Bem-vindo ao Karhameloooo!</p>
             {/* Bubble tail */}
            <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-primary"></div>
          </div>
        </div>

        {/* Logo Mascot */}
        <div className="group animate-bounce">
            <div className="w-20 h-20 transition-transform duration-300 group-hover:scale-110">
                 <KLogo />
            </div>
        </div>
      </div>
    </div>
  );
}
