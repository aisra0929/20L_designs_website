import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import { products as shopProducts, inferCategoryFromText } from '@/data/products';

// Import hero carousel images
import heroImage1 from '@/assets/hero/T-1.png';
import heroImage2 from '@/assets/hero/t-2.png';
import heroImage3 from '@/assets/hero/t-3.png';
import heroImage4 from '@/assets/hero/t-4.png';
import heroImage5 from '@/assets/hero/t-5.png';
import heroBg from '@/assets/hero-bg.jpg';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const heroItems = useMemo(() => [
    { id: 1, image: heroImage1, name: "Grey Addis in Space", price: "600 Birr" },
    { id: 2, image: heroImage2, name: "Plain Green Hoodie", price: "700 Birr" },
    { id: 3, image: heroImage3, name: "Plain Black Hoodie", price: "700 Birr" },
    { id: 4, image: heroImage4, name: "Plain White Long sleeve", price: "500 Birr" },
    { id: 5, image: heroImage5, name: "Black Lion in Clouds", price: "600 Birr" },
  ], []);

  const visibleCountRef = useRef(1);
  const { setSelectedProductId } = useShop();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  // Responsive items count logic: 1 (small), 3 (md), 5 (lg)
  useEffect(() => {
    const handler = () => {
      const w = window.innerWidth;
      visibleCountRef.current = w >= 1024 ? 5 : w >= 768 ? 3 : 1;
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextSlide(); else prevSlide();
    }
    touchStartX.current = null;
  };

  const handleItemClick = (name: string) => {
    // Try exact match to hero dummy product; fallback to inferred category
    const exact = shopProducts.find(p => p.name === name);
    if (exact) {
      setSelectedProductId(exact.id);
    } else {
      const inferred = inferCategoryFromText(name) || 'T-shirts';
      const match = shopProducts.find(p => p.category === inferred);
      if (match) setSelectedProductId(match.id);
    }
    // navigation handled by parent via nav menu; here we can optionally dispatch an event
    const evt = new CustomEvent('navigateToShop');
    window.dispatchEvent(evt);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section with Background Image */}
      <div 
        className="h-screen flex items-center justify-center relative"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0" />

        {/* Background Brand Text */}
        <div className={`absolute inset-0 flex justify-center z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* <h1 className="text-[6rem] md:text-[8rem] lg:text-[13rem] font-condensed font-extrabold mt-10 select-none pointer-events-none tracking-tighter opacity-75">
            ISRAEL DESIGNS
          </h1> */}
        </div>

        {/* Carousel Container (scaled to ~80%) */}
        <div className={`relative z-20 flex items-center justify-center w-full max-w-[88rem] px-4 mx-auto transition-all duration-1000 delay-600 scale-[0.8]`}>
          {/* Carousel Items */}
          <div className="relative w-full max-w-5xl mx-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {heroItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 scale-100 z-20'
                    : index === (currentSlide - 1 + heroItems.length) % heroItems.length
                    ? 'opacity-100 scale-75 -translate-x-72 z-10'
                    : index === (currentSlide + 1) % heroItems.length
                    ? 'opacity-100 scale-75 translate-x-72 z-10'
                    : index === (currentSlide - 2 + heroItems.length) % heroItems.length
                    ? 'hidden lg:flex opacity-100 scale-[.55] lg:-translate-x-[32rem] z-0'
                    : index === (currentSlide + 2) % heroItems.length
                    ? 'hidden lg:flex opacity-100 scale-[.55] lg:translate-x-[32rem] z-0'
                    : 'opacity-0 scale-50 z-0'
                }`}
              >
                {/* Product Image */}
                <div className="relative group cursor-pointer" onClick={() => handleItemClick(item.name)}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Info (only center item) */}
                {index === currentSlide && (
                  <div className="text-center mt-8 text-foreground">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.name}</h3>
                    <p className="text-xl md:text-2xl font-light opacity-90">{item.price}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-0 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {heroItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
