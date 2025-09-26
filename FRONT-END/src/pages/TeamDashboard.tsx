import React from 'react';
import { useParams } from 'react-router-dom';
import { useTeams } from '@/context/TeamsContext';

const TeamDashboard: React.FC = () => {
  const { id } = useParams();
  const { getTeamById } = useTeams();
  const team = getTeamById(Number(id));
  if (!team) return <div className="min-h-screen flex items-center justify-center">Team not found.</div>;
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto bg-card p-8 rounded shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src={team.logo} 
            alt={`${team.name} logo`}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-3xl font-bold mb-1">{team.name}</h2>
            <div className="text-muted-foreground">Specialty: {team.specialty}</div>
            <div className="text-muted-foreground">Rank: #{team.rank}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted p-4 rounded">
            <div className="text-lg font-bold">Matches</div>
            <div className="text-2xl">{team.matches}</div>
          </div>
          <div className="bg-muted p-4 rounded">
            <div className="text-lg font-bold">Wins</div>
            <div className="text-2xl">{team.wins}</div>
          </div>
          <div className="bg-muted p-4 rounded">
            <div className="text-lg font-bold">Tournaments</div>
            <div className="text-2xl">{team.tournaments}</div>
          </div>
          <div className="bg-muted p-4 rounded">
            <div className="text-lg font-bold">Win Rate</div>
            <div className="text-2xl">{team.winRate}%</div>
          </div>
        </div>
        <div className="text-center text-muted-foreground">More team details and management features can go here.</div>
      </div>
    </div>
  );
};

export default TeamDashboard;
