import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** Optional word index (or word substring) to render in high-contrast editorial serif italic */
  serifWord?: string;
}

/**
 * Word-by-word masked rise animation inspired by martingarrix.com editorial headers.
 */
export function RevealText({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  stagger = 0.055,
  serifWord,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.28em',
        rowGap: '0.06em',
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const isSerif =
          serifWord && word.toLowerCase().replace(/[^a-zа-яё0-9]/gi, '') === serifWord.toLowerCase();

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              paddingBottom: '0.06em',
            }}
          >
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { y: '112%', rotate: 1.5, opacity: 0 }}
              animate={
                inView || reduceMotion
                  ? { y: '0%', rotate: 0, opacity: 1 }
                  : { y: '112%', rotate: 1.5, opacity: 0 }
              }
              transition={{
                duration: 0.85,
                delay: delay + idx * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                ...(isSerif
                  ? {
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      letterSpacing: '0em',
                      fontSize: '1.12em',
                      color: '#e9d5ff',
                    }
                  : {}),
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

interface RevealImageProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  parallaxOffset?: number;
  parallax?: number;
}

/**
 * Cinematic clip-path reveal + 1.08 -> 1.0 inner scale + optional scroll parallax.
 */
export function RevealImage({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style,
  parallaxOffset = 0,
  parallax,
}: RevealImageProps) {
  const effectiveParallax = parallax !== undefined ? parallax : parallaxOffset;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || effectiveParallax === 0 ? [0, 0] : [effectiveParallax, -effectiveParallax]
  );

  const initialClip =
    direction === 'up'
      ? 'inset(92% 0% 0% 0%)'
      : direction === 'left'
      ? 'inset(0% 92% 0% 0%)'
      : 'inset(0% 0% 0% 92%)';

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        y,
        ...style,
      }}
    >
      <motion.div
        initial={
          reduceMotion
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            : { clipPath: initialClip, scale: 1.08 }
        }
        animate={
          inView || reduceMotion
            ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
            : { clipPath: initialClip, scale: 1.08 }
        }
        transition={{
          duration: 1.05,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          width: '100%',
          height: '100%',
          willChange: 'clip-path, transform',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ParallaxWatermarkProps {
  text: string;
  top?: string;
  bottom?: string;
  direction?: 1 | -1;
  speed?: number;
  opacity?: number;
}

/**
 * Giant architectural background typography that drifts horizontally on scroll.
 */
export function ParallaxWatermark({
  text,
  top = '6%',
  bottom,
  direction = 1,
  speed,
  opacity: strokeAlpha = 0.045,
}: ParallaxWatermarkProps) {
  const dir = speed !== undefined ? (speed >= 0 ? 1 : -1) : direction;
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : [`${-10 * dir}%`, `${10 * dir}%`]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: bottom ? undefined : top,
        bottom,
        left: 0,
        right: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
      }}
    >
      <motion.div
        style={{
          x,
          opacity,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4.2rem, 15vw, 14rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          color: 'transparent',
          WebkitTextStroke: `1px rgba(255, 255, 255, ${strokeAlpha})`,
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
