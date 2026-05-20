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
      <CyberClouds />

      <div className="relative w-full max-w-4xl bg-slate-900/90 backdrop-blur-xl rounded-xl md:rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.25)] border border-indigo-500/30 p-2 sm:p-3 md:p-6 z-10 flex-1 flex flex-col min-h-[90vh] overflow-hidden">
        {gameState === 'menu' && <MathSymbolsBackground />}
        
        {/* Header Ribbon */}
        <div className="flex justify-between items-start md:items-center mb-2 md:mb-6 shrink-0 pt-1">
          {gameState !== 'menu' ? (
            <button 
              onClick={showHome} 
              className="px-2 py-1 md:px-4 md:py-2.5 bg-slate-800/80 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 text-slate-300 font-bold rounded-full shadow-lg transition-all text-[10px] md:text-sm transform hover:scale-105 shrink-0"
            >
              🏠 Menu
            </button>
          ) : <div className="w-[60px] md:w-[100px] shrink-0"></div> /* Placeholder spacing */}
          
          <div className="text-center flex-1 min-w-0 px-2 flex flex-col items-center">
            <h1 style={{ fontFamily: "'Black Ops One', system-ui" }} className={`font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] whitespace-nowrap pr-2 pb-2 ${gameState === 'menu' ? 'text-2xl sm:text-4xl md:text-[3.5rem] lg:text-[4.5rem] leading-none' : 'text-lg sm:text-2xl md:text-[2rem] leading-none'}`}>
              MATH CLASH : ROPE WAR
            </h1>
            <p className={`${gameState === 'menu' ? 'text-[9px] sm:text-xs md:text-lg lg:text-xl mt-1 md:mt-2' : 'text-[8px] sm:text-[10px] md:text-sm'} text-cyan-400/90 font-bold tracking-widest uppercase whitespace-nowrap px-1`}>CABARAN DIGITAL MATEMATIK</p>
            {gameState === 'menu' && (
              <div className="flex justify-center items-center gap-4 sm:gap-6 mt-3 md:mt-5">
                <img src="https://i.postimg.cc/x1yzrs3k/IMG-20220901-WA0001(1).jpg" alt="Logo SK AU Keramat" referrerPolicy="no-referrer" className="h-12 sm:h-16 md:h-20 lg:h-24 rounded-lg bg-white p-1 border shadow-lg" />
                <img src="https://i.postimg.cc/bYsF95Q0/IMG-20220901-WA0002(1).jpg" alt="Logo TS25" referrerPolicy="no-referrer" className="h-12 sm:h-16 md:h-20 lg:h-24 rounded-lg bg-white p-1 border shadow-lg" />
              </div>
            )}
          </div>
          
          <div className="w-[60px] md:w-[100px] shrink-0 flex justify-end items-start">
            <button 
              onClick={handleMuteToggle}
              className="mt-6 md:mt-0 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all text-[10px] md:text-sm shrink-0 whitespace-nowrap"
            >
              {mutedRender ? '🔇 Bisu' : '🔊 Bunyi'}
            </button>
          </div>
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
