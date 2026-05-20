interface NumpadProps {
  onInput: (val: string) => void;
  onDelete: () => void;
  onClear: () => void;
  variant: 'solo' | 'pvp';
}

export function Numpad({ onInput, onDelete, onClear, variant }: NumpadProps) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  if (variant === 'solo') {
    return (
      <div className="grid grid-cols-5 gap-1.5 max-w-sm mx-auto w-full">
        {digits.map(d => (
          <button 
            key={d} 
            onClick={() => onInput(d)} 
            className="py-1.5 sm:py-2.5 bg-slate-700/60 hover:bg-slate-600 text-white font-bold text-base sm:text-lg rounded-lg border border-slate-600 transition-colors"
          >
            {d}
          </button>
        ))}
        <button 
          onClick={onDelete} 
          className="col-span-2 py-1.5 sm:py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs rounded-lg border border-rose-500/30 transition-colors"
        >
          Padam
        </button>
        <button 
          onClick={onClear} 
          className="col-span-3 py-1.5 sm:py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-300 font-bold text-xs rounded-lg border border-slate-700 transition-colors"
        >
          Padam Semua
        </button>
      </div>
    );
  }

  // PvP Variant
  return (
    <div className="grid grid-cols-5 gap-1 max-w-xs mx-auto w-full h-full">
      {digits.map(d => (
        <button 
          key={d} 
          onClick={() => onInput(d)} 
          className="py-0.5 sm:py-1.5 bg-slate-700/50 hover:bg-slate-600 text-white font-bold rounded-md border border-slate-600 text-[10px] sm:text-xs"
        >
          {d}
        </button>
      ))}
      <button 
        onClick={onDelete} 
        className="col-span-2 py-0.5 sm:py-1.5 bg-rose-500/20 text-rose-300 font-bold text-[9px] sm:text-[10px] rounded-md border border-rose-500/30"
      >
        Padam
      </button>
      <button 
        onClick={onClear} 
        className="col-span-3 py-0.5 sm:py-1.5 bg-slate-950 text-slate-300 font-bold text-[9px] sm:text-[10px] rounded-md border border-slate-850"
      >
        Kosongkan
      </button>
    </div>
  );
}
