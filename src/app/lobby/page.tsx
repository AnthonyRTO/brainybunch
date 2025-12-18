'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { GENRES, Genre } from '@/types/game';

function LobbyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const { state, setGenre, startGame, addDemoPlayers, joinSession } = useGame();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const isOrganizer = state.player?.isOrganizer ?? false;
  const players = state.session?.players || [];
  const redTeam = players.filter((p) => p.team === 'red');
  const blueTeam = players.filter((p) => p.team === 'blue');

  // Auto-join if participant
  useEffect(() => {
    if (state.player && !state.player.isOrganizer && !state.player.team) {
      joinSession(code);
    }
  }, [state.player, code, joinSession]);

  // Redirect to game when it starts
  useEffect(() => {
    if (state.session?.status === 'playing') {
      router.push(`/game?code=${code}`);
    }
  }, [state.session?.status, code, router]);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    setGenre(genre);
  };

  const handleStartGame = async () => {
    if (!selectedGenre) return;
    setIsStarting(true);
    await startGame();
    router.push(`/game?code=${code}`);
  };

  const handleAddDemoPlayers = () => {
    addDemoPlayers();
  };

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-primary mb-1">Family Ties</h1>
        <p className="text-white/40 text-sm">Game Lobby</p>
      </div>

      {/* Game Code Display */}
      <div className="card text-center mb-6 animate-slide-up">
        <p className="text-white/50 text-sm mb-2">Share this code:</p>
        <div className="text-4xl font-black tracking-widest text-primary animate-pulse-glow inline-block px-6 py-2 rounded-xl bg-primary/10">
          {code}
        </div>
        <p className="text-white/30 text-xs mt-3">
          {players.length} player{players.length !== 1 ? 's' : ''} joined
        </p>
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Red Team */}
        <div className="card border-team-red/30 bg-team-red/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-team-red"></div>
            <h3 className="font-bold text-team-red">Team Red</h3>
          </div>
          <div className="space-y-2">
            {redTeam.length === 0 ? (
              <p className="text-white/30 text-sm">Waiting...</p>
            ) : (
              redTeam.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-team-red/20 flex items-center justify-center text-xs">
                    {player.name[0].toUpperCase()}
                  </span>
                  <span className="text-white/80">{player.name}</span>
                  {player.isOrganizer && (
                    <span className="text-xs">👑</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blue Team */}
        <div className="card border-team-blue/30 bg-team-blue/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-team-blue"></div>
            <h3 className="font-bold text-team-blue">Team Blue</h3>
          </div>
          <div className="space-y-2">
            {blueTeam.length === 0 ? (
              <p className="text-white/30 text-sm">Waiting...</p>
            ) : (
              blueTeam.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-team-blue/20 flex items-center justify-center text-xs">
                    {player.name[0].toUpperCase()}
                  </span>
                  <span className="text-white/80">{player.name}</span>
                  {player.isOrganizer && (
                    <span className="text-xs">👑</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Demo Button (for testing) */}
      {isOrganizer && players.length < 3 && (
        <button
          onClick={handleAddDemoPlayers}
          className="text-white/30 text-xs underline mb-4 text-center"
        >
          + Add demo players (for testing)
        </button>
      )}

      {/* Genre Selection (Organizer only) */}
      {isOrganizer && (
        <>
          <h2 className="text-lg font-bold mb-3 text-center">
            Choose a Category
          </h2>
          <div className="space-y-2 mb-6">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`genre-card w-full text-left ${
                  selectedGenre === genre.id ? 'selected' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{genre.icon}</span>
                  <div>
                    <h3 className="font-bold">{genre.name}</h3>
                    <p className="text-white/50 text-xs">{genre.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Waiting message for participants */}
      {!isOrganizer && (
        <div className="card text-center">
          <div className="text-4xl mb-3">⏳</div>
          <h2 className="text-xl font-bold mb-2">
            You&apos;re on Team {state.player?.team === 'red' ? 'Red 🔴' : 'Blue 🔵'}
          </h2>
          <p className="text-white/50 text-sm">
            Waiting for the organizer to start the game...
          </p>
        </div>
      )}

      {/* Start Button (Organizer only) */}
      {isOrganizer && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
          <button
            onClick={handleStartGame}
            disabled={!selectedGenre || isStarting}
            className="btn-primary w-full text-xl py-5 flex items-center justify-center gap-2"
          >
            {isStarting ? (
              <>
                <span className="animate-spin">⏳</span> Starting...
              </>
            ) : (
              <>
                🎮 Start Game
              </>
            )}
          </button>
        </div>
      )}

      {/* Countdown Overlay */}
      {state.countdown !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="text-9xl font-black text-primary animate-countdown">
            {state.countdown}
          </div>
        </div>
      )}
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-white/50">Loading lobby...</div>
    </div>
  );
}

export default function LobbyPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LobbyContent />
    </Suspense>
  );
}
