import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BRAND,
  CORE_SOLUTIONS
} from '../data/axonvortexData';
import { SlideText, UnderlineText } from './SlideText';

gsap.registerPlugin(ScrollTrigger);

/**
 * Replicates Santalarch's #contact section + "Digital Infrastructure / Nothing is secondary"
 * combined with AxonVortex's Final Service Architecture and Sitemap.
 * Uses feathered top overlap and GSAP scroll-scrubbed reveal so there is zero visible seam.
 */
export function Footer({ onNavigate, onOpenEnquiry }) {
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.santal-footer-reveal',
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 35%',
            scrub: 0.65
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      style={{
        backgroundColor: 'transparent',
        color: 'var(--c-dark-primary)',
        paddingTop: '10rem',
        paddingBottom: '3.5rem',
        marginTop: '-10lvh',
        position: 'relative',
        zIndex: 'var(--z-common)',
        WebkitMaskImage:
          'linear-gradient(180deg, transparent 0%, #000 12%, #000 100%)',
        maskImage:
          'linear-gradient(180deg, transparent 0%, #000 12%, #000 100%)'
      }}
    >
      {/* Monumental "Let's Talk" Callout (Exact Santalarch #contact layout) */}
      <div className="arch-grid santal-footer-reveal" style={{ marginBottom: '5rem' }}>
        <div style={{ gridColumn: '1 / 5' }}>
          <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
            NEXT STAGE OF GROWTH
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry('Start Your Growth Journey')}
            style={{ textAlign: 'left' }}
          >
            <h2
              className="t-h1-display"
              style={{
                textDecoration: 'underline',
                textUnderlineOffset: '0.14em',
                textDecorationThickness: '2px'
              }}
            >
              Let’s Talk
            </h2>
          </button>
          <p
            className="t-body-lg"
            style={{ marginTop: '1.5rem', maxWidth: '28rem', opacity: 0.8 }}
          >
            You don’t need to know exactly which service you need. Tell us about
            your business, your challenge and your goal.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '1.75rem'
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
              onClick={() => onNavigate('/growth-audit')}
            >
              Get a Digital Growth Audit
            </button>
          </div>
        </div>

        {/* Enquire & Direct Links */}
        <div style={{ gridColumn: '5 / 7' }}>
          <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
            Enquire
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div className="t-caption" style={{ opacity: 0.5 }}>
                General Enquiries
              </div>
              <a href={`mailto:${BRAND.email}`} className="t-body">
                <UnderlineText>{BRAND.email}</UnderlineText>
              </a>
            </div>
            <div>
              <div className="t-caption" style={{ opacity: 0.5 }}>
                Digital Growth Audit
              </div>
              <a href={`mailto:${BRAND.auditEmail}`} className="t-body">
                <UnderlineText>{BRAND.auditEmail}</UnderlineText>
              </a>
            </div>
            <div>
              <div className="t-caption" style={{ opacity: 0.5 }}>
                Partnerships
              </div>
              <a href={`mailto:${BRAND.partnershipsEmail}`} className="t-body">
                <UnderlineText>{BRAND.partnershipsEmail}</UnderlineText>
              </a>
            </div>
            <div>
              <div className="t-caption" style={{ opacity: 0.5 }}>
                Not Ready to Talk?
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  marginTop: '0.35rem'
                }}
              >
                <button
                  type="button"
                  onClick={() => onNavigate('/solutions')}
                  className="t-body"
                >
                  <SlideText>→ Explore Solutions</SlideText>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/insights')}
                  className="t-body"
                >
                  <SlideText>→ Explore Insights</SlideText>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/growth-audit')}
                  className="t-body"
                >
                  <SlideText>→ Get a Digital Growth Audit</SlideText>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Santalarch "Digital Infrastructure / Nothing is secondary" adapted for AxonVortex */}
        <div style={{ gridColumn: '7 / 9' }}>
          <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
            Digital Infrastructure
          </div>
          <div
            className="t-caption"
            style={{ fontWeight: 600, marginBottom: '0.75rem' }}
          >
            Nothing is secondary
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              opacity: 0.72
            }}
            className="t-caption"
          >
            <p>
              We believe the quality of a growth system is defined as much by
              the architecture that remains unseen as by the campaigns and
              interfaces that are immediately visible.
            </p>
            <p>
              From clean technical SEO and CRM data hygiene to bounded AI agent
              guardrails and conversion attribution, every layer is engineered
              for longevity, clarity, and measurable business value.
            </p>
          </div>
        </div>
      </div>

      {/* Final Service Architecture Matrix */}
      <div
        className="santal-footer-reveal"
        style={{
          borderTop: '1px solid var(--c-line-current)',
          borderBottom: '1px solid var(--c-line-current)',
          padding: '2.5rem var(--padding)',
          marginBottom: '2.5rem'
        }}
      >
        <div className="t-mono-label" style={{ marginBottom: '1.25rem' }}>
          FINAL SERVICE ARCHITECTURE // AXONVORTEX SITEMAP
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {CORE_SOLUTIONS.map((sol) => (
            <div key={sol.id}>
              <button
                type="button"
                onClick={() => onNavigate(sol.route)}
                style={{ fontWeight: 600, marginBottom: '0.6rem' }}
                className="t-caption"
              >
                <SlideText>{sol.title.toUpperCase()}</SlideText>
              </button>
              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                {sol.finalArchitectureServices.map((srv) => (
                  <li key={srv.slug}>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/services/${srv.slug}`)}
                      className="t-caption"
                      style={{ opacity: 0.68 }}
                    >
                      <SlideText>{srv.name}</SlideText>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal & Monumental Sign-off */}
      <div
        className="arch-grid santal-footer-reveal"
        style={{ alignItems: 'center', fontSize: '0.75rem', opacity: 0.65 }}
      >
        <div style={{ gridColumn: '1 / 4' }}>{BRAND.copyright}</div>
        <div style={{ gridColumn: '4 / 7' }}>
          Your Vision Deserves More Than a Digital Presence. It Deserves a
          Growth System.
        </div>
        <div
          style={{
            gridColumn: '7 / 9',
            textAlign: 'right',
            fontFamily: 'var(--font-mono)'
          }}
        >
          BUILD SMARTER · MARKET BETTER · GROW FASTER
        </div>
      </div>

      {/* Monumental Santalarch Bottom Wordmark Mirror */}
      <div
        className="santal-footer-reveal"
        style={{
          padding: '2.5rem var(--padding) 0',
          fontSize: 'clamp(3.2rem, 12.2vw, 13rem)',
          fontWeight: 600,
          letterSpacing: '-0.055em',
          lineHeight: 0.84,
          opacity: 0.08,
          userSelect: 'none',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        AXONVORTEX
      </div>
    </footer>
  );
}
