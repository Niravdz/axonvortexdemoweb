import React from 'react';
import { INDIVIDUAL_SERVICES } from '../data/axonvortexData';
import {
  SeamlessPageHero,
  SeamlessSection,
  SeamlessKineticWords,
  SeamlessHorizontalFlow,
  SeamlessDifferentialGrid
} from '../components/SeamlessParallaxPrimitives';
import { SlideText } from '../components/SlideText';

export function IndividualServicePage({
  serviceSlug,
  onNavigate,
  onOpenEnquiry
}) {
  const currentIndex = INDIVIDUAL_SERVICES.findIndex(
    (s) => s.slug === serviceSlug
  );
  const service =
    currentIndex >= 0
      ? INDIVIDUAL_SERVICES[currentIndex]
      : INDIVIDUAL_SERVICES[0];

  const prevService =
    INDIVIDUAL_SERVICES[
      (currentIndex - 1 + INDIVIDUAL_SERVICES.length) %
        INDIVIDUAL_SERVICES.length
    ];
  const nextService =
    INDIVIDUAL_SERVICES[(currentIndex + 1) % INDIVIDUAL_SERVICES.length];

  return (
    <main className="seamless-page-flow">
      {/* 1. SEAMLESS PARALLAX HERO */}
      <SeamlessPageHero
        code={`SERVICE ${service.number} // ${service.category.toUpperCase()}`}
        watermarkText={service.title}
        headline={service.headline}
        subheadline={service.subheadline}
        description={service.intro}
        primaryCta={service.cta}
        onPrimaryCta={() => onOpenEnquiry(service.title)}
        secondaryCta={`Back to ${service.category}`}
        onSecondaryCta={() => onNavigate(service.categoryRoute)}
        breadcrumb={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="t-mono-label"
            >
              SOLUTIONS
            </button>
            <span className="t-mono-label">/</span>
            <button
              type="button"
              onClick={() => onNavigate(service.categoryRoute)}
              className="t-mono-label"
            >
              {service.category.toUpperCase()}
            </button>
            <span className="t-mono-label">/</span>
            <span className="t-mono-label">
              {service.number} — {service.title.toUpperCase()}
            </span>
          </div>
        }
      />

      {/* 2. THE PROBLEM + HORIZONTAL SYSTEM FLOW TRAIN */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="THE PROBLEM WE SOLVE"
          title={service.title}
          subtitle={service.problem}
          words={['Purposeful', 'strategy —', 'measurable', 'execution.']}
        />

        <SeamlessHorizontalFlow
          label={`SYSTEM ARCHITECTURE // ${service.title.toUpperCase()}`}
          title="The Connected Execution Flow"
          description={service.problem}
          steps={service.flow.map((f, idx) => ({
            step: `0${idx + 1}`,
            title: f,
            desc: `Stage 0${idx + 1} of the ${service.title} system — engineered to eliminate friction between attention and business value.`
          }))}
        />
      </SeamlessSection>

      {/* 3. WHAT WE DO — 3-COLUMN DIFFERENTIAL PARALLAX */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ marginBottom: '4rem' }}>
          <div style={{ gridColumn: '1 / 6' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              SCOPE OF EXECUTION // {service.number}
            </div>
            <h2 className="t-h1-display">What We Do</h2>
          </div>
        </div>

        <SeamlessDifferentialGrid
          items={service.whatWeDo}
          renderItem={(item, idx) => (
            <article
              key={item.title}
              className="santal-work-card"
              style={{ minHeight: '20rem' }}
              onClick={() => onOpenEnquiry(`${service.title} — ${item.title}`)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}
              >
                <span className="t-mono-label">DELIVERABLE 0{idx + 1}</span>
                <span className="t-mono-label">{service.number}</span>
              </div>

              <div>
                <h3
                  className="t-h3-editorial"
                  style={{ marginBottom: '0.75rem' }}
                >
                  {item.title}
                </h3>
                <p className="t-body-lg" style={{ opacity: 0.8 }}>
                  {item.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(240,240,240,0.16)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span className="t-caption">
                  <SlideText>Include in Growth Plan →</SlideText>
                </span>
                <span className="t-mono-label">[+]</span>
              </div>
            </article>
          )}
        />
      </SeamlessSection>

      {/* 4. WHO IT'S FOR + PREV/NEXT SERVICE */}
      <SeamlessSection variant="light" overlap>
        <div className="arch-grid" style={{ marginBottom: '5rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
              CLIENT FIT
            </div>
            <h2 className="t-h1-display" style={{ marginBottom: '1.25rem' }}>
              Who It’s For
            </h2>
            <p className="t-body-lg" style={{ opacity: 0.78, maxWidth: '24rem' }}>
              {service.intro}
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
              {service.whoItsFor.map((who, i) => (
                <li
                  key={who}
                  style={{
                    padding: '1.15rem 1.25rem',
                    border: '1px solid var(--c-line-current)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span className="t-body-lg">{who}</span>
                  <span className="t-mono-label">0{i + 1}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="arch-cta arch-cta--solid"
              onClick={() => onOpenEnquiry(service.title)}
            >
              {service.cta} →
            </button>
          </div>
        </div>

        {/* Prev / Next Service Navigation */}
        <div
          className="arch-grid"
          style={{
            paddingTop: '3rem',
            borderTop: '1px solid var(--c-line-current)',
            alignItems: 'center'
          }}
        >
          <div style={{ gridColumn: '1 / 4' }}>
            <button
              type="button"
              onClick={() => onNavigate(`/services/${prevService.slug}`)}
              className="t-body"
            >
              <span
                className="t-mono-label"
                style={{ display: 'block', marginBottom: '0.25rem' }}
              >
                ← PREVIOUS ({prevService.number})
              </span>
              <SlideText>{prevService.title}</SlideText>
            </button>
          </div>
          <div style={{ gridColumn: '4 / 6', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => onNavigate('/solutions')}
              className="t-mono-label"
            >
              [ALL 13 SERVICES]
            </button>
          </div>
          <div style={{ gridColumn: '6 / 9', textAlign: 'right' }}>
            <button
              type="button"
              onClick={() => onNavigate(`/services/${nextService.slug}`)}
              className="t-body"
            >
              <span
                className="t-mono-label"
                style={{ display: 'block', marginBottom: '0.25rem' }}
              >
                NEXT ({nextService.number}) →
              </span>
              <SlideText>{nextService.title}</SlideText>
            </button>
          </div>
        </div>
      </SeamlessSection>
    </main>
  );
}
