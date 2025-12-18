'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGame } from '@/context/GameContext';

function GameContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || '';
  const { state, selectAnswer, nextRound } = useGame();
  const [timeLeft, setTimeLeft] = useState(15);
  const [showStreakBonus, setShowStreakBonus] = useState(false);
  const [showHalftime, setShowHalftime] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = state.session?.currentQuestion;
  const currentRound = state.session?.currentRound || 0;
  const totalRounds = state.session?.totalRounds || 20;
  const teamScores = state.session?.teamScores || { red: 0, blue: 0 };
  const streaks = state.session?.streaks || { red: 0, blue: 0 };
  const playerTeam = state.player?.team;

  // Timer countdown
  useEffect(() => {
    if (state.showResult) return;

    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto select wrong
          if (!state.selectedAnswer) {
            selectAnswer('__timeout__');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentRound, state.showResult, state.selectedAnswer, selectAnswer]);

  // Check for streak bonus
  useEffect(() => {
    if (playerTeam && streaks[playerTeam] >= 3 && state.selectedAnswer) {
      setShowStreakBonus(true);
      setTimeout(() => setShowStreakBonus(false), 1500);
    }
  }, [streaks, playerTeam, state.selectedAnswer]);

  // Navigate to results when game ends
  useEffect(() => {
    if (state.session?.status === 'finished') {
      router.push(`/results?code=${code}`);
    }
  }, [state.session?.status, code, router]);

  const handleAnswer = (answer: string) => {
    if (state.selectedAnswer) return;
    if (timerRef.current) clearInterval(timerRef.current);
    selectAnswer(answer);
  };

  const handleNextRound = () => {
    // Show halftime after round 10 (halfway point)
    const halftimeRound = Math.floor(totalRounds / 2);
    if (currentRound === halftimeRound && !showHalftime) {
      setShowHalftime(true);
      return;
    }
    nextRound();
  };

  const handleContinueFromHalftime = () => {
    setShowHalftime(false);
    nextRound();
  };

  const players = state.session?.players || [];
  const redTeam = players.filter((p) => p.team === 'red');
  const blueTeam = players.filter((p) => p.team === 'blue');
  const halftimeLeader = teamScores.red > teamScores.blue ? 'red' : teamScores.blue > teamScores.red ? 'blue' : 'tie';

  const getAnswerClass = (answer: string) => {
    if (!state.showResult) {
      return state.selectedAnswer === answer ? 'selected' : '';
    }
    if (answer === currentQuestion?.correctAnswer) {
      return 'correct';
    }
    if (state.selectedAnswer === answer) {
      return 'incorrect';
    }
    return 'opacity-50';
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-success';
    if (timeLeft > 5) return 'text-warning';
    return 'text-primary animate-pulse';
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white/50">Loading...</div>
      </div>
    );
  }

  // Halftime Leaderboard Screen
  if (showHalftime) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Halftime Badge */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="text-6xl mb-4">⏸️</div>
          <h1 className="text-4xl font-black text-warning mb-2">HALFTIME!</h1>
          <p className="text-white/60">Round {currentRound} of {totalRounds} complete</p>
        </div>

        {/* Leaderboard */}
        <div className="w-full max-w-sm mb-8">
          <h2 className="text-center text-xl font-bold mb-4">Leaderboard</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Red Team */}
            <div className={`card text-center ${halftimeLeader === 'red' ? 'border-team-red bg-team-red/10 scale-105' : ''}`}>
              <div className="text-xs text-white/50 uppercase mb-1">Team Red</div>
              <div className="text-4xl font-black text-team-red mb-2">
                {Math.floor(teamScores.red)}
              </div>
              {halftimeLeader === 'red' && <span className="text-2xl">👑</span>}
              <div className="mt-3 space-y-1">
                {redTeam.map((p) => (
                  <div key={p.id} className="text-sm text-white/60">
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Blue Team */}
            <div className={`card text-center ${halftimeLeader === 'blue' ? 'border-team-blue bg-team-blue/10 scale-105' : ''}`}>
              <div className="text-xs text-white/50 uppercase mb-1">Team Blue</div>
              <div className="text-4xl font-black text-team-blue mb-2">
                {Math.floor(teamScores.blue)}
              </div>
              {halftimeLeader === 'blue' && <span className="text-2xl">👑</span>}
              <div className="mt-3 space-y-1">
                {blueTeam.map((p) => (
                  <div key={p.id} className="text-sm text-white/60">
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tie indicator */}
          {halftimeLeader === 'tie' && (
            <div className="text-center mt-4">
              <span className="text-2xl">🤝</span>
              <p className="text-warning font-bold">It&apos;s all tied up!</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="card w-full max-w-sm mb-8">
          <h3 className="font-bold text-center mb-4">Halftime Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {currentRound}
              </div>
              <div className="text-xs text-white/50">Questions Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {totalRounds - currentRound}
              </div>
              <div className="text-xs text-white/50">Questions Left</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-lg font-bold">
              {Math.abs(teamScores.red - teamScores.blue) < 0.5
                ? "Neck and neck!"
                : `${halftimeLeader === 'red' ? 'Red' : 'Blue'} leads by ${Math.floor(Math.abs(teamScores.red - teamScores.blue))} point${Math.floor(Math.abs(teamScores.red - teamScores.blue)) !== 1 ? 's' : ''}`}
            </div>
          </div>
        </div>

        {/* Streaks */}
        {(streaks.red >= 2 || streaks.blue >= 2) && (
          <div className="card w-full max-w-sm mb-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
            <div className="text-center">
              <span className="text-2xl">🔥</span>
              <p className="text-sm text-white/70 mt-1">
                {streaks.red >= streaks.blue
                  ? `Team Red is on a ${streaks.red}-answer streak!`
                  : `Team Blue is on a ${streaks.blue}-answer streak!`}
              </p>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinueFromHalftime}
          className="btn-primary w-full max-w-sm text-lg animate-pulse"
        >
          Continue to Round {currentRound + 1} →
        </button>

        {/* Team indicator */}
        <div className={`fixed bottom-0 left-0 right-0 h-1 ${
          playerTeam === 'red' ? 'bg-team-red' : 'bg-team-blue'
        }`} />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-4 py-4 pb-6">
      {/* Header with scores */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="score-badge team-red">
            {Math.floor(teamScores.red)}
          </span>
          {streaks.red >= 3 && <span className="text-xs">🔥</span>}
        </div>

        <div className="text-center">
          <div className={`text-3xl font-black ${getTimerColor()}`}>
            {timeLeft}
          </div>
          <div className="text-white/30 text-xs">
            Round {currentRound}/{totalRounds}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streaks.blue >= 3 && <span className="text-xs">🔥</span>}
          <span className="score-badge team-blue">
            {Math.floor(teamScores.blue)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-6">
        <div
          className="progress-bar-fill"
          style={{ width: `${(currentRound / totalRounds) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="card mb-6 animate-slide-up">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium uppercase">
            {currentQuestion.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            currentQuestion.difficulty === 'easy'
              ? 'bg-success/20 text-success'
              : currentQuestion.difficulty === 'medium'
              ? 'bg-warning/20 text-warning'
              : 'bg-primary/20 text-primary'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-bold leading-relaxed">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 flex-1">
        {currentQuestion.allAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            disabled={state.showResult}
            className={`answer-btn ${getAnswerClass(answer)}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{answer}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Result Feedback */}
      {state.showResult && (
        <div className="mt-6 animate-bounce-in">
          {state.selectedAnswer === currentQuestion.correctAnswer ? (
            <div className="card bg-success/10 border-success/30 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-success">Correct!</h3>
              <p className="text-white/50 text-sm">
                +1 point for Team {playerTeam === 'red' ? 'Red' : 'Blue'}
              </p>
            </div>
          ) : state.selectedAnswer === '__timeout__' ? (
            <div className="card bg-warning/10 border-warning/30 text-center">
              <div className="text-4xl mb-2">⏰</div>
              <h3 className="text-xl font-bold text-warning">Time&apos;s Up!</h3>
              <p className="text-white/50 text-sm">
                The answer was: {currentQuestion.correctAnswer}
              </p>
            </div>
          ) : (
            <div className="card bg-primary/10 border-primary/30 text-center">
              <div className="text-4xl mb-2">😅</div>
              <h3 className="text-xl font-bold text-primary">Not quite!</h3>
              <p className="text-white/50 text-sm">
                The answer was: {currentQuestion.correctAnswer}
              </p>
            </div>
          )}

          <button
            onClick={handleNextRound}
            className="btn-primary w-full mt-4 text-lg"
          >
            {currentRound < totalRounds ? 'Next Question →' : 'See Results 🏆'}
          </button>
        </div>
      )}

      {/* Streak Bonus Popup */}
      {showStreakBonus && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-6xl animate-bounce-in">
            🔥 STREAK BONUS! 🔥
          </div>
        </div>
      )}

      {/* Team indicator */}
      <div className={`fixed bottom-0 left-0 right-0 h-1 ${
        playerTeam === 'red' ? 'bg-team-red' : 'bg-team-blue'
      }`} />
    </main>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-white/50">Loading game...</div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GameContent />
    </Suspense>
  );
}
