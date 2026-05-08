// import { useState, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Float } from '@react-three/drei';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useIsMobile } from '../../hooks/useIsMobile';
// import { skills } from '../../data';

// const CATS = ['All','Language','Frontend','Backend','Tools'];
// const CAT_COLORS = { Language:'#2997ff', Frontend:'#bf5af2', Backend:'#34c759', Tools:'#ff9f0a' };

// function FloatOcta({ position, color, scale, offset }) {
//   const ref = useRef();
//   useFrame((s) => {
//     if (ref.current) {
//       const t = s.clock.getElapsedTime();
//       ref.current.rotation.x = Math.sin(t*0.5+offset)*0.3;
//       ref.current.rotation.y = t*0.42+offset;
//     }
//   });
//   return (
//     <Float speed={1.8+offset*0.2} rotationIntensity={0.28} floatIntensity={0.75}>
//       <mesh ref={ref} position={position} scale={scale}>
//         <octahedronGeometry args={[0.5,0]}/>
//         <meshStandardMaterial color={color} metalness={0.88} roughness={0.1} emissive={color} emissiveIntensity={0.18}/>
//       </mesh>
//     </Float>
//   );
// }

// function Octahedra() {
//   const items = [
//     { pos:[-3,1,0],    color:'#2997ff', scale:1.2 },
//     { pos:[3,-1,-1],   color:'#bf5af2', scale:0.9 },
//     { pos:[0,2,-2],    color:'#34c759', scale:0.7 },
//     { pos:[-2,-2,0],   color:'#ff9f0a', scale:0.8 },
//     { pos:[2.5,1.5,-1],color:'#5ac8fa', scale:0.6 },
//   ];
//   return (
//     <>
//       <ambientLight intensity={0.4}/>
//       <pointLight position={[5,5,5]}   intensity={3}   color="#2997ff"/>
//       <pointLight position={[-5,-3,3]} intensity={2.2} color="#bf5af2"/>
//       {items.map((item,i) => <FloatOcta key={i} position={item.pos} color={item.color} scale={item.scale} offset={i}/>)}
//     </>
//   );
// }

// function SkillCard({ skill, index, inView, isMobile }) {
//   const color = CAT_COLORS[skill.category] || '#2997ff';
//   return (
//     <motion.div layout
//       initial={{ opacity:0, y:18, scale:0.95 }}
//       animate={inView ? { opacity:1, y:0, scale:1 } : {}}
//       exit={{ opacity:0, scale:0.9 }}
//       transition={{ duration:0.32, delay:index*0.028 }}
//       className="card"
//       style={{ padding: isMobile ? '14px' : '18px' }}
//     >
//       <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
//         <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:'0.6875rem', fontWeight:700, background:`${color}12`, border:`1px solid ${color}25`, color }}>
//           {skill.icon}
//         </div>
//         <div style={{ flex:1, minWidth:0 }}>
//           <p style={{ fontWeight:600, fontSize: isMobile ? '0.875rem' : '0.9rem', color:'var(--text-1)', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{skill.name}</p>
//           <p style={{ fontSize:'0.6875rem', color:'var(--text-3)', margin:0 }}>{skill.category}</p>
//         </div>
//         <span style={{ fontSize:'0.6875rem', fontFamily:'monospace', fontWeight:700, color, flexShrink:0 }}>{skill.level}%</span>
//       </div>
//       <div style={{ height:3, borderRadius:99, background:'var(--border-hover)' }}>
//         <motion.div initial={{ width:0 }} animate={inView ? { width:`${skill.level}%` } : {}}
//           transition={{ duration:1.25, delay:0.3+index*0.025, ease:[0.23,1,0.32,1] }}
//           style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg,${color},${color}88)` }}/>
//       </div>
//       <p style={{ marginTop:6, fontSize:'0.625rem', textAlign:'right', fontFamily:'monospace', color:'var(--text-3)' }}>
//         {skill.level>=85?'Expert':skill.level>=70?'Proficient':skill.level>=55?'Intermediate':'Learning'}
//       </p>
//     </motion.div>
//   );
// }

// export default function Skills() {
//   const [active, setActive] = useState('All');
//   const [ref, inView] = useInView({ triggerOnce:true, threshold:0.06 });
//   const isMobile = useIsMobile();
//   const filtered = active==='All' ? skills : skills.filter(s => s.category===active);

//   return (
//     <section id="skills" ref={ref} style={{ background:'var(--bg-elevated)' }}>
//       <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

//         <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}}
//           style={{ textAlign:'center', marginBottom:16 }}>
//           <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>Skills</span>
//           <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
//             My Tech Arsenal
//           </h2>
//           <p style={{ marginTop:12, fontSize: isMobile ? '0.9375rem' : '1.0625rem', color:'var(--text-2)', maxWidth:380, margin:'12px auto 0' }}>
//             Tools I use to turn ideas into products
//           </p>
//         </motion.div>

//         {/* 3D — hide on small mobile to save resources */}
//         {!isMobile && (
//           <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.2 }}
//             style={{ height:150, marginBottom:4 }}>
//             <Canvas camera={{ position:[0,0,7], fov:50 }} gl={{ antialias:true, alpha:true }} dpr={[1,1.5]}>
//               <Octahedra/>
//             </Canvas>
//           </motion.div>
//         )}

//         {/* Filter pills */}
//         <motion.div initial={{ opacity:0,y:8 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.22 }}
//           style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom: isMobile ? 28 : 36, marginTop: isMobile ? 24 : 0 }}>
//           {CATS.map(cat => (
//             <motion.button key={cat} onClick={() => setActive(cat)}
//               whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
//               style={{ padding: isMobile ? '7px 16px' : '8px 20px', borderRadius:99, fontSize: isMobile ? '0.8125rem' : '0.875rem', fontWeight:500, cursor:'pointer', background: active===cat ? 'var(--accent)' : 'var(--bg-card)', color: active===cat ? '#fff' : 'var(--text-2)', border:`1px solid ${active===cat ? 'var(--accent)' : 'var(--border)'}`, transition:'all 0.2s ease' }}>
//               {cat}
//             </motion.button>
//           ))}
//         </motion.div>

//         {/* Skills grid */}
//         <motion.div layout
//           style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(210px,1fr))', gap: isMobile ? 8 : 10 }}>
//           <AnimatePresence mode="popLayout">
//             {filtered.map((skill,i) => (
//               <SkillCard key={skill.name} skill={skill} index={i} inView={inView} isMobile={isMobile}/>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useIsMobile } from '../../hooks/useIsMobile';
import { skills } from '../../data';

// 1. Added 'AI & ML' to the categories array
const CATS = ['All', 'Language', 'Frontend', 'Backend', 'AI & ML', 'Tools'];

// 2. Added a distinct, vibrant color for 'AI & ML'
const CAT_COLORS = { 
  Language: '#2997ff', 
  Frontend: '#bf5af2', 
  Backend: '#34c759', 
  'AI & ML': '#ff2d55', // Neon Pink/Red for AI
  Tools: '#ff9f0a' 
};

function FloatOcta({ position, color, scale, offset }) {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.getElapsedTime();
      ref.current.rotation.x = Math.sin(t*0.5+offset)*0.3;
      ref.current.rotation.y = t*0.42+offset;
    }
  });
  return (
    <Float speed={1.8+offset*0.2} rotationIntensity={0.28} floatIntensity={0.75}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[0.5,0]}/>
        <meshStandardMaterial color={color} metalness={0.88} roughness={0.1} emissive={color} emissiveIntensity={0.18}/>
      </mesh>
    </Float>
  );
}

function Octahedra() {
  const items = [
    { pos:[-3,1,0],    color:'#2997ff', scale:1.2 },
    { pos:[3,-1,-1],   color:'#bf5af2', scale:0.9 },
    { pos:[0,2,-2],    color:'#34c759', scale:0.7 },
    { pos:[-2,-2,0],   color:'#ff9f0a', scale:0.8 },
    { pos:[2.5,1.5,-1],color:'#5ac8fa', scale:0.6 },
    // 3. Added a 6th floating octahedron with the new AI & ML color
    { pos:[1,-1.5,1],  color:'#ff2d55', scale:0.85 }, 
  ];
  return (
    <>
      <ambientLight intensity={0.4}/>
      <pointLight position={[5,5,5]}   intensity={3}   color="#2997ff"/>
      <pointLight position={[-5,-3,3]} intensity={2.2} color="#bf5af2"/>
      {/* Added a subtle light to illuminate the AI shape */}
      <pointLight position={[1,-2,2]}  intensity={1.5} color="#ff2d55"/>
      {items.map((item,i) => <FloatOcta key={i} position={item.pos} color={item.color} scale={item.scale} offset={i}/>)}
    </>
  );
}

function SkillCard({ skill, index, inView, isMobile }) {
  // It will now automatically pick up '#ff2d55' for AI & ML
  const color = CAT_COLORS[skill.category] || '#2997ff';
  return (
    <motion.div layout
      initial={{ opacity:0, y:18, scale:0.95 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      exit={{ opacity:0, scale:0.9 }}
      transition={{ duration:0.32, delay:index*0.028 }}
      className="card"
      style={{ padding: isMobile ? '14px' : '18px' }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:'0.6875rem', fontWeight:700, background:`${color}12`, border:`1px solid ${color}25`, color }}>
          {skill.icon}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontWeight:600, fontSize: isMobile ? '0.875rem' : '0.9rem', color:'var(--text-1)', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{skill.name}</p>
          <p style={{ fontSize:'0.6875rem', color:'var(--text-3)', margin:0 }}>{skill.category}</p>
        </div>
        <span style={{ fontSize:'0.6875rem', fontFamily:'monospace', fontWeight:700, color, flexShrink:0 }}>{skill.level}%</span>
      </div>
      <div style={{ height:3, borderRadius:99, background:'var(--border-hover)' }}>
        <motion.div initial={{ width:0 }} animate={inView ? { width:`${skill.level}%` } : {}}
          transition={{ duration:1.25, delay:0.3+index*0.025, ease:[0.23,1,0.32,1] }}
          style={{ height:'100%', borderRadius:99, background:`linear-gradient(90deg,${color},${color}88)` }}/>
      </div>
      <p style={{ marginTop:6, fontSize:'0.625rem', textAlign:'right', fontFamily:'monospace', color:'var(--text-3)' }}>
        {skill.level>=85?'Expert':skill.level>=70?'Proficient':skill.level>=55?'Intermediate':'Learning'}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.06 });
  const isMobile = useIsMobile();
  const filtered = active==='All' ? skills : skills.filter(s => s.category===active);

  return (
    <section id="skills" ref={ref} style={{ background:'var(--bg-elevated)' }}>
      <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

        <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}}
          style={{ textAlign:'center', marginBottom:16 }}>
          <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>Skills</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
            My Tech Arsenal
          </h2>
          <p style={{ marginTop:12, fontSize: isMobile ? '0.9375rem' : '1.0625rem', color:'var(--text-2)', maxWidth:380, margin:'12px auto 0' }}>
            Tools I use to turn ideas into products
          </p>
        </motion.div>

        {/* 3D — hide on small mobile to save resources */}
        {!isMobile && (
          <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.2 }}
            style={{ height:150, marginBottom:4 }}>
            <Canvas camera={{ position:[0,0,7], fov:50 }} gl={{ antialias:true, alpha:true }} dpr={[1,1.5]}>
              <Octahedra/>
            </Canvas>
          </motion.div>
        )}

        {/* Filter pills */}
        <motion.div initial={{ opacity:0,y:8 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.22 }}
          style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, marginBottom: isMobile ? 28 : 36, marginTop: isMobile ? 24 : 0 }}>
          {CATS.map(cat => (
            <motion.button key={cat} onClick={() => setActive(cat)}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              style={{ padding: isMobile ? '7px 16px' : '8px 20px', borderRadius:99, fontSize: isMobile ? '0.8125rem' : '0.875rem', fontWeight:500, cursor:'pointer', background: active===cat ? 'var(--accent)' : 'var(--bg-card)', color: active===cat ? '#fff' : 'var(--text-2)', border:`1px solid ${active===cat ? 'var(--accent)' : 'var(--border)'}`, transition:'all 0.2s ease' }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div layout
          style={{ display:'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(210px,1fr))', gap: isMobile ? 8 : 10 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill,i) => (
              <SkillCard key={skill.name} skill={skill} index={i} inView={inView} isMobile={isMobile}/>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}