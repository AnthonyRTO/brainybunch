export interface Player {
  id: string;
  name: string;
  team: 'red' | 'blue' | null;
  isOrganizer: boolean;
  score: number;
  correctAnswers: number;
  fastestAnswer: number | null; // milliseconds
}

export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[]; // shuffled
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameSession {
  code: string;
  organizerId: string;
  players: Player[];
  genre: Genre | null;
  status: 'lobby' | 'playing' | 'finished';
  currentRound: number;
  totalRounds: number;
  currentQuestion: Question | null;
  teamScores: {
    red: number;
    blue: number;
  };
  roundAnswers: {
    odlayerId: string;
    answer: string;
    timeMs: number;
    correct: boolean;
  }[];
  streaks: {
    red: number;
    blue: number;
  };
}

export type Genre =
  | 'pop_culture'
  | 'sports_games'
  | 'history_geography'
  | 'science_nature'
  | 'wild_card';

export interface GenreOption {
  id: Genre;
  name: string;
  icon: string;
  description: string;
  apiCategory: number | null; // Open Trivia DB category ID
}

export const GENRES: GenreOption[] = [
  {
    id: 'pop_culture',
    name: 'Pop Culture',
    icon: '🎬',
    description: 'Movies, Music, TV & Celebrities',
    apiCategory: 11, // Entertainment: Film
  },
  {
    id: 'sports_games',
    name: 'Sports & Games',
    icon: '⚽',
    description: 'All sports, board games & video games',
    apiCategory: 21, // Sports
  },
  {
    id: 'history_geography',
    name: 'History & Geography',
    icon: '🌍',
    description: 'World events, places & landmarks',
    apiCategory: 23, // History
  },
  {
    id: 'science_nature',
    name: 'Science & Nature',
    icon: '🔬',
    description: 'Animals, space & inventions',
    apiCategory: 17, // Science & Nature
  },
  {
    id: 'wild_card',
    name: 'Wild Card',
    icon: '🃏',
    description: 'Mix of everything!',
    apiCategory: null, // Random
  },
];
