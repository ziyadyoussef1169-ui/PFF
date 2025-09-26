import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, User, Lock, Gamepad2, Trophy, Zap, Shield, Github, Chrome, Twitch } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate loading for better UX
    setTimeout(async () => {
      const result = await login(username, password);
      if (!result.ok) {
        setError(result.error || t('login.invalidCredentials'));
        setIsLoading(false);
      } else {
        navigate('/');
      }
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    // Placeholder for social login implementation
    alert(`${provider} login not implemented in demo`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        {/* Floating Gaming Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="cyber-card border-2 border-primary/20 backdrop-blur-sm bg-card/90 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center"
            >
              <Shield className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold neon-text mb-2"
            >
              {t('login.heading')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              {t('login.subheading')}
            </motion.p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Login Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { icon: Github, name: 'GitHub', color: 'hover:bg-gray-700' },
                { icon: Chrome, name: 'Google', color: 'hover:bg-red-600' },
                { icon: Twitch, name: 'Twitch', color: 'hover:bg-purple-600' }
              ].map((provider, index) => (
                <motion.button
                  key={provider.name}
                  onClick={() => handleSocialLogin(provider.name)}
                  className={`p-3 rounded-lg border border-border ${provider.color} transition-colors group`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <provider.icon className="h-5 w-5 mx-auto text-muted-foreground group-hover:text-white transition-colors" />
                </motion.button>
              ))}
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('login.orContinue')}</span>
              </div>
            </div>

            {/* Login Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {/* Username Field */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <User className={`h-5 w-5 transition-colors ${
                    focusedField === 'username' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder={t('login.usernameOrEmail')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cyber-input"
                  required
                />
                {focusedField === 'username' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Lock className={`h-5 w-5 transition-colors ${
                    focusedField === 'password' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('login.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cyber-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {focusedField === 'password' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                  onClick={() => alert('Password reset not implemented in demo')}
                >
                  {t('login.forgotPassword')}
                </button>
              </div>

              {/* Login Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cyber-button relative overflow-hidden group py-3"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-5 w-5 mr-2" />
                      </motion.div>
                    ) : (
                      <Gamepad2 className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? t('login.loading') : t('login.submit')}
                  </div>
                </Button>
              </motion.div>
            </motion.form>

            {/* Register Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-4 border-t border-border"
            >
              <p className="text-muted-foreground text-sm">
                {t('login.newHere')}{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {t('login.createAccount')}
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
