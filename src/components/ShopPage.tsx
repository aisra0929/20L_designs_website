import { useState, useEffect } from 'react';
import HorizontalSlider from '@/components/HorizontalSlider';
import ProductModal from '@/components/ProductModal';
import { CartProvider } from '@/components/CartContext';
import CartButton from '@/components/CartButton';
import CartModal from '@/components/CartModal';
import { products as allProducts, categories, ProductItem } from '@/data/products';
import { useShop } from '@/contexts/ShopContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('T-shirts');
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { selectedProductId, setSelectedProductId } = useShop();
  const { t, translateProduct } = useLanguage();

  const products = allProducts;

  // Filter products by category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // If navigated here with a preselected product id, open the modal and focus category
  useEffect(() => {
    if (selectedProductId) {
      const found = products.find(p => p.id === selectedProductId) || null;
      if (found) {
        setSelectedCategory(found.category);
        setSelectedProduct(translateProduct(found));
        setIsModalOpen(true);
      }
      setSelectedProductId(null);
    }
  }, [selectedProductId]);

  const handleProductClick = (product: ProductItem) => {
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
          {t('shop.title')}
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
            onChange={(e) => setSelectedCategory(e.target.value as typeof categories[number])}
            className="glass px-6 py-3 rounded-xl text-lg font-medium text-foreground bg-background/50 border border-border/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all duration-300"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{
                c === 'T-shirts' ? t('shop.category.tshirts') :
                c === 'Hoodies' ? t('shop.category.hoodies') :
                c === 'Sweatpants' ? t('shop.category.sweatpants') :
                t('shop.category.longsleeves')
              }</option>
            ))}
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
          products={filteredProducts.map(translateProduct)} 
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
            {t('shop.all')}
          </h3>
        </div>
        
        {/* Display all products from all categories */}
        <HorizontalSlider 
          products={products.map(translateProduct)} 
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