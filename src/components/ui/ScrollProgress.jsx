import { useScroll, useSpring, motion } from 'framer-motion';
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:120, damping:30 });
  return (
    <motion.div style={{ scaleX, position:'fixed', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,#2997ff,#bf5af2,#5ac8fa)', transformOrigin:'0%', zIndex:9999 }} />
  );
}
