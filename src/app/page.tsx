'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useGame } from '@/context/GameContext';

// Connection indicator component
function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className={`fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex items-center gap-2 px-2 py-1 rounded-full text-xs ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      {isConnected ? 'Connected' : 'Connecting...'}
    </div>
  );
}

// Seasonal theme configuration
type Season = 'holiday' | 'valentine' | 'spring' | 'summer' | 'halloween' | 'fall' | 'default';

function getSeason(): Season {
  const month = new Date().getMonth(); // 0-11
  if (month === 11 || month === 0) return 'holiday'; // Dec-Jan
  if (month === 1) return 'valentine'; // Feb
  if (month >= 2 && month <= 4) return 'spring'; // Mar-May
  if (month >= 5 && month <= 7) return 'summer'; // Jun-Aug
  if (month === 9) return 'halloween'; // Oct
  if (month === 10) return 'fall'; // Nov
  return 'default';
}

const seasonalConfig = {
  holiday: {
    emoji: '🎉',
    greeting: 'Happy Holidays!',
    particles: ['🎆', '🥂', '🎊', '✨', '🍾', '⭐', '🎇', '💫'],
    accentColor: 'text-yellow-400',
    bgGradient: 'from-purple-900/20 via-transparent to-yellow-900/20',
  },
  valentine: {
    emoji: '💕',
    greeting: 'Happy Valentine\'s!',
    particles: ['💕', '❤️', '💖', '💝', '💗', '✨'],
    accentColor: 'text-pink-500',
    bgGradient: 'from-pink-900/20 via-transparent to-red-900/20',
  },
  spring: {
    emoji: '🌸',
    greeting: 'Spring into Fun!',
    particles: ['🌸', '🌷', '🌼', '🦋', '🌺', '✨'],
    accentColor: 'text-pink-400',
    bgGradient: 'from-pink-900/10 via-transparent to-green-900/10',
  },
  summer: {
    emoji: '☀️',
    greeting: 'Summer Vibes!',
    particles: ['☀️', '🌴', '🏖️', '🌊', '⭐', '✨'],
    accentColor: 'text-yellow-500',
    bgGradient: 'from-yellow-900/20 via-transparent to-blue-900/20',
  },
  halloween: {
    emoji: '🎃',
    greeting: 'Spooky Season!',
    particles: ['🎃', '👻', '🦇', '🕷️', '💀', '✨'],
    accentColor: 'text-orange-500',
    bgGradient: 'from-orange-900/20 via-transparent to-purple-900/20',
  },
  fall: {
    emoji: '🍂',
    greeting: 'Fall Family Fun!',
    particles: ['🍂', '🍁', '🌰', '🦃', '🍎', '✨'],
    accentColor: 'text-orange-400',
    bgGradient: 'from-orange-900/20 via-transparent to-amber-900/20',
  },
  default: {
    emoji: '🎉',
    greeting: 'Let\'s Play!',
    particles: ['✨', '⭐', '🎉', '🎊', '💫', '✨'],
    accentColor: 'text-primary',
    bgGradient: 'from-primary/10 via-transparent to-blue-900/10',
  },
};

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://brainy-bunch-api-cebf4a66a4aa.herokuapp.com';

export default function Home() {
  const router = useRouter();
  const { state, createRoom, joinRoom } = useGame();
  const [name, setName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [step, setStep] = useState<'name' | 'role' | 'code'>('name');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [season, setSeason] = useState<Season>('default');
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; left: number; delay: number; duration: number }>>([]);
  const [joiningFromLink, setJoiningFromLink] = useState(false);
  const [hasSavedName, setHasSavedName] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const currentSeason = getSeason();
    setSeason(currentSeason);

    // Generate floating particles
    const config = seasonalConfig[currentSeason];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: config.particles[Math.floor(Math.random() * config.particles.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 7,
    }));
    setParticles(newParticles);

    // Load saved name from localStorage
    const savedName = localStorage.getItem('brainybunch_name');
    if (savedName) {
      setName(savedName);
      setHasSavedName(true);
    }

    // Check for game code in URL (for shareable links)
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    if (codeFromUrl && codeFromUrl.length === 6) {
      setGameCode(codeFromUrl.toUpperCase());
      setJoiningFromLink(true);
      // Stay on name step - user can join with one click after confirming/entering name
    }

  }, []);

  // New Year's countdown timer
  useEffect(() => {
    if (season !== 'holiday') return;

    const calculateCountdown = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      // Target: Jan 1st of next year at midnight
      const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);
      const diff = newYear.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [season]);

  // Navigate to lobby when room is created/joined
  useEffect(() => {
    if (state.room && isJoining) {
      setIsJoining(false);
      router.push('/lobby');
    }
  }, [state.room, isJoining, router]);

  // Show errors from server
  useEffect(() => {
    if (state.error) {
      setError(state.error);
      setIsJoining(false);
    }
  }, [state.error]);

  const config = seasonalConfig[season];

  const handleNameSubmit = () => {
    if (name.trim().length < 2) {
      setError('Please enter at least 2 characters');
      return;
    }
    // Save name to localStorage for future sessions
    localStorage.setItem('brainybunch_name', name.trim());
    setError('');
    // If joining from a link, join directly
    if (joiningFromLink && gameCode.length === 6) {
      if (!state.isConnected) {
        setError('Connecting to server... Please wait.');
        return;
      }
      setIsJoining(true);
      joinRoom(gameCode.toUpperCase(), name.trim());
    } else {
      setStep('role');
    }
  };

  const handleRoleSelect = (selectedRole: 'organizer' | 'participant') => {
    if (selectedRole === 'organizer') {
      if (!state.isConnected) {
        setError('Connecting to server... Please wait.');
        return;
      }
      localStorage.setItem('brainybunch_name', name.trim());
      setIsJoining(true);
      setError('');
      createRoom(name.trim());
    } else {
      setStep('code');
    }
  };

  const handleJoinGame = () => {
    if (gameCode.trim().length !== 6) {
      setError('Please enter a valid 6-character code');
      return;
    }
    if (!state.isConnected) {
      setError('Connecting to server... Please wait.');
      return;
    }
    localStorage.setItem('brainybunch_name', name.trim());
    setIsJoining(true);
    setError('');
    joinRoom(gameCode.toUpperCase(), name.trim());
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-32 sm:pt-36 pb-8 relative overflow-hidden bg-gradient-to-b ${config.bgGradient}`}>
      {/* Connection Status */}
      <ConnectionStatus isConnected={state.isConnected} />

      {/* Retro Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0 retro-grid"></div>
      </div>

      {/* Seasonal Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl animate-float-down"
            style={{
              left: `${particle.left}%`,
              top: '-5%',
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Seasonal Banner - BIGGER & RETRO */}
      <div className="fixed top-0 left-0 right-0 z-20 py-2 sm:py-3 retro-banner">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl animate-bounce">{config.emoji}</span>
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide retro-text-shadow" style={{ color: '#FFD700' }}>
            {config.greeting}
          </span>
          <span className="text-2xl sm:text-3xl animate-bounce">{config.emoji}</span>
        </div>
      </div>

      {/* New Year's Countdown */}
      {season === 'holiday' && (
        <div className="fixed top-11 sm:top-14 left-0 right-0 z-20 countdown-banner py-2 sm:py-3">
          <div className="flex flex-col items-center">
            <p className="text-xs sm:text-sm text-white/70 mb-1">Countdown to 2026</p>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="countdown-item">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <span className="text-yellow-400 text-xl sm:text-2xl font-bold">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <span className="text-yellow-400 text-xl sm:text-2xl font-bold">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Mins</span>
              </div>
              <span className="text-yellow-400 text-xl sm:text-2xl font-bold">:</span>
              <div className="countdown-item">
                <span className="countdown-number">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Secs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fun Facts Ticker - New Year's Edition */}
      {season === 'holiday' && (
        <div className="fixed top-[5.5rem] sm:top-[6.5rem] left-0 right-0 z-20 bg-black/60 py-1.5 sm:py-2 overflow-hidden">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              <span className="ticker-item">🎆 The Times Square ball has dropped every year since 1907! 🗽</span>
              <span className="ticker-item">🥂 Americans consume 360 million glasses of sparkling wine on NYE!</span>
              <span className="ticker-item">🎊 In Spain, people eat 12 grapes at midnight for good luck</span>
              <span className="ticker-item">🍾 The tradition of singing &quot;Auld Lang Syne&quot; started in Scotland</span>
              <span className="ticker-item">🎇 Sydney, Australia hosts one of the world&apos;s first NYE celebrations</span>
              <span className="ticker-item">✨ The original Times Square ball weighed 700 lbs &amp; had 100 light bulbs</span>
              <span className="ticker-item">🎆 In Denmark, people throw plates at friends&apos; doors for good luck!</span>
              <span className="ticker-item">🥂 New Year&apos;s is the oldest celebrated holiday - 4,000 years old!</span>
              <span className="ticker-item">🎊 In Japan, bells ring 108 times to cleanse 108 human sins</span>
              <span className="ticker-item">🍾 The current Times Square ball has 2,688 Waterford crystals!</span>
              <span className="ticker-item">🎆 The Times Square ball has dropped every year since 1907! 🗽</span>
              <span className="ticker-item">🥂 Americans consume 360 million glasses of sparkling wine on NYE!</span>
              <span className="ticker-item">🎊 In Spain, people eat 12 grapes at midnight for good luck</span>
              <span className="ticker-item">🍾 The tradition of singing &quot;Auld Lang Syne&quot; started in Scotland</span>
              <span className="ticker-item">🎇 Sydney, Australia hosts one of the world&apos;s first NYE celebrations</span>
            </div>
          </div>
        </div>
      )}

      {/* Retro Sunburst behind logo */}
      <div className="relative z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="sunburst w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]"></div>
        </div>

        {/* Logo - BIGGER & CENTERED */}
        <div className="text-center mb-4 sm:mb-6 animate-bounce-in relative">
          {/* Brady Bunch style grid frame */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto mb-4 sm:mb-6">
            <div className="absolute inset-0 rounded-3xl retro-frame"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-6 border-yellow-500 logo-glow">
              <Image
                src="/brainy-bunch-logo.jpg"
                alt="Brainy Bunch Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Tagline only - no redundant title */}
          <p className="text-xl sm:text-2xl md:text-3xl font-black retro-subtitle animate-pulse-slow">
            Who&apos;s the smartest in the bunch?
          </p>
        </div>
      </div>

      {/* Step 1: Enter Name */}
      {step === 'name' && (
        <div className="card w-full max-w-sm animate-slide-up relative z-10">
          {joiningFromLink && gameCode && (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 mb-4 text-center">
              <p className="text-sm text-white/60">Joining game</p>
              <p className="text-2xl font-black text-primary tracking-wider">{gameCode}</p>
            </div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">
            {hasSavedName ? 'Welcome back!' : "What's your name?"}
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
            disabled={!name.trim() || isJoining}
          >
            {isJoining ? 'Joining...' : joiningFromLink ? 'Join Game' : 'Continue'}
          </button>
        </div>
      )}

      {/* Step 2: Select Role */}
      {step === 'role' && (
        <div className="w-full max-w-sm animate-slide-up relative z-10">
          <p className="text-center text-white/60 mb-6">
            Hey <span className="text-primary font-bold">{name}</span>! Are you...
          </p>

          {/* Solo Mode Option */}
          <button
            onClick={() => {
              localStorage.setItem('brainybunch_name', name.trim());
              router.push('/solo');
            }}
            className="card w-full mb-4 text-left hover:border-green-500/50 border-green-500/30 bg-green-500/5 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl">
                🎯
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-400">Just for Me</h3>
                <p className="text-white/50 text-sm">
                  Practice solo - test your knowledge!
                </p>
              </div>
            </div>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-white/30 text-sm">or play with others</span>
            </div>
          </div>

          <button
            onClick={() => handleRoleSelect('organizer')}
            className="card w-full mb-4 text-left hover:border-primary/50 transition-all active:scale-98 disabled:opacity-50"
            disabled={isJoining}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
                {isJoining ? '⏳' : '👑'}
              </div>
              <div>
                <h3 className="text-xl font-bold">{isJoining ? 'Creating Game...' : 'Host a Game'}</h3>
                <p className="text-white/50 text-sm">
                  Create a room & invite up to 7 others
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelect('participant')}
            className="card w-full text-left hover:border-primary/50 transition-all active:scale-98 disabled:opacity-50"
            disabled={isJoining}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-team-blue/20 flex items-center justify-center text-3xl">
                🎮
              </div>
              <div>
                <h3 className="text-xl font-bold">Join a Game</h3>
                <p className="text-white/50 text-sm">
                  Enter a code to join
                </p>
              </div>
            </div>
          </button>

          {error && (
            <p className="text-primary text-sm mt-4 text-center">{error}</p>
          )}

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
        <div className="card w-full max-w-sm animate-slide-up relative z-10">
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
            disabled={gameCode.length !== 6 || isJoining}
          >
            {isJoining ? 'Joining...' : 'Join Game'}
          </button>
          <button
            onClick={() => setStep('role')}
            className="mt-4 text-white/40 text-sm w-full text-center"
          >
            ← Back
          </button>
        </div>
      )}

      {/* How to Play Section */}
      <div className="w-full max-w-md mt-6 sm:mt-8 relative z-10 px-1">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 text-yellow-400">How to Play</h2>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black text-xs sm:text-sm shrink-0">1</div>
            <div>
              <h3 className="font-bold text-yellow-400 text-sm sm:text-base">Organizer Creates Game</h3>
              <p className="text-white/60 text-xs sm:text-sm">One person picks &quot;Organizer&quot; to host and gets a code to share.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-black text-xs sm:text-sm shrink-0">2</div>
            <div>
              <h3 className="font-bold text-orange-400 text-sm sm:text-base">Players Join with Code</h3>
              <p className="text-white/60 text-xs sm:text-sm">Everyone else enters the code. Auto-assigned to Red or Blue team!</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-xs sm:text-sm shrink-0">3</div>
            <div>
              <h3 className="font-bold text-red-400 text-sm sm:text-base">Organizer Picks Category</h3>
              <p className="text-white/60 text-xs sm:text-sm">15 categories: 80s Music, Holiday Movies, Sports & more!</p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3 bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-xs sm:text-sm shrink-0">4</div>
            <div>
              <h3 className="font-bold text-green-400 text-sm sm:text-base">Race to Answer!</h3>
              <p className="text-white/60 text-xs sm:text-sm">20 questions, 15 sec each. Fast = bonus. Streaks = more!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 text-center relative z-10">
        <p className="text-white/30 text-xs sm:text-sm mb-2">Made for family fun!</p>
        <div className="flex items-center justify-center gap-3">
          <a href="/terms" className="text-white/40 text-xs hover:text-white/60 underline">
            Terms and Conditions
          </a>
          <span className="text-white/20">|</span>
          <a href="mailto:anthony_r78@me.com" className="text-white/40 text-xs hover:text-white/60 underline">
            Contact Us
          </a>
        </div>
      </div>

      {/* CSS for retro styling and animations */}
      <style jsx>{`
        @keyframes float-down {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-down {
          animation: float-down linear infinite;
        }

        /* Retro Banner - New Year's Gold & Purple */
        .retro-banner {
          background: linear-gradient(90deg, #4B0082, #663399, #9370DB, #663399, #4B0082);
          border-bottom: 4px solid #FFD700;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        /* Retro Text Shadow */
        .retro-text-shadow {
          text-shadow: 3px 3px 0px #4B0082, -1px -1px 0px #FFD700;
        }

        /* Countdown Banner */
        .countdown-banner {
          background: linear-gradient(90deg, rgba(75, 0, 130, 0.9), rgba(102, 51, 153, 0.9), rgba(75, 0, 130, 0.9));
          border-bottom: 2px solid rgba(255, 215, 0, 0.5);
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 45px;
        }

        @media (min-width: 640px) {
          .countdown-item {
            min-width: 60px;
          }
        }

        .countdown-number {
          font-size: 1.5rem;
          font-weight: 900;
          color: #FFD700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5), 2px 2px 0px #4B0082;
          line-height: 1;
        }

        @media (min-width: 640px) {
          .countdown-number {
            font-size: 2rem;
          }
        }

        .countdown-label {
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (min-width: 640px) {
          .countdown-label {
            font-size: 0.7rem;
          }
        }

        /* Sunburst effect - New Year's Gold & Purple */
        .sunburst {
          background: conic-gradient(
            from 0deg,
            #FFD700 0deg,
            #9370DB 15deg,
            #FFD700 30deg,
            #9370DB 45deg,
            #FFD700 60deg,
            #9370DB 75deg,
            #FFD700 90deg,
            #9370DB 105deg,
            #FFD700 120deg,
            #9370DB 135deg,
            #FFD700 150deg,
            #9370DB 165deg,
            #FFD700 180deg,
            #9370DB 195deg,
            #FFD700 210deg,
            #9370DB 225deg,
            #FFD700 240deg,
            #9370DB 255deg,
            #FFD700 270deg,
            #9370DB 285deg,
            #FFD700 300deg,
            #9370DB 315deg,
            #FFD700 330deg,
            #9370DB 345deg,
            #FFD700 360deg
          );
          border-radius: 50%;
          opacity: 0.3;
          animation: spin-slow 30s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Retro frame around logo */
        .retro-frame {
          background: linear-gradient(135deg, #F7931E, #FF6B35, #E85D04);
          transform: rotate(3deg);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        /* Retro title gradient */
        .retro-text-gradient {
          background: linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(3px 3px 0px #8B4513);
        }

        .retro-title {
          letter-spacing: 2px;
        }

        .retro-subtitle {
          color: #FFD700;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3);
          letter-spacing: 1px;
        }

        /* Logo Glow Effect */
        .logo-glow {
          box-shadow:
            0 0 20px rgba(255, 215, 0, 0.4),
            0 0 40px rgba(255, 107, 53, 0.3),
            0 10px 40px rgba(0, 0, 0, 0.5);
        }

        /* Slow pulse animation */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Retro grid background */
        .retro-grid {
          background-image:
            linear-gradient(rgba(255, 107, 53, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Scrolling Ticker */
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .ticker-content {
          display: flex;
          animation: ticker-scroll 60s linear infinite;
          white-space: nowrap;
        }

        .ticker-item {
          padding: 0 1.5rem;
          color: #FFD700;
          font-weight: 600;
          font-size: 0.75rem;
        }

        @media (min-width: 640px) {
          .ticker-item {
            padding: 0 3rem;
            font-size: 0.9rem;
          }
        }

        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
