import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CORE_SOLUTIONS,
  INDIVIDUAL_SERVICES,
  HOW_WE_WORK_PROCESS,
  APPROACH_PAGE_DATA,
  ABOUT_PAGE_DATA,
  FAQ_LIST
} from '../data/axonvortexData';
import { SlideText } from './SlideText';
import { SantalSplitWords, SantalCommonNav } from './SantalSplitText';

gsap.registerPlugin(ScrollTrigger);

/**
 * 1. SANTALARCH #approach (PageMainApproach - data-v-b7a22a0f)
 * - Sticky left `.title-wrap` (grid-column 1/5) with giant display index + caption
 * - Right column (grid-column 5/9) `.words-wrap` with overflow:hidden where monumental
 *   `.word-item` lines slide in from `translateX(100%) -> translateX(0%)` with `stagger: 0.1`
 * - Followed by `.description-wrap` with SantalSplitWords word-by-word rotational reveal
 */
export function SantalApproachParallax() {
  const sectionRef = useRef(null);

  const approachWords = [
    'STRATEGY',
    'INTELLIGENCE',
    'PLATFORMS',
    'ACQUISITION',
    'AUTOMATION'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll('.santal-approach-word-item');
      gsap.fromTo(
        words,
        { xPercent: 100, opacity: 0.15 },
        {
          xPercent: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'center center',
            scrub: 0.6
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="arch-grid santal-approach-grid"
    >
      {/* Left Sticky Title Wrap (grid-column: 1 / 5) */}
      <div className="santal-approach-title-wrap">
        <div className="santal-approach-title-inner">
          <span
            className="t-h1-display"
            style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)' }}
          >
            05
          </span>
          <p className="t-mono-label" style={{ maxWidth: '8rem' }}>
            FIVE CORE PILLARS // ONE ECOSYSTEM
          </p>
        </div>
      </div>

      {/* Right Sliding Words + Description Wrap (grid-column: 5 / 9) */}
      <div className="santal-approach-right-wrap">
        <div className="santal-approach-words-clip">
          {approachWords.map((word) => (
            <span
              key={word}
              className="t-h1-display santal-approach-word-item"
              style={{
                display: 'block',
                fontSize: 'clamp(2.8rem, 6.4vw, 6.2rem)',
                lineHeight: 0.94,
                letterSpacing: '-0.04em'
              }}
            >
              {word}
            </span>
          ))}
        </div>

        <div className="santal-approach-desc-wrap">
          <SantalSplitWords
            as="h3"
            triggerOnScroll
            text="We do not offer disconnected services. We build integrated growth systems across five core pillars."
            className="t-h3-editorial"
            style={{ maxWidth: '26rem' }}
          />
          <SantalSplitWords
            triggerOnScroll
            delay={0.25}
            text="Your brand positioning affects your ad performance. Your website affects your conversion rate. Your CRM and AI follow-up workflows affect your sales pipeline. AxonVortex engineers every layer to compound the next."
            className="t-body-lg"
            style={{
              marginTop: '2rem',
              maxWidth: '24rem',
              color: 'var(--c-dark-secondary)'
            }}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * 2. SANTALARCH #works (PageMainWorks - data-v-af33d5ad)
 * - Opens from a center vertical slit (`clip-path: inset(0% 48%) -> inset(0% 0%)`)
 *   with `background-color: var(--c-dark-primary)` to turn the entire viewport dark!
 * - 3 columns of Core Solutions & Featured Growth Systems with differential vertical
 *   column parallax (`fromYs -> toYs`) and staggered card reveals.
 */
export function SantalWorksParallax({ onNavigate, onOpenEnquiry }) {
  const sectionRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Center vertical slit iris opening (`clip-path: inset(0% 48%) -> inset(0% 0%)`)
      gsap.fromTo(
        section,
        { clipPath: 'inset(0% 48%)' },
        {
          clipPath: 'inset(0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 15%',
            scrub: 0.55
          }
        }
      );

      // Fade in centered section title
      gsap.fromTo(
        '.santal-works-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 20%',
            scrub: 0.55
          }
        }
      );

      // Differential 3-column vertical parallax (`fromYs -> toYs`)
      const cols = [
        { el: col1Ref.current, fromY: 120, toY: -70 },
        { el: col2Ref.current, fromY: 260, toY: -180 },
        { el: col3Ref.current, fromY: 60, toY: -40 }
      ];

      cols.forEach(({ el, fromY, toY }) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: fromY },
          {
            y: toY,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.65
            }
          }
        );
      });

      // Individual card upward entrance (`y: 40 -> 0, opacity: 0 -> 1`)
      const cards = section.querySelectorAll('.santal-work-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const col1Items = [CORE_SOLUTIONS[0], CORE_SOLUTIONS[3]];
  const col2Items = [CORE_SOLUTIONS[1], CORE_SOLUTIONS[4]];
  const col3Items = [CORE_SOLUTIONS[2]];

  const renderCard = (sol, aspect = '4 / 5') => (
    <article
      key={sol.id}
      className="santal-work-card"
      onClick={() => onNavigate(sol.route)}
    >
      <div className="santal-work-card__Visual" style={{ aspectRatio: aspect }}>
        <svg
          viewBox="0 0 400 500"
          fill="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.24
          }}
        >
          <circle cx="200" cy="250" r="150" stroke="currentColor" />
          <circle
            cx="200"
            cy="250"
            r="95"
            stroke="currentColor"
            strokeDasharray="4 4"
          />
          <path
            d="M200 30 L370 250 L200 470 L30 250 Z"
            stroke="currentColor"
          />
          <line x1="0" y1="250" x2="400" y2="250" stroke="currentColor" />
          <line x1="200" y1="0" x2="200" y2="500" stroke="currentColor" />
        </svg>

        <div className="santal-work-card__top">
          <span className="t-mono-label" style={{ color: 'inherit' }}>
            PILLAR {sol.index}
          </span>
          <span className="t-mono-label" style={{ color: 'inherit' }}>
            {sol.title.toUpperCase()}
          </span>
        </div>

        <div className="santal-work-card__bottom">
          <h3 className="t-h3-editorial" style={{ marginBottom: '0.65rem' }}>
            {sol.headline}
          </h3>
          <p className="t-caption" style={{ opacity: 0.78, marginBottom: '1rem' }}>
            {sol.shortDesc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {sol.tags.slice(0, 3).map((h) => (
              <span
                key={h}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  padding: '0.2rem 0.45rem',
                  border: '1px solid rgba(240,240,240,0.22)'
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          fontSize: '0.8rem'
        }}
      >
        <span style={{ fontWeight: 500 }}>{sol.ctaText}</span>
        <span style={{ fontFamily: 'var(--font-mono)', opacity: 0.6 }}>
          → EXPLORE
        </span>
      </div>
    </article>
  );

  return (
    <section ref={sectionRef} id="works" className="santal-works-dark-stage">
      {/* Sticky Difference-Blend Crosshair Lines Inside Dark Stage */}
      <div className="santal-works-lines-wrap" aria-hidden="true">
        <div className="santal-works-lines">
          <div className="santal-works-lines__v" />
          <div className="santal-works-lines__h" />
        </div>
      </div>

      <div className="santal-works-header">
        <div className="t-mono-label" style={{ color: 'rgba(240,240,240,0.6)' }}>
          CORE GROWTH ARCHITECTURE // 05 PILLARS
        </div>
        <h2
          className="t-h2-monument"
          style={{ marginTop: '0.5rem', color: '#f0f0f0' }}
        >
          Our Featured Growth Systems
        </h2>
      </div>

      <div className="santal-works-columns">
        <div ref={col1Ref} className="santal-works-col">
          {col1Items.map((sol) => renderCard(sol, '4 / 5'))}
        </div>
        <div ref={col2Ref} className="santal-works-col santal-works-col--center">
          {col2Items.map((sol) => renderCard(sol, '3 / 4'))}
        </div>
        <div ref={col3Ref} className="santal-works-col">
          {col3Items.map((sol) => renderCard(sol, '4 / 5'))}
          <article
            className="santal-work-card santal-work-card--audit"
            onClick={() =>
              onOpenEnquiry
                ? onOpenEnquiry('Get a Digital Growth Audit')
                : onNavigate('/growth-audit')
            }
          >
            <div className="t-mono-label" style={{ color: 'rgba(240,240,240,0.6)' }}>
              DIAGNOSTIC // 06
            </div>
            <h3
              className="t-h2-monument"
              style={{ marginTop: '1rem', color: '#f0f0f0' }}
            >
              Not Sure Where the Bottleneck Is?
            </h3>
            <p
              className="t-body"
              style={{ marginTop: '1rem', opacity: 0.78, color: '#f0f0f0' }}
            >
              Get a structured Digital Growth Audit across your website, funnel,
              paid acquisition, CRM, and AI readiness.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <span
                className="arch-cta"
                style={{
                  borderColor: '#f0f0f0',
                  color: '#f0f0f0'
                }}
              >
                <SlideText>Request Growth Audit →</SlideText>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * 3. SANTALARCH #services (PageMainServices - data-v-7a090962)
 * - Dual-layer horizontal title & media rail on the dark stage
 * - Left sticky description panel swaps word-by-word via SantalSplitWords
 * - Media cards scale `1.28 -> 1.0` with internal horizontal counter-parallax as they pass the spotlight window
 * - Bottom-right SantalCommonNav (`01 | 13`)
 */
export function SantalServicesHorizontalParallax({ onNavigate }) {
  const sectionRef = useRef(null);
  const titlesRowDimRef = useRef(null);
  const titlesRowBrightRef = useRef(null);
  const mediaRowRef = useRef(null);
  const railRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55
        },
        onUpdate: () => {
          const p = proxy.value;
          const rowEl = titlesRowBrightRef.current;
          const dimEl = titlesRowDimRef.current;
          const mediaEl = mediaRowRef.current;
          const railEl = railRef.current;
          if (!rowEl || !mediaEl) return;

          const maxTranslate = rowEl.scrollWidth - window.innerWidth * 0.45;
          const xVal = -p * maxTranslate;

          gsap.set([rowEl, dimEl, mediaEl], { x: xVal });
          if (railEl) {
            gsap.set(railEl, {
              x: -Math.min(window.innerWidth * 0.5, p * window.innerWidth * 0.65)
            });
          }

          // Internal card scale (1.28 -> 1.0) based on distance to spotlight center
          const cards = mediaEl.querySelectorAll('.santal-service-card-inner');
          cards.forEach((card, i) => {
            const itemProgress = Math.max(
              0,
              Math.min(1, (p * INDIVIDUAL_SERVICES.length - (i - 0.5)) / 1.2)
            );
            const scaleVal = 1.28 - itemProgress * 0.28;
            gsap.set(card, { scale: scaleVal });
          });

          const idx = Math.min(
            INDIVIDUAL_SERVICES.length - 1,
            Math.floor(p * INDIVIDUAL_SERVICES.length)
          );
          setActiveIdx(idx);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="santal-services-dark-track"
      style={{ '--items-count': INDIVIDUAL_SERVICES.length }}
    >
      <div className="santal-services-sticky-viewport">
        {/* Top Monumental Split Heading */}
        <div className="arch-grid" style={{ paddingTop: '4.5rem' }}>
          <div
            style={{
              gridColumn: '1 / 5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline'
            }}
          >
            <h2 className="t-h1-display" style={{ color: '#f0f0f0' }}>
              Services
            </h2>
            <span
              className="t-mono-label"
              style={{ color: 'rgba(240,240,240,0.55)' }}
            >
              13 SPECIALIZED ENGINES
            </span>
          </div>
        </div>

        {/* Moving Difference-Blend Vertical Rail + Bottom-Right CommonNav */}
        <div className="santal-services-blend-layer">
          <div ref={railRef} className="santal-services-rail">
            <div className="santal-services-rail__line" />
          </div>
          <div style={{ position: 'absolute', right: 'var(--padding)', bottom: '1.5rem' }}>
            <SantalCommonNav
              data={INDIVIDUAL_SERVICES.map((s) => ({
                caption: s.title
              }))}
              activeId={activeIdx}
            />
          </div>
        </div>

        {/* Dual-Clipped Horizontal Titles Row (Dim 14% Outside Window + Bright 100% Inside Spotlight) */}
        <div className="santal-services-titles-layer santal-services-titles-layer--dim">
          <div ref={titlesRowDimRef} className="santal-services-titles-row">
            {INDIVIDUAL_SERVICES.map((srv) => (
              <div key={srv.slug} className="santal-services-title-cell">
                <span className="t-h2-monument">{srv.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="santal-services-titles-layer santal-services-titles-layer--bright">
          <div ref={titlesRowBrightRef} className="santal-services-titles-row">
            {INDIVIDUAL_SERVICES.map((srv) => (
              <div key={srv.slug} className="santal-services-title-cell">
                <span className="t-h2-monument">{srv.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Left Fixed Word-by-Word Description Panel */}
        <div className="santal-services-left-desc">
          {INDIVIDUAL_SERVICES.map((srv, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={srv.slug}
                style={{
                  gridColumn: 1,
                  gridRow: 1,
                  pointerEvents: isActive ? 'auto' : 'none',
                  opacity: isActive ? 1 : 0
                }}
              >
                <div
                  className="t-mono-label"
                  style={{
                    color: 'rgba(240,240,240,0.55)',
                    marginBottom: '0.6rem'
                  }}
                >
                  SERVICE {srv.number} // {srv.category.toUpperCase()}
                </div>
                <SantalSplitWords
                  text={srv.subheadline}
                  active={isActive}
                  className="t-body-lg"
                  style={{ color: '#f0f0f0', marginBottom: '1.25rem' }}
                />
                <button
                  type="button"
                  onClick={() => onNavigate(`/services/${srv.slug}`)}
                  className="arch-cta"
                  style={{ borderColor: '#f0f0f0', color: '#f0f0f0' }}
                >
                  <SlideText>{srv.cta} →</SlideText>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom-Right Horizontal Media Row with Scale Interpolation */}
        <div className="santal-services-media-clip">
          <div ref={mediaRowRef} className="santal-services-media-row">
            {INDIVIDUAL_SERVICES.map((srv) => (
              <div
                key={srv.slug}
                className="santal-services-media-cell"
                onClick={() => onNavigate(`/services/${srv.slug}`)}
              >
                <div className="santal-service-card-inner">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      opacity: 0.65
                    }}
                  >
                    <span>{srv.number} / 13</span>
                    <span>{srv.category.toUpperCase()}</span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        marginBottom: '0.65rem'
                      }}
                    >
                      {srv.headline}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.3rem'
                      }}
                    >
                      {srv.whatWeDo.slice(0, 3).map((cap) => (
                        <span
                          key={cap.title}
                          style={{
                            fontSize: '0.62rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.2rem 0.45rem',
                            border: '1px solid rgba(240,240,240,0.2)'
                          }}
                        >
                          {cap.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 4. SANTALARCH #process (PageMainProcess - data-v-7d11e38b)
 * - Overlaps `#services` on the dark stage
 * - Top and bottom `.process-overlay` dark gradient masks
 * - Sticky left `.process-caption` and right `.contents` scrolling upward with
 *   expandable Scope Accordions + FAQs
 */
export function SantalProcessParallax() {
  const sectionRef = useRef(null);
  const contentsRef = useRef(null);
  const [openStep, setOpenStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const contents = contentsRef.current;
    if (!section || !contents) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contents,
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 25%',
            scrub: 0.55
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="santal-process-dark">
      <div className="santal-process-overlay santal-process-overlay--top" />
      <div className="santal-process-overlay santal-process-overlay--bottom" />

      <div className="arch-grid" style={{ alignItems: 'flex-start' }}>
        <div
          style={{
            gridColumn: '1 / 4',
            position: 'sticky',
            top: '28lvh'
          }}
        >
          <div
            className="t-mono-label"
            style={{ color: 'rgba(240,240,240,0.55)', marginBottom: '0.75rem' }}
          >
            HOW WE WORK // PROCESS
          </div>
          <SantalSplitWords
            as="h2"
            triggerOnScroll
            text="A Clear Process From Strategy to Scale."
            className="t-h2-monument"
            style={{ color: '#f0f0f0' }}
          />
        </div>

        <div
          ref={contentsRef}
          style={{ gridColumn: '5 / 9' }}
        >
          <SantalSplitWords
            triggerOnScroll
            text={APPROACH_PAGE_DATA.intro}
            className="t-h3-editorial"
            style={{
              color: '#f0f0f0',
              marginBottom: '4rem',
              maxWidth: '37rem'
            }}
          />

          {/* 6-Stage Process Accordion */}
          <div style={{ borderTop: '1px solid rgba(240,240,240,0.16)' }}>
            {HOW_WE_WORK_PROCESS.map((step, idx) => {
              const isOpen = openStep === idx;
              return (
                <div
                  key={step.index}
                  style={{
                    borderBottom: '1px solid rgba(240,240,240,0.16)',
                    padding: '1.35rem 0'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      color: '#f0f0f0'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '1.25rem'
                      }}
                    >
                      <span
                        className="t-mono-label"
                        style={{ color: 'rgba(240,240,240,0.5)' }}
                      >
                        {step.index}
                      </span>
                      <span className="t-h3-editorial">{step.title}</span>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.25rem',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        paddingTop: '1rem',
                        paddingLeft: '2.6rem',
                        color: 'rgba(240,240,240,0.78)'
                      }}
                    >
                      <p className="t-body" style={{ marginBottom: '1rem' }}>
                        {step.description}
                      </p>
                      <div
                        className="t-mono-label"
                        style={{
                          color: 'rgba(240,240,240,0.45)',
                          marginBottom: '0.5rem'
                        }}
                      >
                        SCOPE DELIVERABLES
                      </div>
                      <ul
                        style={{
                          display: 'grid',
                          gridTemplateColumns:
                            'repeat(auto-fit, minmax(190px, 1fr))',
                          gap: '0.45rem'
                        }}
                      >
                        {step.scope.map((d) => (
                          <li
                            key={d}
                            className="t-caption"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.45rem'
                            }}
                          >
                            <span>✓</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 10 FAQs Accordion */}
          <div style={{ marginTop: '5rem' }}>
            <div
              className="t-mono-label"
              style={{
                color: 'rgba(240,240,240,0.55)',
                marginBottom: '1.25rem'
              }}
            >
              FREQUENTLY ASKED QUESTIONS // 01 — 10
            </div>
            <div style={{ borderTop: '1px solid rgba(240,240,240,0.16)' }}>
              {FAQ_LIST.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    style={{
                      borderBottom: '1px solid rgba(240,240,240,0.16)',
                      padding: '1.1rem 0'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                        color: '#f0f0f0'
                      }}
                    >
                      <span className="t-body" style={{ fontWeight: 500 }}>
                        {String(idx + 1).padStart(2, '0')}. {faq.q}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <p
                        className="t-caption"
                        style={{
                          marginTop: '0.75rem',
                          color: 'rgba(240,240,240,0.72)',
                          maxWidth: '38rem'
                        }}
                      >
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 5. SANTALARCH #company (PageMainCompany - data-v-0131da3c)
 * - Giant wireframe SVG globe + 12 3D CSS `preserve-3d` rotating `.location-line` rings
 *   with counter-rotating labels and mouse-driven `--tilt-x / --tilt-y` spring
 * - 4 Leadership / Philosophy pillar cards rising up
 * - Monumental split title (`AXON` / `VORTEX`) + giant white architectural `.plus` (`+`)
 *   that scales from `0` to full-screen (`scale(3.4)`), flooding the dark stage with
 *   `var(--c-light-primary)` so it transitions invisibly into the light `#contact` Footer!
 */
const GLOBE_RINGS = [
  { label: 'SEO & CONTENT', size: '16rem', yStart: '218deg', zAngle: '158deg' },
  { label: 'PAID ACQUISITION', size: '19.5rem', yStart: '64deg', zAngle: '233deg' },
  { label: 'AI CHATBOTS', size: '18rem', yStart: '339deg', zAngle: '35deg' },
  { label: 'AUTONOMOUS AGENTS', size: '21rem', yStart: '96deg', zAngle: '312deg' },
  { label: 'CRM AUTOMATION', size: '22rem', yStart: '205deg', zAngle: '130deg' },
  { label: 'PREDICTIVE BI', size: '20.5rem', yStart: '221deg', zAngle: '48deg' },
  { label: 'WEB PLATFORMS', size: '18.5rem', yStart: '17deg', zAngle: '348deg' },
  { label: 'E-COMMERCE', size: '21.5rem', yStart: '42deg', zAngle: '212deg' },
  { label: 'CRO & FUNNELS', size: '21rem', yStart: '160deg', zAngle: '314deg' },
  { label: 'B2B PIPELINE', size: '19.8rem', yStart: '216deg', zAngle: '35deg' },
  { label: 'CLOUD & APIS', size: '22.2rem', yStart: '140deg', zAngle: '330deg' },
  { label: 'REVENUE ATTRIBUTION', size: '20.2rem', yStart: '192deg', zAngle: '334deg' }
];

export function SantalCompanyGlobeParallax() {
  const sectionRef = useRef(null);
  const locationsRef = useRef(null);
  const plusInnerRef = useRef(null);
  const titleFirstRef = useRef(null);
  const titleSecondRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const locationsEl = locationsRef.current;
    if (!section) return;

    // Mouse-driven 3D tilt (`--tilt-x`, `--tilt-y`) on the 3D rotating location rings
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf;

    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      if (locationsEl) {
        locationsEl.style.setProperty('--tilt-x', `${(-curY * 18).toFixed(2)}deg`);
        locationsEl.style.setProperty('--tilt-y', `${(-curX * 20).toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6
        }
      });

      // Split AXON and VORTEX outward as the giant white `.plus` scales from 0 to cover the entire screen
      tl.fromTo(
        titleFirstRef.current,
        { xPercent: 0 },
        { xPercent: -35, duration: 1, ease: 'none' },
        0.2
      );
      tl.fromTo(
        titleSecondRef.current,
        { xPercent: 0 },
        { xPercent: 35, duration: 1, ease: 'none' },
        0.2
      );
      tl.fromTo(
        plusInnerRef.current,
        { scale: 0 },
        { scale: 3.4, duration: 1.1, ease: 'power2.inOut' },
        0.25
      );
    }, section);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="company"
      className="santal-company-dark"
    >
      {/* Sticky Wireframe Globe + 12 3D Rotating Ring Lines */}
      <div className="santal-company-globe-sticky">
        <svg
          viewBox="0 0 1000 600"
          fill="none"
          className="santal-company-globe-svg"
        >
          <circle cx="500" cy="300" r="260" stroke="currentColor" />
          <ellipse cx="500" cy="300" rx="190" ry="260" stroke="currentColor" />
          <ellipse cx="500" cy="300" rx="110" ry="260" stroke="currentColor" />
          <ellipse cx="500" cy="300" rx="35" ry="260" stroke="currentColor" />
          <ellipse cx="500" cy="300" rx="260" ry="160" stroke="currentColor" />
          <ellipse cx="500" cy="300" rx="260" ry="75" stroke="currentColor" />
          <line x1="240" y1="300" x2="760" y2="300" stroke="currentColor" />
          <line x1="500" y1="40" x2="500" y2="560" stroke="currentColor" />
        </svg>

        <div ref={locationsRef} className="santal-locations-3d">
          {GLOBE_RINGS.map((ring) => (
            <div
              key={ring.label}
              className="santal-location-line"
              style={{
                '--size': ring.size,
                '--line-y-start': ring.yStart,
                '--line-z': ring.zAngle
              }}
            >
              <span className="santal-location-text">{ring.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Philosophy Pillars Rising Through the Globe */}
      <div className="santal-company-pillars-wrap">
        <div
          className="t-mono-label"
          style={{
            textAlign: 'center',
            color: 'rgba(240,240,240,0.6)',
            marginBottom: '3rem'
          }}
        >
          BUILT FOR MODERN GROWTH // 04 OPERATING PRINCIPLES
        </div>
        <div className="santal-company-pillars-grid">
          {ABOUT_PAGE_DATA.beliefs.map((pt) => (
            <div key={pt.index} className="santal-company-pillar-card">
              <div
                className="t-mono-label"
                style={{ color: 'rgba(240,240,240,0.5)' }}
              >
                {pt.index} // PRINCIPLE
              </div>
              <h3
                className="t-h3-editorial"
                style={{ color: '#f0f0f0', marginTop: '0.75rem' }}
              >
                {pt.title}
              </h3>
              <p
                className="t-caption"
                style={{
                  color: 'rgba(240,240,240,0.72)',
                  marginTop: '0.75rem'
                }}
              >
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Split Title + Giant Expanding White `.plus` Crosshair Transition to Light Footer */}
      <div className="santal-company-plus-sticky">
        <div className="santal-company-split-titles">
          <div ref={titleFirstRef} className="santal-company-split-title">
            <span className="t-h1-display" style={{ color: '#f0f0f0' }}>
              AXON
            </span>
          </div>
          <div ref={titleSecondRef} className="santal-company-split-title">
            <span className="t-h1-display" style={{ color: '#f0f0f0' }}>
              VORTEX
            </span>
          </div>
        </div>

        {/* Giant White Plus (`+`) that scales from 0 -> 3.4 to turn the screen Alabaster (#F0F0F0) */}
        <div className="santal-plus-wrap">
          <div ref={plusInnerRef} className="santal-plus-inner">
            <div className="santal-plus-line santal-plus-line--h" />
            <div className="santal-plus-line santal-plus-line--v" />
          </div>
        </div>
      </div>
    </section>
  );
}
