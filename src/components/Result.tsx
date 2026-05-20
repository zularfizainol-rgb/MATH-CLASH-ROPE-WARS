import { useEffect, useRef } from 'react';

interface ResultProps {
  winner: string;
  isSolo: boolean;
  onRestart: () => void;
  onHome: () => void;
}

export function ResultScreen({ winner, isSolo, onRestart, onHome }: ResultProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (winner !== "🤖 KOMPUTER MENANG!") {
       startConfetti(canvas, ctx);
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [winner]);

  const startConfetti = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    let particles: any[] = [];
    
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * canvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.02,
            tiltAngle: 0
        });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
          p.x += Math.sin(p.tiltAngle);
          p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
          ctx.stroke();

          if (p.y > canvas.height) {
              particles[index] = { ...p, x: Math.random() * canvas.width, y: -20 };
          }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
        window.removeEventListener('resize', resize);
    };
  };

  let title = '';
  let msg = '';
  let trophy = '🏆';
  
  if (winner === "Pasukan Biru") {
      title = "🎉 PASUKAN BIRU MENANG!";
      msg = isSolo ? "Hebat! Anda berjaya menewaskan komputer!" : "Syabas Pemain 1! Anda jaguh Tarik Tali!";
  } else if (winner === "Pasukan Merah") {
      title = "🎉 PASUKAN MERAH MENANG!";
      msg = "Syabas Pemain 2! Kemenangan yang sengit!";
  } else {
      title = "🤖 KOMPUTER MENANG!";
      msg = "Masa semakin suntuk, jom cuba lagi!";
      trophy = "🦾";
  }

  return (
    <div className="flex flex-col items-center py-6 overflow-y-auto max-h-[80vh] relative flex-1 w-full justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      <div className="relative z-10 text-center max-w-sm w-full mx-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border-2 border-indigo-500 shadow-2xl">
        <span className="text-6xl block mb-3 filter drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">{trophy}</span>
        <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-500 mb-1 leading-tight">{title}</h2>
        <p className="text-sm text-slate-200 font-semibold mb-4">{msg}</p>
        
        <div className="flex flex-col gap-2 mt-6">
          <button onClick={onRestart} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-lg rounded-xl border-b-4 border-teal-900 transition-all shadow-md">
            🎮 Main Semula
          </button>
          <button onClick={onHome} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all text-sm">
            🏠 Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
}
