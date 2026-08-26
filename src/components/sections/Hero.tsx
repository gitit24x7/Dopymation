import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";

function MotionWordmark() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden md:w-[55%]" aria-hidden="true">
      <span
        className="absolute left-6 top-[6%] select-none whitespace-nowrap font-display text-[3.5rem] font-bold uppercase leading-none tracking-tight text-paper/[0.07] sm:text-[5.5rem] md:left-12 md:top-[8%] md:text-[9rem] lg:text-[11rem]"
        style={{
          textShadow:
            "10px 0 16px rgba(244,241,234,0.05), 22px 0 26px rgba(244,241,234,0.03), -8px 0 14px rgba(244,241,234,0.035)",
        }}
      >
        Motion
      </span>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // A subtle parallax: the background drifts a little slower than the page
  // scrolls, so it reads as sitting behind the text rather than pasted flat
  // on top of it. Same effect on every breakpoint, off entirely for
  // prefers-reduced-motion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-navy-bg relative min-h-[100dvh] overflow-hidden"
    >
      {/* One full-bleed background on every breakpoint. object-position shifts
          the crop toward the calmer navy side on narrow screens so text stays
          legible, and toward the emblem once there's room beside it. */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/complete-bg.webp"
          alt="Dopymation, motion and digital invitations creative studio"
          className="absolute -top-[8%] left-0 h-[116%] w-full object-cover object-[30%_center] sm:object-[45%_center] md:object-[68%_center]"
          style={{ y: reduceMotion ? 0 : parallaxY }}
          fetchPriority="high"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent md:from-ink/65 md:via-ink/15 md:to-transparent" />
      <MotionWordmark />
      <div className="section-texture" />

      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col justify-center px-6 py-24 md:w-1/2 md:px-12 lg:px-16">
        <div className="inline-flex w-fit items-center border border-paper/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80">
          Motion &amp; Digital Invitations
        </div>

        <h1 className="mt-6 max-w-lg font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
          Every story deserves a cinematic first frame.
        </h1>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">
          Dopymation directs bespoke motion invites for weddings, showers, birthdays
          and launches, animated frame by frame, never templated.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#commission" variant="solid">
            Commission Your Story
          </Button>
          <Button href="#eras" variant="outline">
            View The Eras
          </Button>
        </div>
      </div>
    </section>
  );
}
