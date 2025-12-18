'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode, useEffect, useRef } from 'react';
import { Genre } from '@/types/game';
import { connectSocket, disconnectSocket, getSocket, RoomState, Question as SocketQuestion, RoundResults } from '@/lib/socket';
import type { Socket } from 'socket.io-client';

// Multiplayer Player type (from server)
interface MultiplayerPlayer {
  id: string;
  name: string;
  team: 'red' | 'blue';
  isHost: boolean;
  connected: boolean;
}

interface GameState {
  // Connection state
  isConnected: boolean;
  playerId: string | null;
  playerName: string | null;

  // Room state (from server)
  room: RoomState | null;

  // Game state
  currentQuestion: SocketQuestion | null;
  questionStartTime: number | null;
  selectedAnswer: string | null;
  showResult: boolean;
  myResult: { correct: boolean; points: number; speedBonus: boolean; streakBonus: boolean } | null;
  roundResults: RoundResults | null;
  answeredCount: number;

  // UI state
  countdown: number | null;
  error: string | null;
}

type GameAction =
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_PLAYER_INFO'; payload: { playerId: string; playerName: string } }
  | { type: 'SET_ROOM'; payload: RoomState }
  | { type: 'SET_QUESTION'; payload: SocketQuestion }
  | { type: 'SET_ANSWER'; payload: string }
  | { type: 'SET_MY_RESULT'; payload: { correct: boolean; points: number; speedBonus: boolean; streakBonus: boolean } }
  | { type: 'SET_ROUND_RESULTS'; payload: RoundResults }
  | { type: 'SET_ANSWER_PROGRESS'; payload: number }
  | { type: 'SHOW_RESULT' }
  | { type: 'SET_COUNTDOWN'; payload: number | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

const initialState: GameState = {
  isConnected: false,
  playerId: null,
  playerName: null,
  room: null,
  currentQuestion: null,
  questionStartTime: null,
  selectedAnswer: null,
  showResult: false,
  myResult: null,
  roundResults: null,
  answeredCount: 0,
  countdown: null,
  error: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CONNECTED':
      return { ...state, isConnected: action.payload };

    case 'SET_PLAYER_INFO':
      return { ...state, playerId: action.payload.playerId, playerName: action.payload.playerName };

    case 'SET_ROOM':
      return { ...state, room: action.payload, error: null };

    case 'SET_QUESTION':
      return {
        ...state,
        currentQuestion: action.payload,
        questionStartTime: Date.now(),
        selectedAnswer: null,
        showResult: false,
        myResult: null,
        roundResults: null,
        answeredCount: 0,
      };

    case 'SET_ANSWER':
      return { ...state, selectedAnswer: action.payload };

    case 'SET_MY_RESULT':
      return { ...state, myResult: action.payload };

    case 'SET_ROUND_RESULTS':
      return { ...state, roundResults: action.payload, showResult: true };

    case 'SET_ANSWER_PROGRESS':
      return { ...state, answeredCount: action.payload };

    case 'SHOW_RESULT':
      return { ...state, showResult: true };

    case 'SET_COUNTDOWN':
      return { ...state, countdown: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  // Multiplayer actions
  createRoom: (playerName: string) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  selectGenre: (genre: Genre) => void;
  startGame: () => void;
  submitAnswer: (answer: string) => void;
  leaveRoom: () => void;
  resetGame: () => void;

  // Helpers
  isHost: () => boolean;
  getMyTeam: () => 'red' | 'blue' | null;
  getMyPlayer: () => MultiplayerPlayer | null;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const socketRef = useRef<Socket | null>(null);
  const playerNameRef = useRef<string | null>(null);

  // Setup socket connection and event listeners
  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;

    socket.on('connect', () => {
      dispatch({ type: 'SET_CONNECTED', payload: true });
    });

    socket.on('disconnect', () => {
      dispatch({ type: 'SET_CONNECTED', payload: false });
    });

    socket.on('room-created', ({ room, playerId }) => {
      dispatch({ type: 'SET_PLAYER_INFO', payload: { playerId, playerName: playerNameRef.current || '' } });
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('room-joined', ({ room, playerId }) => {
      dispatch({ type: 'SET_PLAYER_INFO', payload: { playerId, playerName: playerNameRef.current || '' } });
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('player-joined', ({ room }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('player-left', ({ room }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('genre-selected', ({ room }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('game-starting', ({ countdown }) => {
      dispatch({ type: 'SET_COUNTDOWN', payload: countdown });
    });

    socket.on('game-started', ({ room, question }) => {
      dispatch({ type: 'SET_COUNTDOWN', payload: null });
      dispatch({ type: 'SET_ROOM', payload: room });
      dispatch({ type: 'SET_QUESTION', payload: question });
    });

    socket.on('answer-received', (result) => {
      dispatch({ type: 'SET_MY_RESULT', payload: result });
    });

    socket.on('answer-progress', ({ answeredCount }) => {
      dispatch({ type: 'SET_ANSWER_PROGRESS', payload: answeredCount });
    });

    socket.on('round-results', ({ room, results }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
      dispatch({ type: 'SET_ROUND_RESULTS', payload: results });
    });

    socket.on('next-question', ({ room, question }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
      dispatch({ type: 'SET_QUESTION', payload: question });
    });

    socket.on('game-ended', ({ room }) => {
      dispatch({ type: 'SET_ROOM', payload: room });
    });

    socket.on('error', ({ message }) => {
      dispatch({ type: 'SET_ERROR', payload: message });
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const createRoom = useCallback((playerName: string) => {
    playerNameRef.current = playerName;
    const socket = getSocket();
    socket.emit('create-room', { playerName });
  }, []);

  const joinRoom = useCallback((roomCode: string, playerName: string) => {
    playerNameRef.current = playerName;
    const socket = getSocket();
    socket.emit('join-room', { roomCode: roomCode.toUpperCase(), playerName });
  }, []);

  const selectGenre = useCallback((genre: Genre) => {
    if (!state.room) return;
    const socket = getSocket();
    socket.emit('select-genre', { roomCode: state.room.code, genre });
  }, [state.room]);

  const startGame = useCallback(() => {
    if (!state.room) return;
    const socket = getSocket();
    socket.emit('start-game', { roomCode: state.room.code });
  }, [state.room]);

  const submitAnswer = useCallback((answer: string) => {
    if (!state.room || !state.questionStartTime || state.selectedAnswer) return;
    const timeMs = Date.now() - state.questionStartTime;
    dispatch({ type: 'SET_ANSWER', payload: answer });
    const socket = getSocket();
    socket.emit('submit-answer', { roomCode: state.room.code, answer, timeMs });
  }, [state.room, state.questionStartTime, state.selectedAnswer]);

  const leaveRoom = useCallback(() => {
    disconnectSocket();
    dispatch({ type: 'RESET' });
    // Reconnect for next game
    connectSocket();
  }, []);

  const resetGame = useCallback(() => {
    leaveRoom();
  }, [leaveRoom]);

  const isHost = useCallback(() => {
    if (!state.room || !state.playerId) return false;
    return state.room.hostId === state.playerId;
  }, [state.room, state.playerId]);

  const getMyTeam = useCallback((): 'red' | 'blue' | null => {
    if (!state.room || !state.playerId) return null;
    const player = state.room.players.find(p => p.id === state.playerId);
    return player?.team || null;
  }, [state.room, state.playerId]);

  const getMyPlayer = useCallback((): MultiplayerPlayer | null => {
    if (!state.room || !state.playerId) return null;
    return state.room.players.find(p => p.id === state.playerId) || null;
  }, [state.room, state.playerId]);

  return (
    <GameContext.Provider
      value={{
        state,
        createRoom,
        joinRoom,
        selectGenre,
        startGame,
        submitAnswer,
        leaveRoom,
        resetGame,
        isHost,
        getMyTeam,
        getMyPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
