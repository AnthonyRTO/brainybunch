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
    nextRound();
  };

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
