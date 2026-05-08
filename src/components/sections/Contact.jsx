import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { personalInfo } from '../../data';

function Envelope() {
  const groupRef = useRef();
  useFrame((s) => {
    if (groupRef.current) {
      const t = s.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t*0.45)*0.4;
      groupRef.current.rotation.x = Math.cos(t*0.3)*0.18;
    }
  });
  return (
    <>
      <ambientLight intensity={0.4}/>
      <pointLight position={[5,5,5]}   intensity={3}   color="#2997ff"/>
      <pointLight position={[-5,-3,5]} intensity={2.2} color="#bf5af2"/>
      <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.9}>
        <group ref={groupRef}>
          <mesh><boxGeometry args={[2.4,1.55,0.08]}/><meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.4}/></mesh>
          <mesh position={[0,0.48,0.05]} rotation={[0.58,0,0]}><boxGeometry args={[2.4,1.2,0.04]}/><meshStandardMaterial color="#2997ff" metalness={0.6} roughness={0.2} transparent opacity={0.68} emissive="#2997ff" emissiveIntensity={0.18}/></mesh>
          <mesh position={[0,-0.12,0.1]}><torusGeometry args={[0.33,0.055,16,48]}/><meshStandardMaterial color="#5ac8fa" metalness={0.9} roughness={0.05} emissive="#5ac8fa" emissiveIntensity={0.5}/></mesh>
        </group>
      </Float>
    </>
  );
}

const SOCIALS = [
  { icon:Github,   label:'GitHub',   href:personalInfo.social.github,            color:'#f5f5f7' },
  { icon:Linkedin, label:'LinkedIn', href:personalInfo.social.linkedin,           color:'#0a66c2' },
  { icon:Twitter,  label:'Twitter',  href:personalInfo.social.twitter,            color:'#1d9bf0' },
  { icon:Mail,     label:'Email',    href:`mailto:${personalInfo.email}`,         color:'#34c759' },
];

const INFO = [
  { icon:Mail,   label:'Email',    value:personalInfo.email,    color:'#2997ff' },
  { icon:Phone,  label:'Phone',    value:personalInfo.phone,    color:'var(--purple)' },
  { icon:MapPin, label:'Location', value:personalInfo.location, color:'#ff9f0a' },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.06 });
  const isMobile = useIsMobile();
  const [form, setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault(); setStatus('sending');
    setTimeout(() => { setStatus('sent'); setForm({ name:'', email:'', subject:'', message:'' }); setTimeout(()=>setStatus('idle'),4000); }, 1500);
  };

  return (
    <section id="contact" ref={ref} style={{ background:'var(--bg)' }}>
      <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

        <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} style={{ textAlign:'center', marginBottom: isMobile ? 40 : 64 }}>
          <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>Contact</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
            Let's Work Together
          </h2>
          <p style={{ marginTop:12, fontSize: isMobile ? '0.9375rem' : '1.0625rem', color:'var(--text-2)', maxWidth:440, margin:'12px auto 0' }}>
            Have a project, opportunity, or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr', gap: isMobile ? 28 : 36, alignItems:'start' }}>

          {/* LEFT — info */}
          <motion.div initial={{ opacity:0,x: isMobile?0:-22 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.18 }}
            style={{ display:'flex', flexDirection:'column', gap:10 }}>

            {!isMobile && (
              <div style={{ height:180, marginBottom:6 }}>
                <Canvas camera={{ position:[0,0,5], fov:50 }} gl={{ antialias:true, alpha:true }} dpr={[1,1.5]}>
                  <Envelope/>
                </Canvas>
              </div>
            )}

            {INFO.map((item,i) => (
              <motion.div key={item.label} initial={{ opacity:0,y:10 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.28+i*0.08 }}
                className="card" style={{ padding: isMobile ? '13px 15px' : '14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:35,height:35,borderRadius:9,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:`${item.color}12`,border:`1px solid ${item.color}25` }}>
                  <item.icon size={14} style={{ color:item.color }}/>
                </div>
                <div style={{ minWidth:0, flex:1 }}>
                  <p style={{ fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', margin:0 }}>{item.label}</p>
                  <p style={{ fontSize: isMobile ? '0.8125rem' : '0.875rem', fontWeight:500, color:'var(--text-1)', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity:0,y:10 }} animate={inView ? { opacity:1,y:0 } : {}} transition={{ delay:0.55 }}
              className="card" style={{ padding: isMobile ? '16px' : '18px' }}>
              <p style={{ fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:11, letterSpacing:'0.06em' }}>FIND ME ON</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                {SOCIALS.map(s => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.04,y:-2 }}
                    style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 10px', borderRadius:9, textDecoration:'none', background:'var(--bg-elevated)', border:'1px solid var(--border)' }}>
                    <s.icon size={13} style={{ color:s.color, flexShrink:0 }}/>
                    <span style={{ fontSize: isMobile ? '0.75rem' : '0.8125rem', fontWeight:500, color:'var(--text-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.label}</span>
                    <ArrowRight size={9} style={{ color:'var(--text-3)', marginLeft:'auto', flexShrink:0 }}/>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div initial={{ opacity:0,x: isMobile?0:22 }} animate={inView ? { opacity:1,x:0 } : {}} transition={{ delay:0.26 }}>
            <form onSubmit={handleSubmit} className="card"
              style={{ padding: isMobile ? '20px' : '32px', borderRadius:20, display:'flex', flexDirection:'column', gap:14 }}>

              <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:12 }}>
                <div>
                  <label style={{ display:'block', fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em' }}>YOUR NAME *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="input-field"/>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em' }}>EMAIL *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="input-field"/>
                </div>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em' }}>SUBJECT</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Project inquiry / Internship / Just saying hi!" className="input-field"/>
              </div>

              <div>
                <label style={{ display:'block', fontSize:'0.625rem', fontFamily:'monospace', color:'var(--text-3)', marginBottom:6, letterSpacing:'0.05em' }}>MESSAGE *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={isMobile ? 4 : 5} placeholder="Tell me about your project or idea…" className="input-field"/>
              </div>

              <motion.button type="submit" disabled={status==='sending'||status==='sent'}
                whileHover={status==='idle'?{scale:1.02}:{}} whileTap={status==='idle'?{scale:0.98}:{}}
                className="btn-cta"
                style={{ width:'100%', padding:14, fontSize:'0.9375rem', fontWeight:600, opacity:status==='sending'?0.76:1, background:status==='sent'?'#34c759':undefined }}>
                {status==='idle'    && <><Send size={14}/> Send Message</>}
                {status==='sending' && <><motion.div animate={{ rotate:360 }} transition={{ repeat:Infinity,duration:0.75,ease:'linear' }} style={{ width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%' }}/> Sending…</>}
                {status==='sent'    && <><CheckCircle size={14}/> Message Sent! 🎉</>}
              </motion.button>

              <p style={{ textAlign:'center', fontSize:'0.75rem', fontFamily:'monospace', color:'var(--text-3)' }}>
                I typically respond within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
