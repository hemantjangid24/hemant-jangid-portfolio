import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { education, certifications } from '../../data';

function DNAHelix() {
  const groupRef = useRef();
  const PTS=26, RADIUS=1.1, HEIGHT=4.6;
  useFrame((s) => { if (groupRef.current) groupRef.current.rotation.y = s.clock.getElapsedTime()*0.33; });
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5}/>
      <pointLight position={[5,5,5]}   intensity={3}   color="#2997ff"/>
      <pointLight position={[-5,-5,5]} intensity={2.2} color="#bf5af2"/>
      {Array.from({ length:PTS }, (_,i) => {
        const t=i/PTS, angle=t*Math.PI*4, y=t*HEIGHT-HEIGHT/2;
        const x1=Math.cos(angle)*RADIUS, z1=Math.sin(angle)*RADIUS;
        const x2=-Math.cos(angle)*RADIUS, z2=-Math.sin(angle)*RADIUS;
        const c1=i%2===0?'#2997ff':'#5ac8fa', c2=i%2===0?'#bf5af2':'#ff6584';
        return (
          <group key={i}>
            <mesh position={[x1,y,z1]}><sphereGeometry args={[0.08,12,12]}/><meshStandardMaterial color={c1} metalness={0.8} roughness={0.1} emissive={c1} emissiveIntensity={0.36}/></mesh>
            <mesh position={[x2,y,z2]}><sphereGeometry args={[0.08,12,12]}/><meshStandardMaterial color={c2} metalness={0.8} roughness={0.1} emissive={c2} emissiveIntensity={0.36}/></mesh>
            {i%3===0 && <mesh position={[(x1+x2)/2,y,(z1+z2)/2]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.015,0.015,RADIUS*2,8]}/><meshStandardMaterial color="#ffffff" transparent opacity={0.12}/></mesh>}
          </group>
        );
      })}
    </group>
  );
}

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.06 });
  const isMobile = useIsMobile();

  return (
    <section id="education" ref={ref} style={{ background:'var(--bg-elevated)' }}>
      <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

        <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}}
          style={{ textAlign:'center', marginBottom: isMobile ? 40 : 64 }}>
          <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>Education</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
            My Learning Journey
          </h2>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 36 : 56, alignItems:'start' }}>

          {/* LEFT — Timeline */}
          <div>
            {!isMobile && (
              <motion.div initial={{ opacity:0,scale:0.94 }} animate={inView ? { opacity:1,scale:1 } : {}} transition={{ delay:0.18 }} style={{ height:200, marginBottom:28 }}>
                <Canvas camera={{ position:[0,0,5.5], fov:48 }} gl={{ antialias:true, alpha:true }} dpr={[1,1.5]}>
                  <DNAHelix/>
                </Canvas>
              </motion.div>
            )}

            <motion.div initial={{ opacity:0,x: isMobile?0:-18 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.22 }}
              style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <div style={{ width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(41,151,255,0.12)',border:'1px solid rgba(41,151,255,0.24)',flexShrink:0 }}>
                <GraduationCap size={16} style={{ color:'var(--accent)' }}/>
              </div>
              <h3 style={{ fontSize: isMobile ? '1rem' : '1.125rem', fontWeight:600, color:'var(--text-1)' }}>Academic Background</h3>
            </motion.div>

            <div style={{ position:'relative', paddingLeft:24 }}>
              <div style={{ position:'absolute', left:8, top:0, bottom:0, width:1, background:'linear-gradient(to bottom,var(--accent),transparent)' }}/>
              {education.map((edu,i) => (
                <motion.div key={edu.degree} initial={{ opacity:0,x:-20 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.32+i*0.14 }}
                  style={{ position:'relative', marginBottom: i<education.length-1 ? 16:0 }}>
                  <div style={{ position:'absolute', left:-19, top:20, width:12,height:12,borderRadius:'50%',background:'var(--bg-elevated)',border:'2px solid var(--accent)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <div style={{ width:4,height:4,borderRadius:'50%',background:'var(--accent)' }}/>
                  </div>
                  <div className="card" style={{ padding: isMobile ? '16px' : '20px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:10 }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, marginBottom:6 }}>
                          <span style={{ fontSize:'0.625rem', fontWeight:600, padding:'2px 9px', borderRadius:99, background:edu.status==='Pursuing'?'rgba(52,199,89,0.1)':'rgba(41,151,255,0.1)', color:edu.status==='Pursuing'?'var(--green)':'var(--accent)', border:`1px solid ${edu.status==='Pursuing'?'rgba(52,199,89,0.24)':'rgba(41,151,255,0.24)'}` }}>
                            {edu.status}
                          </span>
                          <span style={{ fontSize:'0.6875rem', fontFamily:'monospace', color:'var(--text-3)' }}>{edu.duration}</span>
                        </div>
                        <h4 style={{ fontSize: isMobile ? '0.875rem' : '0.9375rem', fontWeight:600, color:'var(--text-1)', lineHeight:1.4, marginBottom:3 }}>{edu.degree}</h4>
                        <p style={{ fontSize: isMobile ? '0.8125rem' : '0.875rem', color:'var(--text-2)' }}>{edu.institution}</p>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <p style={{ fontSize: isMobile ? '1.1rem' : '1.2rem', fontWeight:700, letterSpacing:'-0.02em', color:'var(--accent)', margin:0 }}>{edu.cgpa}</p>
                        <p style={{ fontSize:'0.5625rem', fontFamily:'monospace', color:'var(--text-3)', margin:0 }}>{edu.status==='Pursuing'?'CGPA':'Score'}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
                      {edu.highlights.map(h => (
                        <span key={h} style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:'0.5875rem', fontFamily:'monospace', padding:'2px 8px', borderRadius:99, background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--text-3)' }}>
                          <CheckCircle2 size={7} style={{ color:'var(--accent)' }}/>{h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Certifications */}
          <div>
            <motion.div initial={{ opacity:0,x: isMobile?0:18 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.22 }}
              style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <div style={{ width:34,height:34,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(191,90,242,0.12)',border:'1px solid rgba(191,90,242,0.24)',flexShrink:0 }}>
                <Award size={16} style={{ color:'var(--purple)' }}/>
              </div>
              <h3 style={{ fontSize: isMobile ? '1rem' : '1.125rem', fontWeight:600, color:'var(--text-1)' }}>Certifications & Courses</h3>
            </motion.div>

            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
              {certifications.map((cert,i) => (
                <motion.div key={cert.name} initial={{ opacity:0,x: isMobile?0:20 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.32+i*0.1 }}
                  className="card" style={{ padding: isMobile ? '14px 15px' : '16px 18px', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:40,height:40,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.25rem',flexShrink:0,background:`${cert.color}12`,border:`1px solid ${cert.color}25` }}>
                    {cert.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h4 style={{ fontSize: isMobile ? '0.8125rem' : '0.9rem', fontWeight:600, color:'var(--text-1)', lineHeight:1.35, marginBottom:2 }}>{cert.name}</h4>
                    <p style={{ fontSize: isMobile ? '0.75rem' : '0.8rem', color:'var(--text-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>{cert.issuer}</p>
                  </div>
                  <span style={{ flexShrink:0, fontSize:'0.625rem', fontFamily:'monospace', padding:'3px 9px', borderRadius:99, background:`${cert.color}12`, border:`1px solid ${cert.color}25`, color:cert.color }}>
                    {cert.date}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.78 }}
              className="card" style={{ padding: isMobile ? '18px' : '22px', border:'1px solid rgba(41,151,255,0.18)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:12 }}>
                <BookOpen size={13} style={{ color:'var(--accent)' }}/>
                <p style={{ fontSize:'0.6875rem', fontFamily:'monospace', fontWeight:600, color:'var(--accent)', letterSpacing:'0.04em', margin:0 }}>Currently Learning</p>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {['Next.js 14','FastAPI','Generative AI','AWS / Google Cloud','Pytorch','React.js'].map(item => (
                  <span key={item} style={{ fontSize: isMobile ? '0.75rem' : '0.8125rem', fontFamily:'monospace', padding:'5px 12px', borderRadius:99, background:'rgba(41,151,255,0.07)', border:'1px solid rgba(41,151,255,0.18)', color:'var(--accent)' }}>{item}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
