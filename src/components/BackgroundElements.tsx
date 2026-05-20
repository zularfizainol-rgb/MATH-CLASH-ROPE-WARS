import { useMemo } from 'react';

export function CyberGrid() {
  return <div className="cyber-grid"></div>;
}

export function MathSymbolsBackground() {
  const symbols = ['+', '-', '×', '÷', '=', '%', '!', '?', '>', '<', 'π', '∞'];
  const colors = [
    'text-blue-400/60', 'text-pink-400/60', 'text-yellow-400/60', 
    'text-green-400/60', 'text-purple-400/60', 'text-red-400/60',
    'text-indigo-400/60', 'text-cyan-400/60', 'text-orange-400/60'
  ];

  const backgroundElements = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const symbol = symbols[i % symbols.length];
      const color = colors[i % colors.length];
      const size = Math.random() * 3 + 1; // 1rem to 4rem
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animDuration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      
      return { symbol, color, size, left, top, animDuration, delay };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {backgroundElements.map((el, i) => (
        <div 
          key={i}
          className={`absolute ${el.color} font-black`}
          style={{
            left: `${el.left}%`,
            top: `${el.top}%`,
            fontSize: `${el.size}rem`,
            animation: `symbolFloat ${el.animDuration}s ease-in-out infinite`,
            animationDelay: `-${el.delay}s`,
          }}
        >
          {el.symbol}
        </div>
      ))}
    </div>
  );
}

export function CyberClouds() {
  return (
    <>
      <div className="cyber-cloud w-32 h-10 top-6 left-[-200px]" style={{ animationDelay: '0s' }}></div>
      <div className="cyber-cloud w-44 h-12 top-16 left-[-300px]" style={{ animationDelay: '10s' }}></div>
    </>
  );
}
