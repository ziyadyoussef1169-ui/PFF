import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Team } from '@/data/teams';

interface AddTeamProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTeam: (team: Omit<Team, 'id'>) => void;
}

const AddTeam: React.FC<AddTeamProps> = ({ isOpen, onClose, onAddTeam }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    specialty: '',
    matches: 0,
    wins: 0,
    tournaments: 0,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setFormData(prev => ({
          ...prev,
          logo: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.specialty || !formData.logo) {
      alert('Please fill in all required fields');
      return;
    }

    const winRate = formData.matches > 0 ? Math.round((formData.wins / formData.matches) * 100) : 0;
    
    const newTeam: Omit<Team, 'id'> = {
      ...formData,
      rank: 0, // Will be assigned based on current teams
      winRate
    };

    onAddTeam(newTeam);
    
    // Reset form
    setFormData({
      name: '',
      logo: '',
      specialty: '',
      matches: 0,
      wins: 0,
      tournaments: 0,
    });
    setLogoFile(null);
    setLogoPreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold neon-text">Add New Team</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Team Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Team Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter team name"
                  required
                />
              </div>

              {/* Logo Upload */}
              <div className="space-y-2">
                <Label htmlFor="logo">Team Logo *</Label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="cursor-pointer"
                    />
                  </div>
                  {logoPreview && (
                    <div className="w-12 h-12 border rounded overflow-hidden">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Specialty */}
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Select onValueChange={(value) => handleInputChange('specialty', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MOBA">MOBA</SelectItem>
                    <SelectItem value="FPS">FPS</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Battle Royale">Battle Royale</SelectItem>
                    <SelectItem value="Fighting">Fighting</SelectItem>
                    <SelectItem value="Racing">Racing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="matches">Matches</Label>
                  <Input
                    id="matches"
                    type="number"
                    min="0"
                    value={formData.matches}
                    onChange={(e) => handleInputChange('matches', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wins">Wins</Label>
                  <Input
                    id="wins"
                    type="number"
                    min="0"
                    max={formData.matches}
                    value={formData.wins}
                    onChange={(e) => handleInputChange('wins', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tournaments">Tournaments</Label>
                  <Input
                    id="tournaments"
                    type="number"
                    min="0"
                    value={formData.tournaments}
                    onChange={(e) => handleInputChange('tournaments', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddTeam;
