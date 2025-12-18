'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Player, GameSession, Genre, Question } from '@/types/game';
import { getQuestionsForGenre } from '@/data/questions';
import { nanoid } from 'nanoid';

interface GameState {
  player: Player | null;
  session: GameSession | null;
  questionStartTime: number | null;
  selectedAnswer: string | null;
  showResult: boolean;
  countdown: number | null;
}

type GameAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'CREATE_SESSION'; payload: { code: string } }
  | { type: 'JOIN_SESSION'; payload: { code: string; team: 'red' | 'blue' } }
  | { type: 'ADD_PLAYER'; payload: Player }
  | { type: 'SET_GENRE'; payload: Genre }
  | { type: 'START_GAME'; payload: { questions: Question[] } }
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'SELECT_ANSWER'; payload: { answer: string; timeMs: number } }
  | { type: 'SHOW_RESULT' }
  | { type: 'NEXT_ROUND' }
  | { type: 'END_GAME' }
  | { type: 'SET_COUNTDOWN'; payload: number | null }
  | { type: 'RESET' };

const initialState: GameState = {
  player: null,
  session: null,
  questionStartTime: null,
  selectedAnswer: null,
  showResult: false,
  countdown: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload };

    case 'CREATE_SESSION':
      return {
        ...state,
        session: {
          code: action.payload.code,
          organizerId: state.player?.id || '',
          players: state.player ? [state.player] : [],
          genre: null,
          status: 'lobby',
          currentRound: 0,
          totalRounds: 20,
          currentQuestion: null,
          teamScores: { red: 0, blue: 0 },
          roundAnswers: [],
          streaks: { red: 0, blue: 0 },
        },
      };

    case 'JOIN_SESSION':
      if (!state.player || !state.session) return state;
      const updatedPlayer = { ...state.player, team: action.payload.team };
      return {
        ...state,
        player: updatedPlayer,
        session: {
          ...state.session,
          players: [...state.session.players, updatedPlayer],
        },
      };

    case 'ADD_PLAYER':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          players: [...state.session.players, action.payload],
        },
      };

    case 'SET_GENRE':
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, genre: action.payload },
      };

    case 'START_GAME':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          status: 'playing',
          currentRound: 1,
          currentQuestion: action.payload.questions[0],
        },
        questionStartTime: Date.now(),
        selectedAnswer: null,
        showResult: false,
      };

    case 'SET_QUESTION':
      return {
        ...state,
        session: state.session
          ? { ...state.session, currentQuestion: action.payload }
          : null,
        questionStartTime: Date.now(),
        selectedAnswer: null,
        showResult: false,
      };

    case 'SELECT_ANSWER': {
      if (!state.session || !state.player || !state.session.currentQuestion) return state;
      const isCorrect = action.payload.answer === state.session.currentQuestion.correctAnswer;
      const team = state.player.team;

      let newTeamScores = { ...state.session.teamScores };
      let newStreaks = { ...state.session.streaks };

      if (isCorrect && team) {
        // Base point
        let points = 1;

        // Speed bonus (under 3 seconds)
        if (action.payload.timeMs < 3000) {
          points += 0.5;
        }

        // Streak bonus
        newStreaks[team] += 1;
        if (newStreaks[team] >= 3) {
          points += 1;
        }

        newTeamScores[team] += points;

        // Reset other team's streak
        const otherTeam = team === 'red' ? 'blue' : 'red';
        newStreaks[otherTeam] = 0;
      } else if (team) {
        // Wrong answer resets streak
        newStreaks[team] = 0;
      }

      return {
        ...state,
        selectedAnswer: action.payload.answer,
        session: {
          ...state.session,
          teamScores: newTeamScores,
          streaks: newStreaks,
          roundAnswers: [
            ...state.session.roundAnswers,
            {
              playerId: state.player.id,
              answer: action.payload.answer,
              timeMs: action.payload.timeMs,
              correct: isCorrect,
            },
          ],
        },
      };
    }

    case 'SHOW_RESULT':
      return { ...state, showResult: true };

    case 'NEXT_ROUND':
      if (!state.session) return state;
      const nextRound = state.session.currentRound + 1;
      if (nextRound > state.session.totalRounds) {
        return {
          ...state,
          session: { ...state.session, status: 'finished' },
        };
      }
      return {
        ...state,
        session: {
          ...state.session,
          currentRound: nextRound,
          roundAnswers: [],
        },
        selectedAnswer: null,
        showResult: false,
      };

    case 'END_GAME':
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, status: 'finished' },
      };

    case 'SET_COUNTDOWN':
      return { ...state, countdown: action.payload };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  createPlayer: (name: string, isOrganizer: boolean) => void;
  createSession: () => string;
  joinSession: (code: string) => void;
  setGenre: (genre: Genre) => void;
  startGame: () => Promise<void>;
  selectAnswer: (answer: string) => void;
  nextRound: () => void;
  resetGame: () => void;
  addDemoPlayers: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

// In-memory store for demo (simulates server)
const gameSessions: Map<string, { questions: Question[]; currentIndex: number }> = new Map();

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const createPlayer = useCallback((name: string, isOrganizer: boolean) => {
    const player: Player = {
      id: nanoid(),
      name,
      team: isOrganizer ? null : null,
      isOrganizer,
      score: 0,
      correctAnswers: 0,
      fastestAnswer: null,
    };
    dispatch({ type: 'SET_PLAYER', payload: player });
  }, []);

  const createSession = useCallback(() => {
    const code = nanoid(6).toUpperCase();
    dispatch({ type: 'CREATE_SESSION', payload: { code } });
    return code;
  }, []);

  const joinSession = useCallback((code: string) => {
    // Auto-assign to team with fewer players
    const redCount = state.session?.players.filter(p => p.team === 'red').length || 0;
    const blueCount = state.session?.players.filter(p => p.team === 'blue').length || 0;
    const team = redCount <= blueCount ? 'red' : 'blue';
    dispatch({ type: 'JOIN_SESSION', payload: { code, team } });
  }, [state.session?.players]);

  const setGenre = useCallback((genre: Genre) => {
    dispatch({ type: 'SET_GENRE', payload: genre });
  }, []);

  const startGame = useCallback(async () => {
    if (!state.session?.genre) return;

    dispatch({ type: 'SET_COUNTDOWN', payload: 3 });

    // Countdown
    for (let i = 3; i >= 1; i--) {
      dispatch({ type: 'SET_COUNTDOWN', payload: i });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    dispatch({ type: 'SET_COUNTDOWN', payload: null });

    // Get curated questions for the selected genre
    const questions = getQuestionsForGenre(state.session.genre);
    gameSessions.set(state.session.code, { questions, currentIndex: 0 });
    dispatch({ type: 'START_GAME', payload: { questions } });
  }, [state.session?.genre, state.session?.code]);

  const selectAnswer = useCallback((answer: string) => {
    if (!state.questionStartTime || state.selectedAnswer) return;
    const timeMs = Date.now() - state.questionStartTime;
    dispatch({ type: 'SELECT_ANSWER', payload: { answer, timeMs } });

    // Show result after a brief delay
    setTimeout(() => {
      dispatch({ type: 'SHOW_RESULT' });
    }, 500);
  }, [state.questionStartTime, state.selectedAnswer]);

  const nextRound = useCallback(() => {
    if (!state.session) return;

    const sessionData = gameSessions.get(state.session.code);
    if (!sessionData) return;

    const nextIndex = state.session.currentRound;
    if (nextIndex < sessionData.questions.length) {
      dispatch({ type: 'SET_QUESTION', payload: sessionData.questions[nextIndex] });
      dispatch({ type: 'NEXT_ROUND' });
    } else {
      dispatch({ type: 'END_GAME' });
    }
  }, [state.session]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const addDemoPlayers = useCallback(() => {
    const demoNames = ['Mom', 'Dad', 'Grandma', 'Uncle Bob', 'Cousin Sarah'];
    demoNames.forEach((name, i) => {
      const team = i % 2 === 0 ? 'red' : 'blue';
      const player: Player = {
        id: nanoid(),
        name,
        team,
        isOrganizer: false,
        score: 0,
        correctAnswers: 0,
        fastestAnswer: null,
      };
      dispatch({ type: 'ADD_PLAYER', payload: player });
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        createPlayer,
        createSession,
        joinSession,
        setGenre,
        startGame,
        selectAnswer,
        nextRound,
        resetGame,
        addDemoPlayers,
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
