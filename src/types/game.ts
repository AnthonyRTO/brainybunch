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
  | 'nineties_music'
  | 'two_thousands_music'
  | 'tv_shows'
  | 'classic_movies'
  | 'holiday_movies'
  | 'disney_movies'
  | 'sports_legends'
  | 'food_drinks'
  | 'cartoons'
  | 'video_games'
  | 'world_geography'
  | 'family_sitcoms'
  | 'reality_tv'
  | 'teen_slang'
  | 'greek_mythology'
  | 'cyprus_knowledge'
  | 'mix_it_up';

export interface GenreOption {
  id: Genre;
  name: string;
  icon: string;
  description: string;
  apiCategory: number | null;
  useCustomQuestions: boolean;
}

export const GENRES: GenreOption[] = [
  {
    id: 'eighties_music',
    name: "80's Music",
    icon: '🎸',
    description: 'Madonna, Michael Jackson, Prince & more!',
    apiCategory: 12,
    useCustomQuestions: true,
  },
  {
    id: 'nineties_music',
    name: "90's Music",
    icon: '💿',
    description: 'Nirvana, Backstreet Boys, Spice Girls!',
    apiCategory: 12,
    useCustomQuestions: true,
  },
  {
    id: 'two_thousands_music',
    name: "2000's Music",
    icon: '📀',
    description: 'Beyoncé, Eminem, Britney & more!',
    apiCategory: 12,
    useCustomQuestions: true,
  },
  {
    id: 'tv_shows',
    name: "90's/2000's TV",
    icon: '📺',
    description: 'Friends, Seinfeld, The Office & more!',
    apiCategory: 14,
    useCustomQuestions: true,
  },
  {
    id: 'family_sitcoms',
    name: 'Family Sitcoms',
    icon: '🛋️',
    description: 'Full House, Fresh Prince, Married with Children!',
    apiCategory: 14,
    useCustomQuestions: true,
  },
  {
    id: 'reality_tv',
    name: 'Reality TV',
    icon: '🌹',
    description: 'Survivor, American Idol, The Bachelor!',
    apiCategory: 14,
    useCustomQuestions: true,
  },
  {
    id: 'classic_movies',
    name: 'Classic Movies',
    icon: '🎬',
    description: "Timeless films from Hollywood's golden era",
    apiCategory: 11,
    useCustomQuestions: true,
  },
  {
    id: 'holiday_movies',
    name: 'Holiday Movies',
    icon: '🎄',
    description: 'Christmas classics & holiday favorites!',
    apiCategory: 11,
    useCustomQuestions: true,
  },
  {
    id: 'disney_movies',
    name: 'Disney Movies',
    icon: '🏰',
    description: 'Animated classics & Pixar favorites!',
    apiCategory: 11,
    useCustomQuestions: true,
  },
  {
    id: 'cartoons',
    name: "80's/90's Cartoons",
    icon: '📺',
    description: 'Transformers, Ninja Turtles, Rugrats!',
    apiCategory: 14,
    useCustomQuestions: true,
  },
  {
    id: 'sports_legends',
    name: 'Sports Legends',
    icon: '🏆',
    description: 'Famous athletes, Super Bowl, Olympics!',
    apiCategory: 21,
    useCustomQuestions: true,
  },
  {
    id: 'video_games',
    name: 'Video Games',
    icon: '🎮',
    description: 'Classic & modern gaming trivia!',
    apiCategory: 15,
    useCustomQuestions: true,
  },
  {
    id: 'food_drinks',
    name: 'Food & Drinks',
    icon: '🍕',
    description: 'Cooking, restaurants & famous dishes!',
    apiCategory: null,
    useCustomQuestions: true,
  },
  {
    id: 'world_geography',
    name: 'World Geography',
    icon: '🌍',
    description: 'Countries, capitals & landmarks!',
    apiCategory: 22,
    useCustomQuestions: true,
  },
  {
    id: 'teen_slang',
    name: 'Teen Slang',
    icon: '🤙',
    description: 'What does your teen even mean?!',
    apiCategory: null,
    useCustomQuestions: true,
  },
  {
    id: 'greek_mythology',
    name: 'Greek Mythology',
    icon: '⚡',
    description: 'Gods, heroes, and ancient legends!',
    apiCategory: null,
    useCustomQuestions: true,
  },
  {
    id: 'cyprus_knowledge',
    name: 'Cyprus Knowledge',
    icon: '🇨🇾',
    description: 'The beautiful island of Aphrodite!',
    apiCategory: null,
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
