import React from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useLiked } from '../context/LikedContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { getProductById, type Product as SharedProduct } from '../data/products';
import { API_BASE } from '@/lib/config';

// Use the shared Product type
export type Product = SharedProduct & { description?: string };

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation() as { state?: { product?: Product } };
  // State for fetching when opened directly
  const [fetchedProduct, setFetchedProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Prefer product from navigation state
  const productFromState = location.state?.product;

  // If no product in state, attempt backend fetch; fall back to shared data if fetch fails
  React.useEffect(() => {
    if (!productFromState && productId) {
      let active = true;
      (async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch(`${API_BASE}/products/${productId}`);
          if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
          const data = (await res.json()) as Product;
          if (active) setFetchedProduct(data);
        } catch (e: unknown) {
          console.error('Product fetch failed', e);
          // Fallback to shared data
          const local = getProductById(productId);
          if (local && active) setFetchedProduct(local as Product);
          if (!local && active) setError(e instanceof Error ? e.message : 'Unable to load product');
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    }
  }, [productFromState, productId]);

  const product = productFromState || fetchedProduct || (productId ? (getProductById(productId) as Product | undefined) : undefined);

  const { addToCart } = useCart();
  const { addToLiked, removeFromLiked, isLiked } = useLiked();

  // If user loads this page directly without navigation state
  if (!product) {
    return (
      <div className="min-h-screen pt-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="cyber-card p-8 text-center">
            {loading ? (
              <h1 className="text-xl">Loading product...</h1>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <p className="text-muted-foreground mb-6">
                  We couldn't load details for product {productId}. Please go back to the shop and try again.
                </p>
                <Button onClick={() => navigate('/shop')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const priceMAD = (Number(product.price.replace(/[^\d.]/g, '')) * 10).toFixed(2);
  const originalPriceMAD = product.originalPrice
    ? (Number(product.originalPrice.replace(/[^\d.]/g, '')) * 10).toFixed(2)
    : undefined;

  // Build a simple dynamic description
  const description = product.description
    ? product.description
    : `The ${product.name} is a premium ${product.category.toLowerCase()} designed for esports enthusiasts. Engineered for performance and durability, it's a perfect addition to your setup. Enjoy top-notch quality, modern aesthetics, and excellent value.`;

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="px-0">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="cyber-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image side */}
              <div className="p-8 flex items-center justify-center bg-card/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md object-contain rounded-md bg-white dark:bg-zinc-900"
                />
              </div>

              {/* Details side */}
              <div className="p-8">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {product.featured && (
                      <Badge className="bg-gradient-accent text-accent-foreground">Featured</Badge>
                    )}
                    {product.onSale && (
                      <Badge className="bg-red-500 text-white">Sale</Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                </CardHeader>

                <CardContent className="p-0 mt-4 space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
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
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="text-3xl font-bold neon-text">{priceMAD} MAD</div>
                    {originalPriceMAD && (
                      <div className="text-sm text-muted-foreground line-through">{originalPriceMAD} MAD</div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="cyber-button"
                      onClick={() =>
                        addToCart({ id: product.id, name: product.name, price: Number(priceMAD), image: product.image })
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>

                    <Button
                      variant={isLiked(product.id) ? 'destructive' : 'outline'}
                      onClick={() => {
                        // Build a liked product object consistent with LikedContext usage in Shop
                        const likedProduct = {
                          id: product.id,
                          name: product.name,
                          price: Number(product.price.replace(/[^\d.]/g, '')) * 10,
                          originalPrice: product.originalPrice
                            ? Number(product.originalPrice.replace(/[^\d.]/g, '')) * 10
                            : undefined,
                          category: product.category,
                          rating: product.rating,
                          reviews: product.reviews,
                          image: product.image,
                          onSale: product.onSale,
                          featured: product.featured,
                        };

                        if (isLiked(product.id)) {
                          removeFromLiked(product.id);
                        } else {
                          addToLiked(likedProduct);
                        }
                      }}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      {isLiked(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>

                  {/* Description */}
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground">{description}</p>
                  </div>

                  {/* Back to shop link on small screens */}
                  <div className="pt-4">
                    <Link to="/shop" className="text-primary hover:underline">
                      ← Back to Shop
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
