import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Star, Heart, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLiked } from '../context/LikedContext';
import { useCart } from '../context/CartContext';

const LikedProducts: React.FC = () => {
  const { t } = useTranslation();
  const { likedProducts, removeFromLiked } = useLiked();
  const { addToCart } = useCart();

  if (likedProducts.length === 0) {
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
                {t('liked.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {t('liked.emptySubtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="cyber-card text-center p-12 max-w-2xl mx-auto"
            >
              <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-3xl font-bold mb-4">{t('liked.emptyHeader')}</h2>
              <p className="text-muted-foreground mb-8">
                {t('liked.emptyDesc')}
              </p>
              <Button 
                size="lg" 
                className="cyber-button"
                onClick={() => window.location.href = '/shop'}
              >
                {t('liked.browseShop')}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

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
              {t('liked.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('liked.count', { count: likedProducts.length, plural: likedProducts.length !== 1 ? 's' : '' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="cyber-card h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 space-y-2">
                    {product.featured && (
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        {t('liked.featured')}
                      </Badge>
                    )}
                    {product.onSale && (
                      <Badge className="bg-red-500 text-white">
                        {t('liked.sale')}
                      </Badge>
                    )}
                  </div>

                  {/* Remove from Liked Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromLiked(product.id)}
                      className="w-8 h-8 rounded-full bg-red-500/80 border border-red-400 flex items-center justify-center hover:bg-red-500 transition-colors text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <CardHeader className="text-center pb-4">
                    <motion.div
                      className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-48 h-48 object-cover mx-auto rounded-md bg-white dark:bg-zinc-900"
                      />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold mb-2">
                      {product.name}
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
                        {`${product.price.toFixed(2)} MAD`}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {`${product.originalPrice.toFixed(2)} MAD`}
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="w-full cyber-button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t('liked.addToCart')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continue Shopping Banner */}
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
              {t('home.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('shop.subtitle')}
            </p>
            <Button 
              size="lg" 
              className="cyber-button"
              onClick={() => window.location.href = '/shop'}
            >
              {t('navigation.checkout')}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LikedProducts;
