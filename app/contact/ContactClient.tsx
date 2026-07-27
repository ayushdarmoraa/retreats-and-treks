'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ContactClient() {
  return (
    <div>

      <style>{`
        .med-shell { width: 100vw; margin-left: calc(-50vw + 50%); }
        .med-outer { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; }
        .med-inner { max-width: 58rem; margin: 0 auto; padding: 0 1.5rem; }

        .med-eyebrow { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
        .med-eyebrow-line { width: 30px; height: 1px; background: rgba(15,118,110,0.35); flex-shrink: 0; }
        .med-eyebrow-text { font-family: var(--font-inter), sans-serif; font-size: 0.7rem; letter-spacing: 0.3em; text-transform: uppercase; color: #6b7280; font-weight: 600; }

        .med-h2 { font-family: var(--font-fraunces), Georgia, serif; font-size: clamp(1.9rem, 3.4vw, 2.6rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.12; margin: 0 0 1.1rem; }
        .med-h2 span { color: #0f766e; }
        .med-h3 { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.15rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.7rem; letter-spacing: -0.01em; }
        .med-body { font-family: var(--font-inter), sans-serif; font-size: 0.98rem; line-height: 1.9; color: #4b5259; font-weight: 400; margin: 0 0 1rem; }
        .med-body:last-child { margin-bottom: 0; }
        .med-body strong { color: #2B2A26; font-weight: 600; }

        .med-card {
          background: #fff;
          border: 1px solid rgba(15,118,110,0.12);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,31,28,0.05);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .med-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: #0f766e; transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index: 2;
        }
        .med-card:hover { transform: translateY(-6px); border-color: rgba(15,118,110,0.28); box-shadow: 0 22px 48px rgba(15,31,28,0.12); }
        .med-card:hover::before { transform: scaleX(1); }

        .med-cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem 2.3rem; background: #0f766e; color: white; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; box-shadow: 0 10px 26px rgba(15,118,110,0.25); transition: all 0.3s cubic-bezier(0.22,1,0.36,1); border: 1px solid #0f766e; }
        .med-cta-btn:hover { background: #0d6b64; transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,118,110,0.32); }
        .med-cta-outline { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.85rem 1.8rem; border: 1px solid rgba(15,118,110,0.25); color: #0f766e; text-decoration: none; font-family: var(--font-inter), sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
        .med-cta-outline:hover { border-color: #0f766e; background: rgba(15,118,110,0.05); transform: translateY(-2px); }

        .med-grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; }
        .med-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.4rem; }
        @media (max-width: 720px) { .med-grid-2 { grid-template-columns: 1fr; } .med-grid-3 { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .med-outer, .med-inner { padding-left: 1.25rem; padding-right: 1.25rem; } }

        .med-section-alt { background: #f7f9f7; }
        .med-section-white { background: #ffffff; }

        .med-contact-hero { padding: 4rem 0; border-bottom: 1px solid rgba(15,118,110,0.08); }
        .med-contact-hero .med-h1 { font-size: clamp(1.8rem, 3.5vw, 2.4rem); font-weight: 500; letter-spacing: -0.03em; color: #2B2A26; line-height: 1.1; margin: 0 0 1.25rem; }

        .med-contact-img { border-radius: 18px; overflow: hidden; margin-bottom: 1.5rem; }
        .med-contact-img img { width: 100%; height: auto; display: block; }

        .med-contact-callout { padding: 1.25rem 1.5rem; background: #f7f9f7; border: 1px solid rgba(15,118,110,0.12); border-left: 3px solid #0f766e; border-radius: 18px; font-family: var(--font-inter), sans-serif; font-size: 0.9rem; font-weight: 400; line-height: 1.85; color: #4b5259; }

        .med-contact-card { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
        .med-contact-card .med-label { font-family: var(--font-inter), sans-serif; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #0f766e; }
        .med-contact-card .med-title { font-family: var(--font-fraunces), Georgia, serif; font-size: 1.05rem; font-weight: 600; color: #2B2A26; margin: 0 0 0.25rem; }
        .med-contact-card .med-sub { font-family: var(--font-inter), sans-serif; font-size: 0.82rem; font-weight: 400; color: #6b7280; margin: 0 0 0.85rem; line-height: 1.6; }
        .med-contact-card .med-body { font-size: 0.85rem; margin-bottom: 0; }
        .med-contact-card .med-cta-btn { padding: 0.6rem 1.25rem; font-size: 0.7rem; align-self: flex-start; margin-top: auto; }
        .med-contact-card .med-cta-outline { padding: 0.6rem 1.25rem; font-size: 0.7rem; align-self: flex-start; margin-top: auto; }

        .med-q-item { padding: 1.25rem 1.5rem; background: #fff; border: 1px solid rgba(15,118,110,0.12); border-left: 3px solid #0f766e; border-radius: 18px; margin-bottom: 0.75rem; }
        .med-q-item:last-child { margin-bottom: 0; }
        .med-q-item .med-h3 { font-size: 0.95rem; margin: 0 0 0.4rem; }
        .med-q-item .med-body { font-size: 0.88rem; margin-bottom: 0; }

        .med-contact-cta { padding: 3rem 0; text-align: center; }
        .med-contact-cta .med-body { max-width: 42rem; margin: 0 auto 1.5rem; }
      `}</style>

      {/* ── OPENING ── */}
      <section className="med-shell med-section-alt med-contact-hero">
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">A Human Conversation</span>
          </div>
          <h1 className="med-h1">Begin with a conversation, <span>not a booking form.</span></h1>
          <p className="med-body">
            Retreats And Treks programs are designed for small groups and individual journeys. Every retreat, every trek, and every experience can be tailored to what you're looking for. There's no standard template here—just a genuine conversation about what might serve you best.
          </p>
        </div>
      </section>

      {/* ── WHO YOU'LL SPEAK TO ── */}
      <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Who You'll Speak To</span>
          </div>
          <h2 className="med-h2">Who you'll <span>speak to</span></h2>
          <div className="med-contact-img">
            <Image
              src="/Images/people/team.webp"
              alt="Retreats And Treks team in the Himalayas"
              width={600}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div className="med-contact-callout">
            You'll connect directly with someone who designs and hosts our retreats. Not a booking agent. Not an automated response. Someone who understands the landscape, the practice, and what truly matters when you come away.
          </div>
        </div>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section className="med-shell med-section-alt" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Reach Out</span>
          </div>
          <h2 className="med-h2">Reach out however <span>feels right</span></h2>

          <div className="med-grid-3" style={{ marginTop: '1.8rem' }}>
            {/* WhatsApp */}
            <div className="med-card med-contact-card">
              <span className="med-label">Fastest</span>
              <p className="med-title">WhatsApp</p>
              <p className="med-sub">Best for quick clarity</p>
              <a href="https://wa.me/919760446101" className="med-cta-btn" style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem', alignSelf: 'flex-start' }}>
                Message on WhatsApp
              </a>
            </div>

            {/* Email */}
            <div className="med-card med-contact-card">
              <span className="med-label">Detailed</span>
              <p className="med-title">Email</p>
              <p className="med-sub">Best for detailed questions</p>
              <a href="mailto:info@chakrataretreats.com" className="med-cta-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.7rem', alignSelf: 'flex-start' }}>
                info@chakrataretreats.com
              </a>
            </div>

            {/* Location */}
            <div className="med-card med-contact-card">
              <span className="med-label">Base</span>
              <p className="med-title">Base Location</p>
              <p className="med-sub">Dehradun, Uttarakhand</p>
              <p className="med-body">We coordinate pickups from Dehradun and help with travel logistics from there.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUESTIONS WE HEAR ── */}
      <section className="med-shell med-section-white" style={{ padding: '4rem 0', borderBottom: '1px solid rgba(15,118,110,0.08)' }}>
        <div className="med-inner">
          <div className="med-eyebrow">
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">Questions We Hear</span>
          </div>
          <h2 className="med-h2">Questions we <span>hear</span></h2>

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
            <div key={item.q} className="med-q-item">
              <h3 className="med-h3">{item.q}</h3>
              <p className="med-body">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="med-shell med-section-alt med-contact-cta" style={{ padding: '4rem 0' }}>
        <div className="med-inner">
          <div className="med-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="med-eyebrow-line" />
            <span className="med-eyebrow-text">When You're Ready</span>
            <span className="med-eyebrow-line" />
          </div>
          <h2 className="med-h2" style={{ textAlign: 'center' }}>When you're <span>ready</span></h2>
          <p className="med-body" style={{ textAlign: 'center' }}>
            Reach out. We'll take it from there. No pressure, no playbook—just a conversation about whether a retreat with us makes sense right now.
          </p>
          <a href="https://wa.me/919760446101" className="med-cta-btn">
            Start the conversation
          </a>
        </div>
      </section>

    </div>
  );
}