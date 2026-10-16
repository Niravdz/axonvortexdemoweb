import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { ThemeInvertButton } from './components/ThemeInvertButton';
import { EnquiryDrawer } from './components/EnquiryDrawer';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SolutionsOverviewPage } from './pages/SolutionsOverviewPage';
import { SolutionPillarPage } from './pages/SolutionPillarPage';
import { IndividualServicePage } from './pages/IndividualServicePage';
import {
  ApproachPage,
  AboutPage,
  GrowthAuditPage,
  InsightsPage,
  ContactPage
} from './pages/AuthorityPages';
import { UnderlineText } from './components/SlideText';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [theme, setTheme] = useState('light');
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || '/'
  );
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryIntent, setEnquiryIntent] = useState('');
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [preloaderCount, setPreloaderCount] = useState(0);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const cursorRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger (exact match to Santalarch)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  // Fast architectural preloader (00 -> 100)
  useEffect(() => {
    let frame;
    let start = performance.now();
    const duration = 650;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setPreloaderCount(Math.floor(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPreloaderDone(true), 120);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Theme sync to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Custom difference-blend cursor tracking
  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target;
      const isClickable =
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a'));
      if (isClickable) {
        cursorEl.classList.add('is-hovered');
      } else {
        cursorEl.classList.remove('is-hovered');
      }
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      cursorEl.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Popstate listener for browser back/forward
  useEffect(() => {
    const onPop = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Handle initial hash (e.g. /#philosophy)
  useEffect(() => {
    if (preloaderDone && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [preloaderDone]);

  const handleNavigate = (route, hash = '') => {
    const url = hash ? `${route}${hash}` : route;
    window.history.pushState({}, '', url);
    setCurrentPath(route);

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        ScrollTrigger.refresh();
      }, 120);
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    }
  };

  const handleOpenEnquiry = (intent = '') => {
    setEnquiryIntent(intent);
    setEnquiryOpen(true);
  };

  // Route resolution
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          theme={theme}
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/solutions') {
      return (
        <SolutionsOverviewPage
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath.startsWith('/solutions/')) {
      const pillarId = currentPath.replace('/solutions/', '');
      return (
        <SolutionPillarPage
          pillarId={pillarId}
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <IndividualServicePage
          serviceSlug={slug}
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/approach') {
      return (
        <ApproachPage
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/about') {
      return (
        <AboutPage
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/growth-audit') {
      return (
        <GrowthAuditPage
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/insights') {
      return (
        <InsightsPage
          onNavigate={handleNavigate}
          onOpenEnquiry={handleOpenEnquiry}
        />
      );
    }
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }
    return (
      <HomePage
        theme={theme}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />
    );
  };

  return (
    <>
      {/* Preloader Overlay */}
      <div className={`preloader-overlay ${preloaderDone ? 'done' : ''}`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}
        >
          <span>AXONVORTEX // GROWTH SYSTEM</span>
          <span>INITIALIZING ARCHITECTURE</span>
        </div>
        <div
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1
          }}
        >
          {preloaderCount < 10 ? `0${preloaderCount}` : preloaderCount}%
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            opacity: 0.65
          }}
        >
          <span>BUILD SMARTER. MARKET BETTER. GROW FASTER.</span>
          <span>STRATEGY → AI → AUTOMATION</span>
        </div>
      </div>

      {/* Custom Difference-Blend Cursor */}
      <div ref={cursorRef} className="cursor-pos">
        <div className="cursor-scale">
          <div className="cursor-circle" />
        </div>
      </div>

      {/* Global Sticky Architectural Hairlines (12.5%, 50%, 62.5%, Diagonal) */}
      <div className="global-grid-lines" aria-hidden="true">
        <div className="global-grid-line global-grid-line--v1" />
        <div className="global-grid-line global-grid-line--v2" />
        <div className="global-grid-line global-grid-line--v3" />
        <div className="global-grid-line global-grid-line--h1" />
        <div className="global-grid-line global-grid-line--diag" />
      </div>

      {/* Fixed Difference-Blend Header + Full Sitemap Index */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Fixed Bottom-Left Theme Inverter (Santalarch Orbit Icon) */}
      <ThemeInvertButton
        theme={theme}
        onToggle={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      />

      {/* Santalarch Compact Cookie Notice at 12.5% Left */}
      {!cookiesAccepted && (
        <div className="santal-cookie-bar">
          <span style={{ opacity: 0.85 }}>This site uses cookies.</span>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setCookiesAccepted(true)}
              style={{ fontWeight: 500 }}
            >
              <UnderlineText>Accept</UnderlineText>
            </button>
            <button
              type="button"
              onClick={() => setCookiesAccepted(true)}
              style={{ opacity: 0.6 }}
            >
              <UnderlineText>Decline</UnderlineText>
            </button>
          </div>
        </div>
      )}

      {/* Active Route View */}
      {renderPage()}

      {/* Footer with Let's Talk + Digital Infrastructure + Final Service Architecture */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Multi-Step Growth Journey / Audit Drawer */}
      <EnquiryDrawer
        isOpen={enquiryOpen}
        initialIntent={enquiryIntent}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}
