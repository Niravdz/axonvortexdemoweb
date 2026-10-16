import React from 'react';

/**
 * Exact replica of Santalarch's bottom-left fixed Theme Invert button
 * with orbiting dot and underline track SVG.
 */
export function ThemeInvertButton({ theme, onToggle }) {
  return (
    <button
      type="button"
      className="invert-button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Theme: ${theme.toUpperCase()} (Click to invert)`}
    >
      <svg
        className="invert-icon"
        viewBox="0 0 71 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="underline-track">
          <line
            className="invert-underline"
            x1="10"
            y1="25"
            x2="61"
            y2="25"
            strokeWidth="1"
          />
        </g>
        {/* Central axis & orbiting dot */}
        <circle
          cx="35.5"
          cy="18.5"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.35"
        />
        <g className="dot-orbit">
          <circle cx="35.5" cy="11.5" r="2.2" fill="currentColor" />
        </g>
      </svg>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.75
        }}
      >
        {theme === 'light' ? 'Light / Dark' : 'Dark / Light'}
      </span>
    </button>
  );
}
