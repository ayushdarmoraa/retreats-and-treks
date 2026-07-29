'use client';

import { Section } from '@/components/ui';
import SectionHeading from '@/components/ui/SectionHeading';
import { philosophyCards } from '@/content/home/philosophy';
import { motion, type Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

  return (
    <Section
      className="philosophy-section"
      style={{
        background: '#F8F6F2',
        position: 'relative',
        padding: '0'
      }}
    >
      <style>{`
        .philosophy-section {
          font-family: var(--font-inter, 'Inter', sans-serif);
          background: #F8F6F2;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .p-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 6rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          width: 100%;
          align-items: start;
        }

        .p-left {
          position: sticky;
          top: 6rem;
        }

        .p-left :global(.mb-12) {
          margin-bottom: 0;
        }

        .p-description {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(26, 24, 20, 0.6);
          max-width: 400px;
          margin: 1.2rem auto 2rem;
        }

        .p-description strong {
          color: #1a1814;
          font-weight: 600;
        }

        .p-description em {
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-style: italic;
          color: #1a1814;
        }

        .p-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(26, 24, 20, 0.08);
        }

        .p-stat {
          display: flex;
          flex-direction: column;
        }

        .p-stat-number {
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-size: 1.8rem;
          font-weight: 600;
          color: #1a1814;
          letter-spacing: -0.02em;
        }

        .p-stat-label {
          font-size: 0.7rem;
          color: rgba(26, 24, 20, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.2rem;
        }

        /* ---- Field Notes list (no cards) ---- */

        .p-right {
          position: relative;
          padding-top: 0.5rem;
        }

        .p-rail {
          position: absolute;
          top: 0.7rem;
          bottom: 0.7rem;
          left: 27px;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(15, 118, 110, 0.35),
            rgba(26, 24, 20, 0.08) 92%
          );
        }

        .p-entry {
          position: relative;
          display: grid;
          grid-template-columns: 56px 1fr;
          column-gap: 1.5rem;
          padding: 2.1rem 0;
          border-bottom: 1px solid rgba(26, 24, 20, 0.07);
          cursor: default;
        }

        .p-entry:first-child {
          padding-top: 0.5rem;
        }

        .p-entry:last-child {
          border-bottom: none;
        }

        .p-entry-number {
          position: relative;
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-style: italic;
          font-weight: 500;
          font-size: 1.35rem;
          color: rgba(15, 118, 110, 0.55);
          line-height: 1;
          transition: color 0.4s ease;
        }

        .p-entry-dot {
          position: absolute;
          top: 0.35rem;
          left: 54px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #F8F6F2;
          border: 1.5px solid rgba(15, 118, 110, 0.5);
          transition: all 0.4s ease;
        }

        .p-entry:hover .p-entry-dot {
          background: #0f766e;
          border-color: #0f766e;
          transform: scale(1.15);
        }

        .p-entry:hover .p-entry-number {
          color: #0f766e;
        }

        .p-entry-content {
          padding-top: 0.1rem;
        }

        .p-entry-title-row {
          margin-bottom: 0.6rem;
        }

        .p-entry-title {
          font-family: var(--font-fraunces, 'Fraunces', Georgia, serif);
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1814;
          margin: 0;
          transition: color 0.4s ease;
        }

        .p-entry:hover .p-entry-title {
          color: #0f766e;
        }

        .p-entry-body {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(26, 24, 20, 0.55);
          margin: 0;
          max-width: 88%;
        }

        .p-entry-body strong {
          color: rgba(26, 24, 20, 0.8);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .p-wrap {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 5rem 3rem;
          }
          .p-left {
            position: relative;
            top: 0;
          }
          .p-description {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .p-wrap {
            padding: 4rem 1.5rem;
            gap: 2.5rem;
          }
          .p-entry {
            grid-template-columns: 40px 1fr;
            column-gap: 1rem;
            padding: 1.6rem 0;
          }
          .p-rail {
            left: 19px;
          }
          .p-entry-dot {
            left: 38px;
          }
          .p-entry-title {
            font-size: 1.1rem;
          }
          .p-entry-body {
            font-size: 0.88rem;
            max-width: 100%;
          }
          .p-stats {
            gap: 2rem;
          }
          .p-stat-number {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .p-wrap {
            padding: 3rem 1rem;
          }
          .p-entry {
            grid-template-columns: 30px 1fr;
          }
          .p-rail {
            left: 14px;
          }
          .p-entry-dot {
            left: 28px;
          }
          .p-entry-number {
            font-size: 1.1rem;
          }
          .p-stats {
            gap: 1.5rem;
          }
          .p-description {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div ref={sectionRef} className="p-wrap">
        {/* Left Column */}
        <motion.div
          className="p-left"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <SectionHeading eyebrow="Our Approach" title="How We Work" />

          <p className="p-description">
            Every journey begins with a <em>conversation</em> — not a checkout page.
            We take time to understand what you&apos;re really looking for before <strong>suggesting anything</strong>.
          </p>
        </motion.div>

        {/* Right Column - Field Notes list */}
        <motion.div
          className="p-right"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="p-rail" />
          {philosophyCards.map((card) => (
            <motion.div key={card.id} className="p-entry" variants={itemVariants}>
              <span className="p-entry-number">{String(card.id).padStart(2, '0')}</span>
              <span className="p-entry-dot" />
              <div className="p-entry-content">
                <div className="p-entry-title-row">
                  <h3 className="p-entry-title">{card.title}</h3>
                </div>
                <p className="p-entry-body">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
