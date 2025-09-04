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

    // Loop through messages only if there's more than one
    if (messages.length > 1) {
      const messageTimer = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 4000); // Change message every 4 seconds
       return () => {
        clearTimeout(visibleTimer);
        clearInterval(messageTimer);
      };
    }


    return () => {
      clearTimeout(visibleTimer);
    };
<<<<<<< HEAD
  }, [messages, isDismissed]);
=======
  }, [isDismissed, messages]);
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f

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
      className={`fixed top-[240px] right-4 z-50 transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative">
        {/* Speech Bubble */}
<<<<<<< HEAD
        <div className="absolute bottom-full mb-2 w-64 right-5">
=======
        <div className="absolute bottom-full right-[55px] mb-1 w-52">
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f
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
<<<<<<< HEAD
        <div className="group w-48 h-48 flex justify-end">
            <div className="animate-gentle-bounce">
=======
        <div className="group">
            <div className="w-32 h-32 animate-gentle-bounce">
>>>>>>> fe864381fed728603e6109ec0f0569508c66464f
                 <KLogo />
            </div>
        </div>
      </div>
    </div>
    </>
  );
}
