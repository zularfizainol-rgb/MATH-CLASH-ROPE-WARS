import { useState, useEffect, useCallback } from 'react';
import { GameMode, QuestionData, Tahap } from '../types';
import { generateQuestion, classNames } from '../lib/utils';
import { playSound } from '../lib/audio';
import { Numpad } from './Numpad';

interface ArenaProps {
  mode: GameMode;
  tahap: Tahap;
  onWin: (winner: string) => void;
}

export function Arena({ mode, tahap, onWin }: ArenaProps) {
  const [ropeOffset, setRopeOffset] = useState(0);
  const [winThreshold, setWinThreshold] = useState(() => window.innerWidth < 768 ? 120 : 180);
  
  const [question, setQuestion] = useState<QuestionData>(() => generateQuestion(tahap));
  const [p1Input, setP1Input] = useState('');
  const [p2Input, setP2Input] = useState('');
  const [timer, setTimer] = useState(15);
  
  const [statusMsg, setStatusMsg] = useState("💬 Bersedia untuk menarik!");

  useEffect(() => {
     const handleResize = () => {
         setWinThreshold(window.innerWidth < 768 ? 120 : 180);
     };
     window.addEventListener('resize', handleResize);
     return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
      if (ropeOffset <= -winThreshold) {
          playSound('victory');
          onWin("Pasukan Biru");
      } else if (ropeOffset >= winThreshold) {
          playSound('victory');
          onWin(mode === 1 ? "Komputer" : "Pasukan Merah");
      }
  }, [ropeOffset, mode, onWin, winThreshold]);

  // Timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
           setRopeOffset(r => {
             const newOff = Math.min(winThreshold, r + (mode === 1 ? 25 : 0)); // No penalty in PvP for timeout
             return newOff;
           });
           playSound('wrong');
           setQuestion(generateQuestion(tahap));
           setP1Input('');
           setP2Input('');
           return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, tahap, winThreshold]);

  const handlePlayerSubmit = (player: 1 | 2) => {
      if (player === 1) {
          const val = parseInt(p1Input);
          if (isNaN(val)) return;
          if (val === question.answer) {
              setRopeOffset(r => {
                  return Math.max(-winThreshold, r - 22);
              });
              playSound('correct');
              playSound('pull');
              if (mode === 1) setStatusMsg("🎉 JAWAPAN BETUL! Tarikan yang padu!");
          } else {
              setRopeOffset(r => {
                  return Math.min(winThreshold, r + (mode === 1 ? 18 : 0));
              });
              playSound('wrong');
              if (mode === 1) setStatusMsg(`❌ SALAH! Jawapan betul ialah ${question.answer}.`);
          }
      } else {
          const val = parseInt(p2Input);
          if (isNaN(val)) return;
          if (val === question.answer) {
              setRopeOffset(r => {
                  return Math.min(winThreshold, r + 22);
              });
              playSound('correct');
              playSound('pull');
          } else {
              setRopeOffset(r => {
                  return Math.max(-winThreshold, r - 0);
              });
              playSound('wrong');
          }
      }
      setQuestion(generateQuestion(tahap));
      setP1Input('');
      setP2Input('');
      setTimer(15);
  };

  // Allow keyboard input mapped to P1 for solo mode
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (mode === 1) {
             if (e.key >= '0' && e.key <= '9') {
                 setP1Input(prev => prev + e.key);
             } else if (e.key === 'Backspace') {
                 setP1Input(prev => prev.slice(0, -1));
             } else if (e.key === 'Enter') {
                 handlePlayerSubmit(1);
             }
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, p1Input, question.answer]);

  const renderGameField = (extraClasses: string = "") => (
      <div className={classNames("relative w-full bg-[#0b0f19] rounded-2xl p-2 border border-slate-700/80 shadow-inner overflow-hidden h-24 sm:h-28 md:h-52 flex flex-col justify-end shrink-0", extraClasses)}>
          <div className="absolute top-2 left-4 text-[9px] md:text-xs text-cyan-400 font-bold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30 shadow-md uppercase tracking-wider hidden sm:block">
              ⚡ Medan Pertarungan Laser
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.2)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none opacity-40"></div>
          
          <div className="absolute bottom-0 left-1/2 w-0.5 h-10 sm:h-14 md:h-20 bg-rose-500 -translate-x-1/2 z-20 shadow-[0_0_10px_#f43f5e] border-t border-white"></div>
          <div className="absolute left-1/2 bottom-8 sm:bottom-10 md:bottom-16 -translate-x-1/2 z-20 pointer-events-none">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 glow-red" viewBox="0 0 24 24">
                  <path d="M12,2 L12,22 M12,2 L19,6 L12,10" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" fill="#f43f5e" />
              </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-8 bg-slate-950 border-t-2 border-indigo-500/50 z-0"></div>

          <div className="absolute bottom-1 left-1/2 w-[900px] h-20 sm:h-24 md:h-32 -translate-x-1/2 scale-[0.4] min-[375px]:scale-[0.45] sm:scale-[0.65] md:scale-100 origin-bottom z-10 flex items-center justify-center">
            <div 
               className="relative w-full h-full transition-transform duration-300 ease-out flex items-center justify-center" 
               style={{ transform: `translateX(${ropeOffset}px)` }}
            >
                {/* Force Rope Style */}
                <div className="absolute w-full h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-rose-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] z-0"></div>
                
                {/* Penanda Tali (Rope Marker) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 md:w-5 h-8 sm:h-10 md:h-12 bg-yellow-400 border-2 border-red-600 rounded drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] z-10"></div>
                
                {/* Team Left */}
                <div id="team-left">
                  <div className="w-16 h-28 relative">
                      <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                          <circle cx="50" cy="35" r="18" fill="#ffd1b3" />
                          <path d="M35,20 Q50,5 65,20" stroke="#00d2ff" strokeWidth="6" fill="none" className="glow-blue" />
                          <rect x="35" y="53" width="30" height="42" rx="10" fill="#2563eb" />
                          <path d="M40,95 L30,140 M60,95 L70,140" stroke="#1d4ed8" strokeWidth="10" strokeLinecap="round" />
                          <path d="M50,70 L95,85" stroke="#ffd1b3" strokeWidth="8" strokeLinecap="round" />
                          <circle cx="55" cy="32" r="3" fill="#000" />
                          <path d="M50,42 Q55,46 60,42" stroke="#000" strokeWidth="2.5" fill="none" />
                      </svg>
                  </div>
                  <div className="w-16 h-28 relative border-r-2 border-dashed border-cyan-400/50">
                      <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                          <circle cx="50" cy="35" r="18" fill="#ffebd4" />
                          <path d="M25,25 Q50,15 75,25" stroke="#78350f" strokeWidth="8" fill="none" />
                          <rect x="35" y="53" width="30" height="42" rx="10" fill="#3b82f6" />
                          <path d="M40,95 L30,140 M60,95 L70,140" stroke="#1d4ed8" strokeWidth="10" strokeLinecap="round" />
                          <path d="M50,70 L95,85" stroke="#ffebd4" strokeWidth="8" strokeLinecap="round" />
                          <circle cx="55" cy="32" r="3" fill="#000" />
                          <path d="M50,42 Q55,46 60,42" stroke="#000" strokeWidth="2.5" fill="none" />
                      </svg>
                  </div>
              </div>

              {/* Team Right */}
              <div id="team-right" className="transform scale-x-[-1]">
                  <div className="w-16 h-28 relative">
                      <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                          <circle cx="50" cy="35" r="18" fill="#ffd1b3" />
                          <path d="M30,18 Q50,8 70,18" stroke="#ff0055" strokeWidth="6" fill="none" className="glow-red" />
                          <rect x="35" y="53" width="30" height="42" rx="10" fill="#ef4444" />
                          <path d="M40,95 L30,140 M60,95 L70,140" stroke="#991b1b" strokeWidth="10" strokeLinecap="round" />
                          <path d="M50,70 L95,85" stroke="#ffd1b3" strokeWidth="8" strokeLinecap="round" />
                          <circle cx="55" cy="32" r="3" fill="#000" />
                          <path d="M50,42 Q55,46 60,42" stroke="#000" strokeWidth="2.5" fill="none" />
                      </svg>
                  </div>
                  <div className="w-16 h-28 relative border-r-2 border-dashed border-rose-500/50">
                      <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">
                          <circle cx="50" cy="35" r="18" fill="#ffebd4" />
                          <path d="M25,25 Q50,15 75,25" stroke="#451a03" strokeWidth="8" fill="none" />
                          <rect x="35" y="53" width="30" height="42" rx="10" fill="#dc2626" />
                          <path d="M40,95 L30,140 M60,95 L70,140" stroke="#991b1b" strokeWidth="10" strokeLinecap="round" />
                          <path d="M50,70 L95,85" stroke="#ffebd4" strokeWidth="8" strokeLinecap="round" />
                          <circle cx="55" cy="32" r="3" fill="#000" />
                          <path d="M50,42 Q55,46 60,42" stroke="#000" strokeWidth="2.5" fill="none" />
                      </svg>
                  </div>
              </div>
            </div>
          </div>
      </div>
  );

  const renderPlayer1 = () => (
      <div className="bg-slate-800/80 border border-cyan-500/20 rounded-xl p-2 md:p-3 shadow-xl flex flex-col justify-between h-full min-h-0 w-full">
          <div className="flex justify-between items-center mb-1 shrink-0">
              <span className="text-cyan-400 font-bold text-[10px] sm:text-xs md:text-sm">🔵 PEMAIN 1 (Kiri)</span>
              <div className="px-1.5 py-0.5 bg-rose-600 text-white font-bold rounded-full text-[9px] sm:text-[10px]">
                  ⏱️ <span>{timer}s</span>
              </div>
          </div>
          <div className="w-full bg-slate-950 h-1 sm:h-1.5 rounded-full overflow-hidden mb-1 border border-slate-850 shrink-0">
              <div className={classNames("h-full w-full transition-all duration-1000 ease-linear", timer <= 5 ? "bg-rose-600" : "bg-cyan-500")} style={{ width: `${(timer / 15) * 100}%` }}></div>
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center text-white py-1 mb-1 bg-slate-950 rounded-lg border border-slate-900 leading-none flex items-center justify-center shrink-0 min-h-[36px]">
              {question.questionText}
          </div>
          <div className="flex gap-1.5 mb-1 shrink-0">
              <input type="number" value={p1Input} placeholder="?" className="flex-1 text-center font-bold text-sm sm:text-lg lg:text-xl p-1 bg-slate-950 text-white border border-slate-800 rounded-lg focus:border-cyan-500 outline-none leading-none min-w-0" inputMode="none" readOnly />
              <button onClick={() => handlePlayerSubmit(1)} className="px-2 sm:px-3 lg:px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm rounded-lg border-b-2 border-blue-900 transition-all shrink-0">TARIK!</button>
          </div>
          <div className="shrink-0 overflow-y-auto min-h-[50px] flex items-center justify-center">
              <Numpad 
                  variant="pvp" 
                  onInput={(d) => setP1Input(prev => prev + d)} 
                  onDelete={() => setP1Input(prev => prev.slice(0, -1))} 
                  onClear={() => setP1Input('')} 
              />
          </div>
      </div>
  );

  const renderPlayer2 = () => (
      <div className="bg-slate-800/80 border border-fuchsia-500/20 rounded-xl p-2 md:p-3 shadow-xl flex flex-col justify-between h-full min-h-0 w-full transform rotate-180 sm:rotate-0">
          <div className="flex justify-between items-center mb-1 shrink-0">
              <span className="text-fuchsia-400 font-bold text-[10px] sm:text-xs md:text-sm">🔴 PEMAIN 2 (Kanan)</span>
              <div className="px-1.5 py-0.5 bg-rose-600 text-white font-bold rounded-full text-[9px] sm:text-[10px]">
                  ⏱️ <span>{timer}s</span>
              </div>
          </div>
          <div className="w-full bg-slate-950 h-1 sm:h-1.5 rounded-full overflow-hidden mb-1 border border-slate-850 shrink-0">
              <div className={classNames("h-full w-full transition-all duration-1000 ease-linear", timer <= 5 ? "bg-rose-600" : "bg-fuchsia-500")} style={{ width: `${(timer / 15) * 100}%` }}></div>
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-center text-white py-1 mb-1 bg-slate-950 rounded-lg border border-slate-900 leading-none flex items-center justify-center shrink-0 min-h-[36px]">
              {question.questionText}
          </div>
          <div className="flex gap-1.5 mb-1 shrink-0">
              <input type="number" value={p2Input} placeholder="?" className="flex-1 text-center font-bold text-sm sm:text-lg lg:text-xl p-1 bg-slate-950 text-white border border-slate-800 rounded-lg focus:border-fuchsia-500 outline-none leading-none min-w-0" inputMode="none" readOnly />
              <button onClick={() => handlePlayerSubmit(2)} className="px-2 sm:px-3 lg:px-4 bg-gradient-to-r from-fuchsia-500 to-rose-600 text-white font-bold text-xs sm:text-sm rounded-lg border-b-2 border-rose-900 transition-all shrink-0">TARIK!</button>
          </div>
          <div className="shrink-0 overflow-y-auto min-h-[50px] flex items-center justify-center">
              <Numpad 
                  variant="pvp" 
                  onInput={(d) => setP2Input(prev => prev + d)} 
                  onDelete={() => setP2Input(prev => prev.slice(0, -1))} 
                  onClear={() => setP2Input('')} 
              />
          </div>
      </div>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden w-full max-w-4xl max-h-full">
      {mode === 1 ? (
        // Solo Layout
        <div className="flex flex-col flex-1 min-h-0 w-full mb-1">
            {renderGameField("mb-2 sm:mb-4 shrink-0")}
            <div className="flex-col items-center justify-center flex-1 overflow-y-auto w-full flex min-h-0">
                <div className="w-full max-w-md bg-slate-800/80 border border-cyan-500/30 rounded-2xl p-2 sm:p-4 shadow-2xl flex flex-col justify-between h-full min-h-0">
                    <div className="flex justify-between items-center mb-1 sm:mb-2 shrink-0">
                        <span className="text-cyan-400 font-bold text-xs sm:text-sm tracking-wider">SOALAN ANDA:</span>
                        <div className="px-2 py-0.5 sm:px-3 sm:py-1 bg-rose-600 text-white font-bold rounded-full text-[10px] sm:text-xs flex items-center gap-1">
                            ⏱️ <span>{timer}s</span>
                        </div>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 sm:h-2 rounded-full overflow-hidden mb-2 sm:mb-3 border border-slate-800 shrink-0">
                        <div 
                            className={classNames("h-full w-full transition-all duration-1000 ease-linear", timer <= 5 ? "bg-rose-600" : "bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500")}
                            style={{ width: `${(timer / 15) * 100}%` }}
                        ></div>
                    </div>

                    <div style={{ fontFamily: "'Rajdhani', sans-serif" }} className="text-3xl sm:text-4xl md:text-5xl font-black text-center text-white py-1 sm:py-3 mb-2 sm:mb-3 bg-slate-950/80 rounded-xl border border-indigo-500/20 shadow-inner shrink-0 flex items-center justify-center min-h-[50px]">
                        {question.questionText}
                    </div>

                    <div className="flex gap-2 mb-2 sm:mb-3 shrink-0">
                        <input type="number" value={p1Input} placeholder="Jawapan?" className="flex-1 text-center font-bold text-xl sm:text-2xl p-1 sm:p-2 bg-slate-950 text-white border border-slate-700 rounded-xl focus:border-cyan-500 outline-none min-w-0" inputMode="none" readOnly />
                        <button onClick={() => handlePlayerSubmit(1)} className="px-4 sm:px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base sm:text-lg rounded-xl border-b-4 border-teal-800 transition-all shrink-0">
                            TARIK!
                        </button>
                    </div>

                    <div className="overflow-y-auto shrink min-h-0 items-center justify-center flex flex-col">
                        <Numpad 
                            variant="solo" 
                            onInput={(d) => setP1Input(prev => prev + d)} 
                            onDelete={() => setP1Input(prev => prev.slice(0, -1))} 
                            onClear={() => setP1Input('')} 
                        />
                    </div>

                    <div className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs font-semibold text-slate-200 bg-slate-950 py-1 sm:py-2 px-2 sm:px-3 rounded-full border border-slate-800 shrink-0">
                        {statusMsg}
                    </div>
                </div>
            </div>
        </div>
      ) : (
        // PvP Layout
        <div className="flex flex-col flex-1 min-h-0 w-full mb-1">
           {/* Mobile PvP: P2 -> Arena -> P1 */}
           <div className="flex sm:hidden flex-col flex-1 justify-between gap-1 w-full h-full min-h-0 pb-1">
               <div className="flex-1 min-h-[140px] w-full min-h-0 flex">
                  {renderPlayer2()}
               </div>
               <div className="shrink-0 flex py-1">
                  {renderGameField("!mb-0")}
               </div>
               <div className="flex-1 min-h-[140px] w-full min-h-0 flex">
                  {renderPlayer1()}
               </div>
           </div>

           {/* Desktop PvP: Arena -> (P1 | P2) */}
           <div className="hidden sm:flex flex-col flex-1 gap-2 md:gap-4 w-full h-full min-h-0">
               <div className="shrink-0 flex">
                  {renderGameField("!mb-0 w-full")}
               </div>
               <div className="flex-1 flex flex-row gap-2 md:gap-4 min-h-0 w-full">
                  <div className="flex-1 flex min-w-0">
                     {renderPlayer1()}
                  </div>
                  <div className="flex-1 flex min-w-0">
                     {renderPlayer2()}
                  </div>
               </div>
           </div>
        </div>
      )}
    </div>
  );
}
