import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, MessageCircle, Users, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.labels.email'),
      value: 'info@elitearena.com',
      link: 'mailto:info@elitearena.com'
    },
    {
      icon: Phone,
      label: t('contact.labels.phone'),
      value: '+212 657 377 886',
      link: 'tel:+212 657 377 886'
    },
    {
      icon: MapPin,
      label: t('contact.labels.address'),
      value: '123 Gaming District, Cyber City, CC 12345',
      link: 'https://share.google/BOplcJIcYpQc5ALaI'
    }
  ];

  const departments = [
    {
      icon: Users,
      title: t('teams.title'),
      description: t('teams.subtitle'),
      email: 'teams@elitearena.com'
    },
    {
      icon: Trophy,
      title: t('tournaments.title'),
      description: t('tournaments.subtitle'),
      email: 'tournaments@elitearena.com'
    },
    {
      icon: MessageCircle,
      title: t('contact.getInTouch'),
      description: t('home.description'),
      email: 'info@elitearena.com'
    }
  ];

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
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-card">
              <CardHeader>
                <h2 className="text-3xl font-bold neon-text mb-4">
                  {t('contact.sendUsMessage')}
                </h2>
                <p className="text-muted-foreground">
                  {t('contact.responseTime')}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.firstName')}
                    </label>
                    <Input 
                      placeholder={t('contact.placeholders.firstName')}
                      className="bg-input border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.lastName')}
                    </label>
                    <Input 
                      placeholder={t('contact.placeholders.lastName')}
                      className="bg-input border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input 
                    type="email"
                    placeholder={t('contact.placeholders.email')}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <Input 
                    placeholder={t('contact.placeholders.subject')}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder={t('contact.placeholders.message')}
                    rows={5}
                    className="bg-input border-border focus:border-primary resize-none"
                  />
                </div>

                <Button className="w-full cyber-button">
                  <Send className="mr-2 h-4 w-4" />
                  {t('contact.sendMessage')}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="cyber-card">
                <CardHeader>
                  <h3 className="text-2xl font-bold neon-text">
                    {t('contact.getInTouch')}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/20 transition-colors group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <info.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-primary">
                          {info.label}
                        </div>
                        <div className="text-muted-foreground">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Departments */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="cyber-card">
                <CardHeader>
                  <h3 className="text-2xl font-bold neon-text">
                    {t('contact.departmentsTitle')}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <dept.icon className="h-5 w-5 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-primary mb-1">
                            {dept.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {dept.description}
                          </p>
                          <a 
                            href={`mailto:${dept.email}`}
                            className="text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 neon-text">
              {t('contact.mapTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('contact.mapSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="cyber-card max-w-4xl mx-auto"
          >
            <motion.a
              href="https://share.google/BOplcJIcYpQc5ALaI"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/30/05/c1/l-eglise-du-sacre-coeur.jpg?w=900&h=500&s=1"
                alt="Gaming Arena Location"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <MapPin className="h-16 w-16 mx-auto mb-4 drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{t('contact.mapInteractive')}</h3>
                  <p className="text-white/90 drop-shadow-lg">
                    {t('contact.mapClick')}
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;