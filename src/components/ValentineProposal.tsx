import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

const FloatingHeart = ({ delay }: { delay: number }) => {
  const [position, setPosition] = useState({ left: '0%', top: '0%' });
  
  useEffect(() => {
    setPosition({
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 80 + 10}%`
    });
  }, []);
  
  return (
    <span 
      className="absolute text-xl md:text-2xl animate-float pointer-events-none select-none"
      style={{ 
        left: position.left, 
        top: position.top,
        animationDelay: `${delay}s`,
        opacity: 0.2
      }}
    >
      ♥
    </span>
  );
};

export default function ValentineProposal() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [showTempImage, setShowTempImage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate safe boundaries (keep button visible)
    const padding = 20;
    const maxX = Math.min(container.width - button.width - padding, viewportWidth - button.width - padding);
    const maxY = Math.min(container.height - button.height - padding, viewportHeight - button.height - padding - 100);
    
    // Generate random position within safe boundaries
    const newX = (Math.random() - 0.5) * maxX * 0.8;
    const newY = (Math.random() - 0.5) * maxY * 0.8;
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  // Detect if device is touch-enabled
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Move button on hover, click attempt, or touch
  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Increment click count
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    
    // Show image after 5 clicks
    if (newCount >= 5 && newCount % 5 === 0) {
      setShowTempImage(true);
      // Hide image after 3 seconds
      setTimeout(() => {
        setShowTempImage(false);
      }, 3000);
    }
    
    moveNoButton();
  };

  if (showTempImage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
        <img 
          src="/aliaya.jpeg" 
          alt="Surprise!" 
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#ff69b4', '#ff1493', '#ff69b4', '#ffc0cb', '#ffb6c1']}
        />
        <div className="text-center animate-bounce-in z-10 max-w-md w-full">
          <div className="text-6xl md:text-8xl mb-6 animate-pulse text-primary">
            ♥
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Yay! 🎉
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 px-4">
            You just made me the happiest person ever!
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-4xl md:text-6xl animate-bounce">💕</div>
              <div className="text-4xl md:text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>💖</div>
              <div className="text-4xl md:text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>💗</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8"
    >
      {/* Subtle floating hearts */}
      {[...Array(5)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.8} />
      ))}

      {/* Image on front */}
      <div className="mb-6 md:mb-8">
        <img 
          src="/sumn1.jpg" 
          alt="Valentine" 
          className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-md w-full">
        <div className="text-5xl md:text-6xl mb-4 md:mb-6 animate-pulse-heart text-primary">
          ♥
        </div>
        
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
          Heyyy  Aliaya
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-foreground mb-8 md:mb-12 px-4">
          Will you be my Valentine?
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 relative min-h-[200px] w-full px-4">
          <Button 
            size="lg"
            onClick={() => setAccepted(true)}
            className="text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto max-w-xs"
          >
            Yes! 
          </Button>
          
          <Button 
            ref={noButtonRef}
            variant="outline"
            size="lg"
            onMouseEnter={!isTouchDevice ? handleNoInteraction : undefined}
            onMouseDown={handleNoInteraction}
            onTouchStart={handleNoInteraction}
            onTouchMove={handleNoInteraction}
            onClick={handleNoInteraction}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.2s ease-out',
              position: 'relative'
            }}
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-full border-2 border-muted-foreground/30 text-muted-foreground no-button-glow w-auto"
          >
            No {isTouchDevice ? '👆' : ''}
          </Button>
        </div>
        
        <p className="mt-8 md:mt-12 text-xs md:text-sm text-muted-foreground italic px-4">
          {isTouchDevice 
            ? "(Try tapping the No button... if you can catch it!)" 
            : "(Try clicking the No button... I dare you!)"}
        </p>
      </div>
    </div>
  );
}