import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Trophy, Users, Zap, Twitter, Instagram, Facebook, Youtube, ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, Clock, Calendar, Award, Target, Gamepad2, Headphones, Monitor, Cpu, Quote, ArrowRight, TrendingUp, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useLiked } from '@/context/LikedContext';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToLiked, removeFromLiked, isLiked } = useLiked();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  
  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.8]);
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const particleY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [liveStats, setLiveStats] = useState({
    activePlayers: 47832,
    ongoingMatches: 156,
    prizePool: 2847593
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: Trophy,
      title: t('home.features.epicTournaments.title'),
      description: t('home.features.epicTournaments.description')
    },
    {
      icon: Users,
      title: t('home.features.eliteTeams.title'),
      description: t('home.features.eliteTeams.description')
    },
    {
      icon: Zap,
      title: t('home.features.liveStreaming.title'),
      description: t('home.features.liveStreaming.description')
    }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Elite Gaming Headset',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
      rating: 4.8,
      category: 'Audio',
      reviews: 245,
      onSale: true,
      featured: true
    },
    {
      id: '2',
      name: 'Pro Mechanical Keyboard',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
      rating: 4.9,
      category: 'Keyboards',
      reviews: 189,
      onSale: true,
      featured: true
    },
    {
      id: '3',
      name: 'Gaming Mouse RGB',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
      rating: 4.7,
      category: 'Mice',
      reviews: 156,
      onSale: true,
      featured: true
    },
    {
      id: '4',
      name: 'Elite Gaming Chair',
      price: 399.99,
      originalPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      rating: 4.6,
      category: 'Furniture',
      reviews: 98,
      onSale: true,
      featured: true
    },
    {
      id: '5',
      name: 'Ultra-Wide Monitor',
      price: 599.99,
      originalPrice: 749.99,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
      rating: 4.9,
      category: 'Monitors',
      reviews: 312,
      onSale: true,
      featured: true
    }
  ];

  const scrollProducts = (direction: 'left' | 'right') => {
    const container = document.getElementById('products-scroll');
    if (container) {
      const scrollAmount = 320;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (direction === 'right') {
        if (container.scrollLeft >= maxScroll - 10) {
          // If at the end, scroll back to the beginning
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        if (container.scrollLeft <= 10) {
          // If at the beginning, scroll to the end
          container.scrollTo({
            left: maxScroll,
            behavior: 'smooth'
          });
        } else {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const handleLikeToggle = (product: typeof featuredProducts[0]) => {
    if (isLiked(product.id)) {
      removeFromLiked(product.id);
    } else {
      addToLiked(product);
    }
  };

  const liveNews = [
    { id: 1, text: "🏆 Championship Finals starting in 2 hours - Team Phoenix vs Team Dragon!", urgent: true },
    { id: 2, text: "🎮 New tournament registration open: Summer League 2024 - $50K Prize Pool", urgent: false },
    { id: 3, text: "⚡ Live now: Qualifier matches for the World Championship", urgent: true },
    { id: 4, text: "🎯 Player spotlight: ProGamer123 achieves 1000 consecutive wins!", urgent: false },
    { id: 5, text: "🔥 Flash sale: Gaming gear up to 70% off - Limited time only!", urgent: false }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Alex 'ProShot' Chen",
      role: "Professional Esports Player",
      team: "Team Nexus",
      quote: "Elite Arena has transformed my gaming career. The tournaments are world-class and the community is incredible.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah 'Lightning' Rodriguez",
      role: "Tournament Champion",
      team: "Storm Riders",
      quote: "The platform's features and competitive environment helped me reach the top. Best esports platform ever!",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      id: 3,
      name: "Marcus 'Phantom' Johnson",
      role: "Team Captain",
      team: "Shadow Legion",
      quote: "Elite Arena's team management tools and tournament system are unmatched. It's a game-changer!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  // Localized testimonial text (name, role, team, quote)
  const testimonialsI18n = t('home.testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    team: string;
    quote: string;
  }>;

  const achievements = [
    { icon: Trophy, title: t('home.achievements.tournamentWins'), count: "2,847", color: "text-yellow-400" },
    { icon: Users, title: t('home.achievements.activeTeams'), count: "1,234", color: "text-blue-400" },
    { icon: Target, title: t('home.achievements.matchesPlayed'), count: "45,678", color: "text-green-400" },
    { icon: Award, title: t('home.achievements.champions'), count: "892", color: "text-purple-400" }
  ];

  useEffect(() => {
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % liveNews.length);
    }, 4000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        activePlayers: prev.activePlayers + Math.floor(Math.random() * 10) - 5,
        ongoingMatches: prev.ongoingMatches + Math.floor(Math.random() * 6) - 3,
        prizePool: prev.prizePool + Math.floor(Math.random() * 1000) - 500
      }));
    }, 3000);

    return () => {
      clearInterval(newsInterval);
      clearInterval(testimonialInterval);
      clearInterval(statsInterval);
    };
  }, [liveNews.length, testimonials.length]);

  return (
    <div ref={containerRef} className="min-h-screen pt-16">
      {/* Live News Ticker */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm border-b border-primary/20"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Flame className="h-5 w-5 text-red-400" />
              </motion.div>
              {t('home.liveLabel')}
            </div>
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNewsIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`text-white ${liveNews[currentNewsIndex].urgent ? 'font-bold' : 'font-medium'}`}
                >
                  {liveNews[currentNewsIndex].text}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex gap-1">
              {liveNews.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentNewsIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden py-20 px-4 min-h-screen flex items-center">
        <motion.div 
          style={{ y: backgroundY, opacity: heroOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
        />
        
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="container mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 neon-text"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              {t('home.title')}
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-3xl mb-4 gradient-primary bg-clip-text text-transparent font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {t('home.subtitle')}
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {t('home.description')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="cyber-button"
                onClick={() => {
                  navigate('/tournaments');
                  setTimeout(() => {
                    document.querySelector('.live-stream-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                {t('home.watchLive')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate('/competition-registration')}
              >
                <Trophy className="mr-2 h-5 w-5" />
                {t('home.joinTournament')}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/15 blur-lg"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Interactive Particle Effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full cursor-pointer"
            style={{
              left: `${15 + i * 7}%`,
              top: `${25 + (i % 4) * 15}%`,
              y: particleY
            }}
            animate={{
              y: [-30, -80, -30],
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.3],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 2,
              backgroundColor: "#ff6b6b",
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.5,
              rotate: 180
            }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              {t('home.whyChooseTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15, 
                  rotateX: 5, 
                  rotateY: 5,
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="cyber-card h-full">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
                      whileHover={{ 
                        rotate: [0, 180, 360], 
                        scale: [1, 1.2, 1.1],
                        boxShadow: ["0 0 0 0 rgba(139, 92, 246, 0)", "0 0 0 10px rgba(139, 92, 246, 0.3)", "0 0 0 20px rgba(139, 92, 246, 0)"]
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      whileTap={{ scale: 0.9, rotate: 45 }}
                    >
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Statistics Dashboard */}
      <section className="py-16 px-4 bg-gradient-to-r from-card/40 to-card/20 border-y border-primary/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text flex items-center justify-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              {t('home.liveStatsTitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="cyber-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center"
                >
                  <Users className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <motion.div
                key={liveStats.activePlayers}
                initial={{ scale: 1.2, color: "#10b981" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold mb-2"
              >
                {liveStats.activePlayers.toLocaleString()}
              </motion.div>
              <div className="text-muted-foreground">{t('home.playersOnline')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="cyber-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center"
                >
                  <Gamepad2 className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <motion.div
                key={liveStats.ongoingMatches}
                initial={{ scale: 1.2, color: "#8b5cf6" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold mb-2"
              >
                {liveStats.ongoingMatches}
              </motion.div>
              <div className="text-muted-foreground">{t('home.liveMatches')}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="cyber-card p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center"
                >
                  <Trophy className="h-8 w-8 text-white" />
                </motion.div>
              </div>
              <motion.div
                key={liveStats.prizePool}
                initial={{ scale: 1.2, color: "#f59e0b" }}
                animate={{ scale: 1, color: "#ffffff" }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold mb-2"
              >
                ${liveStats.prizePool.toLocaleString()}
              </motion.div>
              <div className="text-muted-foreground">{t('home.totalPrizePool')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gaming Achievements Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              {t('home.achievementsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.achievementsSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 10,
                  rotateX: 5,
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))"
                }}
                whileTap={{ scale: 0.95 }}
                className="cyber-card p-6 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1.1],
                    boxShadow: [
                      "0 0 0 0 rgba(139, 92, 246, 0)",
                      "0 0 0 15px rgba(139, 92, 246, 0.4)",
                      "0 0 0 30px rgba(139, 92, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  whileTap={{ scale: 0.8, rotate: 45 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 cursor-pointer`}
                >
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                </motion.div>
                <motion.div 
                  className={`text-3xl font-bold mb-2 ${achievement.color}`}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, 5, -5, 0],
                    textShadow: "0 0 20px currentColor"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {achievement.count}
                </motion.div>
                <div className="text-muted-foreground font-medium">
                  {achievement.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Player Testimonials & Spotlight */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              {t('home.testimonialsTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.testimonialsSubtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="cyber-card p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <img
                        src={testimonials[currentTestimonial].avatar}
                        alt={(testimonialsI18n && testimonialsI18n[currentTestimonial]?.name) || testimonials[currentTestimonial].name}
                        className="w-24 h-24 rounded-full border-4 border-primary/50"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          const fallback = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face';
                          if (target.src !== fallback) target.src = fallback;
                        }}
                      />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <Quote className="h-12 w-12 text-primary/50 mx-auto md:mx-0" />
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg md:text-xl mb-6 text-muted-foreground italic"
                    >
                      "{(testimonialsI18n && testimonialsI18n[currentTestimonial]?.quote) || testimonials[currentTestimonial].quote}"
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="text-xl font-bold text-primary mb-1">
                        {(testimonialsI18n && testimonialsI18n[currentTestimonial]?.name) || testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        {(testimonialsI18n && testimonialsI18n[currentTestimonial]?.role) || testimonials[currentTestimonial].role}
                        {' '}•{' '}
                        {(testimonialsI18n && testimonialsI18n[currentTestimonial]?.team) || testimonials[currentTestimonial].team}
                      </p>
                      <div className="flex items-center justify-center md:justify-start gap-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Gaming Setup Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              {t('home.setupTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.setupSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: t('home.setupItems.ultraWide.title'), spec: t('home.setupItems.ultraWide.spec'), color: "from-blue-400 to-cyan-400" },
              { icon: Headphones, title: t('home.setupItems.proAudio.title'), spec: t('home.setupItems.proAudio.spec'), color: "from-purple-400 to-pink-400" },
              { icon: Cpu, title: t('home.setupItems.gamingRig.title'), spec: t('home.setupItems.gamingRig.spec'), color: "from-green-400 to-emerald-400" },
              { icon: Gamepad2, title: t('home.setupItems.eliteController.title'), spec: t('home.setupItems.eliteController.spec'), color: "from-orange-400 to-red-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 10 }}
                className="cyber-card p-6 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-primary/50`}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.spec}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Active Players' },
              { number: '200+', label: 'Tournaments' },
              { number: '$2M+', label: 'Prize Pool' },
              { number: '24/7', label: 'Live Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
                className="cyber-card p-6 cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold neon-text mb-2"
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
                    color: "#8b5cf6"
                  }}
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(139, 92, 246, 0.5)",
                      "0 0 15px rgba(139, 92, 246, 0.8)",
                      "0 0 5px rgba(139, 92, 246, 0.5)"
                    ]
                  }}
                  transition={{
                    textShadow: { duration: 2, repeat: Infinity },
                    scale: { duration: 0.3 }
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-card/80 border-t border-border mt-12 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-muted-foreground text-sm">
          <span>&copy; {new Date().getFullYear()} Elite Arena. All rights reserved.</span>
          {/* Removed navigation links from footer */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;