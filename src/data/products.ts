export type ProductCategory = 'T-shirts' | 'Hoodies' | 'Sweatpants' | 'Long Sleeved Shirts';

export interface ProductItem {
	id: number;
	name: string;
	price: string;
	image: string;
	description: string;
	category: ProductCategory;
}

// Images
import tshirt1 from '@/assets/tshirt-1.png';
import tshirt2 from '@/assets/tshirt-2.png';
import tshirt3 from '@/assets/tshirt-3.png';
import tshirt4 from '@/assets/tshirt-4.png';
import hoodie1 from '@/assets/hoodie-1.png';
import hoodie2 from '@/assets/hoodie-2.png';
import sweatpants1 from '@/assets/sweatpants-1.png';
import sweatpants2 from '@/assets/sweatpants-2.png';
import longSleevePlaceholder from '@/assets/hero/t-4.png';
import hero1 from '@/assets/hero/T-1.png';
import hero2 from '@/assets/hero/t-2.png';
import hero3 from '@/assets/hero/t-3.png';
import hero4 from '@/assets/hero/t-4.png';
import hero5 from '@/assets/hero/t-5.png';

export const products: ProductItem[] = [
	// T-shirts
	{
		id: 1,
		name: 'Essential Black Tee',
		price: '500 Birr',
		image: tshirt1,
		description:
			'Our signature black tee crafted from premium organic cotton. Minimalist design meets maximum comfort.',
		category: 'T-shirts',
	},
	{
		id: 2,
		name: 'Pure White Essential',
		price: '500 Birr',
		image: tshirt2,
		description:
			'Clean, crisp, and endlessly versatile. Superior fabric quality and a perfect fit.',
		category: 'T-shirts',
	},
	{
		id: 3,
		name: 'Ocean Blue Minimal',
		price: '500 Birr',
		image: tshirt3,
		description:
			'A sophisticated navy that speaks volumes without saying a word. Soft-touch finish.',
		category: 'T-shirts',
	},
	{
		id: 4,
		name: 'Storm Gray Classic',
		price: '500 Birr',
		image: tshirt4,
		description:
			'Understated elegance in a contemporary gray tone. Versatility and comfort in equal measure.',
		category: 'T-shirts',
	},

	// Hoodies
	{
		id: 5,
		name: 'Midnight Black Hoodie',
		price: '700 Birr',
		image: hoodie1,
		description:
			'Premium heavyweight hoodie crafted from organic cotton blend. Relaxed fit with ribbed cuffs.',
		category: 'Hoodies',
	},
	{
		id: 6,
		name: 'Arctic White Hoodie',
		price: '700 Birr',
		image: hoodie2,
		description:
			'Clean and minimalist hoodie design in pure white. Soft fleece interior.',
		category: 'Hoodies',
	},

	// Sweatpants
	{
		id: 7,
		name: 'Navy Comfort Sweats',
		price: '700 Birr',
		image: sweatpants1,
		description:
			'Tailored sweatpants with contemporary fit and tapered legs for all-day comfort.',
		category: 'Sweatpants',
	},
	{
		id: 8,
		name: 'Gray Minimalist Sweats',
		price: '700 Birr',
		image: sweatpants2,
		description:
			'Elevated essentials in sophisticated gray. Streetwear aesthetics with premium materials.',
		category: 'Sweatpants',
	},

	// Long Sleeved Shirts (new category with dummy data)
	{
		id: 9,
		name: 'Minimal White Long Sleeve',
		price: '600 Birr',
		image: longSleevePlaceholder,
		description:
			'Clean long sleeve with breathable premium cotton and a refined silhouette.',
		category: 'Long Sleeved Shirts',
	},
	{
		id: 10,
		name: 'Charcoal Long Sleeve',
		price: '600 Birr',
		image: longSleevePlaceholder,
		description:
			'Everyday long sleeve in a dark charcoal tone. Comfortable and versatile.',
		category: 'Long Sleeved Shirts',
	},

	// Hero carousel items as dummy products (click-through exact matches)
	{
		id: 101,
		name: 'Grey Addis in Space',
		price: '600 Birr',
		image: hero1,
		description: 'Hero carousel: graphic tee featuring Addis in space motif.',
		category: 'T-shirts',
	},
	{
		id: 102,
		name: 'Plain Green Hoodie',
		price: '700 Birr',
		image: hero2,
		description: 'Hero carousel: minimal green hoodie.',
		category: 'Hoodies',
	},
	{
		id: 103,
		name: 'Plain Black Hoodie',
		price: '700 Birr',
		image: hero3,
		description: 'Hero carousel: minimal black hoodie.',
		category: 'Hoodies',
	},
	{
		id: 104,
		name: 'Plain White Long sleeve',
		price: '500 Birr',
		image: hero4,
		description: 'Hero carousel: white long sleeve.',
		category: 'Long Sleeved Shirts',
	},
	{
		id: 105,
		name: 'Black Lion in Clouds',
		price: '600 Birr',
		image: hero5,
		description: 'Hero carousel: graphic tee, lion in clouds.',
		category: 'T-shirts',
	},
];

export const categories: ProductCategory[] = [
	'T-shirts',
	'Hoodies',
	'Sweatpants',
	'Long Sleeved Shirts',
];

export function findProductById(id: number): ProductItem | undefined {
	return products.find((p) => p.id === id);
}

export function inferCategoryFromText(text: string): ProductCategory | undefined {
	const t = text.toLowerCase();
	if (t.includes('hoodie')) return 'Hoodies';
	if (t.includes('sweat') || t.includes('pants')) return 'Sweatpants';
	if (t.includes('long')) return 'Long Sleeved Shirts';
	if (t.includes('tee') || t.includes('t-shirt') || t.includes('shirt')) return 'T-shirts';
	return undefined;
}


