import React, { useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';
import { useTeams } from '../context/TeamsContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { API_BASE } from '@/lib/config';

interface PlayerInfo {
  name: string;
  email: string;
  team: string;
  age: number;
}

const CompetitionRegistration: React.FC = () => {
  const [player, setPlayer] = useState<PlayerInfo>({
    name: '',
    email: '',
    team: '',
    age: 16,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addPlayer } = usePlayerContext();
  const { teams } = useTeams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPlayer({
      ...player,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Registration failed (${res.status})`);
      }
      // Optional: we could read the created registration back
      await res.json().catch(() => null);
      addPlayer(player);
      setSubmitted(true);
    } catch (err: unknown) {
      console.error('Competition registration error', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <h2 className="text-2xl font-bold mb-2">Competition Registration</h2>
          <p className="text-muted-foreground">Enter your information to join the tournament</p>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center text-green-600 font-semibold py-8">
              Registration successful! Good luck in the tournament.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2 rounded bg-red-500/10 text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={player.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:text-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={player.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:text-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Team</label>
                <select
                  name="team"
                  value={player.team}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:text-blue-400"
                >
                  <option value="" disabled>Select your team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.name}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={player.age}
                  onChange={handleChange}
                  required
                  min={10}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring dark:text-blue-400"
                />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? 'Submitting...' : 'Register'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitionRegistration;
