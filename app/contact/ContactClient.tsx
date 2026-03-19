'use client';

import Image from 'next/image';

export default function ContactClient() {
  return (
    <div>
      <style>{`
        /* ── CCL scoped styles ── */

        /* Opening */
        .ccl-opening-h1 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.4rem);
          font-weight: 200;
          letter-spacing: -0.035em;
          color: #111;
          line-height: 1.1;
          margin: 0 0 1.25rem;
        }
        .ccl-body {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555;
          margin: 0 0 1rem;
        }

        /* Who section */
        .ccl-who-callout {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-left: 3px solid var(--color-primary);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555;
        }

        /* Contact method cards */
        .ccl-methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .ccl-method-card {
          background: #fff;
          border: 1px solid #eef0ee;
          border-top: 2px solid var(--color-primary);
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .ccl-method-label {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-primary);
          opacity: 0.7;
        }
        .ccl-method-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #111;
          letter-spacing: -0.01em;
          margin: 0 0 0.25rem;
        }
        .ccl-method-sub {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: #888;
          margin: 0 0 0.85rem;
          line-height: 1.6;
        }
        .ccl-method-body {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          color: #555;
          line-height: 1.7;
          margin: 0;
        }
        .ccl-btn-primary {
          display: inline-block;
          margin-top: auto;
          padding: 0.6rem 1.25rem;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 4px;
          border: none;
          transition: opacity 0.18s;
          align-self: flex-start;
        }
        .ccl-btn-primary:hover { opacity: 0.88; }
        .ccl-btn-outline {
          display: inline-block;
          margin-top: auto;
          padding: 0.6rem 1.25rem;
          background: transparent;
          color: var(--color-primary);
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 4px;
          border: 1px solid var(--color-primary);
          transition: background 0.18s, color 0.18s;
          align-self: flex-start;
        }
        .ccl-btn-outline:hover { background: var(--color-primary); color: #fff; }

        /* Questions */
        .ccl-q-item {
          background: #fff;
          border: 1px solid #eef0ee;
          border-left: 3px solid var(--color-primary);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 0.75rem;
        }
        .ccl-q-title {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #111;
          margin: 0 0 0.4rem;
        }
        .ccl-q-body {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: #555;
          margin: 0;
        }

        /* Dark CTA */
        .ccl-dark-cta {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background: #0a160a;
          background-image: radial-gradient(ellipse at 20% 50%, rgba(15,118,110,0.18) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 50%, rgba(15,118,110,0.10) 0%, transparent 60%);
          padding: 4rem 0;
        }
        .ccl-dark-cta-inner {
          max-width: 52rem;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .ccl-dark-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .ccl-dark-eyebrow-line {
          width: 24px; height: 1px;
          background: rgba(255,255,255,0.25);
          display: inline-block;
        }
        .ccl-dark-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        .ccl-dark-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }
        .ccl-dark-body {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 300;
          line-height: 1.85;
          color: rgba(255,255,255,0.55);
          margin: 0 0 2rem;
        }
        .ccl-dark-btn {
          display: inline-block;
          padding: 0.75rem 1.75rem;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 4px;
          transition: opacity 0.18s;
        }
        .ccl-dark-btn:hover { opacity: 0.88; }

        /* Eyebrow section helper */
        .ccl-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .ccl-eyebrow-line { width: 24px; height: 1px; background: var(--color-primary); opacity: 0.5; display: inline-block; }
        .ccl-eyebrow-text {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: 0.56rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--color-primary);
          font-weight: 500;
          opacity: 0.7;
        }
        .ccl-h2 {
          font-family: var(--font-geist-sans), sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 1.85rem);
          font-weight: 200;
          letter-spacing: -0.03em;
          color: #111;
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }

        @media (max-width: 700px) {
          .ccl-methods-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── OPENING ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="ccl-eyebrow">
            <span className="ccl-eyebrow-line" />
            <span className="ccl-eyebrow-text">A Human Conversation</span>
          </div>
          <h2 className="ccl-opening-h1">
            Begin with a conversation, not a booking form.
          </h2>
          <p className="ccl-body">
            Retreats And Treks programs are designed for small groups and individual journeys. Every retreat, every trek, and every experience can be tailored to what you're looking for. There's no standard template here—just a genuine conversation about what might serve you best.
          </p>
        </div>
      </section>

      {/* ── WHO YOU'LL SPEAK TO ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="ccl-eyebrow">
            <span className="ccl-eyebrow-line" />
            <span className="ccl-eyebrow-text">Who You'll Speak To</span>
          </div>
          <h2 className="ccl-h2">Who you&#39;ll speak to</h2>
          <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <Image
              src="/Images/people/team.webp"
              alt="Retreats And Treks team in the Himalayas"
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div className="ccl-who-callout">
            You&#39;ll connect directly with someone who designs and hosts our retreats. Not a booking agent. Not an automated response. Someone who understands the landscape, the practice, and what truly matters when you come away.
          </div>
        </div>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="ccl-eyebrow">
            <span className="ccl-eyebrow-line" />
            <span className="ccl-eyebrow-text">Reach Out</span>
          </div>
          <h2 className="ccl-h2">Reach out however feels right</h2>
          <div className="ccl-methods-grid" style={{ marginTop: '1.75rem' }}>

            {/* WhatsApp */}
            <div className="ccl-method-card">
              <span className="ccl-method-label">Fastest</span>
              <p className="ccl-method-title">WhatsApp</p>
              <p className="ccl-method-sub">Best for quick clarity</p>
              <a href="https://wa.me/919760446101" className="ccl-btn-primary">
                Message on WhatsApp
              </a>
            </div>

            {/* Email */}
            <div className="ccl-method-card">
              <span className="ccl-method-label">Detailed</span>
              <p className="ccl-method-title">Email</p>
              <p className="ccl-method-sub">Best for detailed questions</p>
              <a href="mailto:info@chakrataretreats.com" className="ccl-btn-outline">
                info@chakrataretreats.com
              </a>
            </div>

            {/* Location */}
            <div className="ccl-method-card">
              <span className="ccl-method-label">Base</span>
              <p className="ccl-method-title">Base Location</p>
              <p className="ccl-method-sub">Dehradun, Uttarakhand</p>
              <p className="ccl-method-body">We coordinate pickups from Dehradun and help with travel logistics from there.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── QUESTIONS WE HEAR ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ffffff', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="ccl-eyebrow">
            <span className="ccl-eyebrow-line" />
            <span className="ccl-eyebrow-text">Questions We Hear</span>
          </div>
          <h2 className="ccl-h2" style={{ marginBottom: '1.75rem' }}>Questions we hear</h2>

          {[
            {
              q: 'Is this right for me?',
              a: "If you're drawn to a moment away—whether to rest, explore, practice, or think differently—there's something here for you. You don't need prior experience. You don't need to know what you want yet.",
            },
            {
              q: 'Can I come alone?',
              a: "Absolutely. Many people travel solo to our retreats. It's part of why small groups matter—you're never pushed into socializing you don't want, and you're never alone with your thoughts either.",
            },
            {
              q: "I'm not particularly spiritual or into wellness. Is this okay?",
              a: 'Good question. Our retreats aren\'t about belief or previous practice. They\'re about genuine slowness, deep rest, and meeting yourself in a different landscape. Many people come without identifying as "wellness people."',
            },
            {
              q: 'Can it be customized?',
              a: "Yes. Whether it's travel timing, group size, specific interests, or just how you want to spend your days—reach out and let's talk. Small groups mean flexibility.",
            },
          ].map((item) => (
            <div key={item.q} className="ccl-q-item">
              <p className="ccl-q-title">{item.q}</p>
              <p className="ccl-q-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#f7f9f7', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 2rem' }}>
          <div className="ccl-eyebrow">
            <span className="ccl-eyebrow-line" />
            <span className="ccl-eyebrow-text">When You're Ready</span>
          </div>
          <h2 className="ccl-h2">When you're ready</h2>
          <p className="ccl-body" style={{ marginBottom: '1.75rem' }}>
            Reach out. We'll take it from there. No pressure, no playbook—just a conversation about whether a retreat with us makes sense right now.
          </p>
          <a href="https://wa.me/919760446101" className="ccl-btn-primary">
            Start the conversation
          </a>
        </div>
      </section>

    </div>
  );
}