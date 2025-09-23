import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/CartContext';

export default function CartButton({ onClick }: { onClick: () => void }) {
  const { totalBirr, totalQuantity } = useCart();
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full shadow-glow bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:scale-105 transition-transform"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="text-sm font-medium">{totalQuantity} items</span>
      <span className="text-sm font-semibold">{totalBirr} Birr</span>
    </button>
  );
}


