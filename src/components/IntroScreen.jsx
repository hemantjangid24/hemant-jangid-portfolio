import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Web Audio ──────────────────────────────────── */
function createImpactSound(audioCtx) {
  const now = audioCtx.currentTime;

  const subOsc = audioCtx.createOscillator();
  const subGain = audioCtx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(60, now);
  subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.4);
  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(1.0, now + 0.01);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
  subOsc.connect(subGain);
  subGain.connect(audioCtx.destination);
  subOsc.start(now); subOsc.stop(now + 0.6);

  const midOsc = audioCtx.createOscillator();
  const midGain = audioCtx.createGain();
  midOsc.type = 'triangle';
  midOsc.frequency.setValueAtTime(140, now);
  midOsc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
  midGain.gain.setValueAtTime(0, now);
  midGain.gain.linearRampToValueAtTime(0.7, now + 0.008);
  midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  midOsc.connect(midGain);
  midGain.connect(audioCtx.destination);
  midOsc.start(now); midOsc.stop(now + 0.35);

  const bufSize = audioCtx.sampleRate * 0.15;
  const noiseBuf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const noiseData = noiseBuf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) noiseData[i] = Math.random() * 2 - 1;
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuf;
  const noiseFilter = audioCtx.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 1800;
  noiseFilter.Q.value = 0.8;
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0, now);
  noiseGain.gain.linearRampToValueAtTime(0.55, now + 0.005);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  noise.start(now);
}

/* ─── Particle burst (canvas) ────────────────────── */
function ParticleBurst({ trigger, isMobile }) {
  const canvasRef = useRef();
  const particles = useRef([]);
  const rafRef    = useRef();

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width  / 2;
    // On mobile panels meet at vertical center; on desktop at horizontal center
    const cy = isMobile ? canvas.height / 2 : canvas.height / 2;

    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 8;
      const colors = ['#2997ff','#bf5af2','#5ac8fa','#ffffff','#ff9f0a'];
      particles.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.55,
        life: 1.0,
        decay: 0.02 + Math.random() * 0.022,
        size: 1.5 + Math.random() * 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0);
      particles.current.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle   = p.color;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.1;
        p.life -= p.decay;
      });
      if (particles.current.length > 0) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      pointerEvents: 'none', width: '100%', height: '100%',
    }} />
  );
}

/* ─── Seam flash ─────────────────────────────────── */
function SeamFlash({ trigger, isMobile }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div key="flash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed', zIndex: 9997,
            // Desktop: vertical line at center | Mobile: horizontal line at center
            ...(isMobile ? {
              left: 0, right: 0,
              top: '50%', transform: 'translateY(-50%)',
              height: 6, width: '100%',
              background: 'linear-gradient(90deg, #5ac8fa, #2997ff, #bf5af2)',
              boxShadow: '0 0 50px 18px rgba(41,151,255,0.85)',
            } : {
              top: 0, bottom: 0,
              left: '50%', transform: 'translateX(-50%)',
              width: 6, height: '100%',
              background: 'linear-gradient(to bottom, #5ac8fa, #2997ff, #bf5af2)',
              boxShadow: '0 0 50px 18px rgba(41,151,255,0.85)',
            }),
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── Progress bar ───────────────────────────────── */
function ProgressBar({ durationMs }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 2, zIndex: 10001,
      background: 'rgba(255,255,255,0.06)',
    }}>
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: durationMs / 1000, ease: 'linear' }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg,#2997ff,#bf5af2,#5ac8fa)',
          boxShadow: '0 0 8px rgba(41,151,255,0.5)',
        }}
      />
    </div>
  );
}

/* ─── Corner bracket helper ──────────────────────── */
function CornerBracket({ top, left, right, bottom, color, delay }) {
  const isTop    = top    !== undefined;
  const isLeft   = left   !== undefined;
  const isRight  = right  !== undefined;
  const isBottom = bottom !== undefined;
  const pos = { position: 'absolute' };
  if (isTop)    pos.top    = top;
  if (isLeft)   pos.left   = left;
  if (isRight)  pos.right  = right;
  if (isBottom) pos.bottom = bottom;

  return (
    <>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.45 }}
        style={{ ...pos, width: 56, height: 1, background: color, opacity: 0.65,
          transformOrigin: isRight ? 'right' : 'left' }}
      />
      <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
        transition={{ delay, duration: 0.45 }}
        style={{ ...pos, width: 1, height: 56, background: color, opacity: 0.65,
          transformOrigin: isBottom ? 'bottom' : 'top' }}
      />
    </>
  );
}

/* ─── INTRO SCREEN ───────────────────────────────── */
export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('enter'); // enter → impact → open → done
  const audioRef          = useRef(null);
  const isMobile          = typeof window !== 'undefined' && window.innerWidth <= 768;

  const SLIDE_MS  = 2000;
  const IMPACT_MS = SLIDE_MS + 150;   // 2150
  const OPEN_MS   = IMPACT_MS + 100;  // 2250
  const DONE_MS   = OPEN_MS  + 1300;  // 3550

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('impact');
      try {
        if (!audioRef.current)
          audioRef.current = new (window.AudioContext || window.webkitAudioContext)();
        createImpactSound(audioRef.current);
      } catch (_) {}
    }, IMPACT_MS);

    const t2 = setTimeout(() => setPhase('open'), OPEN_MS);
    const t3 = setTimeout(() => { setPhase('done'); onComplete?.(); }, DONE_MS);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 'done') return null;

  const slideTransition = { duration: SLIDE_MS / 1000, ease: [0.76, 0, 0.24, 1] };
  const flyTransition   = { duration: 1.0, ease: [0.76, 0, 0.24, 1] };

  /* ── Panel motion ── */
  // Desktop: left panel slides from left; right from right
  // Mobile:  top panel slides from top; bottom from bottom
  const getAnimate = (dir) => {
    if (phase === 'impact') return { [dir === 'left' || dir === 'top' ? (isMobile ? 'y' : 'x') : (isMobile ? 'y' : 'x')]: 0, transition: { duration: 0 } };
    if (phase === 'open') {
      const axis = isMobile ? 'y' : 'x';
      const val  = (dir === 'left' || dir === 'top') ? '-101%' : '101%';
      return { [axis]: val, transition: flyTransition };
    }
    // enter
    return { [isMobile ? 'y' : 'x']: 0, transition: slideTransition };
  };

  /* ── Shared panel style ── */
  const basePanel = {
    position: 'fixed', zIndex: 9999,
    background: '#060608', overflow: 'hidden',
  };

  const leftPanelStyle = isMobile
    ? { ...basePanel, top: 0, left: 0, right: 0, height: '50%',
        borderBottom: '1px solid rgba(41,151,255,0.2)' }
    : { ...basePanel, top: 0, bottom: 0, left: 0, width: '50%',
        borderRight: '1px solid rgba(41,151,255,0.2)' };

  const rightPanelStyle = isMobile
    ? { ...basePanel, bottom: 0, left: 0, right: 0, height: '50%',
        borderTop: '1px solid rgba(191,90,242,0.2)' }
    : { ...basePanel, top: 0, bottom: 0, left: '50%', width: '50%',
        borderLeft: '1px solid rgba(191,90,242,0.2)' };

  const leftInitial  = isMobile ? { y: '-101%' } : { x: '-101%' };
  const rightInitial = isMobile ? { y:  '101%' } : { x:  '101%' };

  const leftAnim  = getAnimate('left');
  const rightAnim = getAnimate('right');

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <>
          {/* ══ TOP / LEFT PANEL ══════════════════ */}
          <motion.div key="panel-a" style={leftPanelStyle}
            initial={leftInitial} animate={leftAnim}>

            {/* Grid */}
            <div style={{ position:'absolute', inset:0,
              backgroundImage:'linear-gradient(rgba(41,151,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(41,151,255,0.04) 1px,transparent 1px)',
              backgroundSize:'48px 48px' }}/>
            {/* Glow */}
            <div style={{ position:'absolute', inset:0,
              background: isMobile
                ? 'radial-gradient(ellipse at 50% 90%,rgba(41,151,255,0.1) 0%,transparent 65%)'
                : 'radial-gradient(ellipse at 85% 50%,rgba(41,151,255,0.1) 0%,transparent 65%)' }}/>

            {/* Scan line */}
            <motion.div
              animate={isMobile ? { x: ['-100%','100%'] } : { y: ['0%','100%'] }}
              transition={{ duration: 1.9, ease: 'linear' }}
              style={{
                position: 'absolute',
                ...(isMobile
                  ? { top: 0, bottom: 0, left: 0, width: 2,
                      background: 'linear-gradient(to bottom,transparent,rgba(41,151,255,0.7),transparent)',
                      boxShadow: '0 0 10px rgba(41,151,255,0.5)' }
                  : { left: 0, right: 0, top: 0, height: 1,
                      background: 'linear-gradient(90deg,transparent,rgba(41,151,255,0.7),transparent)',
                      boxShadow: '0 0 10px rgba(41,151,255,0.5)' })
              }}
            />

            {/* Corner brackets */}
            <CornerBracket top={20} left={20} color="#2997ff" delay={0.55}/>
            {!isMobile && <CornerBracket bottom={20} right={20} color="#2997ff" delay={0.65}/>}

            {/* Content — profile photo */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-end',
              paddingRight: isMobile ? 0 : 52,
              paddingBottom: isMobile ? 16 : 0,
            }}>
              <motion.div initial={{ opacity:0, [isMobile ? 'y' : 'x']: isMobile ? -20 : -24 }}
                animate={{ opacity:1, x:0, y:0 }}
                transition={{ delay:0.65, duration:0.65, ease:[0.23,1,0.32,1] }}
                style={{ display:'flex', flexDirection: isMobile ? 'row' : 'column',
                  alignItems:'center', gap: isMobile ? 16 : 0 }}>

                {/* Photo */}
                <div style={{ position:'relative', marginBottom: isMobile ? 0 : 16 }}>
                  <motion.div animate={{ rotate: 360 }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position:'absolute',
                      inset: isMobile ? -5 : -8,
                      borderRadius:'50%',
                      background:'conic-gradient(from 0deg,#2997ff,#bf5af2,#5ac8fa,#2997ff)',
                      opacity:0.72, filter:'blur(1.5px)',
                    }}/>
                  <motion.div
                    animate={{ scale:[1,1.2,1], opacity:[0.55,0,0.55] }}
                    transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut' }}
                    style={{
                      position:'absolute',
                      inset: isMobile ? -13 : -18,
                      borderRadius:'50%',
                      border:'1.5px solid rgba(41,151,255,0.5)',
                    }}/>
                  <div style={{
                    position:'relative', zIndex:2,
                    width: isMobile ? 80 : 128,
                    height: isMobile ? 80 : 128,
                    borderRadius:'50%', overflow:'hidden',
                    border:'2.5px solid rgba(255,255,255,0.13)',
                    boxShadow:'0 0 40px rgba(41,151,255,0.4),0 0 80px rgba(191,90,242,0.15)',
                  }}>
                    <img src="/profile.jpg" alt="Hemant Jangid"
                      style={{ width:'100%', height:'100%', objectFit:'cover',
                        objectPosition:'center top', display:'block',
                        filter:'brightness(1.06) contrast(1.04)' }}/>
                    <div style={{ position:'absolute', inset:0,
                      background:'linear-gradient(135deg,rgba(41,151,255,0.1),rgba(191,90,242,0.08))',
                      pointerEvents:'none' }}/>
                  </div>
                </div>

                {/* Caption — hide on mobile (shown in bottom panel) */}
                {!isMobile && (
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
                    style={{ fontSize:'0.62rem', fontFamily:'monospace', color:'rgba(255,255,255,0.2)',
                      letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'right' }}>
                    Portfolio ·· 2026
                  </motion.p>
                )}

                {/* Mobile: show name alongside photo */}
                {isMobile && (
                  <div>
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                      style={{ fontSize:'0.55rem', fontFamily:'monospace', color:'rgba(255,255,255,0.2)',
                        letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:6 }}>
                      Welcome to
                    </motion.p>
                    <motion.h2 initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.85, duration:0.5 }}
                      style={{ fontSize:'clamp(1.5rem,6vw,2rem)', fontWeight:700,
                        letterSpacing:'-0.035em', lineHeight:1.08, color:'#f5f5f7', marginBottom:6 }}>
                      Hemant<br/>
                      <span style={{ background:'linear-gradient(135deg,#2997ff,#5ac8fa,#bf5af2)',
                        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                        Jangid
                      </span>
                    </motion.h2>
                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
                      style={{ fontSize:'0.62rem', fontFamily:'monospace', color:'rgba(255,255,255,0.28)',
                        letterSpacing:'0.1em', textTransform:'uppercase' }}>
                      Full Stack Developer
                    </motion.p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Desktop glitch text */}
            {!isMobile && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                style={{ position:'absolute', top:'50%', left:'8%', transform:'translateY(-50%)',
                  fontFamily:"'SF Mono',monospace", fontSize:'0.72rem',
                  color:'rgba(41,151,255,0.3)', letterSpacing:'0.16em',
                  textTransform:'uppercase', lineHeight:2.2, userSelect:'none' }}>
                {['React.js','Node.js','Three.js','Tailwind','MongoDB'].map((t,i) => (
                  <motion.div key={t} initial={{ opacity:0 }} animate={{ opacity:[0,1,0.5,1] }}
                    transition={{ delay:1.0+i*0.14, duration:0.35 }}>{t}</motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ══ BOTTOM / RIGHT PANEL ══════════════ */}
          <motion.div key="panel-b" style={rightPanelStyle}
            initial={rightInitial} animate={rightAnim}>

            {/* Grid */}
            <div style={{ position:'absolute', inset:0,
              backgroundImage:'linear-gradient(rgba(191,90,242,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(191,90,242,0.04) 1px,transparent 1px)',
              backgroundSize:'48px 48px' }}/>
            {/* Glow */}
            <div style={{ position:'absolute', inset:0,
              background: isMobile
                ? 'radial-gradient(ellipse at 50% 10%,rgba(191,90,242,0.1) 0%,transparent 65%)'
                : 'radial-gradient(ellipse at 15% 50%,rgba(191,90,242,0.1) 0%,transparent 65%)' }}/>

            {/* Scan line */}
            <motion.div
              animate={isMobile ? { x: ['100%','-100%'] } : { y: ['100%','0%'] }}
              transition={{ duration: 1.9, ease: 'linear' }}
              style={{
                position: 'absolute',
                ...(isMobile
                  ? { top: 0, bottom: 0, right: 0, width: 2,
                      background: 'linear-gradient(to bottom,transparent,rgba(191,90,242,0.7),transparent)',
                      boxShadow: '0 0 10px rgba(191,90,242,0.5)' }
                  : { left: 0, right: 0, bottom: 0, height: 1,
                      background: 'linear-gradient(90deg,transparent,rgba(191,90,242,0.7),transparent)',
                      boxShadow: '0 0 10px rgba(191,90,242,0.5)' })
              }}
            />

            {/* Corner brackets */}
            {isMobile
              ? <CornerBracket bottom={20} right={20} color="#bf5af2" delay={0.6}/>
              : <>
                  <CornerBracket top={20} right={20} color="#bf5af2" delay={0.55}/>
                  <CornerBracket bottom={20} left={20} color="#bf5af2" delay={0.65}/>
                </>
            }

            {/* Content — name + role */}
            <div style={{
              position:'absolute', inset:0, display:'flex', alignItems:'center',
              justifyContent: isMobile ? 'center' : 'flex-start',
              paddingLeft: isMobile ? 0 : 52,
              paddingTop: isMobile ? 16 : 0,
            }}>
              {/* Mobile: show tech stack pills */}
              {isMobile ? (
                <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:0.7, duration:0.55, ease:[0.23,1,0.32,1] }}
                  style={{ textAlign:'center', padding:'0 24px' }}>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.75 }}
                    style={{ fontSize:'0.55rem', fontFamily:'monospace', color:'rgba(191,90,242,0.5)',
                      letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:14 }}>
                    B.Tech CSE · Jaipur, India
                  </motion.p>
                  <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:7 }}>
                    {['React.js','Node.js','Three.js','MongoDB','Tailwind'].map((tech,i) => (
                      <motion.span key={tech}
                        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                        transition={{ delay:0.85+i*0.1 }}
                        style={{ fontSize:'0.58rem', fontFamily:'monospace', padding:'4px 10px',
                          borderRadius:99, background:'rgba(191,90,242,0.1)',
                          border:'1px solid rgba(191,90,242,0.25)', color:'rgba(191,90,242,0.8)',
                          letterSpacing:'0.05em' }}>
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
                    style={{ display:'flex', justifyContent:'center', gap:7, marginTop:16 }}>
                    {['#2997ff','#bf5af2','#5ac8fa'].map((c,i) => (
                      <motion.div key={i}
                        animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }}
                        transition={{ duration:1.4, repeat:Infinity, delay:i*0.22 }}
                        style={{ width:6, height:6, borderRadius:'50%', background:c }}/>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                /* Desktop: name + role */
                <motion.div initial={{ opacity:0, x:28 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.8, duration:0.65, ease:[0.23,1,0.32,1] }}>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                    style={{ fontSize:'0.65rem', fontFamily:'monospace', color:'rgba(255,255,255,0.18)',
                      letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:14 }}>
                    Welcome to
                  </motion.p>
                  <motion.h1 style={{ fontSize:'clamp(2.2rem,4.5vw,3.8rem)', fontWeight:700,
                    letterSpacing:'-0.04em', lineHeight:1.05, color:'#f5f5f7', marginBottom:16 }}>
                    Hemant<br/>
                    <span style={{ background:'linear-gradient(135deg,#2997ff,#5ac8fa,#bf5af2)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                      Jangid
                    </span>
                  </motion.h1>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.05 }}
                    style={{ fontSize:'0.8rem', fontFamily:'monospace', color:'rgba(255,255,255,0.28)',
                      letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10 }}>
                    Full Stack Developer
                  </motion.p>
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.18 }}
                    style={{ fontSize:'0.68rem', fontFamily:'monospace', color:'rgba(41,151,255,0.5)',
                      letterSpacing:'0.08em' }}>
                    B.Tech CSE · Jaipur, India
                  </motion.p>
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
                    style={{ display:'flex', gap:7, marginTop:18 }}>
                    {['#2997ff','#bf5af2','#5ac8fa'].map((c,i) => (
                      <motion.div key={i}
                        animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }}
                        transition={{ duration:1.4, repeat:Infinity, delay:i*0.22 }}
                        style={{ width:7, height:7, borderRadius:'50%', background:c }}/>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Desktop glitch text */}
            {!isMobile && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
                style={{ position:'absolute', top:'50%', right:'8%', transform:'translateY(-50%)',
                  fontFamily:"'SF Mono',monospace", fontSize:'0.72rem',
                  color:'rgba(191,90,242,0.3)', letterSpacing:'0.16em',
                  textTransform:'uppercase', lineHeight:2.2, textAlign:'right', userSelect:'none' }}>
                {['B.Tech CSE','Jaipur, India','Open Source','AI / ML','WebGL'].map((t,i) => (
                  <motion.div key={t} initial={{ opacity:0 }} animate={{ opacity:[0,1,0.5,1] }}
                    transition={{ delay:1.0+i*0.14, duration:0.35 }}>{t}</motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ══ EFFECTS ═══════════════════════════ */}
          <SeamFlash trigger={phase === 'impact'} isMobile={isMobile}/>
          <ParticleBurst trigger={phase === 'impact'} isMobile={isMobile}/>
          <ProgressBar durationMs={IMPACT_MS}/>

          {/* ══ SKIP ══════════════════════════════ */}
          <motion.button
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.0 }}
            onClick={() => { setPhase('done'); onComplete?.(); }}
            style={{
              position:'fixed',
              bottom: isMobile ? 14 : 22,
              right:  isMobile ? 14 : 22,
              zIndex: 10001,
              background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.1)',
              color:'rgba(255,255,255,0.35)',
              borderRadius:99,
              padding: isMobile ? '7px 15px' : '8px 18px',
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              fontFamily:'monospace', letterSpacing:'0.1em',
              cursor:'pointer', backdropFilter:'blur(12px)',
              transition:'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='#fff'; e.currentTarget.style.background='rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.35)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; }}
          >
            SKIP ›
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
}
