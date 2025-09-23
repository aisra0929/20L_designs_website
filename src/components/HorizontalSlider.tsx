import { useEffect, useRef, useState } from 'react';
import TShirtCard from './TShirtCard';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
}

interface HorizontalSliderProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const HorizontalSlider = ({ products, onProductClick }: HorizontalSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);

  // Handle wheel scroll for horizontal movement
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollAmount = e.deltaY * 2;
      slider.scrollLeft += scrollAmount;
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => slider.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Inertia scrolling effect
  useEffect(() => {
    if (!isDragging && momentum !== 0) {
      const timer = setInterval(() => {
        if (sliderRef.current) {
          sliderRef.current.scrollLeft += momentum;
          setMomentum(prev => prev * 0.95); // Decay
          
          if (Math.abs(momentum) < 0.5) {
            setMomentum(0);
            clearInterval(timer);
          }
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [momentum, isDragging]);

  return (
    <div className="w-full overflow-hidden">
      {/* Scroll indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Scroll horizontally or drag</span>
          <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Slider container */}
      <div
        ref={sliderRef}
        className={`
          flex gap-8 pb-8 px-8 overflow-x-auto horizontal-scroll
          ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
          scroll-smooth
        `}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Add some spacing at the start */}
        <div className="flex-shrink-0 w-20" />
        
        {products.map((product) => (
          <TShirtCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
          />
        ))}
        
        {/* Add some spacing at the end */}
        <div className="flex-shrink-0 w-20" />
      </div>

      {/* Gradient overlays for visual effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default HorizontalSlider;