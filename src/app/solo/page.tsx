'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { GENRES, Genre } from '@/types/game';

export default function SoloPage() {
  const router = useRouter();
  const { state, createRoom, selectGenre, selectMode, startGame } = useGame();
  const [playerName, setPlayerName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Genre | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [setupStep, setSetupStep] = useState<'waiting' | 'ready' | 'starting'>('waiting');

  // Load player name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('brainybunch_name');
    if (savedName) {
      setPlayerName(savedName);
    } else {
      // No name saved, redirect to home
      router.push('/');
    }
  }, [router]);

  // Create room when we have a name and are connected
  useEffect(() => {
    if (playerName && state.isConnected && !state.room && setupStep === 'waiting') {
      createRoom(playerName);
    }
  }, [playerName, state.isConnected, state.room, setupStep, createRoom]);

  // Set solo mode once room is created
  useEffect(() => {
    if (state.room && setupStep === 'waiting') {
      selectMode('solo');
      setSetupStep('ready');
    }
  }, [state.room, setupStep, selectMode]);

  // Redirect to game when it starts
  useEffect(() => {
    if (state.room?.status === 'playing') {
      router.push('/game');
    }
  }, [state.room?.status, router]);

  const handleCategorySelect = async (genre: Genre) => {
    if (!state.room || isStarting) return;

    setSelectedCategory(genre);
    setIsStarting(true);
    setSetupStep('starting');

    // Set the genre and start the game
    selectGenre(genre);

    // Small delay to ensure genre is set before starting
    setTimeout(() => {
      startGame();
    }, 100);
  };

  const handleBack = () => {
    router.push('/');
  };

  // Show loading while connecting/creating room
  if (!state.isConnected || !state.room || setupStep === 'waiting') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🎯</div>
          <h1 className="text-2xl font-bold text-white mb-2">Solo Mode</h1>
          <p className="text-white/50">Setting up your game...</p>
          <div className="mt-4 animate-spin text-2xl">⏳</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-6 pb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎯</div>
        <h1 className="text-3xl font-black text-primary mb-1">Solo Mode</h1>
        <p className="text-white/60">
          Hey <span className="text-primary font-bold">{playerName}</span>! Pick a category to start.
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-4 text-center text-white/80">
          Choose Your Challenge
        </h2>
        <div className="space-y-3 max-w-md mx-auto">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleCategorySelect(genre.id)}
              disabled={isStarting}
              className={`genre-card w-full text-left transition-all ${
                selectedCategory === genre.id ? 'selected' : ''
              } ${isStarting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{genre.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{genre.name}</h3>
                  <p className="text-white/50 text-sm">{genre.description}</p>
                </div>
                {selectedCategory === genre.id && isStarting && (
                  <span className="animate-spin text-xl">⏳</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-6 text-white/40 text-sm text-center"
        disabled={isStarting}
      >
        ← Back to Home
      </button>

      {/* Countdown Overlay */}
      {state.countdown !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center">
            <div
              key={state.countdown}
              className="text-[12rem] font-black text-primary animate-countdown mb-4 drop-shadow-[0_0_30px_rgba(233,69,96,0.5)]"
            >
              {state.countdown}
            </div>
            <p className="text-white/60 text-2xl font-bold">Get Ready!</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className="fixed top-4 left-4 right-4 bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center z-50">
          <p className="text-red-400">{state.error}</p>
        </div>
      )}
    </main>
  );
}
