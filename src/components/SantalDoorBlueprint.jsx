import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GROWTH_SYSTEM_FLOW } from '../data/axonvortexData';
import { SantalSplitWords, SantalCommonNav } from './SantalSplitText';

gsap.registerPlugin(ScrollTrigger);

const DOOR_APPROACH_STAGES = [
  {
    index: '01',
    caption: 'Strategy Before Technology',
    title: 'Intent Before Tool',
    description:
      'Every growth system begins with a clear commercial direction defined through business goals, customer psychology, and funnel logic. Strategy must remain coherent under real market evaluation before choosing a single tool.'
  },
  {
    index: '02',
    caption: 'Connected Growth',
    title: 'Architecture as Foundation',
    description:
      'Marketing, website experience, lead capture, CRM routing, and attribution are resolved early as one system. Growth must be buildable, measurable, and exact — not isolated vendor campaigns.'
  },
  {
    index: '03',
    caption: 'Practical AI',
    title: 'Bounded AI Intelligence',
    projectCaption: 'Core System Blueprint',
    projectDescription:
      '5-Stage Connected Growth Engine (Attract → Engage → Convert → Automate → Optimize)',
    description:
      'AI chatbots, voice AI, and autonomous agents are selected for speed, accuracy, and operational relief. Every automated workflow must justify its presence in saved hours and faster customer response.'
  },
  {
    index: '04',
    caption: 'Continuous Improvement',
    title: 'Data as Discipline',
    description:
      'Funnels, conversion handoffs, follow-up latencies, and campaign performance are refined through continuous Hypothesis → Action → Measure → Learn → Improve loops.'
  }
];

/**
 * Exact structural and scroll-choreography replica of Santalarch's PageMainDoor (#door):
 * - Fades out `#approach` (`opacity: 0, duration: 0.65`) while `.santal-door-sticky` wipes open
 *   via `clip-path: inset(100% 0 0 0) -> inset(0% 0% 0% 0%)` and inner layers rise from
 *   `translateY(40%) scale(0.6) -> translateY(0%) scale(1)`
 * - Sacred-geometry SVG outline (viewBox 0 0 1440 800) with morphing diamond/hexagon vectors,
 *   stroke-dashoffset callout brackets, and `--door-progress` scale reduction
 * - 5 staggered exploded blueprint layers (Attract, Engage, Convert, Automate, Optimize)
 * - 4 sequential narrative stages with SantalSplitWords and SantalCommonNav (`01 | 04`)
 */
export function SantalDoorBlueprint() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const outlineWrapRef = useRef(null);
  const layersRef = useRef([]);

  const [doorProgress, setDoorProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [clipInset, setClipInset] = useState(100);
  const [entryProgress, setEntryProgress] = useState(0);
  const [explodedProgress, setExplodedProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const approachEl = document.getElementById('approach');

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: 0.55,
      onUpdate: (self) => {
        const p = self.progress;
        // 0.0 -> 0.16: wipe clip-path inset from 100% down to 0%, scale 0.6 -> 1, fade out #approach
        const entryP = Math.max(0, Math.min(1, p / 0.16));
        setEntryProgress(entryP);
        setClipInset(Math.max(0, 100 - entryP * 100));

        if (approachEl) {
          approachEl.style.opacity = String(Math.max(0, 1 - entryP * 1.35));
        }

        // 0.16 -> 0.72: door-progress scales geometry from 0 to 1
        const dp = Math.max(0, Math.min(1, (p - 0.16) / 0.54));
        setDoorProgress(dp);

        // 0.52 -> 0.95: exploded 3D isometric layers fan out
        const exp = Math.max(0, Math.min(1, (p - 0.52) / 0.42));
        setExplodedProgress(exp);

        // Active stage 0..3
        const stageIdx = Math.min(
          3,
          Math.floor(Math.max(0, (p - 0.12) / 0.85) * 4)
        );
        setActiveStage(stageIdx);
      }
    });

    return () => {
      st.kill();
      if (approachEl) {
        approachEl.style.opacity = '';
      }
    };
  }, []);

  const entryTranslateY = (1 - entryProgress) * 40;
  const entryScale = 0.6 + entryProgress * 0.4;

  return (
    <section
      ref={sectionRef}
      id="door"
      className="santal-door-section"
      style={{
        '--door-progress': doorProgress.toFixed(4),
        '--exploded-progress': explodedProgress.toFixed(4)
      }}
    >
      <div className="santal-door-horizontal-line" />

      <div
        ref={stickyRef}
        className="santal-door-sticky"
        style={{
          clipPath: `inset(${clipInset}% 0% 0% 0%)`
        }}
      >
        {/* Sacred-Geometry Architectural Outline SVG (Exact Santalarch 1440x800 vector) */}
        <div className="santal-door-outline-container">
          <div
            ref={outlineWrapRef}
            className="santal-door-outline-wrap"
            style={{
              transform: `translateY(${entryTranslateY}%) scale(${
                entryScale * (1 + doorProgress * -0.52)
              })`
            }}
          >
            <svg
              width="1440"
              height="800"
              viewBox="0 0 1440 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              className="santal-door-svg"
            >
              {/* Opacity Hexagonal Frame & Vertical Axis Lines */}
              <g
                style={{
                  opacity: Math.min(1, doorProgress * 1.8)
                }}
              >
                <path
                  d="M828.149 212.742L936.298 400.003L828.149 587.264H611.851L503.701 400.003L611.851 212.742H828.149Z"
                  stroke="currentColor"
                  strokeOpacity="0.45"
                />
                <line
                  x1="484"
                  y1="-200"
                  x2="484"
                  y2="1000"
                  stroke="currentColor"
                  strokeOpacity="0.22"
                />
                <line
                  x1="956"
                  y1="-200"
                  x2="956"
                  y2="1000"
                  stroke="currentColor"
                  strokeOpacity="0.22"
                />
              </g>

              {/* Draw-Paths Callout Brackets */}
              <g
                stroke="currentColor"
                strokeOpacity="0.55"
                strokeDasharray="180"
                strokeDashoffset={180 * (1 - Math.min(1, doorProgress * 1.5))}
              >
                <path d="M612.5 119.046L585.281 71.9023H484.133" />
                <path d="M612.5 119.043L585.281 166.188H484.133" />
                <path d="M828.5 119.046L855.719 71.9023H955.584" />
                <path d="M828.5 119.043L855.719 166.188H955.584" />
                <path d="M612.5 399.999L585.281 352.855H484.133" />
                <path d="M612.5 400.001L585.281 447.145H484.133" />
                <path d="M828.5 399.999L855.719 352.855H955.584" />
                <path d="M828.5 400.001L855.719 447.145H955.584" />
                <path d="M612.5 680.777L585.281 633.633H484.133" />
                <path d="M612.5 680.778L585.281 727.922H484.133" />
                <path d="M828.5 680.777L855.719 633.633H955.584" />
                <path d="M828.5 680.778L855.719 727.922H955.584" />
              </g>

              {/* Sacred-Geometry Diamond Morph Paths */}
              <g stroke="currentColor" strokeOpacity="0.28">
                <path d="M1119 400L720 0L321 400L720 800L1119 400Z" />
                <path d="M554.386 399L-252 1535.14L-1058.39 399L-252 -737.137L554.386 399Z" />
                <path d="M2498.39 399L1692 1535.14L885.613 399L1692 -737.137L2498.39 399Z" />
                <path d="M720.082 234.301L802.375 316.594L720.082 398.887L637.789 316.594L720.082 234.301Z" />
                <path d="M885.377 399.094L803.082 481.884L720.786 399.094L803.082 316.303L885.377 399.094Z" />
                <path d="M720.082 399.304L802.377 482.094L720.082 564.885L637.786 482.094L720.082 399.304Z" />
                <path d="M720.375 399.094L637.582 481.887L554.789 399.094L637.582 316.301L720.375 399.094Z" />
                <path d="M972.998 -24L719.998 -448L467 -24L719.998 400L972.998 -24Z" />
                <path d="M972.998 824L719.998 400L467 824L719.998 1248L972.998 824Z" />
              </g>
            </svg>
          </div>
        </div>

        {/* Center 3D Exploded Architectural Stack (5 Growth System Layers) */}
        <div
          className="santal-door-layers-stage"
          style={{
            transform: `translate(-50%, calc(-50% + ${entryTranslateY * 0.45}%)) scale(${
              entryScale * (0.86 - doorProgress * 0.14)
            })`
          }}
        >
          {GROWTH_SYSTEM_FLOW.map((layer, idx) => {
            const layerReveal = Math.max(
              0,
              Math.min(1, (doorProgress - idx * 0.12) * 3)
            );
            const zOffset = (idx - 2) * 48 * explodedProgress;
            const yOffset = (idx - 2) * -22 * explodedProgress;
            const rotY = explodedProgress * -24;
            const rotX = explodedProgress * 14;

            return (
              <div
                key={layer.stage}
                ref={(el) => (layersRef.current[idx] = el)}
                className="santal-door-layer-card"
                style={{
                  opacity: 0.25 + layerReveal * 0.75,
                  transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${zOffset}px, ${yOffset}px, ${zOffset}px)`
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    opacity: 0.7
                  }}
                >
                  <span>LAYER {layer.step}</span>
                  <span>{layer.discipline.toUpperCase()}</span>
                </div>
                <div
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {layer.stage}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    opacity: 0.55
                  }}
                >
                  {layer.metrics}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Sequential Stage Content Blocks with SantalSplitWords */}
        <div className="santal-door-hud">
          <div className="arch-grid" style={{ alignItems: 'center' }}>
            <div style={{ gridColumn: '1 / 4' }}>
              <span className="t-mono-label">
                ENGINEERING AS FOUNDATION // GROWTH SCHEMATIC
              </span>
            </div>
            <div style={{ gridColumn: '5 / 9', display: 'flex', justifyContent: 'flex-end' }}>
              <SantalCommonNav
                data={DOOR_APPROACH_STAGES}
                activeId={activeStage}
              />
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: '11rem' }}>
            {DOOR_APPROACH_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.index}
                  className="arch-grid"
                  style={{
                    alignItems: 'flex-end',
                    position: idx === 0 ? 'relative' : 'absolute',
                    inset: idx === 0 ? undefined : 0,
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <div style={{ gridColumn: '1 / 4' }}>
                    <h3
                      className="t-h2-monument"
                      style={{
                        fontSize: 'clamp(1.85rem, 3.2vw, 3.1rem)',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease'
                      }}
                    >
                      {stage.title}
                    </h3>
                    {stage.projectCaption && (
                      <div
                        style={{
                          marginTop: '1rem',
                          paddingTop: '0.75rem',
                          borderTop: '1px solid rgba(240,240,240,0.2)',
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.5s ease'
                        }}
                      >
                        <div className="t-mono-label">{stage.projectCaption}</div>
                        <div className="t-caption" style={{ marginTop: '0.25rem' }}>
                          {stage.projectDescription}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ gridColumn: '5 / 9' }}>
                    <SantalSplitWords
                      text={stage.description}
                      active={isActive}
                      className="t-body-lg"
                      style={{ maxWidth: '34rem' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
