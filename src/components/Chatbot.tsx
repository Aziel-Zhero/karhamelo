
'use client';

import { KLogo } from './KLogo';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ChatbotProps {
  messages?: string[];
}

const defaultMessages = ['Au au!', 'Bem-vindo ao Karhameloooo!'];

export default function Chatbot({ messages = defaultMessages }: ChatbotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Show the chatbot after a short delay
    const visibleTimer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 1500);

    // Loop through messages
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000); // Change message every 4 seconds

    return () => {
      clearTimeout(visibleTimer);
      clearInterval(messageTimer);
    };
  }, [isDismissed, messages]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <>
    <style jsx>{`
        @keyframes gentle-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
      `}</style>
    <div
      className={`fixed bottom-5 right-[-25px] z-50 transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
        <div className="absolute bottom-full right-[48px] mb-[9px] w-52 transform -translate-x-1/2">
          <div className="relative bg-primary text-primary-foreground rounded-xl rounded-br-none py-3 px-4 shadow-lg">
             <button
                onClick={handleDismiss}
                className="absolute top-1 right-1 p-1 text-primary-foreground/70 hover:text-primary-foreground"
                aria-label="Fechar"
            >
                <X size={16} />
            </button>
            <p className="font-semibold text-center">{messages[currentMessageIndex]}</p>
             {/* Bubble tail */}
            <div className="absolute bottom-0 right-0 h-0 w-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-primary"></div>
          </div>
        </div>

        {/* Logo Mascot */}
        <div className="group">
            <div className="w-48 h-48 animate-gentle-bounce">
                 <KLogo />
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
