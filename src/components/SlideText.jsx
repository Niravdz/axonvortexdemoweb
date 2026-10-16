import React from 'react';

/**
 * Exact replica of Santalarch's dual-layer slide-up text hover effect:
 * [PhilosophyPhilosophy] where hovering slides the first layer up -100%
 * and reveals the identical second layer from below.
 */
export function SlideText({ children, className = '' }) {
  return (
    <span className={`slide-btn ${className}`}>
      <span className="slide-btn__text">{children}</span>
      <span className="slide-btn__text" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

/**
 * Exact replica of Santalarch's underline clip-path button:
 * The underline smoothly clips out from left to right on hover.
 */
export function UnderlineText({ children, className = '' }) {
  return (
    <span className={`underline-btn ${className}`}>
      <span className="underline-btn__text">{children}</span>
      <span className="underline-btn__text" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
