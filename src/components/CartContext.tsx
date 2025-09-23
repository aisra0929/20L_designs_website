import { createContext, useContext, useMemo, useReducer } from 'react';

type CartItem = {
  id: number;
  name: string;
  priceBirr: number;
  image: string;
  size?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD'; payload: CartItem }
  | { type: 'REMOVE'; payload: { id: number; size?: string } }
  | { type: 'CLEAR' };

const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size?: string) => void;
  clear: () => void;
  totalQuantity: number;
  totalBirr: number;
} | null>(null);

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const keyMatch = (it: CartItem) => it.id === action.payload.id && it.size === action.payload.size;
      const existing = state.items.findIndex(keyMatch);
      if (existing >= 0) {
        const items = [...state.items];
        items[existing] = { ...items[existing], quantity: items[existing].quantity + action.payload.quantity };
        return { items };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE': {
      return { items: state.items.filter(it => !(it.id === action.payload.id && it.size === action.payload.size)) };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const { totalBirr, totalQuantity } = useMemo(() => {
    const totals = state.items.reduce(
      (acc, it) => {
        acc.totalQuantity += it.quantity;
        acc.totalBirr += it.quantity * it.priceBirr;
        return acc;
      },
      { totalQuantity: 0, totalBirr: 0 },
    );
    return totals;
  }, [state.items]);

  const value = useMemo(() => ({
    state,
    addItem: (item: CartItem) => dispatch({ type: 'ADD', payload: item }),
    removeItem: (id: number, size?: string) => dispatch({ type: 'REMOVE', payload: { id, size } }),
    clear: () => dispatch({ type: 'CLEAR' }),
    totalQuantity,
    totalBirr,
  }), [state, totalQuantity, totalBirr]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


