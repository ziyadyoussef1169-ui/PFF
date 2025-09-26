import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { useCart } from '../context/CartContext';
import { useLiked } from '../context/LikedContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const { likedCount } = useLiked();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'teams', path: '/teams' },
    { key: 'players', path: '/players' },
    { key: 'tournaments', path: '/tournaments' },
    { key: 'shop', path: '/shop' },
    { key: 'contact', path: '/contact' }
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white"
            >
              <img
                src="BLUE LION.png"
                alt="Logo"
                className="object-cover w-full h-full"
                style={{ display: 'block' }}
              />
            </motion.div>
            <span className="text-xl font-bold neon-text">Elite Arena</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(`nav.${item.key}`)}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                <RouterLink
                  to="/profile"
                  className={`text-sm font-medium px-2 hover:underline focus:underline transition-colors ${location.pathname === '/profile' ? 'text-primary' : ''}`}
                >
                  {t('navigation.hi')} {user.username}
                </RouterLink>
                {/* Profile button removed; username is now the profile link */}
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate('/'); }}>
                  {t('auth.logout')}
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <RouterLink to="/login">{t('auth.login')}</RouterLink>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <RouterLink to="/register">{t('auth.register')}</RouterLink>
                </Button>
              </>
            )}
            
            {/* Liked Products Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="relative" 
              aria-label="View liked products"
              asChild
            >
              <RouterLink to="/liked-products">
                <Heart className="h-5 w-5" />
                {likedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {likedCount}
                  </span>
                )}
              </RouterLink>
            </Button>
            
            {/* Cart Drawer - hide on checkout page */}
            {location.pathname !== '/checkout' && (
              <Drawer open={cartOpen} onOpenChange={setCartOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="relative" aria-label="Open cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-w-md mx-auto">
                  <DrawerHeader>
                    <DrawerTitle>{t('navigation.cart')}</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center text-muted-foreground">{t('navigation.emptyCart')}</div>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} MAD</span>
                            <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                              {t('navigation.remove')}
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {cart.length > 0 && (
                    <DrawerFooter>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{t('navigation.total')}</span>
                        <span className="font-bold">
                          {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} MAD
                        </span>
                      </div>
                      <Button asChild variant="default" className="w-full mb-2">
                        <RouterLink to="/checkout">{t('navigation.checkout')}</RouterLink>
                      </Button>
                      <Button variant="destructive" onClick={clearCart}>{t('navigation.clearCart')}</Button>
                    </DrawerFooter>
                  )}
                </DrawerContent>
              </Drawer>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4" />
              <span className="ml-2">{i18n.language.toUpperCase()}</span>
            </Button>
            
            {/* Remove or comment out the theme toggle button */}
            {/* <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button> */}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-md"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="w-full justify-start px-4 sm:hidden"
              >
                <Globe className="h-4 w-4 mr-2" />
                {i18n.language.toUpperCase()}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;