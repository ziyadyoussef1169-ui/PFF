import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Team, teams as initialTeams } from '@/data/teams';

interface TeamsContextType {
  teams: Team[];
  addTeam: (team: Omit<Team, 'id'>) => void;
  updateTeam: (id: number, team: Partial<Team>) => void;
  deleteTeam: (id: number) => void;
  getTeamById: (id: number) => Team | undefined;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const useTeams = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamsProvider');
  }
  return context;
};

interface TeamsProviderProps {
  children: ReactNode;
}

export const TeamsProvider: React.FC<TeamsProviderProps> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);

  const addTeam = (newTeam: Omit<Team, 'id'>) => {
    const newId = Math.max(...teams.map(t => t.id), 0) + 1;
    const newRank = teams.length + 1;
    
    const teamWithId: Team = {
      ...newTeam,
      id: newId,
      rank: newRank
    };

    setTeams(prev => [...prev, teamWithId]);
  };

  const updateTeam = (id: number, updatedTeam: Partial<Team>) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === id ? { ...team, ...updatedTeam } : team
      )
    );
  };

  const deleteTeam = (id: number) => {
    setTeams(prev => {
      const filtered = prev.filter(team => team.id !== id);
      // Recalculate ranks
      return filtered.map((team, index) => ({
        ...team,
        rank: index + 1
      }));
    });
  };

  const getTeamById = (id: number): Team | undefined => {
    return teams.find(team => team.id === id);
  };

  const value: TeamsContextType = {
    teams,
    addTeam,
    updateTeam,
    deleteTeam,
    getTeamById
  };

  return (
    <TeamsContext.Provider value={value}>
      {children}
    </TeamsContext.Provider>
  );
};
