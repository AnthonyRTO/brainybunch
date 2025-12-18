'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { GENRES, Genre } from '@/types/game';

function LobbyContent() {
  const router = useRouter();
  const { state, selectGenre, selectMode, startGame, isHost, getMyTeam, leaveRoom } = useGame();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedMode, setSelectedMode] = useState<'team' | 'individual' | 'solo'>('team');
  const [isStarting, setIsStarting] = useState(false);

  const room = state.room;
  const amHost = isHost();
  const myTeam = getMyTeam();

  // Redirect to home if no room
  useEffect(() => {
    if (!room && !state.isConnected) {
      // Give some time to connect
      const timeout = setTimeout(() => {
        if (!state.room) {
          router.push('/');
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [room, state.isConnected, state.room, router]);

  // Redirect to game when it starts
  useEffect(() => {
    if (room?.status === 'playing') {
      router.push('/game');
    }
  }, [room?.status, router]);

  // Update selected genre when room genre changes
  useEffect(() => {
    if (room?.genre) {
      setSelectedGenre(room.genre as Genre);
    }
  }, [room?.genre]);

  // Update selected mode when room mode changes
  useEffect(() => {
    if (room?.mode) {
      setSelectedMode(room.mode);
    }
  }, [room?.mode]);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    selectGenre(genre);
  };

  const handleModeSelect = (mode: 'team' | 'individual' | 'solo') => {
    setSelectedMode(mode);
    selectMode(mode);
  };

  const handleStartGame = () => {
    if (!selectedGenre || !room) return;
    setIsStarting(true);
    startGame();
  };

  const handleLeave = () => {
    leaveRoom();
    router.push('/');
  };

  if (!room) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-2xl text-white/50 mb-4">Connecting to game...</div>
        <div className="animate-spin text-4xl">⏳</div>
      </main>
    );
  }

  const redTeam = room.teams.red;
  const blueTeam = room.teams.blue;

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black text-primary mb-1">Brainy Bunch</h1>
        <p className="text-white/40 text-sm">Game Lobby</p>
      </div>

      {/* Game Code Display */}
      <div className="card text-center mb-6 animate-slide-up">
        <p className="text-white/50 text-sm mb-2">Share this code with friends:</p>
        <div className="text-4xl font-black tracking-widest text-primary animate-pulse-glow inline-block px-6 py-2 rounded-xl bg-primary/10">
          {room.code}
        </div>
        <p className="text-white/30 text-xs mt-3">
          {room.players.length}/8 players • Max 4 per team
        </p>
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Red Team */}
        <div className="card border-team-red/30 bg-team-red/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-team-red"></div>
            <h3 className="font-bold text-team-red">Team Red</h3>
            <span className="text-white/30 text-xs ml-auto">{redTeam.length}/4</span>
          </div>
          <div className="space-y-2">
            {redTeam.length === 0 ? (
              <p className="text-white/30 text-sm">Waiting...</p>
            ) : (
              redTeam.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-2 text-sm ${player.id === state.playerId ? 'font-bold' : ''}`}
                >
                  <span className="w-6 h-6 rounded-full bg-team-red/20 flex items-center justify-center text-xs">
                    {player.name[0].toUpperCase()}
                  </span>
                  <span className="text-white/80">
                    {player.name}
                    {player.id === state.playerId && ' (You)'}
                  </span>
                  {player.isHost && (
                    <span className="text-xs">👑</span>
                  )}
                  {!player.connected && (
                    <span className="text-xs text-white/30">disconnected</span>
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
            <span className="text-white/30 text-xs ml-auto">{blueTeam.length}/4</span>
          </div>
          <div className="space-y-2">
            {blueTeam.length === 0 ? (
              <p className="text-white/30 text-sm">Waiting...</p>
            ) : (
              blueTeam.map((player) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-2 text-sm ${player.id === state.playerId ? 'font-bold' : ''}`}
                >
                  <span className="w-6 h-6 rounded-full bg-team-blue/20 flex items-center justify-center text-xs">
                    {player.name[0].toUpperCase()}
                  </span>
                  <span className="text-white/80">
                    {player.name}
                    {player.id === state.playerId && ' (You)'}
                  </span>
                  {player.isHost && (
                    <span className="text-xs">👑</span>
                  )}
                  {!player.connected && (
                    <span className="text-xs text-white/30">disconnected</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mode Selection (Host only) */}
      {amHost && (
        <>
          <h2 className="text-lg font-bold mb-3 text-center">
            Game Mode
          </h2>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => handleModeSelect('solo')}
              className={`card text-center transition-all ${
                selectedMode === 'solo'
                  ? 'border-primary bg-primary/20 scale-105'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-2xl mb-1">🎯</div>
              <h3 className="font-bold text-sm">Solo</h3>
              <p className="text-white/50 text-xs">Just you</p>
            </button>
            <button
              onClick={() => handleModeSelect('individual')}
              className={`card text-center transition-all ${
                selectedMode === 'individual'
                  ? 'border-primary bg-primary/20 scale-105'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-2xl mb-1">🏆</div>
              <h3 className="font-bold text-sm">Individual</h3>
              <p className="text-white/50 text-xs">Free for all</p>
            </button>
            <button
              onClick={() => handleModeSelect('team')}
              className={`card text-center transition-all ${
                selectedMode === 'team'
                  ? 'border-primary bg-primary/20 scale-105'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-2xl mb-1">👥</div>
              <h3 className="font-bold text-sm">Team</h3>
              <p className="text-white/50 text-xs">Red vs Blue</p>
            </button>
          </div>
        </>
      )}

      {/* Genre Selection (Host only) */}
      {amHost && (
        <>
          <h2 className="text-lg font-bold mb-3 text-center">
            Choose a Category
          </h2>
          <div className="space-y-2 mb-6">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`genre-card w-full text-left ${selectedGenre === genre.id ? 'selected' : ''}`}
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
      {!amHost && (
        <div className="card text-center">
          <div className="text-4xl mb-3">⏳</div>
          <h2 className="text-xl font-bold mb-2">
            {room.mode === 'individual' || room.mode === 'solo'
              ? room.mode === 'solo' ? 'Solo Mode' : 'Individual Mode'
              : `You're on Team ${myTeam === 'red' ? 'Red 🔴' : 'Blue 🔵'}`
            }
          </h2>
          <p className="text-white/50 text-sm mb-4">
            Waiting for the host to select a category and start...
          </p>
          <div className="space-y-2">
            {room.mode && (
              <p className="text-white/70 text-sm">
                Mode: <span className="text-primary font-bold">
                  {room.mode === 'team' ? '👥 Team' : room.mode === 'solo' ? '🎯 Solo' : '🏆 Individual'}
                </span>
              </p>
            )}
            {room.genre && (
              <p className="text-white/70 text-sm">
                Category: <span className="text-primary font-bold">{GENRES.find(g => g.id === room.genre)?.name || room.genre}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Leave Button */}
      <button
        onClick={handleLeave}
        className="text-white/40 text-sm underline text-center mt-4"
      >
        Leave Game
      </button>

      {/* Error Display */}
      {state.error && (
        <div className="fixed top-4 left-4 right-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center z-50">
          <p className="text-red-400">{state.error}</p>
        </div>
      )}

      {/* Start Button (Host only) */}
      {amHost && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
          <button
            onClick={handleStartGame}
            disabled={!selectedGenre || isStarting || (selectedMode !== 'solo' && room.players.length < 2)}
            className="btn-primary w-full text-xl py-5 flex items-center justify-center gap-2"
          >
            {isStarting ? (
              <>
                <span className="animate-spin">⏳</span> Starting...
              </>
            ) : selectedMode !== 'solo' && room.players.length < 2 ? (
              <>
                👥 Need at least 2 players
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
          <div className="text-center">
            <div className="text-9xl font-black text-primary animate-countdown mb-4">
              {state.countdown}
            </div>
            <p className="text-white/60 text-xl">Get Ready!</p>
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
