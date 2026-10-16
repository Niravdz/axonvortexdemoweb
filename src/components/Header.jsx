import React, { useState } from 'react';
import { SlideText } from './SlideText';
import { CORE_SOLUTIONS, INDIVIDUAL_SERVICES } from '../data/axonvortexData';

export function Header({ currentPath, onNavigate, onOpenEnquiry }) {
  const [sitemapOpen, setSitemapOpen] = useState(false);

  const handleNav = (route, hash = '') => {
    setSitemapOpen(false);
    onNavigate(route, hash);
  };

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <button
            type="button"
            className="site-header__brand"
            onClick={() => handleNav('/')}
          >
            <span className="site-header__brand-dot" />
            <SlideText>AXONVORTEX</SlideText>
          </button>

          <nav className="site-header__nav" aria-label="Primary Navigation">
            <button
              type="button"
              onClick={() => handleNav('/', '#philosophy')}
            >
              <SlideText>Philosophy</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/solutions')}
              style={{
                opacity: currentPath.startsWith('/solutions') ? 1 : 0.85
              }}
            >
              <SlideText>Solutions</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/approach')}
            >
              <SlideText>Approach</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/', '#process')}
            >
              <SlideText>Process</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/about')}
            >
              <SlideText>About</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/growth-audit')}
            >
              <SlideText>Growth Audit</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/insights')}
            >
              <SlideText>Insights</SlideText>
            </button>
            <button
              type="button"
              onClick={() => handleNav('/contact')}
            >
              <SlideText>Contact</SlideText>
            </button>
          </nav>

          <div className="site-header__actions">
            <button
              type="button"
              onClick={() => setSitemapOpen((v) => !v)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              <SlideText>{sitemapOpen ? 'Close [×]' : 'Index [19]'}</SlideText>
            </button>

            <button
              type="button"
              className="site-header__enquire-btn"
              onClick={() => onOpenEnquiry('Start Your Growth Journey')}
            >
              <SlideText>Start Growth</SlideText>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Index / Sitemap Drawer */}
      {sitemapOpen && (
        <div
          className="enquiry-popup"
          style={{ zIndex: 480, paddingTop: '4.5rem' }}
        >
          <div style={{ gridColumn: '1 / -1' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(240,240,240,0.15)',
                marginBottom: '2rem'
              }}
            >
              <div className="index-counter">
                <span>AXONVORTEX</span>
                <span className="index-counter__sep" />
                <span className="index-counter__total">
                  COMPLETE ARCHITECTURE &amp; SITEMAP
                </span>
              </div>
              <button
                type="button"
                className="arch-cta arch-cta--ghost-light"
                onClick={() => setSitemapOpen(false)}
              >
                Close Index [ESC]
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '2rem'
              }}
            >
              {/* Column 1: Core Pages & Philosophy Anchors */}
              <div>
                <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
                  01 // PRIMARY ARCHITECTURE
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { label: '01. Home', route: '/', hash: '' },
                    { label: '— #philosophy (3 Pillars)', route: '/', hash: '#philosophy' },
                    { label: '— #growth-system (5 Stages)', route: '/', hash: '#growth-system' },
                    { label: '— #process (How We Work)', route: '/', hash: '#process' },
                    { label: '02. Solutions Overview', route: '/solutions', hash: '' },
                    { label: '09. Our Approach', route: '/approach', hash: '' },
                    { label: '09. About AxonVortex', route: '/about', hash: '' },
                    { label: '09. Digital Growth Audit', route: '/growth-audit', hash: '' },
                    { label: '09. AxonVortex Insights', route: '/insights', hash: '' },
                    { label: '09. Contact & Enquiry', route: '/contact', hash: '' }
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleNav(item.route, item.hash)}
                        className="t-body"
                        style={{ opacity: 0.85 }}
                      >
                        <SlideText>{item.label}</SlideText>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: 5 Solution Pillars */}
              <div>
                <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
                  02 // SOLUTION PILLARS (03–07)
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {CORE_SOLUTIONS.map((sol) => (
                    <li key={sol.id}>
                      <button
                        type="button"
                        onClick={() => handleNav(sol.route)}
                        style={{ textAlign: 'left' }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            opacity: 0.5
                          }}
                        >
                          PILLAR {sol.index}
                        </div>
                        <div className="t-body-lg" style={{ fontWeight: 500 }}>
                          <SlideText>{sol.title}</SlideText>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Individual Service Pages (01-07) */}
              <div>
                <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
                  03 // SERVICE PAGES (01–07)
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {INDIVIDUAL_SERVICES.slice(0, 7).map((srv) => (
                    <li key={srv.slug}>
                      <button
                        type="button"
                        onClick={() => handleNav(`/services/${srv.slug}`)}
                        className="t-body"
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            opacity: 0.45,
                            marginRight: '0.5rem'
                          }}
                        >
                          {srv.number}
                        </span>
                        <SlideText>{srv.title}</SlideText>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Individual Service Pages (08-13) + Audit */}
              <div>
                <div className="t-mono-label" style={{ marginBottom: '1rem' }}>
                  04 // SERVICE PAGES (08–13)
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {INDIVIDUAL_SERVICES.slice(7).map((srv) => (
                    <li key={srv.slug}>
                      <button
                        type="button"
                        onClick={() => handleNav(`/services/${srv.slug}`)}
                        className="t-body"
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            opacity: 0.45,
                            marginRight: '0.5rem'
                          }}
                        >
                          {srv.number}
                        </span>
                        <SlideText>{srv.title}</SlideText>
                      </button>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '2rem' }}>
                  <button
                    type="button"
                    className="arch-cta arch-cta--light"
                    onClick={() => {
                      setSitemapOpen(false);
                      onOpenEnquiry('Digital Growth Audit');
                    }}
                  >
                    Get a Digital Growth Audit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
