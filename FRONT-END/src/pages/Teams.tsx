import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Trophy, Users, Target, Plus, Zap, Star, TrendingUp, Calendar, Gamepad2, Award, Shield, Flame, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useTeams } from '@/context/TeamsContext';
import AddTeam from '@/components/AddTeam';

const Teams: React.FC = () => {
  const { t } = useTranslation();
  const { teams, addTeam } = useTeams();
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [clickedTeam, setClickedTeam] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  const handleTeamClick = async (teamId: number) => {
    setClickedTeam(teamId);
    setIsNavigating(true);
    
    // Add a small delay for the animation to be visible
    setTimeout(() => {
      navigate(`/team/${teamId}`);
    }, 800);
  };

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
              {t('teams.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t('teams.subtitle')}
            </p>
            <Button
              onClick={() => setIsAddTeamOpen(true)}
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-white font-bold py-3 px-6 rounded-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('teamsPage.addNewTeam')}
            </Button>
          </motion.div>
        </div>
      </section>

  {/* Teams Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
                onClick={() => handleTeamClick(team.id)}
              >
                  <Card className="cyber-card h-full relative overflow-hidden border-2 border-transparent group-hover:border-primary/30 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Click Animation Overlay */}
                    <AnimatePresence>
                      {clickedTeam === team.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center z-10"
                        >
                          <motion.div
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 0.8, ease: "linear" },
                              scale: { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
                            }}
                            className="text-white"
                          >
                            <Zap className="h-12 w-12" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <CardHeader className="text-center pb-4 relative">
                      {/* Team Status Indicator */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                        />
                        <span className="text-xs text-green-400 font-medium">{t('teamsPage.active')}</span>
                      </div>
                      
                      {/* Enhanced Logo Section */}
                      <motion.div 
                        className="mb-4 flex justify-center relative"
                        whileHover={{ 
                          scale: 1.05,
                          rotate: [0, -2, 2, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        {/* Glow Effect Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        
                        <motion.img 
                          src={team.logo} 
                          alt={`${team.name} logo`}
                          className="w-32 h-36 object-contain relative z-10"
                          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ 
                            delay: index * 0.1 + 0.2,
                            duration: 0.8,
                            ease: "easeOut"
                          }}
                          viewport={{ once: true }}
                          whileHover={{
                            filter: "drop-shadow(0 0 25px rgba(59, 130, 246, 0.7)) brightness(1.1)",
                            scale: 1.1,
                            transition: { duration: 0.3 }
                          }}
                        />
                        
                        {/* Rank Badge Overlay */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          #{team.rank}
                        </motion.div>
                      </motion.div>
                      {/* Team Name and Performance Indicators */}
                      <div className="mb-3">
                        <motion.h3 
                          className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2"
                          initial={{ opacity: 0, y: -20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.1, duration: 0.6 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.05,
                            textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          {team.name}
                        </motion.h3>
                        
                        {/* Performance Rating Stars */}
                        <motion.div 
                          className="flex justify-center gap-1 mb-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {[...Array(5)].map((_, starIndex) => (
                            <motion.div
                              key={starIndex}
                              initial={{ opacity: 0, rotate: -180 }}
                              whileInView={{ opacity: 1, rotate: 0 }}
                              transition={{ delay: index * 0.1 + 0.3 + starIndex * 0.1 }}
                              whileHover={{ scale: 1.3, rotate: 180 }}
                            >
                              <Star 
                                className={`h-4 w-4 ${
                                  starIndex < Math.floor(team.winRate / 20) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-muted-foreground'
                                }`} 
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      {/* Enhanced Specialty and Recent Form */}
                      <div className="flex flex-col items-center gap-2 mb-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Badge className="bg-gradient-to-r from-secondary to-accent text-white px-3 py-1">
                            <Gamepad2 className="h-3 w-3 mr-1" />
                            {team.specialty}
                          </Badge>
                        </motion.div>
                        
                        {/* Recent Form Indicator */}
                        <motion.div 
                          className="flex items-center gap-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <TrendingUp className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">{t('teamsPage.hotStreak')}</span>
                          <div className="flex gap-1">
                            {['W', 'W', 'L', 'W', 'W'].map((result, i) => (
                              <motion.div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  result === 'W' ? 'bg-green-400' : 'bg-red-400'
                                }`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.4 + i * 0.1 }}
                                whileHover={{ scale: 1.5 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Win Rate */}
                      <motion.div 
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="text-3xl font-bold neon-text mb-1"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: index * 0.1 + 0.4,
                            type: "spring",
                            stiffness: 150,
                            damping: 8
                          }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            scale: 1.1,
                            textShadow: "0 0 20px currentColor",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.span
                            animate={{ 
                              textShadow: [
                                "0 0 5px currentColor",
                                "0 0 15px currentColor",
                                "0 0 5px currentColor"
                              ]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                          >
                            {team.winRate}%
                          </motion.span>
                        </motion.div>
                        <div className="text-sm text-muted-foreground">{t('profile.labels.winRate')}</div>
                        <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
                          <motion.div
                            className="bg-gradient-primary h-2 rounded-full relative"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${team.winRate}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-white/30"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {/* Matches Stat */}
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <motion.div 
                            className="flex items-center justify-center"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Target className="h-4 w-4 text-primary mr-1" />
                          </motion.div>
                          <motion.div 
                            className="text-lg font-bold"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + 1,
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                              }}
                              viewport={{ once: true }}
                            >
                              {team.matches}
                            </motion.span>
                          </motion.div>
                          <div className="text-xs text-muted-foreground">
                            {t('teams.stats.matches')}
                          </div>
                        </motion.div>
                        
                        {/* Wins Stat */}
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.7, duration: 0.5 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <motion.div 
                            className="flex items-center justify-center"
                            animate={{ 
                              y: [0, -3, 0],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                              duration: 2.5, 
                              repeat: Infinity, 
                              repeatDelay: 2,
                              ease: "easeInOut"
                            }}
                          >
                            <Trophy className="h-4 w-4 text-secondary mr-1" />
                          </motion.div>
                          <motion.div 
                            className="text-lg font-bold text-secondary"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.9, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + 1.1,
                                type: "spring",
                                stiffness: 250,
                                damping: 8
                              }}
                              viewport={{ once: true }}
                            >
                              {team.wins}
                            </motion.span>
                          </motion.div>
                          <div className="text-xs text-muted-foreground">
                            {t('teams.stats.wins')}
                          </div>
                        </motion.div>
                        
                        {/* Tournaments Stat */}
                        <motion.div 
                          className="space-y-1"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <motion.div 
                            className="flex items-center justify-center"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, -8, 8, 0]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              repeatDelay: 1.5,
                              ease: "easeInOut"
                            }}
                          >
                            <Users className="h-4 w-4 text-accent mr-1" />
                          </motion.div>
                          <motion.div 
                            className="text-lg font-bold text-accent"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 1.0, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ 
                                delay: index * 0.1 + 1.2,
                                type: "spring",
                                stiffness: 300,
                                damping: 12
                              }}
                              viewport={{ once: true }}
                            >
                              {team.tournaments}
                            </motion.span>
                          </motion.div>
                          <div className="text-xs text-muted-foreground">
                            {t('teams.stats.tournaments')}
                          </div>
                        </motion.div>
                      </div>
                      {/* Team Members Preview */}
                      <motion.div 
                        className="pt-4 border-t border-border"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 1.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{t('teamsPage.teamSize')}</span>
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5].map((member, memberIndex) => (
                              <motion.div
                                key={member}
                                className="w-6 h-6 rounded-full bg-gradient-primary border-2 border-card flex items-center justify-center text-xs font-bold"
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  delay: index * 0.1 + 1.4 + memberIndex * 0.1,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 10
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                  scale: 1.2, 
                                  y: -2,
                                  rotate: 10,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                {member}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Loading Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                rotate: { duration: 1, ease: "linear", repeat: Infinity },
                scale: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
              }}
              className="text-blue-400"
            >
              <Zap className="h-16 w-16" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Team Modal */}
      <AddTeam
        isOpen={isAddTeamOpen}
        onClose={() => setIsAddTeamOpen(false)}
        onAddTeam={addTeam}
      />
    </div>
  );
};

export default Teams;