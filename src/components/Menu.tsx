import { useState } from 'react';
import { GameMode, Tahap } from '../types';

interface MenuProps {
  onStart: (mode: GameMode, tahap: Tahap) => void;
}

export function Menu({ onStart }: MenuProps) {
  const [tahap, setTahap] = useState<Tahap>(1);

  return (
    <div className="flex flex-col items-center py-2 md:py-4 overflow-y-auto max-h-[80vh] w-full">
      <div className="w-full max-w-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-indigo-500/30 shadow-2xl mb-4 md:mb-6 text-center transition-all">
        <h2 className="text-lg md:text-2xl font-bold text-white mb-3">Sedia untuk pertarungan minda?</h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-4">
          <button 
            onClick={() => setTahap(1)} 
            className={`flex-1 py-2 px-3 rounded-xl border-2 transition-all font-bold text-sm md:text-base ${tahap === 1 ? 'bg-indigo-600/50 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}
          >
            🚀 TAHAP 1
            <div className="text-[10px] font-normal mt-0.5">Tahun 1, 2 & 3</div>
          </button>
          <button 
            onClick={() => setTahap(2)} 
            className={`flex-1 py-2 px-3 rounded-xl border-2 transition-all font-bold text-sm md:text-base ${tahap === 2 ? 'bg-fuchsia-600/50 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}
          >
            🔥 TAHAP 2
            <div className="text-[10px] font-normal mt-0.5">Tahun 4, 5 & 6</div>
          </button>
        </div>

        <div className="flex justify-center gap-2 md:gap-4">
          <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold rounded-lg text-[10px] md:text-xs tracking-wide">🔵 Pasukan Biru (Anda)</span>
          <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold rounded-lg text-[10px] md:text-xs tracking-wide">🔴 Pasukan Merah (Lawan)</span>
        </div>
      </div>

      <div className="w-full max-w-xl mb-4 md:mb-8">
        <svg viewBox="0 0 800 220" className="w-full h-auto drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <rect x="0" y="160" width="800" height="40" rx="8" fill="#0f172a" stroke="#4f46e5" strokeWidth="2" />
          <line x1="0" y1="180" x2="800" y2="180" stroke="#4f46e5" strokeWidth="1" strokeDasharray="10, 5" />
          <line x1="400" y1="130" x2="400" y2="190" stroke="#ff007f" strokeWidth="4" className="glow-red" />
          <polygon points="400,120 392,135 408,135" fill="#ff007f" className="glow-red" />
          <line x1="80" y1="125" x2="720" y2="125" stroke="#10b981" strokeWidth="6" strokeLinecap="round" className="glow-blue" />
          <circle cx="400" cy="125" r="8" fill="#fbbf24" className="glow-yellow" />

          {/* Left Team Overview SVG */}
          <g transform="translate(160, 45)">
            <path d="M25,20 C25,5 55,5 55,20" stroke="#06b6d4" strokeWidth="4" fill="none" className="glow-blue" />
            <circle cx="40" cy="30" r="16" fill="#fed7aa" />
            <rect x="30" y="22" width="22" height="8" rx="3" fill="#06b6d4" className="glow-blue" />
            <rect x="21" y="24" width="6" height="12" rx="2" fill="#0891b2" />
            <rect x="53" y="24" width="6" height="12" rx="2" fill="#0891b2" />
            <path d="M40,46 L40,85 L25,110 M40,85 L55,110" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
            <rect x="25" y="46" width="30" height="38" rx="8" fill="#06b6d4" className="glow-blue" />
            <path d="M40,58 L75,68" stroke="#fed7aa" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="translate(240, 50)">
            <path d="M20,25 C15,10 65,10 60,25" stroke="#ec4899" strokeWidth="4" fill="none" />
            <circle cx="40" cy="30" r="16" fill="#fbcfe8" />
            <path d="M28,28 L52,28" stroke="#3b82f6" strokeWidth="3" className="glow-blue" />
            <path d="M40,46 L40,85 L25,110 M40,85 L55,110" stroke="#1e40af" strokeWidth="8" strokeLinecap="round" />
            <rect x="25" y="46" width="30" height="38" rx="8" fill="#2563eb" />
            <path d="M40,58 L75,68" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />
          </g>

          {/* Right Team Overview SVG */}
          <g transform="translate(560, 45) scale(-1, 1) translate(-80, 0)">
             <path d="M22,22 C22,5 58,5 58,22" stroke="#ef4444" strokeWidth="4" fill="none" className="glow-red" />
             <circle cx="40" cy="30" r="16" fill="#ffedd5" />
             <rect x="32" y="20" width="20" height="10" rx="3" fill="#f43f5e" className="glow-red" />
             <path d="M40,46 L40,85 L25,110 M40,85 L55,110" stroke="#b91c1c" strokeWidth="8" strokeLinecap="round" />
             <rect x="25" y="46" width="30" height="38" rx="8" fill="#ef4444" className="glow-red" />
             <path d="M40,58 L75,68" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" />
          </g>
          <g transform="translate(480, 50) scale(-1, 1) translate(-80, 0)">
             <path d="M22,18 Q40,5 58,18" stroke="#1e293b" strokeWidth="6" fill="none" strokeLinecap="round" />
             <circle cx="40" cy="30" r="16" fill="#fef3c7" />
             <rect x="28" y="24" width="24" height="6" rx="2" fill="#ef4444" className="glow-red" />
             <path d="M40,46 L40,85 L25,110 M40,85 L55,110" stroke="#991b1b" strokeWidth="8" strokeLinecap="round" />
             <rect x="25" y="46" width="30" height="38" rx="8" fill="#dc2626" />
             <path d="M40,58 L75,68" stroke="#fef3c7" strokeWidth="6" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg px-4">
        <button 
          onClick={() => onStart(1, tahap)}
          className="flex-1 py-3.5 px-4 bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 hover:scale-105 active:scale-95 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] border-b-4 border-blue-900 transition-all text-lg flex flex-col items-center justify-center gap-0.5"
        >
          <span>🎮 1 Pemain</span>
          <span className="text-[10px] font-semibold text-cyan-200">Lawan AI</span>
        </button>
        <button 
          onClick={() => onStart(2, tahap)}
          className="flex-1 py-3.5 px-4 bg-gradient-to-br from-fuchsia-600 to-rose-700 hover:from-fuchsia-500 hover:to-rose-600 hover:scale-105 active:scale-95 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.3)] border-b-4 border-rose-900 transition-all text-lg flex flex-col items-center justify-center gap-0.5"
        >
          <span>⚔️ 2 Pemain</span>
          <span className="text-[10px] font-semibold text-fuchsia-200">Kongsi Skrin Telefon</span>
        </button>
      </div>
    </div>
  );
}
