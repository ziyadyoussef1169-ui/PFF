import React from 'react';
import { useCart } from '../context/CartContext';
import { useLiked } from '../context/LikedContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Star, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Shop: React.FC = () => {
  const { t } = useTranslation();

  const { addToCart } = useCart();
  const { addToLiked, removeFromLiked, isLiked } = useLiked();

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
    {
      id: '11',
      name: 'Pro Gamer Glasses',
      price: '$39.99',
      category: 'Accessories',
      rating: 4.8,
      reviews: 77,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJTk2zOkEBbujmh2pK84z0AHqVny1piSCq0A&s',
      onSale: false,
      featured: true
    },
    {
      id: '12',
      name: 'Champion Hoodie',
      price: '$69.99',
      category: 'Apparel',
      rating: 4.9,
      reviews: 120,
      image: 'https://gamersapparel.co.uk/images/radicate-gaming-hoodie-front.png',
      onSale: true,
      featured: true
    },
    {
      id: '13',
      name: 'Sticker Bomb Pack',
      price: '$12.99',
      category: 'Stickers',
      rating: 4.3,
      reviews: 41,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqpBP5pNML7L69KxsEL8JfUaL-KhN7n4u7lVaTYpT0BwI6eXkp1_b53mgowd3xSDt9j4Y&usqp=CAU',
      onSale: false,
      featured: false
    },
    {
      id: '14',
      name: 'Team Logo Mug',
      price: '$17.99',
      category: 'Accessories',
      rating: 4.7,
      reviews: 60,
      image: 'https://gamersapparel.co.uk/images/teamkaos_2019_mug.png',
      onSale: false,
      featured: false
    },
    {
      id: '15',
      name: 'Wireless Gaming Mouse',
      price: '$89.99',
      category: 'Hardware',
      rating: 4.8,
      reviews: 110,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDRJrV5kEgfTvxGuupW6hGCAK_KNS8P43Z_A&s',
      onSale: true,
      featured: true
    },
    {
      id: '16',
      name: 'Esports Backpack',
      price: '$59.99',
      category: 'Accessories',
      rating: 4.6,
      reviews: 80,
      image: 'https://www.asus.com/media/Odin/websites/global/ProductLine/20200817063102.png',
      onSale: false,
      featured: false
    },
    {
      id: '17',
      name: 'Champion T-Shirt',
      price: '$34.99',
      category: 'Apparel',
      rating: 4.7,
      reviews: 95,
      image: 'https://images-cdn.ubuy.ae/6402ba5accb92c2d47119a2c-when-the-dm-smiles-it-39-s-already-too.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '18',
      name: 'Gaming Desk Mat',
      price: '$39.99',
      category: 'Accessories',
      rating: 4.5,
      reviews: 50,
      image: 'https://m.media-amazon.com/images/I/81K-YsC9CUL._UF1000,1000_QL80_.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '19',
      name: 'Pro Team Jersey',
      price: '$49.99',
      category: 'Apparel',
      rating: 4.8,
      reviews: 130,
      image: 'https://ninjersey.com/cdn/shop/products/ninjersey-new-generation-team-pro-jersey-ninjersey-custom-esports-jersey-37378851307750_740x.jpg?v=1649774477',
      onSale: true,
      featured: true
    },
    {
      id: '20',
      name: 'Esports Socks',
      price: '$11.99',
      category: 'Apparel',
      rating: 4.2,
      reviews: 22,
      image: 'https://target.scene7.com/is/image/Target/GUEST_0b696e10-ee98-4ebe-8dde-30c4ce3a3f8f',
      onSale: false,
      featured: false
    },
    {
      id: '21',
      name: 'Limited Edition Mousepad',
      price: '$29.99',
      category: 'Accessories',
      rating: 4.9,
      reviews: 99,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpcM3vl0Q_z4AkgjRO_2k_oYJXOshIa7t9FQ&s',
      onSale: true,
      featured: false
    },
    {
      id: '22',
      name: 'Sticker Sheet',
      price: '$7.99',
      category: 'Stickers',
      rating: 4.1,
      reviews: 18,
      image: 'https://m.media-amazon.com/images/I/717kNrc+NsL.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '23',
      name: 'Gaming Desk Lamp',
      price: '$44.99',
      category: 'Hardware',
      rating: 4.6,
      reviews: 40,
      image: 'https://i.ebayimg.com/images/g/VhQAAOSwdPFoHQpx/s-l1200.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '24',
      name: 'Pro Team Cap',
      price: '$22.99',
      category: 'Apparel',
      rating: 4.5,
      reviews: 38,
      image: 'https://5hourenergy.com/cdn/shop/files/gaming-hat.webp?v=1738289485',
      onSale: false,
      featured: false
    },
    {
      id: '25',
      name: 'Esports Wristband',
      price: '$8.99',
      category: 'Accessories',
      rating: 4.3,
      reviews: 25,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPTeBaI-aXLd-33fWpysSrUQMGH4BNQAmTg&s',
      onSale: false,
      featured: false
    },
    {
      id: '26',
      name: 'Champion Sticker Pack',
      price: '$10.99',
      category: 'Stickers',
      rating: 4.4,
      reviews: 30,
      image: 'https://cdn.zatu.com/wp-content/uploads/2020/06/18050251/UEFA-Champions-League-1920-10-Sticker-Booster-Pack-500x500.jpg',
      onSale: false,
      featured: false
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
      featured: true
    },
    {
      id: '28',
      name: 'RTX 4080 Graphics Card',
      price: '$899.99',
      category: 'Carte Graphique',
      rating: 4.9,
      reviews: 203,
      image: 'https://setupgame.ma/wp-content/uploads/2024/06/PNY-GeForce-RTX-4080-Maroc-16GB-VERTO-Triple-Fan-Setup-Game.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '29',
      name: 'Intel Core i7-13700K',
      price: '$399.99',
      category: 'Processeur',
      rating: 4.7,
      reviews: 189,
      image: 'https://www.ultrapc.ma/20881/intel-core-i7-13700k-34-ghz-54-ghz.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '30',
      name: 'RGB Gaming PC Case',
      price: '$149.99',
      category: 'Boitier Gamer',
      rating: 4.6,
      reviews: 134,
      image: 'https://zgames.ae/media/catalog/product/cache/ed0e0b9233706b5b42d1db286ecb0c36/uploads/uploads/uae_kgaming_pc_case_black_c03_1.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '31',
      name: '27" Gaming Monitor 144Hz',
      price: '$329.99',
      originalPrice: '$399.99',
      category: 'Ecran PC',
      rating: 4.8,
      reviews: 267,
      image: 'https://www.ultrapc.ma/18378-large_default/msi-optix-g271-27-ips-144hz-freesync.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '32',
      name: 'Pre-built Gaming PC RTX 4070',
      price: '$1799.99',
      category: 'PC Gamer',
      rating: 4.9,
      reviews: 98,
      image: 'https://www.ekfluidgaming.com/media/catalog/product/cache/6/image/x800/9df78eab33525d08d6e5fb8d27136e95/0/1/01-fg-battle-180-190-radeon-amd_1_1_.png',
      onSale: false,
      featured: true
    },
    {
      id: '33',
      name: 'Ultrabook Gaming Laptop',
      price: '$999.99',
      category: 'PC Portables',
      rating: 4.5,
      reviews: 87,
      image: 'https://i5.walmartimages.com/asr/bef15da1-9e40-437e-887d-0d3f4ff4ca4c.10a403507d459276259c204831b5a5d9.jpeg',
      onSale: false,
      featured: false
    },
    {
      id: '34',
      name: 'RTX 4070 Ti Graphics Card',
      price: '$749.99',
      originalPrice: '$849.99',
      category: 'Carte Graphique',
      rating: 4.8,
      reviews: 145,
      image: 'https://m.media-amazon.com/images/I/71-djDvKjfL.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '35',
      name: 'AMD Ryzen 9 7900X',
      price: '$549.99',
      category: 'Processeur',
      rating: 4.9,
      reviews: 176,
      image: 'https://www.ultrapc.ma/20691-large_default/amd-ryzen-9-7900x-47-ghz-56-ghz.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '36',
      name: 'Tempered Glass Gaming Case',
      price: '$89.99',
      category: 'Boitier Gamer',
      rating: 4.4,
      reviews: 92,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO1gnuMkk742VpZUiyhLgUDXb0X5CaFvYljA&s',
      onSale: false,
      featured: false
    },
    {
      id: '37',
      name: '32" Curved Gaming Monitor',
      price: '$449.99',
      category: 'Ecran PC',
      rating: 4.7,
      reviews: 198,
      image: 'https://www.asus-store.ma/cdn/shop/files/aoc-ecran-pc-gaming-curved-32_1.png?v=1719957655',
      onSale: false,
      featured: true
    },
    {
      id: '38',
      name: 'High-End Gaming PC RTX 4090',
      price: '$2999.99',
      category: 'PC Gamer',
      rating: 5.0,
      reviews: 67,
      image: 'https://m.media-amazon.com/images/I/811a8Ucqh5L._UF1000,1000_QL80_.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '39',
      name: 'Budget Gaming Laptop',
      price: '$699.99',
      originalPrice: '$799.99',
      category: 'PC Portables',
      rating: 4.3,
      reviews: 112,
      image: 'https://i.insider.com/6455488302f891001861a562?width=1200&format=jpeg',
      onSale: true,
      featured: false
    },
    {
      id: '40',
      name: 'RTX 4060 Ti Graphics Card',
      price: '$499.99',
      category: 'Carte Graphique',
      rating: 4.6,
      reviews: 234,
      image: 'https://i5.walmartimages.com/seo/Asus-ROG-NVIDIA-RTX-4060-Ti-Computer-Video-Card_4f3d2114-22e3-41c7-b5d2-bc842a6db2d4.943d57d17429fc3f10d748d77da4d9e5.jpeg',
      onSale: false,
      featured: false
    },
    {
      id: '41',
      name: 'Intel Core i5-13600K',
      price: '$289.99',
      category: 'Processeur',
      rating: 4.7,
      reviews: 156,
      image: 'https://www.materielmaroc.com/wp-content/uploads/2023/02/i5-13400f-maroc.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '42',
      name: 'Mini ITX Gaming Case',
      price: '$119.99',
      category: 'Boitier Gamer',
      rating: 4.5,
      reviews: 78,
      image: 'https://m.media-amazon.com/images/I/51uL7pnBjyL._AC_SL1500_.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '43',
      name: '24" 1080p Gaming Monitor',
      price: '$199.99',
      originalPrice: '$249.99',
      category: 'Ecran PC',
      rating: 4.4,
      reviews: 189,
      image: 'https://i5.walmartimages.com/asr/2fa8e75a-2129-4649-95e7-c61bae559622.ed1eb5ef47c3ae49cfb1891717d3378b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
      onSale: true,
      featured: false
    },
    {
      id: '44',
      name: 'Mid-Range Gaming PC',
      price: '$1299.99',
      category: 'PC Gamer',
      rating: 4.6,
      reviews: 143,
      image: 'https://cdn11.bigcommerce.com/s-ntb5wmh3f/images/stencil/500x659/products/284/2349/2022-1003-P-Acropolis-2000x2000-front-side-l__47546.1725569573.png?c=1',
      onSale: false,
      featured: false
    },
    {
      id: '45',
      name: 'Premium Gaming Laptop RTX 4080',
      price: '$2199.99',
      category: 'PC Portables',
      rating: 4.9,
      reviews: 89,
      image: 'https://assets.nvidia.partners/images/png/884116427780_US.png',
      onSale: false,
      featured: true
    },
    {
      id: '46',
      name: 'MSI Gaming Laptop RTX 4070',
      price: '$1599.99',
      originalPrice: '$1799.99',
      category: 'PC Portables',
      rating: 4.7,
      reviews: 124,
      image: 'https://www.progear.ma/5500-tm_product_lg/msi-katana-17-b13vgk-1041fr-intel-core-i7-rtx-4070-pc-portable-gamer.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '47',
      name: 'HP Omen Gaming Laptop',
      price: '$1199.99',
      category: 'PC Portables',
      rating: 4.5,
      reviews: 98,
      image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05551586.png',
      onSale: false,
      featured: false
    },
    {
      id: '48',
      name: 'Alienware m15 R7',
      price: '$2499.99',
      category: 'PC Portables',
      rating: 4.8,
      reviews: 76,
      image: 'https://www.europc.co.uk/66557-large_default/dell-alienware-m15-r7-gaming-laptop-intel-core-i7-12700h-16gb-ram-1tb-ssd-15-1920x1080-fhd-8gb-nvidia-geforce-rtx-3070ti-dell-1-yr-wty-157892.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '49',
      name: 'RTX 4090 Graphics Card',
      price: '$1599.99',
      category: 'Carte Graphique',
      rating: 5.0,
      reviews: 89,
      image: 'https://www.gigabyte.com/FileUpload/global/News/2027/o202210040933058730.png',
      onSale: false,
      featured: true
    },
    {
      id: '50',
      name: 'RTX 3070 Graphics Card',
      price: '$399.99',
      originalPrice: '$499.99',
      category: 'Carte Graphique',
      rating: 4.6,
      reviews: 156,
      image: 'https://dlcdnwebimgs.asus.com/gain/1c4aab9b-f10d-4e42-945e-03e4ff938e3f/w800',
      onSale: true,
      featured: false
    },
    {
      id: '51',
      name: 'AMD RX 7800 XT',
      price: '$549.99',
      category: 'Carte Graphique',
      rating: 4.7,
      reviews: 134,
      image: 'https://www.ultrapc.ma/42300-large_default/sapphire-pulse-amd-radeon-rx-7800-xt-16gb.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '52',
      name: 'AMD Ryzen 7 7700X',
      price: '$349.99',
      category: 'Processeur',
      rating: 4.6,
      reviews: 145,
      image: 'https://www.ultrapc.ma/20685/amd-ryzen-7-7700x-45-ghz-54-ghz.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '53',
      name: 'Intel Core i9-13900K',
      price: '$599.99',
      originalPrice: '$699.99',
      category: 'Processeur',
      rating: 4.9,
      reviews: 87,
      image: 'https://pcgamercasa.ma/8245-large_default/intel-core-i9-13900k-30-ghz-58-ghz-PC-GAMER-MAROC-CASA.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '54',
      name: 'AMD Ryzen 5 7600X',
      price: '$249.99',
      category: 'Processeur',
      rating: 4.5,
      reviews: 112,
      image: 'https://www.ultrapc.ma/20679-large_default/amd-ryzen-5-7600x-47-ghz-53-ghz.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '55',
      name: 'NZXT H7 Elite Gaming Case',
      price: '$199.99',
      category: 'Boitier Gamer',
      rating: 4.8,
      reviews: 67,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFJMdXVJyQ1G3oMB37WPbKzVWIwY__6p46A&s',
      onSale: false,
      featured: true
    },
    {
      id: '56',
      name: 'Corsair iCUE 5000X RGB',
      price: '$249.99',
      originalPrice: '$299.99',
      category: 'Boitier Gamer',
      rating: 4.7,
      reviews: 89,
      image: 'https://www.ultrapc.ma/16149/corsair-icue-5000x-rgb-tempered-glass-noir.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '57',
      name: 'Lian Li PC-O11 Dynamic',
      price: '$159.99',
      category: 'Boitier Gamer',
      rating: 4.6,
      reviews: 134,
      image: 'https://lian-li.com/wp-content/uploads/2020/11/O11D-xl-s03-00.png',
      onSale: false,
      featured: false
    },
    {
      id: '58',
      name: '34" Ultrawide Gaming Monitor',
      price: '$599.99',
      category: 'Ecran PC',
      rating: 4.8,
      reviews: 156,
      image: 'https://goldentech.com.sa/media/catalog/product/cache/3b63c6023d7836f7abeed5960b50eab1/l/e/lenovo_g34w-30_curved_gaming_monitor_34-inch_2k_wqhd_66f1gac1uk_0.jpg',
      onSale: false,
      featured: true
    },
    {
      id: '59',
      name: '4K Gaming Monitor 28"',
      price: '$449.99',
      originalPrice: '$549.99',
      category: 'Ecran PC',
      rating: 4.7,
      reviews: 98,
      image: 'https://www.pcgamer.ma/261156-large_default/asus-tuf-gaming-vg289q1a-284k-.jpg',
      onSale: true,
      featured: true
    },
    {
      id: '60',
      name: '240Hz Gaming Monitor 25"',
      price: '$379.99',
      category: 'Ecran PC',
      rating: 4.6,
      reviews: 87,
      image: 'https://pcstore.ma/wp-content/uploads/2021/10/ALIENWARE-AW2521HFLA-Gaming-Monitor-25-FULLHD-IPS-Fast-240HZ-1ms-2.jpg',
      onSale: false,
      featured: false
    },
    {
      id: '61',
      name: 'Custom Gaming PC RTX 4070 Ti',
      price: '$2199.99',
      category: 'PC Gamer',
      rating: 4.8,
      reviews: 76,
      image: 'https://www.ekfluidgaming.com/media/catalog/product/cache/6/image/x800/9df78eab33525d08d6e5fb8d27136e95/0/1/01-fg-battle-180-190-radeon-amd_1_1_.png',
      onSale: false,
      featured: true
    },
    {
      id: '62',
      name: 'Entry Level Gaming PC',
      price: '$899.99',
      originalPrice: '$1099.99',
      category: 'PC Gamer',
      rating: 4.4,
      reviews: 134,
      image: 'https://www.vedantcomputers.com/image/cache/catalog/assets/product/ant-esports/cabinet/aqua-360-4f/aqua-360-4f-1-550x550.jpg',
      onSale: true,
      featured: false
    }
  ];
  const categories = ['All', 'Apparel', 'Hardware', 'Accessories', 'Stickers', 'PC Portables', 'Carte Graphique', 'Processeur', 'Boitier Gamer', 'Ecran PC', 'PC Gamer'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0);
  
  const categoriesPerPage = 5;
  const maxIndex = Math.max(0, categories.length - categoriesPerPage);
  
  const displayedCategories = categories.slice(currentCategoryIndex, currentCategoryIndex + categoriesPerPage);
  
  const scrollToNext = () => {
    if (currentCategoryIndex < maxIndex) {
      setCurrentCategoryIndex(prev => Math.min(prev + 1, maxIndex));
    }
  };
  
  const scrollToPrev = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text">
              {t('shop.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('shop.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-4 mb-8">
            {/* Left Arrow */}
            {currentCategoryIndex > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToPrev}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:border-primary transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
            )}
            
            {/* Categories Container */}
            <div className="flex gap-4 items-center overflow-hidden">
              <motion.div 
                className="flex gap-4"
                key={currentCategoryIndex}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {displayedCategories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-gradient-primary text-primary-foreground'
                        : 'bg-card border border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>
            
            {/* Right Arrow */}
            {currentCategoryIndex < maxIndex && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNext}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border text-foreground hover:border-primary transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.025, duration: 0.25 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="cyber-card h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 space-y-2">
                    {product.featured && (
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        {t('shopLabels.featured')}
                      </Badge>
                    )}
                    {product.onSale && (
                      <Badge className="bg-red-500 text-white">
                        {t('shopLabels.sale')}
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const likedProduct = {
                          id: product.id,
                          name: product.name,
                          price: Number(product.price.replace(/[^\d.]/g, '')) * 10,
                          originalPrice: product.originalPrice ? Number(product.originalPrice.replace(/[^\d.]/g, '')) * 10 : undefined,
                          category: product.category,
                          rating: product.rating,
                          reviews: product.reviews,
                          image: product.image,
                          onSale: product.onSale,
                          featured: product.featured
                        };
                        
                        if (isLiked(product.id)) {
                          removeFromLiked(product.id);
                        } else {
                          addToLiked(likedProduct);
                        }
                      }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        isLiked(product.id)
                          ? 'bg-red-500 border-red-400 text-white hover:bg-red-600'
                          : 'bg-card/80 border-border hover:border-primary'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked(product.id) ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>

                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <Link to={`/shop/${product.id}`} state={{ product }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-48 h-48 object-cover mx-auto rounded-md bg-white dark:bg-zinc-900"
                        />
                      </Link>
                    </motion.div>
                    
                    <h3 className="text-lg font-bold mb-2">
                      <Link
                        to={`/shop/${product.id}`}
                        state={{ product }}
                        className="hover:underline"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    
                    <Badge variant="outline" className="border-secondary text-secondary">
                      {product.category}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <div className="text-2xl font-bold neon-text">
                        {`${(Number(product.price.replace(/[^\d.]/g, '')) * 10).toFixed(2)} MAD`}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {`${(Number(product.originalPrice.replace(/[^\d.]/g, '')) * 10).toFixed(2)} MAD`}
                        </div>
                      )}
                      <div className="mt-2">
                        <Link
                          to={`/shop/${product.id}`}
                          state={{ product }}
                          className="text-primary hover:underline text-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full cyber-button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: Number(product.price.replace(/[^\d.]/g, '')) * 10, // MAD
                          image: product.image,
                        })
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t('shopLabels.addToCart')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cyber-card text-center p-12 max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 neon-text">
              Exclusive Team Merchandise
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Support your favorite teams with official gear and collectibles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="cyber-button">
                Shop Team Gear
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Shop;