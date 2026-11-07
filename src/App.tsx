import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
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
import { HeroMarquee, TransitionMarquee } from './components/MarqueeTicker';

function ScrollGradientOverlay() {
  const [hue, setHue] = useState(240);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      // Плавный переход от космического синего (240) через индиго (265) к мадженте (305)
      const newHue = 240 + scrollFraction * 65;
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

/** Soft animated spacer between sections — subtle gradient fade, no dots/lines */
function SectionSpacer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8 }}
      style={{
        width: '100%',
        height: 'clamp(3rem, 6vh, 5rem)',
        position: 'relative',
        zIndex: 2,
      }}
    />
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
    <LanguageProvider>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-void)' }}>
        {/* Экран кинематографичной загрузки */}
        <AnimatePresence>
          {loading && <Loader progress={progress} />}
        </AnimatePresence>

        {/* Глубокий 3D-фон космических частиц */}
        <BackgroundScene />

        {/* Динамический атмосферный градиент скролла */}
        <ScrollGradientOverlay />

        {/* Текстура зернистости */}
        <div className="ambient-grain" />

        {/* Навигация и звуковая панель */}
        <Navigation />
        <AudioBar />

        {/* Основной поток разделов Narvent */}
        <SmoothScroll>
          <main style={{ position: 'relative', zIndex: 2 }}>
            {/* 01. ГЛАВНАЯ */}
            <Hero />

            {/* 3-ROW ANIMATED MARQUEE TICKER (EDITORIAL BROADCAST) */}
            <HeroMarquee />
            <SectionSpacer />

            {/* 02. НОВЫЕ РЕЛИЗЫ */}
            <LatestReleases />
            <SectionSpacer />

            {/* 03. ПОПУЛЯРНОЕ */}
            <PopularReleases />
            <SectionSpacer />

            {/* TRANSITION TICKER TO 3D ARCHIVE */}
            <TransitionMarquee />

            {/* 04. 3D АРХИВ */}
            <MusicArchive />
            <SectionSpacer />

            {/* 05. ОБ АРТИСТЕ */}
            <About />
            <SectionSpacer />

            {/* 06. СОЦИАЛЬНЫЕ СЕТИ */}
            <SocialUniverse />

            {/* ФУТЕР */}
            <Footer />
          </main>
        </SmoothScroll>
      </div>
    </LanguageProvider>
  );
}
