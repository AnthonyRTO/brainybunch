'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const { state, resetGame } = useGame();
  const [showConfetti, setShowConfetti] = useState(false);

  const teamScores = state.session?.teamScores || { red: 0, blue: 0 };
  const players = state.session?.players || [];
  const redTeam = players.filter((p) => p.team === 'red');
  const blueTeam = players.filter((p) => p.team === 'blue');

  const winner =
    teamScores.red > teamScores.blue
      ? 'red'
      : teamScores.blue > teamScores.red
      ? 'blue'
      : 'tie';

  const playerTeam = state.player?.team;
  const isWinner = playerTeam === winner;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };

  const handleRematch = () => {
    // In a real implementation, this would reset scores but keep players
    router.push(`/lobby?code=${code}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Confetti Effect (CSS-based) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: ['#e94560', '#4361ee', '#fbbf24', '#4ade80'][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Logo */}
      <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl z-10">
        <Image
          src="/brainy-bunch-logo.jpg"
          alt="Brainy Bunch Logo"
          fill
          className="object-cover"
        />
      </div>

      {/* Winner Announcement */}
      <div className="text-center mb-8 animate-bounce-in relative z-10">
        {winner === 'tie' ? (
          <>
            <div className="text-6xl mb-4">🤝</div>
            <h1 className="text-4xl font-black text-warning mb-2">
              It&apos;s a Tie!
            </h1>
            <p className="text-white/60">Both teams are winners!</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">🏆</div>
            <h1
              className={`text-4xl font-black mb-2 ${
                winner === 'red' ? 'text-team-red' : 'text-team-blue'
              }`}
            >
              Team {winner === 'red' ? 'Red' : 'Blue'} Wins!
            </h1>
            {isWinner ? (
              <p className="text-success text-lg">Congratulations, you won!</p>
            ) : (
              <p className="text-white/60">Great effort! Better luck next time!</p>
            )}
          </>
        )}
      </div>

      {/* Final Scores */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8 relative z-10">
        <div
          className={`card text-center ${
            winner === 'red' ? 'border-team-red bg-team-red/10' : ''
          }`}
        >
          <div className="text-xs text-white/50 uppercase mb-1">Team Red</div>
          <div className="text-4xl font-black text-team-red mb-2">
            {Math.floor(teamScores.red)}
          </div>
          {winner === 'red' && <span className="text-2xl">👑</span>}
          <div className="mt-3 space-y-1">
            {redTeam.map((p) => (
              <div key={p.id} className="text-sm text-white/60">
                {p.name}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`card text-center ${
            winner === 'blue' ? 'border-team-blue bg-team-blue/10' : ''
          }`}
        >
          <div className="text-xs text-white/50 uppercase mb-1">Team Blue</div>
          <div className="text-4xl font-black text-team-blue mb-2">
            {Math.floor(teamScores.blue)}
          </div>
          {winner === 'blue' && <span className="text-2xl">👑</span>}
          <div className="mt-3 space-y-1">
            {blueTeam.map((p) => (
              <div key={p.id} className="text-sm text-white/60">
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card w-full max-w-sm mb-8 relative z-10">
        <h3 className="font-bold text-center mb-4">Game Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {state.session?.totalRounds || 20}
            </div>
            <div className="text-xs text-white/50">Questions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {Math.floor(teamScores.red + teamScores.blue)}
            </div>
            <div className="text-xs text-white/50">Total Points</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3 relative z-10">
        <button onClick={handleRematch} className="btn-primary w-full text-lg">
          🔄 Rematch
        </button>
        <button onClick={handlePlayAgain} className="btn-secondary w-full">
          🏠 New Game
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-white/30 text-sm relative z-10">
        Thanks for playing Brainy Bunch!
      </p>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-white/50">Loading results...</div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultsContent />
    </Suspense>
  );
}
