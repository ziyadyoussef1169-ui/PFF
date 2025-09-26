import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import './i18n/config';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { TeamsProvider } from './context/TeamsContext';
import Navigation from './components/Navigation';
import Background3D from './components/Background3D';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Tournaments from './pages/Tournaments';
import Shop from './pages/Shop';
import LikedProducts from './pages/LikedProducts';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CompetitionRegistration from './pages/CompetitionRegistration';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import TeamDashboard from './pages/TeamDashboard';
import OrderConfirmation from './pages/OrderConfirmation';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import AdminRegistrations from './pages/AdminRegistrations';

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.5
};
const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TeamsProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="relative min-h-screen">
                <Background3D />
                <Navigation />
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route 
                    path="/admin/registrations" 
                    element={
                      <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                      >
                        <AdminRegistrations />
                      </motion.div>
                    } 
                  />
                  <Route 
                      path="/team/:id"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <TeamDashboard />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/profile"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/login"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Login />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/register"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Register />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Home />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/teams" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Teams />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/players" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Players />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/tournaments" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Tournaments />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/shop" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Shop />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/shop/:productId" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <ProductDetails />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="/liked-products" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <LikedProducts />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/contact" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Contact />
                        </motion.div>
                      } 
                    />
                    <Route
                      path="/competition-registration"
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <CompetitionRegistration />
                        </motion.div>
                      }
                    />
                    <Route 
                      path="*" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <NotFound />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Checkout />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/order-confirmation" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <OrderConfirmation />
                        </motion.div>
                      } 
                    />
                  </Routes>
                </AnimatePresence>
              </div>
            </BrowserRouter>
            </TooltipProvider>
          </TeamsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
