import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { personalInfo } from '../data';

const NAV_LINKS = [
  { label: 'About',     href: '#about'     },
  { label: 'Skills',    href: '#skills'    },
  { label: 'Projects',  href: '#projects'  },
  { label: 'Education', href: '#education' },
  { label: 'Contact',   href: '#contact'   },
];

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isMobile                = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  const navTo = useCallback((href) => {
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 60);
  }, []);

  const navBg = scrolled
    ? theme === 'dark' ? 'rgba(6,6,8,0.85)' : 'rgba(245,245,247,0.85)'
    : 'transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.23,1,0.32,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          backdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
          background: navBg,
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 24px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{ display:'flex', alignItems:'center', gap:9, background:'none', border:'none', cursor:'pointer', padding:0 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:'linear-gradient(135deg,#2997ff,#bf5af2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:700, color:'#fff', flexShrink:0 }}>HJ</div>
            <span style={{ fontSize:'0.9375rem', fontWeight:600, letterSpacing:'-0.02em', color:'var(--text-1)', whiteSpace:'nowrap' }}>
              {personalInfo.firstName}<span style={{ color:'var(--accent)' }}>.</span>dev
            </span>
          </motion.button>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display:'flex', alignItems:'center', gap:2 }}>
              {NAV_LINKS.map((l,i) => (
                <motion.button key={l.label} onClick={() => navTo(l.href)}
                  initial={{ opacity:0,y:-8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.06*i }}
                  style={{ padding:'6px 13px', borderRadius:8, fontSize:'0.875rem', fontWeight:400, color:'var(--text-2)', background:'none', border:'none', cursor:'pointer', transition:'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                >{l.label}</motion.button>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <motion.button onClick={toggleTheme} whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
              style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', background:'var(--bg-card)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
              aria-label="Toggle theme">
              <AnimatePresence mode="wait">
                <motion.span key={theme} initial={{ rotate:-90,opacity:0 }} animate={{ rotate:0,opacity:1 }} exit={{ rotate:90,opacity:0 }} transition={{ duration:0.18 }} style={{ display:'flex' }}>
                  {theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {!isMobile && (
              <motion.a href={personalInfo.resumeUrl} download
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                className="btn-cta" style={{ padding:'8px 18px', fontSize:'0.8125rem' }}>
                <Download size={14}/> Resume
              </motion.a>
            )}

            {isMobile && (
              <motion.button onClick={() => setOpen(o => !o)} whileTap={{ scale:0.92 }}
                style={{ width:36, height:36, borderRadius:'50%', border:'1px solid var(--border)', background:'var(--bg-card)', color:'var(--text-1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}
                aria-label="Toggle menu">
                {open ? <X size={16}/> : <Menu size={16}/>}
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && isMobile && (
          <>
            <motion.div key="backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setOpen(false)}
              style={{ position:'fixed', inset:0, zIndex:198, background:'rgba(0,0,0,0.45)', backdropFilter:'blur(4px)' }}/>
            <motion.div key="drawer" initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-10 }} transition={{ duration:0.22 }}
              style={{ position:'fixed', top:56, left:0, right:0, zIndex:199, background:'var(--bg-card)', borderBottom:'1px solid var(--border)', padding:'12px 16px 18px' }}>
              {NAV_LINKS.map((l,i) => (
                <motion.button key={l.label} onClick={() => navTo(l.href)}
                  initial={{ opacity:0,x:-12 }} animate={{ opacity:1,x:0 }} transition={{ delay:i*0.04 }}
                  style={{ display:'block', width:'100%', textAlign:'left', padding:'12px 14px', borderRadius:10, fontSize:'1rem', color:'var(--text-1)', background:'none', border:'none', cursor:'pointer' }}>
                  {l.label}
                </motion.button>
              ))}
              <a href={personalInfo.resumeUrl} download className="btn-cta"
                style={{ display:'flex', width:'100%', marginTop:10, justifyContent:'center', boxSizing:'border-box' }}>
                <Download size={15}/> Download Resume
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
