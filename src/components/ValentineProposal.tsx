import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

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
          src="/husky-pointing-dog-pointing.png"
          alt="Surprise!"
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl shadow-pink-300/40 animate-fade-in ring-4 ring-pink-300/30"
        />
        <p className="mt-4 text-pink-500 font-semibold text-lg animate-fade-in">Nice try, Andrene!</p>
      </div>
    );
  }

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={250}
          gravity={0.25}
          colors={['#ec4899', '#f472b6', '#fb7185', '#fda4af', '#fbcfe8', '#f9a8d4', '#c084fc']}
        />
        <div className="text-center animate-bounce-in z-10 max-w-md w-full">
          <div className="text-5xl md:text-7xl mb-4 animate-pulse text-pink-500">♥</div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-3">
            Yaaaaaaaay!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-pink-800/80 px-4">
Happy    </p>

          <div className="mt-8 flex justify-center">
            <img
              src="/sumn2.jpeg"
              alt="Celebration"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-xl ring-4 ring-pink-300/40"
            />
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
      {/* Photo */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-6">
        <div className="relative w-full h-full rounded-full shadow-2xl shadow-pink-300/30 border-4 border-pink-300/40 overflow-hidden bg-pink-50">
          <img
            src="/sumn1.jpg"
            alt="Valentine"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Heart */}
      <div className="text-4xl md:text-5xl lg:text-6xl mb-4 animate-pulse-heart text-pink-500">
        ♥
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-3 md:mb-4 text-center">
        Heyyy Andrene
      </h1>

      <p className="text-lg md:text-xl lg:text-2xl text-pink-800/80 mb-4 text-center">
        Will you be my Valentine?
      </p>

      {/* Flower images row */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <img src="/floribunda_rose_separate.png" alt="" className="w-24 md:w-32 animate-float" />
        <img src="/hydrangea_separate.png" alt="" className="w-24 md:w-32 animate-float" style={{ animationDelay: '0.5s' }} />
        <img src="/juliet_rose_separate.png" alt="" className="w-24 md:w-32 animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 relative min-h-[200px] w-full max-w-md">
        <Button
          size="lg"
          onClick={() => setAccepted(true)}
          className="text-lg md:text-xl px-8 md:px-10 py-5 md:py-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-300/40 hover:shadow-xl hover:shadow-pink-300/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto max-w-xs"
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
          className="text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-full border-2 border-pink-300/50 text-pink-400 hover:bg-pink-50 no-button-glow w-auto"
        >
          No {isTouchDevice ? '👆' : ''}
        </Button>
      </div>

      <p className="mt-4 text-xs md:text-sm text-pink-400/70 italic text-center">
        {isTouchDevice
          ? "(Try tapping the No button... if you can catch it!)"
          : "(Try clicking the No button... I dare you!)"}
      </p>
    </div>
  );
}