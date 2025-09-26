export interface Team {
  id: number;
  name: string;
  logo: string;
  specialty: string;
  rank: number;
  matches: number;
  wins: number;
  tournaments: number;
  winRate: number;
}

export const teams: Team[] = [
  {
    id: 1,
    name: 'CYBER DRAGON',
    logo: '/team-logos/DRAGON.png',
    specialty: 'MOBA',
    rank: 1,
    matches: 156,
    wins: 142,
    tournaments: 23,
    winRate: 91
  },
  {
    id: 2,
    name: 'NEON PEGASUS',
    logo: '/team-logos/PEGASUS.png',
    specialty: 'FPS',
    rank: 2,
    matches: 134,
    wins: 118,
    tournaments: 19,
    winRate: 88
  },
  {
    id: 3,
    name: 'STORM RAPTORS',
    logo: '/team-logos/RAPTORS.png',
    specialty: 'Strategy',
    rank: 3,
    matches: 123,
    wins: 101,
    tournaments: 17,
    winRate: 82
  },
  {
    id: 4,
    name: 'PHOENIX HYDRA',
    logo: '/team-logos/HYDRA.png',
    specialty: 'Battle Royale',
    rank: 4,
    matches: 98,
    wins: 76,
    tournaments: 12,
    winRate: 78
  },
  {
    id: 5,
    name: 'MAGMA DESTROY',
    logo: '/team-logos/DESTROY.png',
    specialty: 'MOBA',
    rank: 5,
    matches: 87,
    wins: 65,
    tournaments: 10,
    winRate: 75
  },
  {
    id: 6,
    name: 'RED BULL',
    logo: '/team-logos/REDBULL.png',
    specialty: 'FPS',
    rank: 6,
    matches: 76,
    wins: 54,
    tournaments: 8,
    winRate: 71
  }
];
