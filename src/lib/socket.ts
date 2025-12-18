import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://brainy-bunch-api-cebf4a66a4aa.herokuapp.com';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  return s;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
  }
}

// Types for socket events
export interface Player {
  id: string;
  name: string;
  team: 'red' | 'blue';
  isHost: boolean;
  connected: boolean;
  score: number;
}

export interface RoomState {
  code: string;
  hostId: string;
  players: Player[];
  teams: {
    red: Player[];
    blue: Player[];
  };
  genre: string | null;
  mode: 'team' | 'individual';
  status: 'lobby' | 'playing' | 'finished';
  currentRound: number;
  totalRounds: number;
  scores: { red: number; blue: number };
  playerScores: { [playerId: string]: number };
  streaks: { red: number; blue: number };
}

export interface Question {
  id: string;
  question: string;
  allAnswers: string[];
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AnswerResult {
  playerId: string;
  playerName: string;
  team: 'red' | 'blue';
  answer: string;
  timeMs: number;
  correct: boolean;
  points: number;
}

export interface RoundResults {
  correctAnswer: string;
  answers: AnswerResult[];
  scores: { red: number; blue: number };
  playerScores: { [playerId: string]: number };
  streaks: { red: number; blue: number };
  mode: 'team' | 'individual';
}

// Event types
export interface ServerToClientEvents {
  'room-created': (data: { room: RoomState; playerId: string }) => void;
  'room-joined': (data: { room: RoomState; playerId: string }) => void;
  'player-joined': (data: { room: RoomState }) => void;
  'player-left': (data: { room: RoomState }) => void;
  'genre-selected': (data: { room: RoomState }) => void;
  'mode-selected': (data: { room: RoomState }) => void;
  'game-starting': (data: { countdown: number }) => void;
  'game-started': (data: { room: RoomState; question: Question }) => void;
  'answer-received': (data: { correct: boolean; points: number; speedBonus: boolean; streakBonus: boolean }) => void;
  'answer-progress': (data: { answeredCount: number; totalPlayers: number }) => void;
  'round-results': (data: { room: RoomState; results: RoundResults; correctAnswer: string }) => void;
  'next-question': (data: { room: RoomState; question: Question }) => void;
  'game-ended': (data: { room: RoomState }) => void;
  'error': (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  'create-room': (data: { playerName: string }) => void;
  'join-room': (data: { roomCode: string; playerName: string }) => void;
  'select-genre': (data: { roomCode: string; genre: string }) => void;
  'select-mode': (data: { roomCode: string; mode: 'team' | 'individual' }) => void;
  'start-game': (data: { roomCode: string }) => void;
  'submit-answer': (data: { roomCode: string; answer: string; timeMs: number }) => void;
}
