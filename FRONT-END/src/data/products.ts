// Centralized products data so both Shop and ProductDetails can access it
// Prices are stored as strings like "$29.99" to match prior usage in Shop
export type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  onSale: boolean;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Elite Dragon T-Shirt',
    price: '$29.99',
    originalPrice: '$39.99',
    category: 'Apparel',
    rating: 4.8,
    reviews: 142,
    image: 'https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C91vjU1klRiL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SL1500_.png',
    onSale: true,
    featured: true
  },
  {
    id: '2',
    name: 'Neon Gaming Mousepad',
    price: '$19.99',
    category: 'Accessories',
    rating: 4.9,
    reviews: 89,
    image: 'https://thermaltake-de-bhgycxg9djfgcmfn.a02.azurefd.net/media/catalog/product/cache/023a745bb14092c479b288481f91a1bd/l/2/l20mousepad02.jpg',
    onSale: false,
    featured: true
  },
  {
    id: '3',
    name: 'Cyber Dragon Hoodie',
    price: '$59.99',
    category: 'Apparel',
    rating: 4.7,
    reviews: 76,
    image: 'https://armored-drake.com/wp-content/uploads/2022/12/Dragon-design-hoodie.png',
    onSale: false,
    featured: false
  },
  {
    id: '4',
    name: 'Elite Gaming Headset',
    price: '$149.99',
    originalPrice: '$199.99',
    category: 'Hardware',
    rating: 4.9,
    reviews: 234,
    image: 'https://m.media-amazon.com/images/I/61Sst7zTNCL.jpg',
    onSale: true,
    featured: true
  },
  {
    id: '5',
    name: 'Tournament Sticker Pack',
    price: '$9.99',
    category: 'Stickers',
    rating: 4.6,
    reviews: 156,
    image: 'https://walldesign.in/cdn/shop/files/A1-pGha1XbL._SL1500.jpg?v=1725277574&width=1445',
    onSale: false,
    featured: false
  },
  {
    id: '6',
    name: 'Pro Gaming Keyboard',
    price: '$89.99',
    category: 'Hardware',
    rating: 4.8,
    reviews: 98,
    image: 'https://resource.logitech.com/content/dam/gaming/en/products/pro-keyboard/pro-keyboard-gallery/deu-pro-gaming-keyboard-gallery-topdown.png',
    onSale: false,
    featured: true
  },
  {
    id: '7',
    name: 'RGB Gaming Chair',
    price: '$249.99',
    category: 'Hardware',
    rating: 4.7,
    reviews: 67,
    image: 'https://www.fourze.com/wp-content/uploads/2021/03/Lightning-1-1024x1024.png',
    onSale: false,
    featured: false
  },
  {
    id: '8',
    name: 'Esports Water Bottle',
    price: '$14.99',
    category: 'Accessories',
    rating: 4.5,
    reviews: 45,
    image: 'https://assets2.razerzone.com/images/og-image/razer-hydrator-OGimg.jpg',
    onSale: false,
    featured: false
  },
  {
    id: '9',
    name: 'Limited Edition Cap',
    price: '$24.99',
    category: 'Apparel',
    rating: 4.6,
    reviews: 53,
    image: 'https://gamersapparel.co.uk/images/radicate-gaming-cap.png',
    onSale: true,
    featured: false
  },
  {
    id: '10',
    name: 'LED Mouse Bungee',
    price: '$29.99',
    category: 'Accessories',
    rating: 4.4,
    reviews: 32,
    image: 'https://www.xmpow.com/cdn/shop/products/GEPC205AB_YTUS_A1_V01_180730_1ef61dd6-b576-41e5-a649-75ea355763a3.jpg?v=1667562396',
    onSale: false,
    featured: false
  },
  // ...
];

// NOTE: For brevity, only a subset is shown here in this stub. You should complete this list
// by moving all product entries from Shop.tsx into this array so detail pages work when loaded directly.

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
