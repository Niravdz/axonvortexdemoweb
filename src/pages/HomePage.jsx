import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BRAND, PHILOSOPHY_PILLARS } from '../data/axonvortexData';
import { PhilosophyThreeScene } from '../components/PhilosophyThreeScene';
import { SantalDoorBlueprint } from '../components/SantalDoorBlueprint';
import {
  SantalApproachParallax,
  SantalWorksParallax,
  SantalServicesHorizontalParallax,
  SantalProcessParallax,
  SantalCompanyGlobeParallax
} from '../components/SantalParallaxSections';
import { SlideText } from '../components/SlideText';
import { SantalSplitWords } from '../components/SantalSplitText';

gsap.registerPlugin(ScrollTrigger);

export function HomePage({ theme, onNavigate, onOpenEnquiry }) {
  const heroRef = useRef(null);

  // Hero scroll state (diagonal rotating line angle + tagline parallax offset)
  const [heroAngle, setHeroAngle] = useState(-152);
  const [heroTaglineY, setHeroTaglineY] = useState(0);
  const [heroMasked, setHeroMasked] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const computeBaseAngle = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      return Math.atan2(h, w) * (180 / Math.PI) - 180;
    };

    let baseAngle = computeBaseAngle();
    setHeroAngle(baseAngle);

    // 1. Entrance animation of Hero Grid Lines (`clipPath: inset(0 0 100% 0) -> inset(0% 0% 0% 0%)`)
    const lines = heroEl.querySelectorAll('.santal-hero-grid-line');
    gsap.fromTo(
      lines,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        stagger: 0.2,
        delay: 0.15,
        ease: 'power1.out'
      }
    );

    // 2. Hero ScrollTrigger: rotates diagonal line (--angle) & translates tagline container
    const heroST = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        setHeroAngle(baseAngle * (1 - Math.min(1, p * 1.45)));
        setHeroTaglineY(p * window.innerHeight * 0.62);
        setHeroMasked(p > 0.08);
      }
    });

    const onResize = () => {
      baseAngle = computeBaseAngle();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      heroST.kill();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const philosophyData = {
    stages: PHILOSOPHY_PILLARS.map((p) => ({
      id: p.index,
      caption: p.subtitle,
      title: `${p.santalKeyword} — ${p.title}`,
      body: `${p.description} ${p.detail}`
    }))
  };

  return (
    <main id="main-page">
      {/* ====================================================================
          01. #HERO — SANTALARCH STICKY TAGLINE MASK + ROTATING DIAGONAL LINE
          ==================================================================== */}
      <section
        ref={heroRef}
        id="hero"
        className="santal-hero"
        style={{ '--angle': `${heroAngle.toFixed(3)}deg` }}
      >
        {/* Sticky Hero Grid Lines (12.5%, 62.5%, and Rotating Diagonal Line) */}
        <div className="santal-hero-grid">
          <div className="santal-hero-grid-line santal-hero-grid-line--1" />
          <div className="santal-hero-grid-line santal-hero-grid-line--2" />
          <div className="santal-hero-grid-line santal-hero-grid-line--diag" />
        </div>

        {/* Sticky Masked Tagline Layer (.tagline-wrap) */}
        <div
          className={`santal-tagline-wrap ${heroMasked ? 'is-masked' : ''}`}
        >
          <div
            className="arch-grid santal-tagline-container"
            style={{
              transform: `translate3d(0, ${-heroTaglineY}px, 0)`
            }}
          >
            <div className="santal-hero-description-col">
              <SantalSplitWords
                triggerOnScroll
                text={`${BRAND.subTagline} ${BRAND.mission}`}
                className="t-h3-editorial"
              />
            </div>

            <div className="santal-hero-tagline-col">
              <h1 id="hero-tagline" className="t-h1-display">
                <span className="santal-hero-tagline__item">Build Smarter.</span>
                <span className="santal-hero-tagline__item">Market Better.</span>
                <span
                  className="santal-hero-tagline__item"
                  style={{ opacity: 0.42 }}
                >
                  Grow Faster.
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Hero Body Foreground (Monumental Wordmark + Bottom Caption & CTAs) */}
        <div className="santal-hero-body">
          <div className="hero-wordmark-wrap">
            <svg
              className="hero-wordmark-svg"
              viewBox="0 0 1400 185"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="AXONVORTEX"
            >
              <text
                x="0"
                y="152"
                fill="currentColor"
                fontFamily="Inter, Helvetica Neue, sans-serif"
                fontWeight="700"
                fontSize="182"
                letterSpacing="-0.045em"
              >
                AXONVORTEX
              </text>
            </svg>
          </div>

          <div className="arch-grid santal-hero-bottom">
            <div style={{ gridColumn: '2 / 4' }}>
              <SantalSplitWords
                triggerOnScroll
                text="Bold strategy. Quiet AI execution."
                className="t-caption"
                style={{ maxWidth: '11rem' }}
              />
            </div>

            <div
              style={{
                gridColumn: '4 / 6',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <button
                type="button"
                className="arch-cta arch-cta--solid"
                onClick={() => onOpenEnquiry('Start Your Growth Journey')}
              >
                Start Your Growth Journey
              </button>
              <button
                type="button"
                className="arch-cta arch-cta--outline"
                onClick={() => onNavigate('/solutions')}
              >
                Explore Solutions
              </button>
            </div>

            <div
              style={{
                gridColumn: '6 / 9',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div className="scroll-pulse-line" />
              <a href="#philosophy" className="t-caption">
                <SlideText>Scroll to discover</SlideText>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          02. #PHILOSOPHY — SANTALARCH 5-PART 3D CUBES PYRAMID + PERSPECTIVE GRID
          ==================================================================== */}
      <PhilosophyThreeScene theme={theme} philosophyData={philosophyData} />

      {/* ====================================================================
          03. #APPROACH — STICKY LEFT + HORIZONTAL SLIDING WORDS
          ==================================================================== */}
      <SantalApproachParallax onNavigate={onNavigate} />

      {/* ====================================================================
          04. #DOOR — SACRED GEOMETRY SVG MORPH + 3D EXPLODED GROWTH LAYERS
          ==================================================================== */}
      <SantalDoorBlueprint />

      {/* ====================================================================
          05. #WORKS — CENTER-OUT IRIS WIPE + 3-COLUMN DIFFERENTIAL PARALLAX
          ==================================================================== */}
      <SantalWorksParallax
        onNavigate={onNavigate}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* ====================================================================
          06. #SERVICES — DUAL-CLIP HORIZONTAL RAIL + MEDIA SCALE PARALLAX
          ==================================================================== */}
      <SantalServicesHorizontalParallax
        onNavigate={onNavigate}
        onOpenEnquiry={onOpenEnquiry}
      />

      {/* ====================================================================
          07. #PROCESS — STICKY LEFT + UPWARD PARALLAX ACCORDION
          ==================================================================== */}
      <SantalProcessParallax />

      {/* ====================================================================
          08. #COMPANY — 3D ROTATING GLOBE RINGS + EXPANDING WHITE PLUS (+)
          ==================================================================== */}
      <SantalCompanyGlobeParallax onNavigate={onNavigate} />
    </main>
  );
}
