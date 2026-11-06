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
import About from './sections/About';
import SocialUniverse from './sections/SocialUniverse';
import Footer from './sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 12;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#03030a' }}>
      {/* Cinematic Loading Experience */}
      <AnimatePresence>
        {loading && <Loader progress={progress} />}
      </AnimatePresence>

      {/* 3D WebGL Background Galaxy & Volumetric Nebula */}
      <BackgroundScene />

      {/* Subtle Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Volumetric Radial Ambient Atmosphere */}
      <div className="ambient-fog" />

      {/* Navigation & Audio Controls */}
      <Navigation />
      <AudioBar />

      {/* Smooth Scroll Content Pipeline */}
      <SmoothScroll>
        <main style={{ position: 'relative', zIndex: 2 }}>
          <Hero />
          <LatestReleases />
          <PopularReleases />
          <MusicArchive />
          <About />
          <SocialUniverse />
          <Footer />
        </main>
      </SmoothScroll>
    </div>
  );
}
