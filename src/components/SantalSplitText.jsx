import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits a string into word spans for Santalarch's exact word-by-word animation:
 * Initial: { opacity: 0, y: 20, rotate: 3 }
 * Enter:   { opacity: 1, y: 0, rotate: 0, duration: 1.6, stagger: 0.03, ease: 'power3.out', delay: 0.2 }
 * Leave:   { opacity: 0, duration: 0.25, ease: 'power2.out' }
 */
export function SantalSplitWords({
  text,
  active = null,
  triggerOnScroll = false,
  delay = 0.15,
  className = '',
  style = {},
  as: Tag = 'p'
}) {
  const containerRef = useRef(null);

  // Triggered by `active` prop (used in pinned multi-stage sections like #philosophy, #door, #services)
  useEffect(() => {
    if (active === null || !containerRef.current) return;
    const el = containerRef.current;
    const words = el.querySelectorAll('.santal-word-span');
    gsap.killTweensOf([el, ...words]);

    if (active) {
      gsap.set(el, { opacity: 1 });
      gsap.set(words, { opacity: 0, y: 20, rotate: 3 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.45,
        stagger: 0.028,
        ease: 'power3.out',
        delay
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out'
      });
    }
  }, [active, delay]);

  // Triggered automatically on scroll entry/leaveBack (used in Hero, Approach, Works, Process, Subpages)
  useEffect(() => {
    if (!triggerOnScroll || !containerRef.current) return;
    const el = containerRef.current;
    const words = el.querySelectorAll('.santal-word-span');
    gsap.set(words, { opacity: 0, y: 20, rotate: 3 });

    const playIn = () => {
      gsap.killTweensOf(words);
      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.5,
        stagger: 0.028,
        ease: 'power3.out',
        delay
      });
    };

    const playOut = () => {
      gsap.killTweensOf(words);
      gsap.to(words, {
        opacity: 0,
        y: 20,
        rotate: 3,
        duration: 0.25,
        ease: 'power2.out'
      });
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      end: 'bottom top',
      onEnter: playIn,
      onEnterBack: playIn,
      onLeave: playOut,
      onLeaveBack: playOut
    });

    return () => {
      st.kill();
      gsap.killTweensOf(words);
    };
  }, [triggerOnScroll, delay, text]);

  const wordsArray = String(text || '')
    .trim()
    .split(/\s+/);

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{
        ...style,
        opacity: active === false ? 0 : style.opacity
      }}
    >
      {wordsArray.map((word, idx) => (
        <React.Fragment key={idx}>
          <span
            className="santal-word-span"
            style={{
              display: 'inline-block',
              transformOrigin: '0% 100%',
              willChange: 'transform, opacity'
            }}
          >
            {word}
          </span>
          {idx < wordsArray.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/**
 * Replicates Santalarch's exact `CommonNav` (data-v-80b969e1):
 * Displays section title or blur-transitioning item captions on the left,
 * and blur-transitioning `01 | 03` index counter on the right.
 */
export function SantalCommonNav({ title, data = [], activeId = 0, style = {} }) {
  const total = String(data.length).padStart(2, '0');

  return (
    <div className="santal-common-nav" style={style}>
      <div className="santal-common-nav__captions">
        {title ? (
          <div className="santal-common-nav__caption active">{title}</div>
        ) : (
          data.map((item, idx) => (
            <div
              key={idx}
              className={`santal-common-nav__caption ${
                activeId === idx ? 'active' : ''
              }`}
            >
              {item.caption || item.label || item.title}
            </div>
          ))
        )}
      </div>

      <div className="santal-common-nav__indexes-wrap">
        <div className="santal-common-nav__indexes">
          <div className="santal-common-nav__sizer" aria-hidden="true">
            00
          </div>
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`santal-common-nav__index-item ${
                activeId === idx ? 'active' : ''
              }`}
            >
              {String(idx + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
        <div className="santal-common-nav__separator" />
        <span>{total}</span>
      </div>
    </div>
  );
}
