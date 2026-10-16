import React, { useState } from 'react';
import {
  CORE_SOLUTIONS,
  PROBLEM_SOLVER_MATRIX,
  GROWTH_SYSTEM_FLOW
} from '../data/axonvortexData';
import {
  SeamlessPageHero,
  SeamlessSection,
  SeamlessKineticWords,
  SeamlessHorizontalFlow,
  SeamlessDifferentialGrid
} from '../components/SeamlessParallaxPrimitives';
import { SlideText } from '../components/SlideText';

export function SolutionsOverviewPage({ onNavigate, onOpenEnquiry }) {
  const [selectedProblem, setSelectedProblem] = useState(0);

  return (
    <main className="seamless-page-flow">
      {/* 1. SEAMLESS PARALLAX HERO */}
      <SeamlessPageHero
        code="02 // SOLUTIONS ARCHITECTURE"
        watermarkText="SOLUTIONS"
        headline="Digital Solutions Built Around Your Growth."
        subheadline="From marketing and websites to AI, automation and business technology, AxonVortex connects the right solutions around your business goals."
        description="We don’t sell disconnected digital services — we build connected growth systems."
        primaryCta="Start Your Growth Journey"
        onPrimaryCta={() => onOpenEnquiry('Start Your Growth Journey')}
        secondaryCta="Get a Digital Growth Audit"
        onSecondaryCta={() => onNavigate('/growth-audit')}
      />

      {/* 2. HORIZONTAL KINETIC STATEMENT SCRUB */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="THE AXONVORTEX GROWTH SYSTEM"
          title="Connected Capabilities"
          subtitle="Often your business needs several capabilities working together as one system."
          words={[
            'We don’t sell',
            'isolated services —',
            'we engineer',
            'connected',
            'growth systems.'
          ]}
        />

        {/* 5-Stage Horizontal Flow Scrubber */}
        <SeamlessHorizontalFlow
          label="SYSTEM SEQUENCE // 01 — 05"
          title="One Connected Loop"
          description="Marketing, technology and AI shouldn't operate in separate boxes. AxonVortex connects the right capabilities around one objective: business growth."
          steps={GROWTH_SYSTEM_FLOW.map((g) => ({
            step: g.step,
            title: `${g.stage} — ${g.discipline}`,
            desc: `${g.summary} (${g.metrics})`
          }))}
        />
      </SeamlessSection>

      {/* 3. 3-COLUMN DIFFERENTIAL PARALLAX OF ALL 5 CORE SOLUTION PILLARS + AUDIT */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ marginBottom: '4rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              CAPABILITIES MATRIX // 01 — 05
            </div>
            <h2 className="t-h1-display">The 5 Solution Pillars</h2>
          </div>
          <div
            style={{
              gridColumn: '5 / 9',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <p className="t-body-lg" style={{ opacity: 0.8 }}>
              Scroll through our five connected pillars. Each pillar can be
              deployed independently or orchestrated as a unified growth engine.
            </p>
          </div>
        </div>

        <SeamlessDifferentialGrid
          items={[
            ...CORE_SOLUTIONS,
            {
              id: 'growth-audit-card',
              index: '06',
              title: 'Digital Growth Audit',
              headline: 'Find What’s Holding Your Growth Back.',
              fullDesc:
                'Not sure which solution your business actually needs first? Start with a structured 6-layer diagnostic of your digital presence, marketing, conversion, and AI readiness.',
              subServicesDetail: [
                { title: 'Digital Presence Evaluation', slug: 'website-development' },
                { title: 'Marketing & Search Audit', slug: 'seo' },
                { title: 'Lead Funnel Diagnostic', slug: 'lead-generation' },
                { title: 'AI & Automation Readiness', slug: 'ai-agents' }
              ],
              bestFor: [
                'Unsure why marketing isn’t working',
                'Want a clear roadmap before committing budget',
                'Ready to prioritize high-impact improvements'
              ],
              ctaText: 'Explore Growth Audit',
              route: '/growth-audit'
            }
          ]}
          renderItem={(sol) => (
            <article
              key={sol.id}
              className="santal-work-card"
              style={{ minHeight: '32rem' }}
              onClick={() => onNavigate(sol.route)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}
                >
                  <span className="t-mono-label">PILLAR {sol.index}</span>
                  <span className="t-mono-label">CONNECTED SYSTEM</span>
                </div>

                <h3
                  className="t-h2-monument"
                  style={{
                    fontSize: 'clamp(1.65rem, 2.4vw, 2.35rem)',
                    marginBottom: '0.6rem'
                  }}
                >
                  {sol.title}
                </h3>
                <p
                  className="t-body-lg"
                  style={{ fontWeight: 500, marginBottom: '0.75rem' }}
                >
                  {sol.headline}
                </p>
                <p
                  className="t-body"
                  style={{ opacity: 0.75, marginBottom: '1.5rem' }}
                >
                  {sol.fullDesc}
                </p>

                <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                  WE HELP WITH:
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {sol.subServicesDetail.map((sub) => (
                    <button
                      key={sub.title}
                      type="button"
                      className="solution-tag-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`/services/${sub.slug}`);
                      }}
                    >
                      {sub.title} →
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                  BEST FOR BUSINESSES THAT:
                </div>
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {sol.bestFor.slice(0, 4).map((bf) => (
                    <li
                      key={bf}
                      className="t-caption"
                      style={{ opacity: 0.78 }}
                    >
                      [+] {bf}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(240,240,240,0.16)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span className="t-caption" style={{ fontWeight: 600 }}>
                    <SlideText>{sol.ctaText} →</SlideText>
                  </span>
                  <span className="t-mono-label">0{sol.index}</span>
                </div>
              </div>
            </article>
          )}
        />
      </SeamlessSection>

      {/* 4. INTERACTIVE PROBLEM-TO-SOLUTION MATCHER */}
      <SeamlessSection variant="light" overlap>
        <div className="arch-grid" style={{ marginBottom: '3.5rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
              DIAGNOSTIC SELECTOR
            </div>
            <h2 className="t-h1-display">Which Solution Do You Need?</h2>
          </div>
          <div
            style={{
              gridColumn: '5 / 9',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <p className="t-body-lg" style={{ opacity: 0.8 }}>
              Start with the problem. We’ll help find the solution. Select any
              challenge below to jump directly to the system built to solve it.
            </p>
          </div>
        </div>

        <div
          className="arch-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {PROBLEM_SOLVER_MATRIX.map((item, idx) => {
            const isSelected = selectedProblem === idx;
            return (
              <div
                key={item.code}
                onClick={() => setSelectedProblem(idx)}
                style={{
                  border: '1px solid var(--c-line-current)',
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '14rem',
                  backgroundColor: isSelected
                    ? 'var(--c-dark-primary)'
                    : 'transparent',
                  color: isSelected
                    ? 'var(--c-light-primary)'
                    : 'var(--c-dark-primary)',
                  transition: 'all 0.35s var(--ease-out)'
                }}
              >
                <div>
                  <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
                    PROBLEM STATEMENT // {item.code}
                  </div>
                  <p className="t-h3-editorial">{item.quote}</p>
                </div>

                <div
                  style={{
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid currentColor',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span
                      className="t-mono-label"
                      style={{ display: 'block', opacity: 0.6 }}
                    >
                      START WITH:
                    </span>
                    <span className="t-body-lg" style={{ fontWeight: 600 }}>
                      {item.solution}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="arch-cta"
                    style={{ borderColor: 'currentColor' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(item.route);
                    }}
                  >
                    Open →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </SeamlessSection>
    </main>
  );
}
