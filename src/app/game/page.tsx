'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';

function GameContent() {
  const router = useRouter();
  const { state, submitAnswer, getMyTeam } = useGame();
  const [timeLeft, setTimeLeft] = useState(15);
  const [showStreakBonus, setShowStreakBonus] = useState(false);
  const [showHalftime, setShowHalftime] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRoundRef = useRef<number>(0);

  const room = state.room;
  const currentQuestion = state.currentQuestion;
  const currentRound = room?.currentRound || 0;
  const totalRounds = room?.totalRounds || 20;
  const teamScores = room?.scores || { red: 0, blue: 0 };
  const streaks = room?.streaks || { red: 0, blue: 0 };
  const playerTeam = getMyTeam();
  const roundResults = state.roundResults;

  // Timer countdown
  useEffect(() => {
    if (state.showResult || !currentQuestion) return;

    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto select wrong (server will handle this)
          if (!state.selectedAnswer) {
            submitAnswer('__timeout__');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentRound, state.showResult, state.selectedAnswer, currentQuestion, submitAnswer]);

  // Check for streak bonus when my result comes in
  useEffect(() => {
    if (state.myResult?.streakBonus) {
      setShowStreakBonus(true);
      setTimeout(() => setShowStreakBonus(false), 1500);
    }
  }, [state.myResult]);

  // Show halftime after round 10
  useEffect(() => {
    const halftimeRound = Math.floor(totalRounds / 2);
    if (currentRound > halftimeRound && lastRoundRef.current === halftimeRound && !showHalftime) {
      setShowHalftime(true);
    }
    lastRoundRef.current = currentRound;
  }, [currentRound, totalRounds, showHalftime]);

  // Navigate to results when game ends
  useEffect(() => {
    if (room?.status === 'finished') {
      router.push('/results');
    }
  }, [room?.status, router]);

  // Redirect to home if no room
  useEffect(() => {
    if (!room && !state.isConnected) {
      const timeout = setTimeout(() => {
        if (!state.room) {
          router.push('/');
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [room, state.isConnected, state.room, router]);

  const handleAnswer = (answer: string) => {
    if (state.selectedAnswer) return;
    if (timerRef.current) clearInterval(timerRef.current);
    submitAnswer(answer);
  };

  const handleContinueFromHalftime = () => {
    setShowHalftime(false);
  };

  const redTeam = room?.teams.red || [];
  const blueTeam = room?.teams.blue || [];
  const halftimeLeader = teamScores.red > teamScores.blue ? 'red' : teamScores.blue > teamScores.red ? 'blue' : 'tie';

  const getAnswerClass = (answer: string) => {
    if (!state.showResult) {
      return state.selectedAnswer === answer ? 'selected' : '';
    }
    // Use roundResults to show correct answer
    if (roundResults && answer === roundResults.correctAnswer) {
      return 'correct';
    }
    if (state.selectedAnswer === answer && state.myResult && !state.myResult.correct) {
      return 'incorrect';
    }
    if (state.selectedAnswer === answer && state.myResult?.correct) {
      return 'correct';
    }
    return 'opacity-50';
  };

  const getTimerColor = () => {
    if (timeLeft > 10) return 'text-success';
    if (timeLeft > 5) return 'text-warning';
    return 'text-primary animate-pulse';
  };

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-white/50 mb-4">Connecting to game...</div>
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white/50">Loading question...</div>
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
          <p className="text-white/60">Round {currentRound - 1} of {totalRounds} complete</p>
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

        {/* Continue Button */}
        <button
          onClick={handleContinueFromHalftime}
          className="btn-primary w-full max-w-sm text-lg animate-pulse"
        >
          Continue Playing →
        </button>

        {/* Team indicator */}
        <div className={`fixed bottom-0 left-0 right-0 h-1 ${playerTeam === 'red' ? 'bg-team-red' : 'bg-team-blue'}`} />
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
            {state.showResult ? '✓' : timeLeft}
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
      <div className="progress-bar mb-4">
        <div
          className="progress-bar-fill"
          style={{ width: `${(currentRound / totalRounds) * 100}%` }}
        />
      </div>

      {/* Answer Progress Indicator */}
      {!state.showResult && state.selectedAnswer && (
        <div className="text-center mb-4">
          <p className="text-white/50 text-sm">
            {state.answeredCount}/{room.players.length} players answered
          </p>
        </div>
      )}

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
            disabled={!!state.selectedAnswer}
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

      {/* Waiting for answer confirmation */}
      {state.selectedAnswer && !state.showResult && (
        <div className="mt-6 text-center">
          <div className="animate-spin text-4xl mb-2">⏳</div>
          <p className="text-white/60">Waiting for other players...</p>
          <p className="text-white/40 text-sm mt-1">
            {state.answeredCount}/{room.players.length} answered
          </p>
        </div>
      )}

      {/* Result Feedback */}
      {state.showResult && roundResults && (
        <div className="mt-6 animate-bounce-in">
          {/* My Result */}
          {state.myResult?.correct ? (
            <div className="card bg-success/10 border-success/30 text-center mb-4">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold text-success">Correct!</h3>
              <p className="text-white/50 text-sm">
                +{state.myResult.points.toFixed(1)} points
                {state.myResult.speedBonus && ' (Speed bonus!)'}
                {state.myResult.streakBonus && ' (Streak bonus!)'}
              </p>
            </div>
          ) : state.selectedAnswer === '__timeout__' ? (
            <div className="card bg-warning/10 border-warning/30 text-center mb-4">
              <div className="text-4xl mb-2">⏰</div>
              <h3 className="text-xl font-bold text-warning">Time&apos;s Up!</h3>
              <p className="text-white/50 text-sm">
                The answer was: {roundResults.correctAnswer}
              </p>
            </div>
          ) : (
            <div className="card bg-primary/10 border-primary/30 text-center mb-4">
              <div className="text-4xl mb-2">😅</div>
              <h3 className="text-xl font-bold text-primary">Not quite!</h3>
              <p className="text-white/50 text-sm">
                The answer was: {roundResults.correctAnswer}
              </p>
            </div>
          )}

          {/* Who got it right */}
          <div className="card bg-white/5 mb-4">
            <h4 className="text-sm font-bold text-white/70 mb-3">Results:</h4>
            <div className="grid grid-cols-2 gap-2">
              {roundResults.answers.map((ans) => (
                <div
                  key={ans.playerId}
                  className={`flex items-center gap-2 text-sm ${ans.correct ? 'text-success' : 'text-white/50'}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    ans.team === 'red' ? 'bg-team-red/30' : 'bg-team-blue/30'
                  }`}>
                    {ans.correct ? '✓' : '✗'}
                  </span>
                  <span className="truncate">
                    {ans.playerName}
                    {ans.playerId === state.playerId && ' (You)'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-advancing message */}
          <div className="text-center text-white/50 text-sm">
            Next question coming up...
          </div>
        </div>
      )}

      {/* Streak Bonus Popup */}
      {showStreakBonus && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="text-4xl sm:text-6xl animate-bounce-in text-center">
            🔥 STREAK BONUS! 🔥
          </div>
        </div>
      )}

      {/* Team indicator */}
      <div className={`fixed bottom-0 left-0 right-0 h-1 ${playerTeam === 'red' ? 'bg-team-red' : 'bg-team-blue'}`} />
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
