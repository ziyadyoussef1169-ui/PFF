const express = require('express');
const router = express.Router();

// Temporary in-memory product data. Replace with DB queries later.
// Keep prices as strings to match frontend formatting expectations.
const products = [
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
    featured: true,
    description: 'Premium cotton T-shirt with an esports dragon print.'
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
    featured: true,
    description: 'Surround sound gaming headset with noise-cancelling mic.'
  },
  {
    id: '27',
    name: 'Gaming Laptop RTX 4060',
    price: '$1299.99',
    originalPrice: '$1499.99',
    category: 'PC Portables',
    rating: 4.8,
    reviews: 156,
    image: 'https://dlcdnwebimgs.asus.com/gain/92154016-46AB-4593-BE2B-588F86E55B4B/w717/h525',
    onSale: true,
    featured: true,
    description: 'Portable powerhouse with RTX 4060 graphics for esports.'
  }
];

// GET /products -> list products
router.get('/', (req, res) => {
  res.json(products);
});

// GET /products/:id -> single product
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;
