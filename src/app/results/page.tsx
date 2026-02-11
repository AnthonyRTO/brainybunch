'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';

function ResultsContent() {
  const router = useRouter();
  const { state, resetGame, getMyTeam } = useGame();
  const [showConfetti, setShowConfetti] = useState(false);

  const room = state.room;
  const teamScores = room?.scores || { red: 0, blue: 0 };
  const playerScores = room?.playerScores || {};
  // Sort team members by score (highest first) - use playerScores map for accurate scores
  const redTeam = [...(room?.teams.red || [])].sort((a, b) => (playerScores[b.id] || 0) - (playerScores[a.id] || 0));
  const blueTeam = [...(room?.teams.blue || [])].sort((a, b) => (playerScores[b.id] || 0) - (playerScores[a.id] || 0));
  const playerTeam = getMyTeam();
  const isIndividualMode = room?.mode === 'individual';
  const isSoloMode = room?.mode === 'solo';

  // Get player's score for solo mode - use playerScores map
  const myScore = playerScores[state.playerId || ''] || 0;

  // Get sorted players for individual mode - use playerScores map for accurate sorting
  const sortedPlayers = room?.players
    ? [...room.players].sort((a, b) => (playerScores[b.id] || 0) - (playerScores[a.id] || 0))
    : [];

  // Determine winner
  const teamWinner =
    teamScores.red > teamScores.blue
      ? 'red'
      : teamScores.blue > teamScores.red
      ? 'blue'
      : 'tie';

  const individualWinner = sortedPlayers.length > 0 ? sortedPlayers[0] : null;
  const isIndividualWinner = individualWinner?.id === state.playerId;
  const isTeamWinner = playerTeam === teamWinner;

  // Calculate grade for solo mode
  const getGrade = (score: number, totalRounds: number) => {
    const percentage = (score / (totalRounds * 2.5)) * 100; // Max ~2.5 points per question
    if (percentage >= 90) return { grade: 'A+', emoji: '🌟', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', emoji: '🎉', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', emoji: '👏', message: 'Great job!' };
    if (percentage >= 60) return { grade: 'C', emoji: '👍', message: 'Good effort!' };
    if (percentage >= 50) return { grade: 'D', emoji: '💪', message: 'Keep practicing!' };
    return { grade: 'F', emoji: '📚', message: 'Study up!' };
  };
  const soloGrade = getGrade(myScore, room?.totalRounds || 20);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to home if no room
  useEffect(() => {
    if (!room) {
      const timeout = setTimeout(() => {
        if (!state.room) {
          router.push('/');
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [room, state.room, router]);

  const handlePlayAgain = () => {
    resetGame();
    router.push('/');
  };

  if (!room) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-2xl text-white/50 mb-4">Loading results...</div>
        <div className="animate-spin text-4xl">⏳</div>
      </main>
    );
  }

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
        {isSoloMode ? (
          // Solo mode: show grade
          <>
            <div className="text-6xl mb-4">{soloGrade.emoji}</div>
            <h1 className="text-4xl font-black text-primary mb-2">
              Game Complete!
            </h1>
            <p className="text-white/60 text-lg">{soloGrade.message}</p>
          </>
        ) : isIndividualMode ? (
          // Individual mode winner
          <>
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-black text-primary mb-2">
              {individualWinner?.name} Wins!
            </h1>
            {isIndividualWinner ? (
              <p className="text-success text-lg">Congratulations, you won!</p>
            ) : (
              <p className="text-white/60">Great effort! Better luck next time!</p>
            )}
          </>
        ) : teamWinner === 'tie' ? (
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
                teamWinner === 'red' ? 'text-team-red' : 'text-team-blue'
              }`}
            >
              Team {teamWinner === 'red' ? 'Red' : 'Blue'} Wins!
            </h1>
            {isTeamWinner ? (
              <p className="text-success text-lg">Congratulations, you won!</p>
            ) : (
              <p className="text-white/60">Great effort! Better luck next time!</p>
            )}
          </>
        )}
      </div>

      {/* Final Scores */}
      {isSoloMode ? (
        // Solo mode: show personal score card with grade
        <div className="w-full max-w-sm mb-8 relative z-10">
          <div className="card text-center border-primary bg-primary/10">
            <div className="text-6xl font-black mb-2">{soloGrade.grade}</div>
            <div className="text-4xl font-black text-primary mb-4">
              {Math.floor(myScore)} points
            </div>
            <div className="text-white/60">
              out of ~{Math.floor(room.totalRounds * 2.5)} possible
            </div>
          </div>
        </div>
      ) : isIndividualMode ? (
        // Individual mode: show player rankings
        <div className="w-full max-w-sm mb-8 relative z-10 space-y-2">
          {sortedPlayers.map((p, index) => (
            <div
              key={p.id}
              className={`card flex items-center gap-3 ${
                index === 0 ? 'border-yellow-500 bg-yellow-500/10' : ''
              } ${p.id === state.playerId ? 'ring-2 ring-primary' : ''}`}
            >
              <span className="text-2xl">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
              </span>
              <div className="flex-1">
                <div className="font-bold">
                  {p.name}
                  {p.id === state.playerId && ' (You)'}
                </div>
              </div>
              <div className="text-2xl font-black text-primary">
                {Math.floor(playerScores[p.id] || 0)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Team mode: show team scores
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-8 relative z-10">
          <div
            className={`card text-center ${
              teamWinner === 'red' ? 'border-team-red bg-team-red/10 scale-105' : ''
            }`}
          >
            <div className="text-xs text-white/50 uppercase mb-1">Team Red</div>
            <div className="text-4xl font-black text-team-red mb-2">
              {Math.floor(teamScores.red)}
            </div>
            {teamWinner === 'red' && <span className="text-2xl">👑</span>}
            <div className="mt-3 space-y-1.5">
              {redTeam.map((p, index) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between text-sm px-2 py-1 rounded ${
                    p.id === state.playerId ? 'bg-white/10 font-medium' : ''
                  }`}
                >
                  <span className="text-white/80 truncate">
                    {index === 0 && redTeam.length > 1 && '⭐ '}
                    {p.name}
                    {p.id === state.playerId && ' (You)'}
                  </span>
                  <span className="text-team-red font-bold ml-2">
                    {Math.floor(playerScores[p.id] || 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`card text-center ${
              teamWinner === 'blue' ? 'border-team-blue bg-team-blue/10 scale-105' : ''
            }`}
          >
            <div className="text-xs text-white/50 uppercase mb-1">Team Blue</div>
            <div className="text-4xl font-black text-team-blue mb-2">
              {Math.floor(teamScores.blue)}
            </div>
            {teamWinner === 'blue' && <span className="text-2xl">👑</span>}
            <div className="mt-3 space-y-1.5">
              {blueTeam.map((p, index) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between text-sm px-2 py-1 rounded ${
                    p.id === state.playerId ? 'bg-white/10 font-medium' : ''
                  }`}
                >
                  <span className="text-white/80 truncate">
                    {index === 0 && blueTeam.length > 1 && '⭐ '}
                    {p.name}
                    {p.id === state.playerId && ' (You)'}
                  </span>
                  <span className="text-team-blue font-bold ml-2">
                    {Math.floor(playerScores[p.id] || 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="card w-full max-w-sm mb-8 relative z-10">
        <h3 className="font-bold text-center mb-4">Game Stats</h3>
        <div className={`grid ${isSoloMode ? 'grid-cols-2' : 'grid-cols-3'} gap-4 text-center`}>
          <div>
            <div className="text-2xl font-bold text-primary">
              {room.totalRounds}
            </div>
            <div className="text-xs text-white/50">Questions</div>
          </div>
          {!isSoloMode && (
            <div>
              <div className="text-2xl font-bold text-primary">
                {room.players.length}
              </div>
              <div className="text-xs text-white/50">Players</div>
            </div>
          )}
          <div>
            <div className="text-2xl font-bold text-primary">
              {isSoloMode
                ? Math.floor(myScore)
                : isIndividualMode
                ? Math.floor(sortedPlayers.reduce((sum, p) => sum + (playerScores[p.id] || 0), 0))
                : Math.floor(teamScores.red + teamScores.blue)
              }
            </div>
            <div className="text-xs text-white/50">{isSoloMode ? 'Your Score' : 'Total Points'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3 relative z-10">
        <button onClick={handlePlayAgain} className="btn-primary w-full text-lg">
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
