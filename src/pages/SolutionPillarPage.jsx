import React from 'react';
import { CORE_SOLUTIONS } from '../data/axonvortexData';
import {
  SeamlessPageHero,
  SeamlessSection,
  SeamlessKineticWords,
  SeamlessHorizontalFlow,
  SeamlessDifferentialGrid
} from '../components/SeamlessParallaxPrimitives';
import { SlideText } from '../components/SlideText';

export function SolutionPillarPage({ pillarId, onNavigate, onOpenEnquiry }) {
  const pillar =
    CORE_SOLUTIONS.find((s) => s.id === pillarId) || CORE_SOLUTIONS[0];

  return (
    <main className="seamless-page-flow">
      {/* 1. SEAMLESS PARALLAX HERO */}
      <SeamlessPageHero
        code={`SOLUTION PILLAR ${pillar.index} // ${pillar.title.toUpperCase()}`}
        watermarkText={pillar.title}
        headline={pillar.headline}
        subheadline={pillar.shortDesc}
        description={pillar.fullDesc}
        primaryCta={pillar.actionCta}
        onPrimaryCta={() => onOpenEnquiry(pillar.title)}
        secondaryCta="All Solutions"
        onSecondaryCta={() => onNavigate('/solutions')}
        breadcrumb={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="t-mono-label"
            >
              ← ALL SOLUTIONS
            </button>
            <span className="t-mono-label">/</span>
            <span className="t-mono-label">{pillar.title.toUpperCase()}</span>
          </div>
        }
      />

      {/* 2. THE PROBLEM + HORIZONTAL SYSTEM SEQUENCE TRAIN */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="THE PROBLEM WE SOLVE"
          title={pillar.title}
          subtitle={pillar.problemBody}
          words={pillar.problemTitle.split(' ').reduce((acc, word, i) => {
            const chunkIdx = Math.floor(i / 2);
            acc[chunkIdx] = acc[chunkIdx] ? `${acc[chunkIdx]} ${word}` : word;
            return acc;
          }, [])}
        />

        <SeamlessHorizontalFlow
          label={`OUR ${pillar.title.toUpperCase()} APPROACH`}
          title="Structured Execution Sequence"
          description={pillar.problemBody}
          steps={pillar.approachSteps.map((s) => ({
            step: s.step,
            title: s.title,
            desc: s.desc
          }))}
        />
      </SeamlessSection>

      {/* 3. 3-COLUMN DIFFERENTIAL PARALLAX OF SERVICES UNDER THIS PILLAR */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ marginBottom: '4rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              SPECIALIZED CAPABILITIES
            </div>
            <h2 className="t-h1-display">Our {pillar.title} Services</h2>
          </div>
          <div
            style={{
              gridColumn: '5 / 9',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {pillar.systemChain.map((node, i) => (
                <span key={node} className="solution-tag-pill">
                  0{i + 1} {node}
                </span>
              ))}
            </div>
          </div>
        </div>

        <SeamlessDifferentialGrid
          items={pillar.subServicesDetail}
          renderItem={(srv, idx) => (
            <article
              key={srv.title}
              className="santal-work-card"
              style={{ minHeight: '26rem' }}
              onClick={() => onNavigate(`/services/${srv.slug}`)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}
                >
                  <span className="t-mono-label">0{idx + 1}</span>
                  <span className="t-mono-label">{pillar.title}</span>
                </div>
                <h3
                  className="t-h3-editorial"
                  style={{ marginBottom: '0.75rem' }}
                >
                  {srv.title}
                </h3>
                <p className="t-body" style={{ opacity: 0.8 }}>
                  {srv.desc}
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <div className="t-mono-label" style={{ marginBottom: '0.6rem' }}>
                  Includes:
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  {srv.includes.map((inc) => (
                    <span key={inc} className="solution-tag-pill">
                      {inc}
                    </span>
                  ))}
                </div>

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
                    <SlideText>Explore {srv.title} →</SlideText>
                  </span>
                  <span className="t-mono-label">SPEC</span>
                </div>
              </div>
            </article>
          )}
        />
      </SeamlessSection>

      {/* 4. WHO THIS IS FOR — SEAMLESS LIGHT TRANSITION */}
      <SeamlessSection variant="light" overlap>
        <div className="arch-grid">
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
              CLIENT FIT // QUALIFICATION
            </div>
            <h2 className="t-h1-display" style={{ marginBottom: '1.5rem' }}>
              Who This Is For
            </h2>
            <p className="t-body-lg" style={{ opacity: 0.78, maxWidth: '24rem' }}>
              {pillar.title} is engineered for businesses ready to connect
              strategy, execution, and measurable outcomes.
            </p>
          </div>

          <div style={{ gridColumn: '5 / 9' }}>
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                marginBottom: '2.5rem'
              }}
            >
              {pillar.bestFor.map((item, i) => (
                <li
                  key={item}
                  style={{
                    padding: '1.15rem 1.25rem',
                    border: '1px solid var(--c-line-current)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span className="t-body-lg">{item}</span>
                  <span className="t-mono-label">0{i + 1}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="arch-cta arch-cta--solid"
              onClick={() => onOpenEnquiry(pillar.title)}
            >
              {pillar.actionCta} →
            </button>
          </div>
        </div>
      </SeamlessSection>
    </main>
  );
}
