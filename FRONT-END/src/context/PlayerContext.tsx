import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Player {
  name: string;
  email: string;
  team: string;
  age: number;
}

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (email: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayerContext must be used within PlayerProvider');
  return context;
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers(prev => [...prev, player]);
  };

  const removePlayer = (email: string) => {
    setPlayers(prev => prev.filter(player => player.email !== email));
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};
