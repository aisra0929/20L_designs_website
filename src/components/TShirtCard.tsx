import { useState, useRef, MouseEvent } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface TShirtCardProps {
  product: Product;
  onClick: () => void;
}

const TShirtCard = ({ product, onClick }: TShirtCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-80 h-96 cursor-pointer group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transition: transform ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      {/* Floating product with transparent background - no visible card frame */}
      <div className="relative w-full h-full perspective-1000">
        
        {/* Product image container - floating in space */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-64 h-80">
            {/* Shadow/reflection beneath product */}
            <div 
              className={`
                absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8
                w-32 h-4 bg-gradient-to-r from-transparent via-foreground/10 to-transparent
                rounded-full blur-sm transition-all duration-500
                ${isHovered ? 'scale-125 opacity-60' : 'scale-100 opacity-30'}
              `}
            />
            
            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              className={`
                w-full h-full object-contain transition-all duration-500 transform-3d
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))' 
                  : 'drop-shadow(0 15px 30px rgba(0,0,0,0.2))',
              }}
            />
            
            {/* Subtle particle effects on hover */}
            {isHovered && (
              <>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-primary/60 rounded-full animate-float" />
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-brand-secondary/60 rounded-full animate-float-delayed" />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-brand-accent/60 rounded-full animate-float" />
              </>
            )}
          </div>
        </div>
        
        {/* Product info overlay - appears on hover */}
        <div 
          className={`
            absolute bottom-4 left-4 right-4 glass p-4 rounded-xl
            transition-all duration-500 transform
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}
        >
          <h3 className="font-medium text-foreground mb-1 text-lg">
            {product.name}
          </h3>
          <p className="text-brand-primary font-semibold text-xl">
            {product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TShirtCard;