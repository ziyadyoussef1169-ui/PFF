import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Shield, Edit3, LogOut, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { t } = useTranslation();
  const [username, setUsername] = useState(user?.username || '');
  const [email] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState<string | null>(localStorage.getItem('nexus-profile-pic') || null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Simplified gaming data
  const playerStats = {
    level: 47,
    rank: 'Diamond III',
    winRate: 73,
    totalMatches: 156
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">{t('profile.notLoggedIn')}</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      setMessage(t('profile.messages.usernameEmpty'));
      return;
    }
    // Update user in context (this will update navbar immediately)
    updateUser({ username });
    if (profilePic) localStorage.setItem('nexus-profile-pic', profilePic);
    setMessage(t('profile.messages.updated'));
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={profilePic || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(username)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/30 shadow-lg"
                />
                <button
                  onClick={() => document.getElementById('profile-pic')?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-2 border-background shadow-lg hover:bg-primary/80 transition-colors"
                >
                  <Camera className="h-5 w-5 text-primary-foreground" />
                </button>
                <input
                  id="profile-pic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePicChange}
                />
                
                {/* Level Badge */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {playerStats.level}
                </div>
              </div>

              {/* Player Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{username}</h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1">
                    <Shield className="h-4 w-4 mr-1" />
                    {playerStats.rank}
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    <Trophy className="h-4 w-4 mr-1" />
                    {t('profile.labels.level')} {playerStats.level}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{playerStats.winRate}%</div>
                    <div className="text-sm text-muted-foreground">{t('profile.labels.winRate')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{playerStats.totalMatches}</div>
                    <div className="text-sm text-muted-foreground">{t('profile.labels.totalMatches')}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {t('profile.editProfile')}
                </Button>
                <Button
                  onClick={logout}
                  variant="destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('profile.logout')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsEditing(false)}>
            <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">{t('profile.modalTitle')}</h3>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-4">
                    <div>
                      <label className="block mb-2 font-medium">{t('profile.labels.username')}</label>
                      <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">{t('profile.labels.email')}</label>
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full p-3 bg-muted border border-border rounded-lg"
                      />
                    </div>
                    {message && (
                      <div className="text-green-400 text-center">{message}</div>
                    )}
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {t('profile.saveChanges')}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        {t('profile.cancel')}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
