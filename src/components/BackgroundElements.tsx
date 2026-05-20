export function CyberGrid() {
  return <div className="cyber-grid"></div>;
}

export function MathSymbolsBackground() {
  const symbols = ['+', '-', '×', '÷', '=', '%', '!', '?', '>', '<', 'π', '∞'];
  const colors = [
    'text-blue-500/20', 'text-pink-500/20', 'text-yellow-500/20', 
    'text-green-500/20', 'text-purple-500/20', 'text-red-500/20',
    'text-indigo-500/20', 'text-cyan-500/20', 'text-orange-500/20'
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 40 }).map((_, i) => {
        const symbol = symbols[i % symbols.length];
        const color = colors[i % colors.length];
        const size = Math.random() * 3 + 1; // 1rem to 4rem
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animDuration = Math.random() * 10 + 10;
        
        return (
          <div 
            key={i}
            className={`absolute ${color} font-black`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}rem`,
              animation: `float ${animDuration}s ease-in-out infinite`,
              animationDelay: `-${Math.random() * 10}s`,
            }}
          >
            {symbol}
          </div>
        );
      })}
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
