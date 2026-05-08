import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { personalInfo } from '../data';

export default function Footer() {
  const isMobile = useIsMobile();
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' });

  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding: isMobile ? '28px 20px' : '36px 24px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', flexDirection: isMobile ? 'column' : 'row', alignItems:'center', justifyContent:'space-between', gap: isMobile ? 16 : 0 }}>

          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }} onClick={scrollTop}
            style={{ display:'flex', alignItems:'center', gap:9, background:'none', border:'none', cursor:'pointer' }}>
            <div style={{ width:27,height:27,borderRadius:8,background:'linear-gradient(135deg,#2997ff,#bf5af2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.65rem',fontWeight:700,color:'#fff' }}>HJ</div>
            <span style={{ fontSize:'0.875rem', fontWeight:600, letterSpacing:'-0.01em', color:'var(--text-1)' }}>
              {personalInfo.firstName}<span style={{ color:'var(--accent)' }}>.</span>dev
            </span>
          </motion.button>

          <p style={{ display:'flex', alignItems:'center', gap:5, fontSize:'0.8125rem', color:'var(--text-3)', fontFamily:'monospace', textAlign:'center' }}>
            Crafted with
            <motion.span animate={{ scale:[1,1.35,1] }} transition={{ repeat:Infinity, duration:1.6 }}>
              <Heart size={12} fill="#ff453a" style={{ color:'#ff453a' }}/>
            </motion.span>
            by {personalInfo.name}
          </p>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            {[{icon:Github,href:personalInfo.social.github},{icon:Linkedin,href:personalInfo.social.linkedin},{icon:Twitter,href:personalInfo.social.twitter}].map(({icon:Icon,href},i) => (
              <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale:1.12,y:-2 }}
                style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-card)',border:'1px solid var(--border)',color:'var(--text-3)',textDecoration:'none' }}>
                <Icon size={13}/>
              </motion.a>
            ))}
            <motion.button onClick={scrollTop} whileHover={{ scale:1.1,y:-2 }} whileTap={{ scale:0.9 }}
              style={{ width:32,height:32,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--accent)',color:'#fff',border:'none',cursor:'pointer',marginLeft:4 }}>
              <ArrowUp size={13}/>
            </motion.button>
          </div>
        </div>

        <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid var(--border)', display:'flex', flexWrap:'wrap', gap:8, justifyContent:'space-between', alignItems:'center' }}>
          <p style={{ fontSize:'0.6875rem', fontFamily:'monospace', color:'var(--text-3)' }}>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p style={{ fontSize:'0.6875rem', fontFamily:'monospace', color:'var(--text-3)' }}>
            React + Vite · Three.js · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
