import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/components/CartContext';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();
  const { t } = useLanguage();

  const sizes = ['S', 'M', 'L', 'XL'];

  if (!product) return null;

  const handleAddToCart = () => {
    // parse price like "600 Birr" only, USD removed
    const birrMatch = /([0-9]+(?:\.[0-9]+)?)\s*Birr/i.exec(product.price);
    const priceBirr = birrMatch ? parseFloat(birrMatch[1]) : 0;
    addItem({
      id: product.id,
      name: product.name,
      priceBirr,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-0 max-w-4xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-8 flex items-center justify-center">
            <div className="relative hover-3d">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm h-auto object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 relative">
            {/* Close Button (single source of truth after removing default from DialogContent) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 hover:bg-brand-primary/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>

            <DialogTitle className="text-2xl font-light text-foreground mb-2">
              {product.name}
            </DialogTitle>

            <p className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-6">
              {product.price}
            </p>

            {product.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 text-foreground">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 rounded-lg border-2 transition-all duration-300
                      hover:scale-105 hover:border-brand-primary
                      ${
                        selectedSize === size
                          ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                          : 'border-border hover:border-brand-primary/50'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3 text-foreground">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border hover:border-brand-primary transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border hover:border-brand-primary transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-glow transition-all duration-300 hover:scale-[1.02] text-white font-medium py-6"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {t('btn.addToCart')} - {product.price}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;