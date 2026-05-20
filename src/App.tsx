import { useState } from 'react';
import { GameMode, GameState, Tahap } from './types';
import { CyberGrid, CyberClouds, MathSymbolsBackground } from './components/BackgroundElements';
import { Menu } from './components/Menu';
import { Arena } from './components/Arena';
import { ResultScreen } from './components/Result';
import { initAudio, toggleMute, getIsMuted } from './lib/audio';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [mode, setMode] = useState<GameMode>(1);
  const [tahap, setTahap] = useState<Tahap>(1);
  const [winner, setWinner] = useState<string>('');
  const [mutedRender, setMutedRender] = useState(false);

  const startGame = (selectedMode: GameMode, selectedTahap: Tahap) => {
    initAudio();
    setMode(selectedMode);
    setTahap(selectedTahap);
    setGameState('playing');
  };

  const showHome = () => {
    setGameState('menu');
  };

  const handleWin = (wName: string) => {
    setWinner(wName);
    setGameState('result');
  };

  const restartGame = () => {
    startGame(mode, tahap);
  };

  const handleMuteToggle = () => {
    const isM = toggleMute();
    setMutedRender(isM);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-1 md:p-4 font-['Fredoka']">
      <CyberGrid />
      <MathSymbolsBackground />
      <CyberClouds />

      <div className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl rounded-xl md:rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.25)] border border-indigo-500/30 p-2 sm:p-3 md:p-6 z-10 flex-1 flex flex-col min-h-[90vh]">
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-center mb-2 md:mb-6 shrink-0">
          {gameState !== 'menu' ? (
            <button 
              onClick={showHome} 
              className="px-2 py-1 md:px-4 md:py-2.5 bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 text-slate-300 font-bold rounded-full shadow-lg transition-all text-[10px] md:text-sm transform hover:scale-105"
            >
              🏠 Menu
            </button>
          ) : <div className="w-[60px] md:w-[100px]"></div> /* Placeholder spacing */}
          
          <div className="text-center flex-1">
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-lg sm:text-2xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 filter drop-shadow-[0_0_10px_rgba(99,102,241,0.4)]">
              MATH CLASH : ROPE WAR
            </h1>
            <p className="text-[8px] sm:text-[10px] md:text-sm text-cyan-400/80 font-bold tracking-widest uppercase">CABARAN DIGITAL MATEMATIK</p>
            <div className="flex justify-center items-center gap-4 mt-2">
              <img src="https://i.postimg.cc/x1yzrs3k/IMG-20220901-WA0001(1).jpg" alt="Logo SK AU Keramat" referrerPolicy="no-referrer" className="h-8 sm:h-10 md:h-14 rounded-lg bg-white p-1 border shadow" />
              <img src="https://i.postimg.cc/bYsF95Q0/IMG-20220901-WA0002(1).jpg" alt="Logo TS25" referrerPolicy="no-referrer" className="h-8 sm:h-10 md:h-14 rounded-lg bg-white p-1 border shadow" />
            </div>
          </div>
          
          <button 
            onClick={handleMuteToggle} 
            className="px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all text-[10px] md:text-sm"
          >
            {mutedRender ? '🔇 Bisu' : '🔊 Bunyi'}
          </button>
        </div>

        {/* Content Container based on Status */}
        {gameState === 'menu' && <Menu onStart={startGame} />}
        {gameState === 'playing' && <Arena mode={mode} tahap={tahap} onWin={handleWin} />}
        {gameState === 'result' && <ResultScreen winner={winner} isSolo={mode === 1} onRestart={restartGame} onHome={showHome} />}

      </div>
      
      {/* Footer Info */}
      <div className="mt-2 text-center text-[10px] text-slate-500 z-10 font-bold tracking-wider uppercase">
        MATH CLASH : ROPE WAR • TAHUN 1 Hingga 6
      </div>
    </div>
  );
}
