import { Button } from "../ui/Button";

function MotionWordmark() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden md:w-[55%]" aria-hidden="true">
      <span
        className="absolute left-6 top-[8%] select-none whitespace-nowrap font-display text-[4.5rem] font-bold uppercase leading-none tracking-tight text-paper/[0.07] sm:text-[7rem] md:left-12 md:text-[9rem] lg:text-[11rem]"
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
  return (
    <section id="hero" className="hero-navy-bg relative min-h-[100dvh] overflow-hidden">
      <img
        src="/complete-bg.webp"
        alt="Dopymation, motion and digital invitations creative studio"
        className="absolute inset-0 h-full w-full object-cover object-[30%_center] sm:object-[45%_center] md:object-[68%_center]"
        fetchPriority="high"
      />
      {/* Legibility scrim: mobile crops closer to the busy floral cluster, so
          text needs a stronger fade here than on desktop's calm navy side. */}
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
