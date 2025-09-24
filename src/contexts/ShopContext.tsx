import { createContext, useContext, useState, ReactNode } from 'react';

interface ShopContextValue {
	selectedProductId: number | null;
	setSelectedProductId: (id: number | null) => void;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const useShop = (): ShopContextValue => {
	const ctx = useContext(ShopContext);
	if (!ctx) throw new Error('useShop must be used within ShopProvider');
	return ctx;
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
	const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

	return (
		<ShopContext.Provider value={{ selectedProductId, setSelectedProductId }}>
			{children}
		</ShopContext.Provider>
	);
};


