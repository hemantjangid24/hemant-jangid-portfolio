import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, MapPin, Code2, Star } from 'lucide-react';
import { personalInfo, stats } from '../../data';

/* ─── 3D Scene ───────────────────────────────────── */
function ParticleField() {
  const ref = useRef();
  const geometry = useMemo(() => {
    const count = 700;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color('#2997ff'), new THREE.Color('#bf5af2'), new THREE.Color('#ffffff')];
    for (let i = 0; i < count; i++) {
      pos[i*3]=(Math.random()-0.5)*22; pos[i*3+1]=(Math.random()-0.5)*18; pos[i*3+2]=(Math.random()-0.5)*10;
      const c=palette[Math.floor(Math.random()*3)]; col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col,3));
    return geo;
  }, []);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime()*0.016; });
  return <points ref={ref} geometry={geometry}><pointsMaterial size={0.02} vertexColors sizeAttenuation transparent opacity={0.45}/></points>;
}

function FloatOrb({ position, size, color, speed, distort }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) { const t=s.clock.getElapsedTime(); ref.current.rotation.x=t*speed*0.3; ref.current.rotation.y=t*speed*0.5; }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.1}>
      <Sphere ref={ref} args={[size,48,48]} position={position}>
        <MeshDistortMaterial color={color} distort={distort} speed={2.5} roughness={0.1} metalness={0.8} transparent opacity={0.65}/>
      </Sphere>
    </Float>
  );
}

function RotatingKnot() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) { const t=s.clock.getElapsedTime(); ref.current.rotation.x=t*0.28; ref.current.rotation.y=t*0.44; ref.current.rotation.z=t*0.18; }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref} position={[4.5,0.5,-2.5]}>
        <torusKnotGeometry args={[0.7,0.22,180,32,2,3]}/>
        <meshStandardMaterial color="#2997ff" metalness={0.9} roughness={0.08}/>
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((s) => {
    camera.position.x += (s.mouse.x*0.3 - camera.position.x)*0.04;
    camera.position.y += (s.mouse.y*0.2 - camera.position.y)*0.04;
    camera.lookAt(0,0,0);
  });
  return null;
}

/* ─── Typing ─────────────────────────────────────── */
const ROLES = ['Full Stack Developer','React Enthusiast','B.Tech CSE Student','Machine Learning Enthusiast','Problem Solver'];

function TypingText() {
  const [display,setDisplay]=useState(''); const [idx,setIdx]=useState(0);
  const [charIdx,setCharIdx]=useState(0); const [deleting,setDeleting]=useState(false);
  useEffect(()=>{
    const current=ROLES[idx]; const delay=deleting?32:68;
    const t=setTimeout(()=>{
      if(!deleting){
        if(charIdx<current.length){setDisplay(current.slice(0,charIdx+1));setCharIdx(c=>c+1);}
        else{setTimeout(()=>setDeleting(true),1900);}
      }else{
        if(charIdx>0){setDisplay(current.slice(0,charIdx-1));setCharIdx(c=>c-1);}
        else{setDeleting(false);setIdx(i=>(i+1)%ROLES.length);}
      }
    },delay);
    return ()=>clearTimeout(t);
  },[charIdx,deleting,idx]);
  return <span><span style={{color:'var(--accent)'}}>{display}</span><span className="cursor-blink" style={{display:'inline-block',width:2,height:'1em',background:'var(--accent)',verticalAlign:'middle',marginLeft:2}}/></span>;
}

/* ─── Detect mobile with JS (avoids CSS specificity war) ─ */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

/* ─── Shared Social Row ──────────────────────────── */
function SocialRow({ small }) {
  const iconSize = small ? 34 : 36;
  return (
    <div style={{ display:'flex', alignItems:'center', gap: small ? 8 : 10, flexWrap:'wrap', justifyContent: small ? 'center' : 'flex-start' }}>
      <span style={{ fontSize:'0.6875rem', fontFamily:'monospace', color:'var(--text-3)', letterSpacing:'0.07em', textTransform:'uppercase' }}>Find me on</span>
      {[{icon:Github,href:personalInfo.social.github,label:'GitHub'},
        {icon:Linkedin,href:personalInfo.social.linkedin,label:'LinkedIn'},
        {icon:Twitter,href:personalInfo.social.twitter,label:'Twitter'}].map(({icon:Icon,href,label})=>(
        <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          whileHover={{scale:1.12,y:-2}} whileTap={{scale:0.92}}
          style={{width:iconSize,height:iconSize,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-card)',border:'1px solid var(--border)',color:'var(--text-2)',textDecoration:'none',transition:'border-color 0.2s,color 0.2s'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-2)';}}
        ><Icon size={small?14:15}/></motion.a>
      ))}
      <span style={{display:'flex',alignItems:'center',gap:5,fontSize:'0.8125rem',color:'var(--text-2)'}}>
        <MapPin size={small?12:13} style={{color:'var(--accent)'}}/>{personalInfo.location}
      </span>
    </div>
  );
}

/* ─── Desktop: Photo with floating badges ────────── */
function DesktopPhoto() {
  return (
    <div style={{ position:'relative', width:360, height:360, flexShrink:0 }}>
      {/* Glow ring */}
      <div className="spin-cw" style={{ position:'absolute', inset:-14, borderRadius:'50%', background:'conic-gradient(from 0deg,#2997ff 0%,#bf5af2 40%,#5ac8fa 70%,#2997ff 100%)', opacity:0.3, filter:'blur(2px)' }}/>
      <div className="spin-ccw" style={{ position:'absolute', inset:-5, borderRadius:'50%', border:'1.5px dashed rgba(41,151,255,0.28)' }}/>
      {/* Photo */}
      <div style={{ position:'relative', zIndex:2, width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'3px solid rgba(255,255,255,0.09)', boxShadow:'0 0 56px rgba(41,151,255,0.22),0 24px 64px rgba(0,0,0,0.55)' }}>
        <img src={personalInfo.photo} alt={personalInfo.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} loading="eager"/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'28%', background:'linear-gradient(to top,rgba(6,6,8,0.35),transparent)', pointerEvents:'none' }}/>
      </div>
      {/* Badge: top-right */}
      <motion.div initial={{opacity:0,scale:0.75,x:16}} animate={{opacity:1,scale:1,x:0}} transition={{delay:1.2,type:'spring',stiffness:220,damping:18}}
        style={{ position:'absolute', top:'4%', right:'-38%', zIndex:10, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:9, boxShadow:'0 8px 28px rgba(0,0,0,0.32)', backdropFilter:'blur(12px)', whiteSpace:'nowrap' }}>
        <div style={{width:32,height:32,borderRadius:9,background:'rgba(41,151,255,0.14)',border:'1px solid rgba(41,151,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <Code2 size={14} style={{color:'var(--accent)'}}/>
        </div>
        <div><p style={{fontSize:'0.6875rem',fontWeight:700,color:'var(--text-1)',margin:0}}>100+ Commits</p><p style={{fontSize:'0.625rem',color:'var(--text-2)',margin:0}}>This month</p></div>
      </motion.div>
      {/* Badge: bottom-left */}
      <motion.div initial={{opacity:0,scale:0.75,x:-16}} animate={{opacity:1,scale:1,x:0}} transition={{delay:1.4,type:'spring',stiffness:220,damping:18}}
        style={{ position:'absolute', bottom:'12%', left:'-38%', zIndex:10, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:'10px 14px', display:'flex', alignItems:'center', gap:9, boxShadow:'0 8px 28px rgba(0,0,0,0.32)', backdropFilter:'blur(12px)', whiteSpace:'nowrap' }}>
        <div style={{width:32,height:32,borderRadius:9,background:'rgba(191,90,242,0.14)',border:'1px solid rgba(191,90,242,0.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <Star size={13} fill="#bf5af2" style={{color:'#bf5af2'}}/>
        </div>
        <div><p style={{fontSize:'0.6875rem',fontWeight:700,color:'var(--text-1)',margin:0}}>8.5 CGPA</p><p style={{fontSize:'0.625rem',color:'var(--text-2)',margin:0}}>B.Tech CSE</p></div>
      </motion.div>
      {/* Badge: bottom-right */}
      <motion.div initial={{opacity:0,scale:0.75,y:14}} animate={{opacity:1,scale:1,y:0}} transition={{delay:1.6,type:'spring',stiffness:220,damping:18}}
        style={{ position:'absolute', bottom:'0%', right:'-32%', zIndex:10, background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:'9px 14px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 28px rgba(0,0,0,0.32)', backdropFilter:'blur(12px)', whiteSpace:'nowrap' }}>
        <span className="pulse-glow" style={{width:8,height:8,borderRadius:'50%',background:'var(--green)',flexShrink:0}}/>
        <p style={{fontSize:'0.6875rem',fontWeight:600,color:'var(--text-1)',margin:0}}>Available for hire</p>
      </motion.div>
    </div>
  );
}

/* ─── Mobile: Photo (smaller, no absolute badges) ── */
function MobilePhoto() {
  return (
    <div style={{ position:'relative', width:210, height:210, margin:'0 auto', flexShrink:0 }}>
      <div className="spin-cw" style={{ position:'absolute', inset:-8, borderRadius:'50%', background:'conic-gradient(from 0deg,#2997ff 0%,#bf5af2 40%,#5ac8fa 70%,#2997ff 100%)', opacity:0.28, filter:'blur(2px)' }}/>
      <div className="spin-ccw" style={{ position:'absolute', inset:-3, borderRadius:'50%', border:'1.5px dashed rgba(41,151,255,0.25)' }}/>
      <div style={{ position:'relative', zIndex:2, width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:'3px solid rgba(255,255,255,0.09)', boxShadow:'0 0 40px rgba(41,151,255,0.2),0 16px 48px rgba(0,0,0,0.5)' }}>
        <img src={personalInfo.photo} alt={personalInfo.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} loading="eager"/>
      </div>
    </div>
  );
}

/* ─── Mobile badge pills ─────────────────────────── */
function MobileBadges() {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.9}}
      style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', marginTop:14 }}>
      {[
        { icon:<Code2 size={12} style={{color:'var(--accent)'}}/>, bg:'rgba(41,151,255,0.14)', border:'rgba(41,151,255,0.25)', title:'100+ Commits', sub:'This month' },
        { icon:<Star size={11} fill="#bf5af2" style={{color:'#bf5af2'}}/>, bg:'rgba(191,90,242,0.14)', border:'rgba(191,90,242,0.25)', title:'8.4 CGPA', sub:'B.Tech CSE' },
      ].map((b,i)=>(
        <div key={i} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:11, padding:'7px 11px', display:'flex', alignItems:'center', gap:7, boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}>
          <div style={{ width:24,height:24,borderRadius:6,background:b.bg,border:`1px solid ${b.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>{b.icon}</div>
          <div><p style={{fontSize:'0.5875rem',fontWeight:700,color:'var(--text-1)',margin:0}}>{b.title}</p><p style={{fontSize:'0.5rem',color:'var(--text-2)',margin:0}}>{b.sub}</p></div>
        </div>
      ))}
      <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:11, padding:'7px 11px', display:'flex', alignItems:'center', gap:7, boxShadow:'0 4px 14px rgba(0,0,0,0.25)' }}>
        <span className="pulse-glow" style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',flexShrink:0}}/>
        <p style={{fontSize:'0.5875rem',fontWeight:600,color:'var(--text-1)',margin:0}}>Available for hire</p>
      </div>
    </motion.div>
  );
}

/* ─── HERO ───────────────────────────────────────── */
export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden' }} className="grid-bg">

      {/* Three.js BG */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <Canvas camera={{position:[0,0,8],fov:55}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} dpr={[1,1.5]}>
          <CameraRig/>
          <ambientLight intensity={0.35}/>
          <pointLight position={[10,10,10]}  intensity={2}   color="#2997ff"/>
          <pointLight position={[-10,-5,-5]} intensity={1.5} color="#bf5af2"/>
          <pointLight position={[0,12,5]}    intensity={1}   color="#5ac8fa"/>
          <Environment preset="city"/>
          <ParticleField/>
          <RotatingKnot/>
          <FloatOrb position={[-5.5,1.5,-3.5]} size={1.0} color="#1a6bb5" speed={1.1} distort={0.38}/>
          <FloatOrb position={[5.5,-2,-4]}     size={0.6} color="#8b44b5" speed={0.85} distort={0.28}/>
        </Canvas>
      </div>

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', background:'radial-gradient(ellipse 85% 75% at 50% 50%,transparent 18%,var(--bg) 100%)' }}/>

      {/* ═══ DESKTOP ════════════════════════════════ */}
      {!isMobile && (
        <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:1200, margin:'0 auto', padding:'96px 48px 64px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:64, alignItems:'center' }}>

            {/* Left: text */}
            <div style={{ maxWidth:540 }}>
              <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.5}} style={{marginBottom:24}}>
                <span className="chip"><span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 7px var(--green)',display:'inline-block',flexShrink:0}}/> Open to opportunities</span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.85,delay:0.1,ease:[0.23,1,0.32,1]}}
                style={{fontSize:'clamp(3rem,4.5vw,5rem)',fontWeight:700,letterSpacing:'-0.04em',lineHeight:1.0,color:'var(--text-1)',marginBottom:12}}>
                Hi, I'm<br/><span className="text-accent-gradient">{personalInfo.name}</span>
              </motion.h1>

              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.45}}
                style={{height:30,display:'flex',alignItems:'center',marginBottom:18,fontSize:'0.9375rem',fontFamily:"'SF Mono','Fira Code',monospace",color:'var(--text-2)'}}>
                <TypingText/>
              </motion.div>

              <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.58,duration:0.6}}
                style={{fontSize:'1.0625rem',lineHeight:1.75,color:'var(--text-2)',marginBottom:32}}>
                {personalInfo.bio}
              </motion.p>

              <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.72}}
                style={{display:'flex',flexWrap:'wrap',gap:12,marginBottom:28}}>
                <a href={personalInfo.resumeUrl} download className="btn-cta"><Download size={15}/> Download Resume</a>
                <button className="btn-ghost" onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>Let's Talk <ArrowRight size={15}/></button>
              </motion.div>

              <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.88}}>
                <SocialRow small={false}/>
              </motion.div>
            </div>

            {/* Right: Photo */}
            <motion.div initial={{opacity:0,x:32,scale:0.94}} animate={{opacity:1,x:0,scale:1}} transition={{duration:0.95,delay:0.25,ease:[0.23,1,0.32,1]}}
              style={{display:'flex',justifyContent:'center',paddingRight:60}}>
              <DesktopPhoto/>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:1.1}} style={{marginTop:52}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,maxWidth:560}}>
              {stats.map((s,i)=>(
                <motion.div key={s.label} initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} transition={{delay:1.2+i*0.07}}
                  className="card-glass" style={{padding:'14px 10px',textAlign:'center',borderRadius:16}}>
                  <p style={{fontSize:'1.55rem',fontWeight:700,letterSpacing:'-0.025em',color:'var(--text-1)',margin:0}}>{s.value}</p>
                  <p style={{fontSize:'0.6875rem',color:'var(--text-2)',marginTop:3}}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* ═══ MOBILE ═════════════════════════════════ */}
      {isMobile && (
        <div style={{ position:'relative', zIndex:2, width:'100%', padding:'80px 20px 48px', display:'flex', flexDirection:'column', alignItems:'center' }}>

          {/* Status chip */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}} style={{marginBottom:20}}>
            <span className="chip"><span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',boxShadow:'0 0 7px var(--green)',display:'inline-block',flexShrink:0}}/> Open to opportunities</span>
          </motion.div>

          {/* Photo */}
          <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.15,ease:[0.23,1,0.32,1]}}>
            <MobilePhoto/>
          </motion.div>

          {/* Badges */}
          <MobileBadges/>

          {/* Name */}
          <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.3,ease:[0.23,1,0.32,1]}}
            style={{fontSize:'clamp(2rem,9vw,2.6rem)',fontWeight:700,letterSpacing:'-0.035em',lineHeight:1.08,color:'var(--text-1)',textAlign:'center',marginTop:22,marginBottom:10}}>
            Hi, I'm<br/><span className="text-accent-gradient">{personalInfo.name}</span>
          </motion.h1>

          {/* Typing */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{height:26,display:'flex',alignItems:'center',marginBottom:14,fontSize:'0.875rem',fontFamily:"'SF Mono','Fira Code',monospace",color:'var(--text-2)'}}>
            <TypingText/>
          </motion.div>

          {/* Bio */}
          <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.6}}
            style={{fontSize:'0.9375rem',lineHeight:1.72,color:'var(--text-2)',marginBottom:24,textAlign:'center',maxWidth:340}}>
            {personalInfo.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.72}}
            style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:20}}>
            <a href={personalInfo.resumeUrl} download className="btn-cta" style={{fontSize:'0.875rem',padding:'11px 22px'}}><Download size={14}/> Download Resume</a>
            <button className="btn-ghost" style={{fontSize:'0.875rem',padding:'10px 22px'}} onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}>Let's Talk <ArrowRight size={14}/></button>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.85}} style={{marginBottom:28}}>
            <SocialRow small={true}/>
          </motion.div>

          {/* Stats 2×2 */}
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:1.0}}
            style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,width:'100%',maxWidth:320}}>
            {stats.map((s,i)=>(
              <motion.div key={s.label} initial={{opacity:0,scale:0.88}} animate={{opacity:1,scale:1}} transition={{delay:1.1+i*0.07}}
                className="card-glass" style={{padding:'12px 8px',textAlign:'center',borderRadius:14}}>
                <p style={{fontSize:'1.35rem',fontWeight:700,letterSpacing:'-0.02em',color:'var(--text-1)',margin:0}}>{s.value}</p>
                <p style={{fontSize:'0.625rem',color:'var(--text-2)',marginTop:3}}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Scroll cue */}
      <motion.button initial={{opacity:0}} animate={{opacity:1,y:[0,8,0]}} transition={{delay:1.8,y:{repeat:Infinity,duration:2.2}}}
        onClick={()=>document.querySelector('#about')?.scrollIntoView({behavior:'smooth'})}
        style={{position:'absolute',bottom:20,left:'50%',transform:'translateX(-50%)',zIndex:3,display:'flex',flexDirection:'column',alignItems:'center',gap:5,background:'none',border:'none',cursor:'pointer',padding:8}}>
        <div style={{width:1,height:30,background:'linear-gradient(to bottom,transparent,var(--accent))'}}/>
        <span style={{fontSize:'0.5625rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-3)'}}>Scroll</span>
      </motion.button>
    </section>
  );
}
