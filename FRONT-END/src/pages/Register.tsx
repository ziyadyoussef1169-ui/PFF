import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Gamepad2, Trophy, Zap, Shield, Github, Chrome, Twitch, CheckCircle, AlertCircle } from 'lucide-react';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { t } = useTranslation();

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[a-z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError(t('register.errors.passwordMismatch'));
      return;
    }
    
    if (passwordStrength < 3) {
      setError(t('register.errors.passwordWeak'));
      return;
    }
    
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(async () => {
      const result = await register(username, email, password);
      if (!result.ok) {
        setError(result.error || t('register.errors.registrationFailed'));
        setIsLoading(false);
      } else {
        navigate('/');
      }
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} registration not implemented in demo`);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    if (passwordStrength === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Fair';
    if (passwordStrength === 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        {/* Floating Gaming Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-secondary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, -80, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.3, 1.5, 0.3],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="cyber-card border-2 border-secondary/20 backdrop-blur-sm bg-card/90 shadow-2xl shadow-secondary/10">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center"
            >
              <Trophy className="h-8 w-8 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold neon-text mb-2"
            >
              {t('register.heading')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              {t('register.subheading')}
            </motion.p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Social Registration Options */}
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
                <span className="bg-card px-2 text-muted-foreground">{t('register.orWithEmail')}</span>
              </div>
            </div>

            {/* Registration Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {/* Username Field */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <User className={`h-5 w-5 transition-colors ${
                    focusedField === 'username' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type="text"
                  placeholder={t('register.placeholders.username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 cyber-input"
                  required
                />
                {focusedField === 'username' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-secondary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
              </motion.div>

              {/* Email Field */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Mail className={`h-5 w-5 transition-colors ${
                    focusedField === 'email' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type="email"
                  placeholder={t('register.placeholders.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 cyber-input"
                  required
                />
                {focusedField === 'email' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-secondary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Lock className={`h-5 w-5 transition-colors ${
                    focusedField === 'password' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('register.placeholders.password')}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 cyber-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {focusedField === 'password' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-secondary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
              </motion.div>

              {/* Password Strength Indicator */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('register.strengthLabel')}</span>
                    <span className={`font-medium ${
                      passwordStrength <= 2 ? 'text-red-400' :
                      passwordStrength === 3 ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {passwordStrength <= 2 ? t('register.strength.weak') :
                       passwordStrength === 3 ? t('register.strength.fair') :
                       passwordStrength === 4 ? t('register.strength.good') : t('register.strength.strong')}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Confirm Password Field */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Lock className={`h-5 w-5 transition-colors ${
                    focusedField === 'confirmPassword' ? 'text-secondary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('register.placeholders.confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-background/50 border border-border rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-300 cyber-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {focusedField === 'confirmPassword' && (
                  <motion.div
                    className="absolute inset-0 border-2 border-secondary/50 rounded-lg pointer-events-none"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  />
                )}
                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                    {password === confirmPassword ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
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

              {/* Register Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cyber-button relative overflow-hidden group py-3 bg-gradient-to-r from-secondary to-accent"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20"
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
                      <Trophy className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? t('register.createLoading') : t('register.submit')}
                  </div>
                </Button>
              </motion.div>
            </motion.form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-4 border-t border-border"
            >
              <p className="text-muted-foreground text-sm">
                {t('register.haveAccount')}{' '}
                <Link
                  to="/login"
                  className="text-secondary hover:text-secondary/80 font-medium transition-colors"
                >
                  {t('register.signIn')}
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
