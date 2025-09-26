import React from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, Award, Gamepad2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Players: React.FC = () => {
  const { t } = useTranslation();
  const { players, addPlayer, removePlayer } = usePlayerContext();
  const navigate = useNavigate();

  // players now comes from context and is an array of { name, email, team, age }

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
              {t('players.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('players.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.length === 0 ? (
              <div className="text-center text-muted-foreground col-span-full py-12">{t('players.noPlayers')}</div>
            ) : (
              players.map((player, index) => (
                <motion.div
                  key={player.email + player.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Card className="cyber-card h-full relative overflow-hidden">
                    <CardHeader className="text-center pb-4">
                      <h3 className="text-2xl font-bold neon-text mb-1">{player.name}</h3>
                      <p className="text-muted-foreground mb-2">{player.email}</p>
                      <Badge variant="outline" className="border-secondary text-secondary">{player.team}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t('players.age')}</span>
                        <span className="font-bold text-accent">{player.age}</span>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button size="sm" variant="destructive" onClick={() => removePlayer(player.email)}>
                          {t('players.remove')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cyber-card max-w-2xl mx-auto p-8"
          >
            <h2 className="text-3xl font-bold mb-4 neon-text">
              {t('players.ctaTitle')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('players.ctaSubtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button px-8 py-3 rounded-lg font-semibold"
              onClick={() => navigate('/competition-registration')}
            >
              {t('players.applyNow')}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Players;