import React, { useState } from 'react';
import {
  APPROACH_PAGE_DATA,
  ABOUT_PAGE_DATA,
  GROWTH_AUDIT_DATA,
  INSIGHTS_DATA,
  FAQ_LIST,
  IMPROVEMENT_OPTIONS
} from '../data/axonvortexData';
import {
  SeamlessPageHero,
  SeamlessSection,
  SeamlessKineticWords,
  SeamlessHorizontalFlow,
  SeamlessDifferentialGrid
} from '../components/SeamlessParallaxPrimitives';
import { SlideText } from '../components/SlideText';

/* ==========================================================================
   09A. OUR APPROACH PAGE (/approach) — FULL PARALLAX
   ========================================================================== */
export function ApproachPage({ onNavigate, onOpenEnquiry }) {
  return (
    <main className="seamless-page-flow">
      <SeamlessPageHero
        code="09 // OUR APPROACH & METHODOLOGY"
        watermarkText="APPROACH"
        headline={APPROACH_PAGE_DATA.headline}
        subheadline={APPROACH_PAGE_DATA.subheadline}
        description={APPROACH_PAGE_DATA.intro}
        primaryCta="Start Your Growth Journey"
        onPrimaryCta={() => onOpenEnquiry('Start Your Growth Journey')}
        secondaryCta="Get a Digital Growth Audit"
        onSecondaryCta={() => onNavigate('/growth-audit')}
      />

      {/* Don't Start With the Tool + 7-Stage Horizontal Growth Framework Train */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="FIRST PRINCIPLE"
          title={APPROACH_PAGE_DATA.problemFirstTitle}
          subtitle={APPROACH_PAGE_DATA.problemFirstBody}
          words={[
            'Don’t start',
            'with the tool —',
            'start with',
            'the business',
            'problem.'
          ]}
        />

        <SeamlessHorizontalFlow
          label="OUR GROWTH FRAMEWORK // 01 — 07"
          title="Understand → Diagnose → Strategize → Create → Automate → Measure → Improve"
          description={APPROACH_PAGE_DATA.growthLoop.description}
          steps={APPROACH_PAGE_DATA.frameworkSteps.map((s) => ({
            step: s.index,
            title: s.title,
            desc: s.desc
          }))}
        />
      </SeamlessSection>

      {/* Human + AI & Data-Informed + 3-Col Differential Parallax of Principles */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ marginBottom: '5rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              HUMAN + AI SYNERGY
            </div>
            <h2 className="t-h1-display" style={{ marginBottom: '1rem' }}>
              {APPROACH_PAGE_DATA.humanPlusAi.title}
            </h2>
            <p className="t-body-lg" style={{ opacity: 0.82 }}>
              {APPROACH_PAGE_DATA.humanPlusAi.description}
            </p>
          </div>
          <div style={{ gridColumn: '5 / 9' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              DECISION ARCHITECTURE
            </div>
            <h3 className="t-h2-monument" style={{ marginBottom: '1rem' }}>
              {APPROACH_PAGE_DATA.dataInformed.title}
            </h3>
            <p className="t-body-lg" style={{ opacity: 0.82 }}>
              {APPROACH_PAGE_DATA.dataInformed.description}
            </p>
          </div>
        </div>

        <SeamlessDifferentialGrid
          items={APPROACH_PAGE_DATA.principles}
          renderItem={(p, idx) => (
            <article
              key={p.title}
              className="santal-work-card"
              style={{ minHeight: '19rem' }}
            >
              <div className="t-mono-label">PRINCIPLE 0{idx + 1}</div>
              <div>
                <h3
                  className="t-h3-editorial"
                  style={{ marginBottom: '0.75rem' }}
                >
                  {p.title}
                </h3>
                <p className="t-body-lg" style={{ opacity: 0.8 }}>
                  {p.desc}
                </p>
              </div>
              <div className="t-mono-label" style={{ opacity: 0.45 }}>
                HYPOTHESIS → ACTION → MEASURE → LEARN → IMPROVE
              </div>
            </article>
          )}
        />
      </SeamlessSection>
    </main>
  );
}

/* ==========================================================================
   09B. ABOUT AXONVORTEX PAGE (/about + FAQ) — FULL PARALLAX
   ========================================================================== */
export function AboutPage({ onNavigate, onOpenEnquiry }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="seamless-page-flow">
      <SeamlessPageHero
        code="ABOUT AXONVORTEX // BUILT IN PUBLIC"
        watermarkText="BUILDING"
        headline={ABOUT_PAGE_DATA.headline}
        subheadline={ABOUT_PAGE_DATA.intro}
        description={ABOUT_PAGE_DATA.whyExists}
        primaryCta="Start Your Growth Journey"
        onPrimaryCta={() => onOpenEnquiry('Start Your Growth Journey')}
        secondaryCta="Read Build Journal"
        onSecondaryCta={() => onNavigate('/insights')}
      />

      {/* Kinetic Words + Horizontal Beliefs Scrubber */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="RADICAL TRANSPARENCY"
          title="Building in Public"
          subtitle={ABOUT_PAGE_DATA.buildingInPublic}
          words={[
            'Built from zero.',
            'No fake authority.',
            'No AI hype.',
            'Just real systems.'
          ]}
        />

        <SeamlessHorizontalFlow
          label="WHAT WE BELIEVE // 01 — 04"
          title="Core Operating Convictions"
          description={ABOUT_PAGE_DATA.whatWereBuilding}
          steps={ABOUT_PAGE_DATA.beliefs.map((b) => ({
            step: b.index,
            title: b.title,
            desc: b.desc
          }))}
        />
      </SeamlessSection>

      {/* What We Don't Believe In vs What We Do Believe In */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ gap: '3rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
              REJECTED PATTERNS
            </div>
            <h2 className="t-h2-monument" style={{ marginBottom: '2rem' }}>
              What We Don’t Believe In
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {ABOUT_PAGE_DATA.dontBelieveIn.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: '1rem 1.25rem',
                    border: '1px solid rgba(240,240,240,0.16)',
                    opacity: 0.65
                  }}
                  className="t-body-lg"
                >
                  [—] {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ gridColumn: '5 / 9' }}>
            <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
              OUR STANDARD
            </div>
            <h2 className="t-h2-monument" style={{ marginBottom: '2rem' }}>
              What We Do Believe In
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {ABOUT_PAGE_DATA.doBelieveIn.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: '1rem 1.25rem',
                    border: '1px solid currentColor'
                  }}
                  className="t-body-lg"
                >
                  [+] {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SeamlessSection>

      {/* 10-Question FAQ Accordion */}
      <SeamlessSection variant="light" overlap>
        <div className="arch-grid">
          <div style={{ gridColumn: '1 / 4' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              CLARITY // 01 — 10
            </div>
            <h2 className="t-h1-display">FAQ</h2>
            <p className="t-body" style={{ opacity: 0.72, marginTop: '1rem' }}>
              Transparent answers on how AxonVortex operates and how we build
              connected digital growth systems.
            </p>
          </div>

          <div style={{ gridColumn: '4 / 9' }}>
            {FAQ_LIST.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className={`accordion-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <span className="t-mono-label">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="t-body-lg" style={{ fontWeight: 600 }}>
                      {item.q}
                    </span>
                    <svg
                      className={`icon-plus ${isOpen ? 'active' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <line
                        x1="2"
                        y1="10"
                        x2="18"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <line
                        className="plus-vertical"
                        x1="10"
                        y1="2"
                        x2="10"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </button>

                  <div className="accordion-body">
                    <div className="accordion-body__inner">
                      <p
                        className="t-body-lg"
                        style={{
                          padding: '0.75rem 0 0.5rem 4.5rem',
                          opacity: 0.8
                        }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SeamlessSection>
    </main>
  );
}

/* ==========================================================================
   09C. DIGITAL GROWTH AUDIT & 5 LEAD MAGNETS (/growth-audit) — FULL PARALLAX
   ========================================================================== */
export function GrowthAuditPage({ onNavigate, onOpenEnquiry }) {
  const [activeMagnet, setActiveMagnet] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (key) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentMagnet = GROWTH_AUDIT_DATA.leadMagnets[activeMagnet];

  return (
    <main className="seamless-page-flow">
      <SeamlessPageHero
        code="DIAGNOSTIC SYSTEM // DIGITAL GROWTH AUDIT"
        watermarkText="GROWTH AUDIT"
        headline={GROWTH_AUDIT_DATA.headline}
        subheadline="Your business may already be doing marketing, running ads, or using AI. But are all the pieces actually working together?"
        description={GROWTH_AUDIT_DATA.intro}
        primaryCta="Request My Growth Audit"
        onPrimaryCta={() => onOpenEnquiry('Digital Growth Audit')}
        secondaryCta="Explore Solutions"
        onSecondaryCta={() => onNavigate('/solutions')}
      />

      {/* 6-Layer Evaluation Horizontal Flow + 3-Col Differential Grid */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <SeamlessKineticWords
          label="THE AUDIT FRAMEWORK"
          title="Discover → Diagnose → Prioritize → Recommend"
          subtitle="Don’t guess what your business needs next. Find out."
          words={[
            'Find what is',
            'holding your',
            'digital growth',
            'back.'
          ]}
        />

        <SeamlessHorizontalFlow
          label="6-LAYER EVALUATION // WHAT WE LOOK AT"
          title="Comprehensive System Diagnostic"
          description="We evaluate every touchpoint from first impression to automated follow-up."
          steps={GROWTH_AUDIT_DATA.whatWeLookAt.map((area) => ({
            step: area.index,
            title: area.title,
            desc: area.desc
          }))}
        />
      </SeamlessSection>

      {/* 5 Interactive Lead Magnets & Self-Assessments */}
      <SeamlessSection variant="dark" overlap={false}>
        <div className="arch-grid" style={{ marginBottom: '3.5rem' }}>
          <div style={{ gridColumn: '1 / 5' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              INTERACTIVE DIAGNOSTICS // 01 — 05
            </div>
            <h2 className="t-h1-display">5 Growth Assessments</h2>
          </div>
          <div
            style={{
              gridColumn: '5 / 9',
              display: 'flex',
              alignItems: 'flex-end'
            }}
          >
            <p className="t-body-lg" style={{ opacity: 0.82 }}>
              Select any of our 5 diagnostic tools below to run an interactive
              self-check or request the full assessment.
            </p>
          </div>
        </div>

        <div className="arch-grid">
          <div
            style={{
              gridColumn: '1 / 4',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            {GROWTH_AUDIT_DATA.leadMagnets.map((mag, idx) => (
              <button
                key={mag.id}
                type="button"
                onClick={() => setActiveMagnet(idx)}
                style={{
                  padding: '1.15rem 1.25rem',
                  border: '1px solid currentColor',
                  borderColor:
                    activeMagnet === idx
                      ? 'currentColor'
                      : 'rgba(240,240,240,0.16)',
                  backgroundColor:
                    activeMagnet === idx
                      ? 'rgba(240,240,240,0.08)'
                      : 'transparent',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span
                    className="t-mono-label"
                    style={{ display: 'block', marginBottom: '0.2rem' }}
                  >
                    ASSESSMENT {mag.index}
                  </span>
                  <span className="t-body-lg" style={{ fontWeight: 500 }}>
                    {mag.title}
                  </span>
                </div>
                <span>→</span>
              </button>
            ))}
          </div>

          <div
            style={{
              gridColumn: '4 / 9',
              border: '1px solid rgba(240,240,240,0.2)',
              padding: '2.5rem'
            }}
          >
            <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
              TOOL {currentMagnet.index} // INTERACTIVE CHECKLIST
            </div>
            <h3 className="t-h2-monument" style={{ marginBottom: '0.75rem' }}>
              {currentMagnet.title}
            </h3>
            <p
              className="t-body-lg"
              style={{ fontWeight: 500, marginBottom: '0.5rem' }}
            >
              {currentMagnet.question}
            </p>
            <p className="t-body" style={{ opacity: 0.78, marginBottom: '2rem' }}>
              {currentMagnet.description}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                marginBottom: '2rem'
              }}
            >
              {currentMagnet.checkpoints.map((cp) => {
                const key = `${currentMagnet.id}-${cp}`;
                const isChecked = !!checkedItems[key];
                return (
                  <button
                    key={cp}
                    type="button"
                    onClick={() => toggleCheck(key)}
                    style={{
                      padding: '0.85rem 1rem',
                      border: '1px solid rgba(240,240,240,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      backgroundColor: isChecked
                        ? 'rgba(240,240,240,0.12)'
                        : 'transparent'
                    }}
                  >
                    <span className="t-mono-label">
                      {isChecked ? '[✓]' : '[ ]'}
                    </span>
                    <span className="t-body">{cp}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="arch-cta arch-cta--light"
              onClick={() => onOpenEnquiry(currentMagnet.title)}
            >
              {currentMagnet.cta} →
            </button>
          </div>
        </div>
      </SeamlessSection>
    </main>
  );
}

/* ==========================================================================
   09D. AXONVORTEX INSIGHTS PAGE (/insights) — FULL PARALLAX
   ========================================================================== */
export function InsightsPage({ onNavigate, onOpenEnquiry }) {
  const [selectedPillar, setSelectedPillar] = useState('All');

  const filteredEntries =
    selectedPillar === 'All'
      ? INSIGHTS_DATA.journalEntries
      : INSIGHTS_DATA.journalEntries.filter(
          (e) =>
            e.pillar.toLowerCase() === selectedPillar.toLowerCase() ||
            e.category.toLowerCase() === selectedPillar.toLowerCase()
        );

  return (
    <main className="seamless-page-flow">
      <SeamlessPageHero
        code="AXONVORTEX INSIGHTS // BUILD JOURNAL"
        watermarkText="INSIGHTS"
        headline={INSIGHTS_DATA.headline}
        subheadline="No empty trends, no technology hype — just useful ideas designed to help businesses make smarter digital decisions."
        description={INSIGHTS_DATA.intro}
        primaryCta="Start Your Growth Journey"
        onPrimaryCta={() => onOpenEnquiry('Start Your Growth Journey')}
        secondaryCta="Explore Solutions"
        onSecondaryCta={() => onNavigate('/solutions')}
      />

      {/* 3-Column Differential Parallax of Build Journal & Insights */}
      <SeamlessSection variant="dark" overlap curtainReveal>
        <div className="arch-grid" style={{ marginBottom: '3rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
              FILTER BY DISCIPLINE // CONTENT LOOP:{' '}
              {INSIGHTS_DATA.contentLoop.join(' → ')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                'All',
                'Building in Public',
                ...INSIGHTS_DATA.categories.map((c) => c.title)
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedPillar(cat)}
                  className="arch-cta"
                  style={{
                    backgroundColor:
                      selectedPillar === cat
                        ? 'var(--c-light-primary)'
                        : 'transparent',
                    color:
                      selectedPillar === cat
                        ? 'var(--c-dark-primary)'
                        : 'var(--c-light-primary)',
                    borderColor: 'rgba(240,240,240,0.3)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SeamlessDifferentialGrid
          items={filteredEntries}
          renderItem={(entry) => (
            <article
              key={entry.id}
              className="santal-work-card"
              style={{ minHeight: '24rem' }}
              onClick={() => onNavigate(entry.relatedSolution.route)}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}
                >
                  <span className="t-mono-label">
                    {entry.index} // {entry.category.toUpperCase()}
                  </span>
                  <span className="t-mono-label">{entry.readTime}</span>
                </div>
                <div
                  className="t-mono-label"
                  style={{ marginBottom: '0.5rem', opacity: 0.7 }}
                >
                  {entry.pillar}
                </div>
                <h3
                  className="t-h3-editorial"
                  style={{ marginBottom: '1rem' }}
                >
                  {entry.title}
                </h3>
                <p className="t-body" style={{ opacity: 0.78 }}>
                  {entry.excerpt}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(240,240,240,0.16)'
                }}
              >
                <span className="t-caption" style={{ fontWeight: 600 }}>
                  <SlideText>{entry.relatedSolution.label} →</SlideText>
                </span>
              </div>
            </article>
          )}
        />
      </SeamlessSection>
    </main>
  );
}

/* ==========================================================================
   09E. CONTACT PAGE (/contact) — FULL PARALLAX
   ========================================================================== */
export function ContactPage({ onNavigate }) {
  const [selectedAreas, setSelectedAreas] = useState(['AI', 'Automation']);
  const [sent, setSent] = useState(false);

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((x) => x !== area) : [...prev, area]
    );
  };

  return (
    <main className="seamless-page-flow">
      <SeamlessPageHero
        code="CONTACT // START THE CONVERSATION"
        watermarkText="LET'S TALK"
        headline="Let’s Talk About Your Next Stage of Growth."
        subheadline="You don’t need to know exactly which service you need. You just need to know where you are, where you want to go, and what’s getting in the way."
        description="We’ll help you identify where digital strategy, marketing, technology or AI could make the biggest difference."
        secondaryCta="Request Digital Growth Audit"
        onSecondaryCta={() => onNavigate('/growth-audit')}
      />

      <SeamlessSection variant="dark" overlap curtainReveal>
        <div className="arch-grid">
          <div style={{ gridColumn: '1 / 4' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
              DIRECT INTAKE
            </div>
            <h2 className="t-h2-monument" style={{ marginBottom: '1.25rem' }}>
              Tell Us About Your Business
            </h2>
            <p className="t-body" style={{ opacity: 0.75 }}>
              Your vision deserves more than a digital presence. It deserves a
              connected growth system.
            </p>
          </div>

          <div style={{ gridColumn: '5 / 9' }}>
            {sent ? (
              <div
                style={{
                  border: '1px solid rgba(240,240,240,0.2)',
                  padding: '3rem'
                }}
              >
                <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
                  ENQUIRY LOGGED
                </div>
                <h3 className="t-h3-editorial" style={{ marginBottom: '1rem' }}>
                  Thank you. Let’s build your growth system.
                </h3>
                <p className="t-body" style={{ opacity: 0.78 }}>
                  We have received your business details and selected priority
                  areas ({selectedAreas.join(', ')}).
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                style={{
                  border: '1px solid rgba(240,240,240,0.2)',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.25rem'
                  }}
                >
                  <div>
                    <label className="t-mono-label">Name</label>
                    <input
                      required
                      className="arch-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="t-mono-label">Business Name</label>
                    <input
                      required
                      className="arch-input"
                      placeholder="Your business or organization"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.25rem'
                  }}
                >
                  <div>
                    <label className="t-mono-label">Email</label>
                    <input
                      type="email"
                      required
                      className="arch-input"
                      placeholder="Your business email"
                    />
                  </div>
                  <div>
                    <label className="t-mono-label">Phone</label>
                    <input
                      type="tel"
                      className="arch-input"
                      placeholder="Your contact number"
                    />
                  </div>
                </div>

                <div>
                  <label className="t-mono-label">Website (if available)</label>
                  <input
                    type="text"
                    className="arch-input"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <div
                    className="t-mono-label"
                    style={{ marginBottom: '0.75rem' }}
                  >
                    What are you looking to improve?
                  </div>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}
                  >
                    {IMPROVEMENT_OPTIONS.map((opt) => {
                      const active = selectedAreas.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleArea(opt)}
                          className={`arch-chip ${active ? 'selected' : ''}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="t-mono-label">
                    What are you trying to achieve?
                  </label>
                  <input
                    type="text"
                    className="arch-input"
                    placeholder="Describe your target outcome..."
                  />
                </div>

                <div>
                  <label className="t-mono-label">
                    What is currently getting in the way?
                  </label>
                  <input
                    type="text"
                    className="arch-input"
                    placeholder="Describe current bottlenecks or challenges..."
                  />
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <button type="submit" className="arch-cta arch-cta--light">
                    Start the Conversation →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </SeamlessSection>
    </main>
  );
}
