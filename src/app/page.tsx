'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';

export default function Home() {
  const router = useRouter();
  const { createPlayer, createSession } = useGame();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'organizer' | 'participant' | null>(null);
  const [gameCode, setGameCode] = useState('');
  const [step, setStep] = useState<'name' | 'role' | 'code'>('name');
  const [error, setError] = useState('');

  const handleNameSubmit = () => {
    if (name.trim().length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }
    setError('');
    setStep('role');
  };

  const handleRoleSelect = (selectedRole: 'organizer' | 'participant') => {
    setRole(selectedRole);
    if (selectedRole === 'organizer') {
      createPlayer(name.trim(), true);
      const code = createSession();
      router.push(`/lobby?code=${code}`);
    } else {
      setStep('code');
    }
  };

  const handleJoinGame = () => {
    if (gameCode.trim().length !== 6) {
      setError('Please enter a valid 6-character code');
      return;
    }
    createPlayer(name.trim(), false);
    router.push(`/lobby?code=${gameCode.toUpperCase()}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="text-center mb-8 animate-bounce-in">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/logo.jpg"
            alt="Family Ties Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-5xl font-black text-primary mb-2">
          Family Ties
        </h1>
        <p className="text-white/60 text-lg">Trivia Showdown</p>
      </div>

      {/* Step 1: Enter Name */}
      {step === 'name' && (
        <div className="card w-full max-w-sm animate-slide-up">
          <h2 className="text-2xl font-bold text-center mb-6">
            What&apos;s your name?
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            placeholder="Enter your name..."
            className="input-field mb-4"
            autoFocus
            maxLength={20}
          />
          {error && (
            <p className="text-primary text-sm mb-4 text-center">{error}</p>
          )}
          <button
            onClick={handleNameSubmit}
            className="btn-primary w-full text-lg"
            disabled={!name.trim()}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Select Role */}
      {step === 'role' && (
        <div className="w-full max-w-sm animate-slide-up">
          <p className="text-center text-white/60 mb-6">
            Hey <span className="text-primary font-bold">{name}</span>! Are you...
          </p>

          <button
            onClick={() => handleRoleSelect('organizer')}
            className="card w-full mb-4 text-left hover:border-primary/50
                       transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center
                              justify-center text-3xl">
                👑
              </div>
              <div>
                <h3 className="text-xl font-bold">Organizer</h3>
                <p className="text-white/50 text-sm">
                  Create a game & invite others
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect('participant')}
            className="card w-full text-left hover:border-primary/50
                       transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-team-blue/20 flex items-center
                              justify-center text-3xl">
                🎮
              </div>
              <div>
                <h3 className="text-xl font-bold">Participant</h3>
                <p className="text-white/50 text-sm">
                  Join an existing game
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setStep('name')}
            className="mt-6 text-white/40 text-sm w-full text-center"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step 3: Enter Game Code (Participants only) */}
      {step === 'code' && (
        <div className="card w-full max-w-sm animate-slide-up">
          <h2 className="text-2xl font-bold text-center mb-2">
            Enter Game Code
          </h2>
          <p className="text-white/50 text-center text-sm mb-6">
            Ask the organizer for the code
          </p>
          <input
            type="text"
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleJoinGame()}
            placeholder="XXXXXX"
            className="input-field text-center text-2xl tracking-widest mb-4 uppercase"
            autoFocus
            maxLength={6}
          />
          {error && (
            <p className="text-primary text-sm mb-4 text-center">{error}</p>
          )}
          <button
            onClick={handleJoinGame}
            className="btn-primary w-full text-lg"
            disabled={gameCode.length !== 6}
          >
            Join Game
          </button>
          <button
            onClick={() => setStep('role')}
            className="mt-4 text-white/40 text-sm w-full text-center"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Footer */}
      <p className="mt-12 text-white/30 text-sm">
        Made for family fun!
      </p>
    </main>
  );
}
