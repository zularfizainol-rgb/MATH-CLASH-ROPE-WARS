const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;
let isMuted = false;

export function initAudio() {
  if (!audioCtx && AudioCtx) {
    audioCtx = new AudioCtx();
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  return isMuted;
}

export function getIsMuted() {
  return isMuted;
}

export function playSound(type: 'correct' | 'wrong' | 'pull' | 'victory') {
  if (isMuted || !audioCtx) return;
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;

  if (type === 'correct') {
    // Sub-Bass Hit 
    const bassOsc = audioCtx.createOscillator();
    const bassGain = audioCtx.createGain();
    const bassFilter = audioCtx.createBiquadFilter();
    
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(110, now);
    bassOsc.frequency.exponentialRampToValueAtTime(55, now + 0.45);
    
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(180, now);
    
    bassGain.gain.setValueAtTime(0.18, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(audioCtx.destination);
    
    bassOsc.start(now);
    bassOsc.stop(now + 0.5);

    // Chime
    const notes = [440, 554.37, 659.25, 880, 1109.73, 1318.51]; 
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + index * 0.08 + 0.6);
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + index * 0.08 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 1.2);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.2);
    });

  } else if (type === 'wrong') {
    // Standard short buzz/bzzt for wrong answer
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    
    const masterGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    // Low dissonant interval
    osc1.frequency.setValueAtTime(150, now);
    osc2.frequency.setValueAtTime(160, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    masterGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.3);
    osc2.stop(now + 0.3);
    
  } else if (type === 'pull') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);

  } else if (type === 'victory') {
    const notes = [261.63, 329.63, 392.00, 523.25]; 
    notes.forEach((freq, index) => {
      const noteOsc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();
      noteOsc.connect(noteGain);
      noteGain.connect(audioCtx.destination);
      noteOsc.type = 'triangle';
      noteOsc.frequency.setValueAtTime(freq, now + index * 0.15);
      noteGain.gain.setValueAtTime(0.15, now + index * 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.15 + 0.3);
      noteOsc.start(now + index * 0.15);
      noteOsc.stop(now + index * 0.15 + 0.3);
    });
  }
}
