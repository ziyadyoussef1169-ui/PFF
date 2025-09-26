import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, DollarSign, Users, Trophy, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Tournaments: React.FC = () => {
  const { t } = useTranslation();

  const tournaments = [
    {
      id: 1,
      title: 'Cyber Championship 2026',
      game: 'League of Legends',
      status: 'live',
      date: '2026-03-15',
      time: '18:00 UTC',
      prizePool: '50,000 MAD',
      participants: 64,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/13979.jpg',
      description: 'The ultimate MOBA championship featuring the world\'s best teams.',
      registrationOpen: false,
      youtubeLink: 'https://www.youtube.com/watch?v=tSAjT6S6C4g'
    },
    {
      id: 2,
      title: 'Neon Strike Tournament',
      game: 'Valorant',
      status: 'upcoming',
      date: '2026-03-22',
      time: '16:00 UTC',
      prizePool: '25,000 MAD',
      participants: 32,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/19112.png',
      description: 'Tactical FPS competition showcasing precision and strategy.',
      registrationOpen: true,
      youtubeLink: 'https://www.youtube.com/live/KAPjgDygyJQ?si=TLOuvvq1tLPUPCQs'
    },
    {
      id: 3,
      title: 'FIFA World Cup 2026',
      game: 'eFootball 2026',
      status: 'upcoming',
      date: '2026-04-01',
      time: '14:00 UTC',
      prizePool: '15,000 MAD',
      participants: 128,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/16540.jpg',
      description: 'It\'s an all-new era of digital soccer: "PES" has now evolved into "eFootball™"!',
      registrationOpen: true,
      youtubeLink: 'https://www.youtube.com/live/WYjSFNYxWfU?si=W7ZRlk_ZxNknUfXv'
    },
    {
      id: 4,
      title: 'Phoenix Rising Battle',
      game: 'Apex Legends',
      status: 'upcoming',
      date: '2026-04-10',
      time: '20:00 UTC',
      prizePool: '30,000 MAD',
      participants: 60,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/17901.jpg',
      description: 'Battle Royale mayhem with the highest stakes.',
      registrationOpen: true,
      youtubeLink: 'https://www.youtube.com/live/mbsmZcQNH0Y?si=seIBc5yCNpOX4r3V'
    },
    {
      id: 5,
      title: 'Arctic Warfare',
      game: 'CS:GO',
      status: 'registration',
      date: '2024-04-20',
      time: '15:00 UTC',
      prizePool: '40,000 MAD',
      participants: 24,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/1622.jpg',
      description: 'Classic FPS action with legendary teams.',
      registrationOpen: true,
      youtubeLink: 'https://www.youtube.com/watch?v=edYCtaNueQY'
    },
    {
      id: 6,
      title: 'Solar Eclipse Championship',
      game: 'Overwatch 2',
      status: 'registration',
      date: '2024-05-01',
      time: '17:00 UTC',
      prizePool: '20,000 MAD',
      participants: 16,
      image: 'https://4kwallpapers.com/images/walls/thumbs_3t/20913.jpg',
      description: 'Team-based FPS with unique heroes and abilities.',
      registrationOpen: true,
      youtubeLink: 'https://www.youtube.com/watch?v=FqnKB22pOC0'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white animate-pulse';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'registration':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live':
        return t('tournaments.live');
      case 'upcoming':
        return t('tournaments.upcoming');
      case 'registration':
        return t('tournaments.registration');
      default:
        return status;
    }
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
              {t('tournaments.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('tournaments.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tournaments Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="cyber-card h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={getStatusColor(tournament.status)}>
                      {getStatusText(tournament.status)}
                    </Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <motion.div
                      className="mb-4 text-center group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                      <img
                        src={tournament.image}
                        alt={tournament.title}
                        className="w-full h-40 object-cover mx-auto" // Show full image, not cropped square
                        style={{ borderRadius: 0 }}
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold neon-text text-center mb-2">
                      {tournament.title}
                    </h3>
                    <Badge variant="outline" className="border-primary text-primary self-center">
                      {tournament.game}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {tournament.description}
                    </p>

                    {/* Tournament Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-sm">{tournament.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span className="text-sm">{tournament.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-accent" />
                          <span className="text-sm font-bold text-accent">
                            {tournament.prizePool}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{tournament.participants} {t('tournaments.teamsLabel')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prize Pool Highlight */}
                    <div className="cyber-card p-4 text-center">
                      <div className="text-2xl font-bold neon-text mb-1">
                        {tournament.prizePool}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t('tournaments.prizePool')}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        className="flex-1 cyber-button"
                        onClick={() => window.open(tournament.youtubeLink, '_blank')}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {tournament.status === 'live' ? t('tournaments.watchLive') : 
                         tournament.status === 'upcoming' ? t('tournaments.comingSoon') : 
                         tournament.status === 'registration' ? t('tournaments.registerNow') : t('tournaments.watchLive')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      {tournaments.some(t => t.status === 'live') && (
        <section className="py-20 px-4 bg-card/20 live-stream-section">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6 neon-text">
                {t('tournaments.liveStreamTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('tournaments.liveStreamSubtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="cyber-card max-w-4xl mx-auto"
            >
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/tSAjT6S6C4g?autoplay=1&mute=1"
                  title="Tournament Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Tournaments;