import { useTheme } from './hooks/useTheme';
import Navbar       from './components/Navbar';
import Hero         from './components/sections/Hero';
import About        from './components/sections/About';
import Skills       from './components/sections/Skills';
import Projects     from './components/sections/Projects';
import Education    from './components/sections/Education';
import Contact      from './components/sections/Contact';
import Footer       from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
