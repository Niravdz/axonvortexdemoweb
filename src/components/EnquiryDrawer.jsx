import React, { useState } from 'react';
import { BRAND, IMPROVEMENT_OPTIONS } from '../data/axonvortexData';
import { SlideText, UnderlineText } from './SlideText';

/**
 * Exact structural replica of Santalarch's multi-step Enquiry Popup (data-v-499c64d2)
 * with diagonal .decor-lines, vertical .progress-line, and step pagination 01 | 04,
 * implementing AxonVortex's complete Contact & Growth Audit intake flow.
 */
export function EnquiryDrawer({ isOpen, initialIntent, onClose }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    improvements: initialIntent ? [initialIntent] : ['AI', 'Automation'],
    goal: '',
    bottleneck: ''
  });

  if (!isOpen) return null;

  const totalSteps = 4;

  const toggleImprovement = (item) => {
    setForm((prev) => {
      const exists = prev.improvements.includes(item);
      return {
        ...prev,
        improvements: exists
          ? prev.improvements.filter((x) => x !== item)
          : [...prev.improvements, item]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(0);
    onClose();
  };

  return (
    <div className="enquiry-popup" role="dialog" aria-modal="true">
      {/* Left Aside Column (Santalarch .popup-aside) */}
      <aside className="enquiry-popup__aside">
        <div>
          <div
            style={{
              fontWeight: 700,
              letterSpacing: '0.14em',
              fontSize: '0.85rem'
            }}
          >
            {BRAND.name}
          </div>
          <p
            className="t-caption"
            style={{ opacity: 0.5, marginTop: '0.5rem', maxWidth: '13rem' }}
          >
            {BRAND.tagline}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <div className="t-mono-label">General &amp; Growth Enquiries</div>
            <a
              href={`mailto:${BRAND.email}`}
              className="t-body"
              style={{ display: 'block', marginTop: '0.35rem' }}
            >
              <UnderlineText>{BRAND.email}</UnderlineText>
            </a>
          </div>
          <div>
            <div className="t-mono-label">Digital Growth Audit</div>
            <a
              href={`mailto:${BRAND.auditEmail}`}
              className="t-body"
              style={{ display: 'block', marginTop: '0.35rem' }}
            >
              <UnderlineText>{BRAND.auditEmail}</UnderlineText>
            </a>
          </div>
          <div>
            <div className="t-mono-label">Partnerships</div>
            <a
              href={`mailto:${BRAND.partnershipsEmail}`}
              className="t-body"
              style={{ display: 'block', marginTop: '0.35rem' }}
            >
              <UnderlineText>{BRAND.partnershipsEmail}</UnderlineText>
            </a>
          </div>
        </div>
      </aside>

      {/* Center Architectural Diagonal Box + Progress Line (Santalarch .decor-lines) */}
      <div className="enquiry-popup__decor-lines">
        <div
          className="enquiry-popup__progress"
          style={{
            transform: `scaleY(${submitted ? 1 : (step + 1) / totalSteps})`
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '1.25rem',
            right: '1.25rem'
          }}
        >
          <div className="t-mono-label" style={{ marginBottom: '0.35rem' }}>
            CONNECTED GROWTH INTAKE
          </div>
          <p className="t-caption" style={{ opacity: 0.65 }}>
            You don’t need to know which service you need. Tell us where your
            business is struggling or where you want to go next.
          </p>
        </div>
      </div>

      {/* Right Content Column (Santalarch .content-wrap) */}
      <div className="enquiry-popup__main">
        {/* Top Row: Step Pagination + Close Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {!submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="t-caption"
                  style={{ opacity: 0.75 }}
                >
                  ← Previous
                </button>
              )}
              <div className="index-counter">
                <span>0{step + 1}</span>
                <span className="index-counter__sep" />
                <span className="index-counter__total">0{totalSteps}</span>
              </div>
            </div>
          ) : (
            <div className="t-mono-label">DIAGNOSTIC LOGGED // 04 | 04</div>
          )}

          <button
            type="button"
            onClick={resetAndClose}
            className="t-caption"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            <SlideText>Close [×]</SlideText>
          </button>
        </div>

        {/* Form Stages */}
        {submitted ? (
          <div style={{ margin: 'auto 0', maxWidth: '30rem' }}>
            <div className="t-mono-label" style={{ marginBottom: '0.75rem' }}>
              TRANSMISSION RECEIVED
            </div>
            <h2 className="t-h2-monument" style={{ marginBottom: '1.25rem' }}>
              Let’s Build Something Smarter.
            </h2>
            <p className="t-body-lg" style={{ opacity: 0.75 }}>
              Thank you{form.name ? `, ${form.name}` : ''}. We have logged your
              growth priorities (
              {form.improvements.join(', ') || 'General Growth System'}) and
              will review your business context before our first conversation.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <button
                type="button"
                className="arch-cta arch-cta--light"
                onClick={resetAndClose}
              >
                Return to AxonVortex →
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              margin: 'auto 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem'
            }}
          >
            {step === 0 && (
              <>
                <div>
                  <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                    STEP 01 // PRIORITY SELECTION
                  </div>
                  <h3 className="t-h3-editorial">
                    What are you looking to improve?
                  </h3>
                  <p className="t-body" style={{ opacity: 0.65, marginTop: '0.35rem' }}>
                    Select all areas that apply — or choose “Not sure yet”.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {IMPROVEMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`arch-chip ${
                        form.improvements.includes(opt) ? 'selected' : ''
                      }`}
                      onClick={() => toggleImprovement(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                    STEP 02 // OBJECTIVE &amp; FRICTION
                  </div>
                  <h3 className="t-h3-editorial">
                    Where do you want to go, and what’s in the way?
                  </h3>
                </div>

                <div>
                  <label className="t-mono-label" htmlFor="goal-input">
                    What are you trying to achieve?
                  </label>
                  <input
                    id="goal-input"
                    className="arch-input"
                    type="text"
                    placeholder="e.g., Generate qualified B2B enquiries, launch Shopify store, automate support..."
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                  />
                </div>

                <div>
                  <label className="t-mono-label" htmlFor="bottleneck-input">
                    What is currently getting in the way?
                  </label>
                  <input
                    id="bottleneck-input"
                    className="arch-input"
                    type="text"
                    placeholder="e.g., Disconnected marketing, slow lead response, repetitive manual work..."
                    value={form.bottleneck}
                    onChange={(e) =>
                      setForm({ ...form, bottleneck: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                    STEP 03 // BUSINESS CONTEXT
                  </div>
                  <h3 className="t-h3-editorial">Tell us about your business.</h3>
                </div>

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
                      className="arch-input"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="t-mono-label">Business Name</label>
                    <input
                      className="arch-input"
                      type="text"
                      placeholder="Your business or organization"
                      value={form.businessName}
                      onChange={(e) =>
                        setForm({ ...form, businessName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="t-mono-label">Website (Optional)</label>
                  <input
                    className="arch-input"
                    type="text"
                    placeholder="https://yourbusiness.com"
                    value={form.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <div className="t-mono-label" style={{ marginBottom: '0.5rem' }}>
                    STEP 04 // DIRECT COORDINATES
                  </div>
                  <h3 className="t-h3-editorial">
                    Where should we send your growth roadmap?
                  </h3>
                </div>

                <div>
                  <label className="t-mono-label">Email</label>
                  <input
                    className="arch-input"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="t-mono-label">Phone</label>
                  <input
                    className="arch-input"
                    type="tel"
                    placeholder="+1 / +44 / +91 ..."
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem'
              }}
            >
              <span className="t-mono-label">
                {form.improvements.length} FOCUS AREA(S) SELECTED
              </span>

              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  className="arch-cta arch-cta--light"
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next Stage →
                </button>
              ) : (
                <button type="submit" className="arch-cta arch-cta--light">
                  Start the Conversation →
                </button>
              )}
            </div>
          </form>
        )}

        {/* Bottom Caption */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0.45,
            fontSize: '0.75rem'
          }}
        >
          <span>Your Vision Deserves a Growth System.</span>
          <span>Understand → Diagnose → Strategize</span>
        </div>
      </div>
    </div>
  );
}
