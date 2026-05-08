import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star } from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { projects } from '../../data';

const FILTERS = ['All','Full Stack','Frontend','AI/ML'];

const FeaturedCard = forwardRef(function FeaturedCard({ project:p, index, inView, isMobile, ...rest }, ref) {
  const even = index % 2 === 0;
  return (
    <motion.div ref={ref} {...rest} layout
      initial={{ opacity:0, y:32 }} animate={inView ? { opacity:1, y:0 } : {}}
      exit={{ opacity:0, scale:0.96 }} transition={{ duration:0.45, delay:index*0.1 }}
      className="card" style={{ borderRadius:20, overflow:'hidden' }}>
      <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        {/* Visual */}
        <div style={{ position:'relative', minHeight: isMobile ? 180 : 260, display:'flex', alignItems:'center', justifyContent:'center', background:`linear-gradient(135deg,${p.color}12,${p.color}04)`, order: (!isMobile && !even) ? 1 : 0, overflow:'hidden' }}>
          <motion.div animate={{ scale:[1,1.07,1], rotate:[0,3,0] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut' }}
            style={{ fontSize: isMobile ? '4rem' : '5rem', userSelect:'none' }}>
            {p.emoji}
          </motion.div>
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:`radial-gradient(circle at 30% 70%,${p.color}20 0%,transparent 60%)` }}/>
          <span style={{ position:'absolute', top:12, left:12, display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:99, fontSize:'0.625rem', fontWeight:600, background:`${p.color}18`, border:`1px solid ${p.color}35`, color:p.color }}>
            <Star size={8} fill="currentColor"/> Featured
          </span>
        </div>
        {/* Content */}
        <div style={{ padding: isMobile ? '20px' : '28px', display:'flex', flexDirection:'column', justifyContent:'space-between', order: (!isMobile && !even) ? 0 : 1 }}>
          <div>
            <p style={{ fontSize:'0.625rem', fontFamily:'monospace', color:p.color, marginBottom:6, letterSpacing:'0.06em', textTransform:'uppercase' }}>{p.category}</p>
            <h3 style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight:700, letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:8, lineHeight:1.2 }}>{p.title}</h3>
            <p style={{ fontSize: isMobile ? '0.875rem' : '0.9375rem', lineHeight:1.7, color:'var(--text-2)', marginBottom:16 }}>{isMobile ? p.description : p.longDescription}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
              {p.tech.map(t => (
                <span key={t} style={{ padding:'3px 9px', borderRadius:99, fontSize:'0.6875rem', fontFamily:'monospace', background:`${p.color}10`, border:`1px solid ${p.color}25`, color:p.color }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <motion.a href={p.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.04 }}
              className="btn-ghost" style={{ padding:'9px 16px', fontSize:'0.8125rem', textDecoration:'none' }}>
              <Github size={13}/> Code
            </motion.a>
            <motion.a href={p.live} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.04 }}
              className="btn-cta" style={{ padding:'9px 16px', fontSize:'0.8125rem', background:p.color, textDecoration:'none' }}>
              <ExternalLink size={13}/> Live Demo
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const SmallCard = forwardRef(function SmallCard({ project:p, index, inView, isMobile, ...rest }, ref) {
  return (
    <motion.div ref={ref} {...rest} layout
      initial={{ opacity:0, y:22 }} animate={inView ? { opacity:1, y:0 } : {}}
      exit={{ opacity:0, scale:0.94 }} transition={{ duration:0.35, delay:index*0.07 }}
      className="card" style={{ padding: isMobile ? '16px' : '20px', display:'flex', flexDirection:'column', borderRadius:18 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
        <div style={{ width:42, height:42, borderRadius:11, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', background:`${p.color}12`, border:`1px solid ${p.color}25` }}>
          {p.emoji}
        </div>
        <div style={{ display:'flex', gap:9 }}>
          {[{icon:Github,href:p.github},{icon:ExternalLink,href:p.live}].map(({icon:Icon,href},i) => (
            <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.15 }}
              style={{ color:'var(--text-3)', textDecoration:'none', display:'flex', transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text-3)'}>
              <Icon size={15}/>
            </motion.a>
          ))}
        </div>
      </div>
      <p style={{ fontSize:'0.625rem', fontFamily:'monospace', color:p.color, marginBottom:4, letterSpacing:'0.06em', textTransform:'uppercase' }}>{p.category}</p>
      <h3 style={{ fontSize: isMobile ? '1rem' : '1.0625rem', fontWeight:600, letterSpacing:'-0.015em', color:'var(--text-1)', marginBottom:6, lineHeight:1.3 }}>{p.title}</h3>
      <p style={{ fontSize: isMobile ? '0.8125rem' : '0.875rem', lineHeight:1.65, color:'var(--text-2)', flex:1, marginBottom:12 }}>{p.description}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
        {p.tech.slice(0,3).map(t => (
          <span key={t} style={{ padding:'3px 8px', borderRadius:99, fontSize:'0.625rem', fontFamily:'monospace', background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--text-3)' }}>{t}</span>
        ))}
        {p.tech.length>3 && <span style={{ padding:'3px 8px', borderRadius:99, fontSize:'0.625rem', fontFamily:'monospace', background:'var(--bg-elevated)', border:'1px solid var(--border)', color:'var(--text-3)' }}>+{p.tech.length-3}</span>}
      </div>
    </motion.div>
  );
});

export default function Projects() {
  const [active, setActive] = useState('All');
  const [ref, inView] = useInView({ triggerOnce:true, threshold:0.05 });
  const isMobile = useIsMobile();
  const filtered  = active==='All' ? projects : projects.filter(p => p.category===active);
  const featured  = filtered.filter(p => p.featured);
  const small     = filtered.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} style={{ background:'var(--bg)' }}>
      <div style={{ width:'100%', maxWidth:1200, margin:'0 auto', padding: isMobile ? '64px 20px' : '96px 24px' }}>

        <motion.div initial={{ opacity:0,y:14 }} animate={inView ? { opacity:1,y:0 } : {}} style={{ textAlign:'center', marginBottom:16 }}>
          <span className="chip" style={{ marginBottom:14, display:'inline-flex' }}>Projects</span>
          <h2 style={{ fontSize: isMobile ? 'clamp(1.8rem,7vw,2.4rem)' : 'clamp(2rem,5vw,4rem)', fontWeight:700, letterSpacing:'-0.035em', lineHeight:1.06, color:'var(--text-1)' }}>
            Things I've Built
          </h2>
          <p style={{ marginTop:12, fontSize: isMobile ? '0.9375rem' : '1.0625rem', color:'var(--text-2)', maxWidth:400, margin:'12px auto 0' }}>
            A selection of work that reflects my craft and curiosity
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.18 }}
          style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:7, margin: isMobile ? '24px 0 32px' : '0 0 40px' }}>
          {FILTERS.map(f => (
            <motion.button key={f} onClick={() => setActive(f)} whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              style={{ padding: isMobile ? '7px 14px' : '8px 20px', borderRadius:99, fontSize: isMobile ? '0.8125rem' : '0.875rem', fontWeight:500, cursor:'pointer', background: active===f ? 'var(--accent)' : 'var(--bg-card)', color: active===f ? '#fff' : 'var(--text-2)', border:`1px solid ${active===f ? 'var(--accent)' : 'var(--border)'}`, transition:'all 0.2s ease' }}>
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:12 }}>
            <AnimatePresence mode="popLayout">
              {featured.map((p,i) => <FeaturedCard key={p.id} project={p} index={i} inView={inView} isMobile={isMobile}/>)}
            </AnimatePresence>
          </div>
        )}

        {/* Small cards */}
        {small.length > 0 && (
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill,minmax(280px,1fr))', gap: isMobile ? 10 : 12 }}>
            <AnimatePresence mode="popLayout">
              {small.map((p,i) => <SmallCard key={p.id} project={p} index={i} inView={inView} isMobile={isMobile}/>)}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
