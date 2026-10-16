import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlideText } from './SlideText';
import { SantalSplitWords } from './SantalSplitText';

gsap.registerPlugin(ScrollTrigger);

/**
 * 1. SEAMLESS PARALLAX HERO (Used on ALL pages)
 * - Rotating diagonal grid line (--angle scrubs with scroll)
 * - Sticky masked tagline/headline container that translates upward & dissolves
 *   seamlessly into the next section with zero hard border
 */
export function SeamlessPageHero({
  code,
  watermarkText = 'AXONVORTEX',
  headline,
  subheadline,
  description,
  primaryCta,
  onPrimaryCta,
  secondaryCta,
  onSecondaryCta,
  breadcrumb
}) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const watermarkRef = useRef(null);
  const [angle, setAngle] = useState(-152);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const baseAngle =
      Math.atan2(window.innerHeight, window.innerWidth) * (180 / Math.PI) - 180;
    setAngle(baseAngle);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setAngle(baseAngle * (1 - Math.min(1, p * 1.4)));
        }
      });

      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { yPercent: 0, scale: 1, opacity: 0.09 },
          {
            yPercent: -35,
            scale: 1.08,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroEl,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 0, opacity: 1, filter: 'blur(0px)' },
          {
            y: -140,
            opacity: 0,
            filter: 'blur(6px)',
            ease: 'none',
            scrollTrigger: {
              trigger: heroEl,
              start: 'top top',
              end: '85% top',
              scrub: true
            }
          }
        );
      }
    }, heroEl);

    return () => ctx.revert();
  }, [headline]);

  return (
    <section
      ref={heroRef}
      className="seamless-page-hero"
      style={{ '--angle': `${angle.toFixed(3)}deg` }}
    >
      {/* Rotating Diagonal Hairline + Vertical Grid Lines */}
      <div className="santal-hero-grid">
        <div className="santal-hero-grid-line santal-hero-grid-line--1" />
        <div className="santal-hero-grid-line santal-hero-grid-line--2" />
        <div className="santal-hero-grid-line santal-hero-grid-line--diag" />
      </div>

      <div className="seamless-page-hero__sticky">
        {/* Monumental Parallax Watermark SVG */}
        <div ref={watermarkRef} className="seamless-page-hero__watermark">
          <svg
            viewBox="0 0 1400 185"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto' }}
          >
            <text
              x="0"
              y="152"
              fill="currentColor"
              fontFamily="Inter, Helvetica Neue, sans-serif"
              fontWeight="700"
              fontSize="175"
              letterSpacing="-0.045em"
            >
              {watermarkText.slice(0, 12).toUpperCase()}
            </text>
          </svg>
        </div>

        <div ref={contentRef} className="arch-grid seamless-page-hero__body">
          {breadcrumb && (
            <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
              {breadcrumb}
            </div>
          )}

          <div style={{ gridColumn: '1 / 6' }}>
            {code && (
              <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
                {code}
              </div>
            )}
            <h1 className="t-h1-display">{headline}</h1>
          </div>

          <div
            style={{
              gridColumn: '6 / 9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              gap: '1.25rem'
            }}
          >
            {subheadline && (
              <SantalSplitWords
                triggerOnScroll
                text={subheadline}
                className="t-body-lg"
                style={{ fontWeight: 500 }}
              />
            )}
            {description && (
              <SantalSplitWords
                triggerOnScroll
                delay={0.25}
                text={description}
                className="t-body"
                style={{ opacity: 0.78 }}
              />
            )}

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '0.5rem'
              }}
            >
              {primaryCta && (
                <button
                  type="button"
                  className="arch-cta arch-cta--solid"
                  onClick={onPrimaryCta}
                >
                  {primaryCta} →
                </button>
              )}
              {secondaryCta && (
                <button
                  type="button"
                  className="arch-cta arch-cta--outline"
                  onClick={onSecondaryCta}
                >
                  {secondaryCta}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          className="arch-grid"
          style={{
            alignItems: 'center',
            opacity: Math.max(0, 1 - progress * 2.5)
          }}
        >
          <div style={{ gridColumn: '1 / 6' }}>
            <span className="t-mono-label">
              CONTINUOUS SCROLL ARCHITECTURE
            </span>
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
            <span className="t-caption">
              <SlideText>Scroll to explore</SlideText>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. SEAMLESS MORPHING SECTION WRAPPER
 * Eliminates hard borders between sections by overlapping the previous section
 * with negative margin, feathered alpha gradients, and scroll-scrubbed opacity/scale/clip
 * so you never see a seam where one section ends and the next begins.
 */
export function SeamlessSection({
  children,
  variant = 'light', // 'light' | 'dark'
  overlap = true,
  curtainReveal = false,
  className = '',
  id
}) {
  const secRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const el = secRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const ctx = gsap.context(() => {
      if (curtainReveal) {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 42%)', opacity: 0.2 },
          {
            clipPath: 'inset(0% 0%)',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 20%',
              scrub: true
            }
          }
        );
      } else {
        gsap.fromTo(
          inner,
          { y: 90, opacity: 0, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 28%',
              scrub: true
            }
          }
        );
      }

      // Smooth exit dissolve at the bottom of the section into the next section
      gsap.fromTo(
        inner,
        { opacity: 1, y: 0 },
        {
          opacity: 0.12,
          y: -60,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'bottom 45%',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [curtainReveal]);

  return (
    <section
      ref={secRef}
      id={id}
      className={`seamless-section seamless-section--${variant} ${
        overlap ? 'seamless-section--overlap' : ''
      } ${className}`}
    >
      <div className="seamless-section__feather-top" />
      <div ref={innerRef} className="seamless-section__inner">
        {children}
      </div>
      <div className="seamless-section__feather-bottom" />
    </section>
  );
}

/**
 * 3. SEAMLESS HORIZONTAL KINETIC WORDS SCRUBBER
 * Scrubs giant statement words from right to left on scroll (Santalarch #approach style)
 */
export function SeamlessKineticWords({ label, title, words = [], subtitle }) {
  const wrapRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = wordRefs.current.filter(Boolean);
      if (items.length) {
        gsap.fromTo(
          items,
          { xPercent: 95, opacity: 0.08 },
          {
            xPercent: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'bottom 35%',
              scrub: true
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [words]);

  return (
    <div ref={wrapRef} className="arch-grid" style={{ padding: '4rem var(--padding)' }}>
      <div style={{ gridColumn: '1 / 4', position: 'sticky', top: '42lvh', alignSelf: 'start' }}>
        {label && (
          <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
            {label}
          </div>
        )}
        {title && <h2 className="t-h3-editorial">{title}</h2>}
        {subtitle && (
          <p className="t-body" style={{ opacity: 0.72, marginTop: '0.75rem', maxWidth: '18rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ gridColumn: '4 / 9', overflow: 'hidden' }}>
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            ref={(el) => (wordRefs.current[i] = el)}
            className="t-h1-display"
            style={{ display: 'block', willChange: 'transform, opacity' }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. SEAMLESS HORIZONTAL FLOW TRAIN
 * Scrubs a sequence of steps/nodes horizontally as the user scrolls vertically
 */
export function SeamlessHorizontalFlow({
  label,
  title,
  description,
  steps = [] // [{ step, title, desc }]
}) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => setProgress(self.progress)
    });

    return () => st.kill();
  }, [steps.length]);

  const count = Math.max(1, steps.length);
  const activeIdx = Math.min(count - 1, Math.floor(progress * count));
  const translateX = -(progress * Math.max(0, (count - 1) * 28));

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${Math.max(240, count * 52)}lvh`,
        marginTop: '-25lvh'
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100lvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'calc(var(--header-height) + 2rem) 0 3rem',
          overflow: 'hidden'
        }}
      >
        {/* Top Row: Label, Progress Rail, Active Index */}
        <div className="arch-grid" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: '1 / 4' }}>
            <div className="t-mono-label">{label}</div>
            <h2 className="t-h3-editorial" style={{ marginTop: '0.25rem' }}>
              {title}
            </h2>
          </div>

          <div style={{ gridColumn: '4 / 7' }}>
            <div className="santal-services-rail">
              <div
                className="santal-services-rail__fill"
                style={{ transform: `scaleX(${Math.max(0.05, progress)})` }}
              />
            </div>
          </div>

          <div
            style={{
              gridColumn: '7 / 9',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <div className="index-counter">
              <span>0{activeIdx + 1}</span>
              <span className="index-counter__sep" />
              <span className="index-counter__total">
                {count < 10 ? `0${count}` : count}
              </span>
            </div>
          </div>
        </div>

        {/* Center Horizontal Sliding Cards */}
        <div style={{ padding: '0 var(--padding)', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              gap: '2vw',
              transform: `translate3d(${translateX}vw, 0, 0)`,
              willChange: 'transform'
            }}
          >
            {steps.map((s, i) => {
              const isCurrent = i === activeIdx;
              return (
                <div
                  key={`${s.title}-${i}`}
                  style={{
                    width: '32vw',
                    minWidth: '280px',
                    flexShrink: 0,
                    padding: '2.25rem',
                    border: '1px solid currentColor',
                    opacity: isCurrent ? 1 : 0.42,
                    transform: `scale(${isCurrent ? 1 : 0.94})`,
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '19rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span className="t-mono-label">
                      STAGE {s.step || `0${i + 1}`}
                    </span>
                    <span className="t-mono-label">CONNECTED NODE</span>
                  </div>

                  <div>
                    <h3
                      className="t-h2-monument"
                      style={{
                        fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {s.title}
                    </h3>
                    {s.desc && (
                      <p className="t-body-lg" style={{ opacity: 0.85 }}>
                        {s.desc}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      opacity: 0.5
                    }}
                  >
                    {i < count - 1
                      ? `NEXT → ${steps[i + 1].title.toUpperCase()}`
                      : 'CONTINUOUS OPTIMIZATION LOOP ↺'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Description */}
        <div className="arch-grid">
          <div style={{ gridColumn: '1 / 6' }}>
            {description && (
              <p className="t-body-lg" style={{ opacity: 0.78, maxWidth: '38rem' }}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 5. SEAMLESS 3-COLUMN DIFFERENTIAL PARALLAX GRID
 * Scrubs 3 columns at different vertical speeds (Santalarch #works style)
 */
export function SeamlessDifferentialGrid({ items = [], renderItem }) {
  const gridRef = useRef(null);
  const col0Ref = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        col0Ref.current,
        { y: 110 },
        {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
      gsap.fromTo(
        col1Ref.current,
        { y: 230 },
        {
          y: -170,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
      gsap.fromTo(
        col2Ref.current,
        { y: 80 },
        {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [items.length]);

  const col0 = items.filter((_, i) => i % 3 === 0);
  const col1 = items.filter((_, i) => i % 3 === 1);
  const col2 = items.filter((_, i) => i % 3 === 2);

  return (
    <div ref={gridRef} className="santal-works-columns">
      <div ref={col0Ref} className="santal-works-col">
        {col0.map((item, idx) => renderItem(item, idx * 3))}
      </div>
      <div ref={col1Ref} className="santal-works-col">
        {col1.map((item, idx) => renderItem(item, idx * 3 + 1))}
      </div>
      <div ref={col2Ref} className="santal-works-col">
        {col2.map((item, idx) => renderItem(item, idx * 3 + 2))}
      </div>
    </div>
  );
}
