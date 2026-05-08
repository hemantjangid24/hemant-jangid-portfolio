import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, GraduationCap, Cloud, Zap } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { personalInfo } from '../../data';

function TwinRings() {
  const r1=useRef(), r2=useRef(), sphere=useRef();
  useFrame((state) => {
    const t=state.clock.getElapsedTime();
    if(r1.current){r1.current.rotation.x=t*0.38;r1.current.rotation.y=t*0.55;}
    if(r2.current){r2.current.rotation.x=-t*0.55;r2.current.rotation.z=t*0.32;}
    if(sphere.current){sphere.current.rotation.y=t*0.6;}
  });
  return (
    <>
      <ambientLight intensity={0.45}/>
      <pointLight position={[5,5,5]} intensity={3} color="#2997ff"/>
      <pointLight position={[-5,-5,5]} intensity={2.2} color="#bf5af2"/>
      <mesh ref={r1}><torusGeometry args={[1.7,0.055,32,120]}/><meshStandardMaterial color="#2997ff" metalness={1} roughness={0} emissive="#2997ff" emissiveIntensity={0.28}/></mesh>
      <mesh ref={r2} rotation={[Math.PI/3,0,Math.PI/6]}><torusGeometry args={[1.15,0.04,32,100]}/><meshStandardMaterial color="#bf5af2" metalness={1} roughness={0} emissive="#bf5af2" emissiveIntensity={0.28}/></mesh>
      <mesh ref={sphere}><sphereGeometry args={[0.32,32,32]}/><meshStandardMaterial color="#5ac8fa" metalness={0.9} roughness={0.1}/></mesh>
    </>
  );
}

const HIGHLIGHTS = [
  { icon:GraduationCap, label:'B.Tech CSE',   sub:'Class of 2027',   color:'#2997ff' },
  { icon:MapPin,        label:'Jaipur, India', sub:'Rajasthan',       color:'#bf5af2' },
 { icon: Cloud,         label: 'OCI Certified',   sub: 'Cloud Infrastructure',color: '#bf5af2' },
  { icon:Zap,           label:'5+ Projects',  sub:'Built & shipped', color:'#34c759' },
];

const TECH = ['JavaScript (ES6+)','React.js','Node.js','Python','MongoDB','PostgreSQL','Git & GitHub','Docker'];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.06 });
  const isMobile = useIsMobile();

  return (
    <section id="about" ref={ref} style={{ background:'var(--bg)' }}>
      <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

        <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}}
          style={{ textAlign:'center', marginBottom: isMobile ? 40 : 64 }}>
          <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>About Me</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
            More than just code
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 64, alignItems:'start' }}>
          {/* LEFT */}
          <motion.div initial={{ opacity:0,x:isMobile?0:-28 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.18 }}>
            {!isMobile && (
              <div style={{ height:230, marginBottom:36 }}>
                <Canvas camera={{ position:[0,0,5],fov:46 }} gl={{ antialias:true,alpha:true }} dpr={[1,1.5]}>
                  <TwinRings/>
                </Canvas>
              </div>
            )}
            <p style={{ fontSize: isMobile ? '0.9375rem' : '1.0625rem', lineHeight:1.78, color:'var(--text-2)', marginBottom:14 }}>
              {personalInfo.longBio}
            </p>
            <p style={{ fontSize: isMobile ? '0.9375rem' : '1.0625rem', lineHeight:1.78, color:'var(--text-2)', marginBottom:24 }}>
              Particularly interested in <span style={{ color:'var(--accent)' }}>full-stack web development</span>, <span style={{ color:'var(--purple)' }}>AI/ML integrations</span>, and open-source.
            </p>
            <p style={{ fontSize:'0.75rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:12, letterSpacing:'0.04em' }}>// Technologies I work with</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px 14px' }}>
              {TECH.map((tech,i) => (
                <motion.div key={tech} initial={{ opacity:0,x:-8 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.35+i*0.04 }}
                  style={{ fontSize: isMobile ? '0.8125rem' : '0.875rem', fontFamily:'monospace', color:'var(--text-2)', display:'flex', alignItems:'center', gap:7 }}>
                  <span style={{ color:'var(--accent)',flexShrink:0 }}>▹</span>{tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity:0,x:isMobile?0:28 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.25 }}
            style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {HIGHLIGHTS.map((h,i) => (
                <motion.div key={h.label} initial={{ opacity:0,scale:0.9 }} animate={inView ? { opacity:1,scale:1 } : {}} transition={{ delay:0.4+i*0.08 }}
                  className="card" style={{ padding: isMobile ? '16px' : '20px' }}>
                  <div style={{ width:38,height:38,borderRadius:10,marginBottom:10,background:`${h.color}13`,border:`1px solid ${h.color}28`,display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <h.icon size={16} style={{ color:h.color }}/>
                  </div>
                  <p style={{ fontWeight:600, fontSize: isMobile ? '0.875rem' : '0.9375rem', color:'var(--text-1)', marginBottom:2 }}>{h.label}</p>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-2)' }}>{h.sub}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.72 }}
              className="card" style={{ padding: isMobile ? '18px' : '24px' }}>
              <p style={{ fontSize:'0.75rem', fontFamily:'monospace', color:'var(--accent)', marginBottom:14, letterSpacing:'0.04em' }}>// Deep-diving right now</p>
              {[{label:'Advanced DSA',p:75},{label:'Scalable System Design',p:62},{label:'Cloud Architecture (OCI)',p:50},{label:'Generative AI Integration',p:44}].map((item,i) => (
                <div key={item.label} style={{ marginBottom:i<3?13:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize: isMobile ? '0.8125rem' : '0.875rem', color:'var(--text-1)' }}>{item.label}</span>
                    <span style={{ fontSize:'0.75rem', fontFamily:'monospace', color:'var(--accent)' }}>{item.p}%</span>
                  </div>
                  <div style={{ height:3, borderRadius:99, background:'var(--border-hover)' }}>
                    <motion.div initial={{ width:0 }} animate={inView ? { width:`${item.p}%` } : {}} transition={{ duration:1.3, delay:0.8+i*0.1, ease:[0.23,1,0.32,1] }}
                      style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,#2997ff,#bf5af2)' }}/>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
