import React, { useState, useEffect } from 'react';

interface TextCarouselProps {
  messages: string[];
  interval?: number;
  className?: string;
}

export function TextCarousel({ 
  messages, 
  interval = 4000, 
  className = '' 
}: TextCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (messages.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300); // Half of fade transition time
      
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  if (messages.length === 0) return null;

  return (
    <div className={`transition-all duration-300 ${className}`}>
      <p 
        className={`transition-opacity duration-600 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {messages[currentIndex]}
      </p>
    </div>
  );
}