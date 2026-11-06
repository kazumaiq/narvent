import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import BackgroundScene from './scenes/BackgroundScene';
import SmoothScroll from './components/SmoothScroll';
import AudioBar from './components/AudioBar';

import Hero from './sections/Hero';
import LatestReleases from './sections/LatestReleases';
import PopularReleases from './sections/PopularReleases';
import MusicArchive from './sections/MusicArchive';
import KageSanctuary from './sections/KageSanctuary';
import About from './sections/About';
import SocialUniverse from './sections/SocialUniverse';
import Footer from './sections/Footer';

function ScrollGradientOverlay() {
  const [hue, setHue] = useState(240);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      // Transition from deep blue (240) through violet (275) to magenta (310)
      const newHue = 240 + scrollFraction * 70;
      setHue(newHue);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(ellipse at 50% 40%, hsla(${hue}, 75%, 10%, 0.22) 0%, transparent 75%)`,
        transition: 'background 0.5s ease',
      }}
    />
  );
}

function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'glow' }) {
  return (
    <div
      style={{
        width: '100%',
        padding: 'clamp(1.5rem, 3vh, 3rem) 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 'clamp(50px, 8vw, 100px)',
          height: '1px',
          background: variant === 'glow'
            ? 'linear-gradient(90deg, transparent, rgba(217, 70, 239, 0.45), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.35), transparent)',
        }}
      />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 450);
          return 100;
        }
        const step = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + step, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-void)' }}>
      {/* Cinematic Loading Screen */}
      <AnimatePresence>
        {loading && <Loader progress={progress} />}
      </AnimatePresence>

      {/* 3D Deep Cosmic Background Engine */}
      <BackgroundScene />

      {/* Dynamic Scroll-reactive Ambient Tint */}
      <ScrollGradientOverlay />

      {/* Kinetic Grain Texture Overlay */}
      <div className="ambient-grain" />

      {/* Navigation & Audio Controls */}
      <Navigation />
      <AudioBar />

      {/* Smooth Scroll Content Pipeline */}
      <SmoothScroll>
        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <SectionDivider />
          <LatestReleases />
          <SectionDivider variant="glow" />
          <PopularReleases />
          <SectionDivider />
          <MusicArchive />
          <SectionDivider variant="glow" />
          <KageSanctuary />
          <SectionDivider />
          <About />
          <SectionDivider variant="glow" />
          <SocialUniverse />
          <Footer />
        </main>
      </SmoothScroll>
    </div>
  );
}
