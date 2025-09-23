import { useState, useEffect } from 'react';
import HorizontalSlider from '@/components/HorizontalSlider';
import ProductModal from '@/components/ProductModal';
import { CartProvider } from '@/components/CartContext';
import CartButton from '@/components/CartButton';
import CartModal from '@/components/CartModal';

// Import product images
import tshirt1 from '@/assets/tshirt-1.png';
import tshirt2 from '@/assets/tshirt-2.png';
import tshirt3 from '@/assets/tshirt-3.png';
import tshirt4 from '@/assets/tshirt-4.png';
import hoodie1 from '@/assets/hoodie-1.png';
import hoodie2 from '@/assets/hoodie-2.png';
import sweatpants1 from '@/assets/sweatpants-1.png';
import sweatpants2 from '@/assets/sweatpants-2.png';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category: 'T-shirts' | 'Hoodies' | 'Sweatpants';
}

const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'T-shirts' | 'Hoodies' | 'Sweatpants'>('T-shirts');
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product data with all clothing categories
  const products: Product[] = [
    // T-shirts
    {
      id: 1,
      name: "Essential Black Tee",
      price: "500 Birr",
      image: tshirt1,
      category: 'T-shirts',
      description: "Our signature black tee crafted from premium organic cotton. Minimalist design meets maximum comfort in this timeless piece that forms the foundation of any modern wardrobe."
    },
    {
      id: 2,
      name: "Pure White Essential",
      price: "500 Birr",
      image: tshirt2,
      category: 'T-shirts',
      description: "Clean, crisp, and endlessly versatile. This white tee embodies our philosophy of refined simplicity, featuring superior fabric quality and a perfect fit that elevates any look."
    },
    {
      id: 3,
      name: "Ocean Blue Minimal",
      price: "500 Birr",
      image: tshirt3,
      category: 'T-shirts',
      description: "A sophisticated navy that speaks volumes without saying a word. This premium tee combines deep color saturation with our signature soft-touch finish for effortless style."
    },
    {
      id: 4,
      name: "Storm Gray Classic",
      price: "500 Birr",
      image: tshirt4,
      category: 'T-shirts',
      description: "Understated elegance in a contemporary gray tone. Perfect for the modern minimalist, this tee offers versatility and comfort in equal measure."
    },
    // Hoodies
    {
      id: 5,
      name: "Midnight Black Hoodie",
      price: "700 Birr",
      image: hoodie1,
      category: 'Hoodies',
      description: "Premium heavyweight hoodie crafted from organic cotton blend. Features a relaxed fit with ribbed cuffs and hem for ultimate comfort and style."
    },
    {
      id: 6,
      name: "Arctic White Hoodie",
      price: "700 Birr",
      image: hoodie2,
      category: 'Hoodies',
      description: "Clean and minimalist hoodie design in pure white. Soft fleece interior meets durable exterior for the perfect balance of comfort and longevity."
    },
    // Sweatpants
    {
      id: 7,
      name: "Navy Comfort Sweats",
      price: "700 Birr",
      image: sweatpants1,
      category: 'Sweatpants',
      description: "Tailored sweatpants that redefine casual wear. Featuring a contemporary fit with tapered legs and premium cotton-poly blend for all-day comfort."
    },
    {
      id: 8,
      name: "Gray Minimalist Sweats",
      price: "700 Birr",
      image: sweatpants2,
      category: 'Sweatpants',
      description: "Elevated essentials in sophisticated gray. These sweatpants combine streetwear aesthetics with premium materials for effortless style."
    }
  ];

  // Filter products by category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
    <div className="min-h-screen relative pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Floating geometric shapes */}
      <div className={`
        absolute top-1/4 left-1/4 w-32 h-32 bg-brand-primary/10 rounded-full blur-xl
        transition-all duration-1000 delay-300
        ${isVisible ? 'opacity-100 animate-float' : 'opacity-0 translate-y-8'}
      `} />
      <div className={`
        absolute top-1/3 right-1/4 w-24 h-24 bg-brand-secondary/10 rounded-full blur-xl
        transition-all duration-1000 delay-500
        ${isVisible ? 'opacity-100 animate-float-delayed' : 'opacity-0 translate-y-8'}
      `} />
      <div className={`
        absolute bottom-1/3 left-1/2 w-40 h-40 bg-brand-accent/5 rounded-full blur-xl
        transition-all duration-1000 delay-700
        ${isVisible ? 'opacity-100 animate-float' : 'opacity-0 translate-y-8'}
      `} />

      {/* Shop Header */}
      <div className={`
        text-center mb-16 relative z-10
        transition-all duration-1000 delay-200
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        <h2 className="text-4xl md:text-6xl font-light mb-6 text-foreground">
          The Collection
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Each piece is crafted with precision, designed for the future, and built to last forever.
        </p>
        
        {/* Category Filter Dropdown */}
        <div className={`
          flex justify-center mb-12
          transition-all duration-1000 delay-400
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as 'T-shirts' | 'Hoodies' | 'Sweatpants')}
            className="glass px-6 py-3 rounded-xl text-lg font-medium text-foreground bg-background/50 border border-border/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all duration-300"
          >
            <option value="T-shirts">T-shirts</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Sweatpants">Sweatpants</option>
          </select>
        </div>
      </div>
      
      {/* Category Products Slider */}
      <div className={`
        relative mb-20
        transition-all duration-1000 delay-600
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}>
        <HorizontalSlider 
          products={filteredProducts} 
          onProductClick={handleProductClick}
        />
      </div>
      
      {/* All Collections */}
      <div className={`
        relative
        transition-all duration-1000 delay-800
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
      `}>
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-light mb-6 text-foreground">
            All Collections
          </h3>
        </div>
        
        {/* Display all products from all categories */}
        <HorizontalSlider 
          products={products} 
          onProductClick={handleProductClick}
        />
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Cart UI */}
      <CartButton onClick={() => setIsCartOpen(true)} />
      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
    </CartProvider>
  );
};

export default ShopPage;