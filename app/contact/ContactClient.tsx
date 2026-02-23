'use client';

export default function ContactClient() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* SECTION 1: OPENING - A HUMAN CONVERSATION */}
      <section style={{ marginBottom: '5rem', paddingTop: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Begin with a conversation, not a booking form.
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '1.5rem' }}>
          Retreats And Treks programs are designed for small groups and individual journeys. Every retreat, every trek, and every experience can be tailored to what you're looking for. There's no standard template here—just a genuine conversation about what might serve you best.
        </p>
      </section>

      {/* SECTION 2: WHO YOU'LL SPEAK TO */}
      <section style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Who you'll speak to</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)' }}>
          You'll connect directly with someone who designs and hosts our retreats. Not a booking agent. Not an automated response. Someone who understands the landscape, the practice, and what truly matters when you come away.
        </p>
      </section>

      {/* SECTION 3: CONTACT METHODS AS CARDS */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '3rem' }}>Reach out however feels right</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* WhatsApp Card */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>WhatsApp</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
              Best for quick clarity
            </p>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Message on WhatsApp
            </a>
          </div>

          {/* Email Card */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Email</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
              Best for detailed questions
            </p>
            <a
              href="mailto:info@chakrataretreats.com"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                border: '1px solid var(--color-primary)',
                borderRadius: '0.25rem',
                fontSize: '1rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              info@chakrataretreats.com
            </a>
          </div>

          {/* Location Card */}
          <div
            style={{
              padding: '2rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.3rem' }}>Base Location</h3>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Dehradun, Uttarakhand
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-muted)' }}>
              We coordinate pickups from Dehradun and help with travel logistics from there.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMON REASSURANCE QUESTIONS */}
      <section style={{ marginBottom: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '3rem' }}>Questions we hear</h2>
        <div style={{ display: 'grid', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Is this right for me?</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
              If you're drawn to a moment away—whether to rest, explore, practice, or think differently—there's something here for you. You don't need prior experience. You don't need to know what you want yet.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Can I come alone?</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
              Absolutely. Many people travel solo to our retreats. It's part of why small groups matter—you're never pushed into socializing you don't want, and you're never alone with your thoughts either.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>I'm not particularly spiritual or into wellness. Is this okay?</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
              Good question. Our retreats aren't about belief or previous practice. They're about genuine slowness, deep rest, and meeting yourself in a different landscape. Many people come without identifying as "wellness people."
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Can it be customized?</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-text)' }}>
              Yes. Whether it's travel timing, group size, specific interests, or just how you want to spend your days—reach out and let's talk. Small groups mean flexibility.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLOSING CTA */}
      <section style={{ marginBottom: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>When you're ready</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text)', marginBottom: '3rem' }}>
          Reach out. We'll take it from there. No pressure, no playbook—just a conversation about whether a retreat with us makes sense right now.
        </p>
        <a
          href="https://wa.me/91XXXXXXXXXX"
          style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.25rem',
            fontSize: '1.1rem',
            fontWeight: '500',
            transition: 'opacity 0.2s',
            marginBottom: '5rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Start the conversation
        </a>
      </section>
    </div>
  );
}
