export function CyberGrid() {
  return <div className="cyber-grid"></div>;
}

export function CyberClouds() {
  return (
    <>
      <div className="cyber-cloud w-32 h-10 top-6 left-[-200px]" style={{ animationDelay: '0s' }}></div>
      <div className="cyber-cloud w-44 h-12 top-16 left-[-300px]" style={{ animationDelay: '10s' }}></div>
    </>
  );
}
