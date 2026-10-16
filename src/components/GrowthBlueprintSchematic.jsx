import React, { useState } from 'react';
import { GROWTH_SYSTEM_FLOW } from '../data/axonvortexData';

/**
 * Replicates Santalarch's architectural blueprint / skeleton door schematic section
 * ("Material Intelligence / Complete skeleton door design"),
 * tailored to AXONVORTEX's 5-Stage Connected Growth System:
 * ATTRACT -> ENGAGE -> CONVERT -> AUTOMATE -> OPTIMIZE
 */
export function GrowthBlueprintSchematic({ onSelectSolution }) {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section className="blueprint-section" id="growth-system">
      <div className="arch-grid">
        <div style={{ gridColumn: '1 / 4' }}>
          <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
            SYSTEM ARCHITECTURE // BLUEPRINT 01
          </div>
          <h2 className="t-h3-editorial">
            ONE GROWTH SYSTEM, CONNECTED AROUND YOUR BUSINESS
          </h2>
        </div>
        <div style={{ gridColumn: '5 / 9' }}>
          <p className="t-body-lg" style={{ opacity: 0.85, maxWidth: '38rem' }}>
            Marketing, technology and AI shouldn’t operate in separate boxes.
            AxonVortex connects the right capabilities around one objective:
            business growth.
          </p>
        </div>
      </div>

      <div style={{ padding: '0 var(--padding)' }}>
        <div className="blueprint-frame">
          {/* Interactive SVG CAD Schematic */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <div style={{ position: 'relative', minHeight: '300px' }}>
              <svg
                viewBox="0 0 680 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto' }}
              >
                {/* Architectural CAD Grid & Diagonal Hairlines */}
                <rect
                  x="10"
                  y="10"
                  width="660"
                  height="300"
                  stroke="currentColor"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
                <line
                  x1="10"
                  y1="160"
                  x2="670"
                  y2="160"
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                />
                <line
                  x1="340"
                  y1="10"
                  x2="340"
                  y2="310"
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                />
                <line
                  x1="10"
                  y1="310"
                  x2="670"
                  y2="10"
                  stroke="currentColor"
                  strokeOpacity="0.08"
                />

                {/* Feedback loop return arc from OPTIMIZE (node 4) back to ATTRACT (node 0) */}
                <path
                  d="M 590 195 C 590 285, 90 285, 90 195"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeDasharray="3 5"
                  fill="none"
                />
                <text
                  x="340"
                  y="282"
                  textAnchor="middle"
                  fill="currentColor"
                  fillOpacity="0.5"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  CONTINUOUS FEEDBACK LOOP: MEASURE → LEARN → IMPROVE → SCALE
                </text>

                {/* 5 Connected System Nodes */}
                {GROWTH_SYSTEM_FLOW.map((item, idx) => {
                  const x = 90 + idx * 125;
                  const y = 145;
                  const isSelected = activeNode === idx;
                  return (
                    <g
                      key={item.stage}
                      onClick={() => setActiveNode(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Connector arrow to next node */}
                      {idx < GROWTH_SYSTEM_FLOW.length - 1 && (
                        <g>
                          <line
                            x1={x + 42}
                            y1={y}
                            x2={x + 83}
                            y2={y}
                            stroke="currentColor"
                            strokeOpacity="0.5"
                            strokeWidth="1"
                          />
                          <polygon
                            points={`${x + 83},${y} ${x + 76},${y - 3.5} ${x + 76},${y + 3.5}`}
                            fill="currentColor"
                            fillOpacity="0.6"
                          />
                        </g>
                      )}

                      {/* Outer architectural target ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 44 : 36}
                        stroke="currentColor"
                        strokeOpacity={isSelected ? '0.95' : '0.25'}
                        strokeWidth={isSelected ? '1.5' : '1'}
                      />
                      {/* Inner square schematic frame */}
                      <rect
                        x={x - 26}
                        y={y - 26}
                        width="52"
                        height="52"
                        stroke="currentColor"
                        strokeOpacity={isSelected ? '0.85' : '0.2'}
                        fill={isSelected ? 'currentColor' : 'transparent'}
                        fillOpacity={isSelected ? '0.1' : '0'}
                      />

                      <text
                        x={x}
                        y={y - 38}
                        textAnchor="middle"
                        fill="currentColor"
                        fillOpacity="0.55"
                        fontSize="9"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {item.step}
                      </text>
                      <text
                        x={x}
                        y={y + 3}
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {item.stage}
                      </text>
                      <text
                        x={x}
                        y={y + 62}
                        textAnchor="middle"
                        fill="currentColor"
                        fillOpacity="0.7"
                        fontSize="9.5"
                        fontFamily="Inter, sans-serif"
                      >
                        {item.discipline}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Stage Architectural Inspection Panel */}
            <div
              style={{
                borderLeft: '1px solid rgba(240, 240, 240, 0.16)',
                paddingLeft: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem'
              }}
            >
              <div className="index-counter">
                <span>{GROWTH_SYSTEM_FLOW[activeNode].step}</span>
                <span className="index-counter__sep" />
                <span className="index-counter__total">05</span>
                <span
                  style={{
                    marginLeft: '0.75rem',
                    opacity: 0.6
                  }}
                >
                  STAGE SPECIFICATION
                </span>
              </div>

              <div>
                <div
                  className="t-mono-label"
                  style={{ opacity: 0.7, marginBottom: '0.35rem' }}
                >
                  {GROWTH_SYSTEM_FLOW[activeNode].discipline}
                </div>
                <h3
                  className="t-h2-monument"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
                >
                  {GROWTH_SYSTEM_FLOW[activeNode].stage}
                </h3>
                <p
                  className="t-body-lg"
                  style={{ marginTop: '0.75rem', opacity: 0.88 }}
                >
                  {GROWTH_SYSTEM_FLOW[activeNode].summary}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(240, 240, 240, 0.14)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <span className="t-mono-label">
                  {GROWTH_SYSTEM_FLOW[activeNode].metrics}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {GROWTH_SYSTEM_FLOW.map((n, i) => (
                    <button
                      key={n.step}
                      type="button"
                      onClick={() => setActiveNode(i)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        border: '1px solid currentColor',
                        opacity: activeNode === i ? 1 : 0.35,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem'
                      }}
                    >
                      {n.step}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
