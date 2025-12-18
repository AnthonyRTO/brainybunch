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
    playerId: string;
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
  | 'eighties_music'
  | 'tv_shows'
  | 'classic_movies'
  | 'holiday_movies'
  | 'mix_it_up';

export interface GenreOption {
  id: Genre;
  name: string;
  icon: string;
  description: string;
  apiCategory: number | null; // Open Trivia DB category ID
  useCustomQuestions: boolean; // Whether to use our curated questions
}

export const GENRES: GenreOption[] = [
  {
    id: 'eighties_music',
    name: "80's Music",
    icon: '🎸',
    description: 'Madonna, Michael Jackson, Prince & more!',
    apiCategory: 12, // Entertainment: Music
    useCustomQuestions: true,
  },
  {
    id: 'tv_shows',
    name: "90's/2000's TV",
    icon: '📺',
    description: 'Friends, Seinfeld, The Office & more!',
    apiCategory: 14, // Entertainment: Television
    useCustomQuestions: true,
  },
  {
    id: 'classic_movies',
    name: 'Classic Movies',
    icon: '🎬',
    description: 'Timeless films from Hollywood\'s golden era',
    apiCategory: 11, // Entertainment: Film
    useCustomQuestions: true,
  },
  {
    id: 'holiday_movies',
    name: 'Holiday Movies',
    icon: '🎄',
    description: 'Christmas classics & holiday favorites!',
    apiCategory: 11, // Entertainment: Film
    useCustomQuestions: true,
  },
  {
    id: 'mix_it_up',
    name: 'Mix It Up!',
    icon: '🎲',
    description: 'A little bit of everything!',
    apiCategory: null,
    useCustomQuestions: true,
  },
];
