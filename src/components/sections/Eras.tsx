import { useEffect, useRef } from "react";
import { eras } from "../../data/eras";
import { EraPanel } from "./EraPanel";

export function Eras() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !trackRef.current) return;

    let cleanup = () => {};
    let cancelled = false;

    // GSAP + ScrollTrigger only drive the desktop pinned pan below the fold,
    // so they are loaded on demand instead of bloating the main bundle.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !wrapRef.current || !trackRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
          const track = trackRef.current!;
          const distance = track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: () => `+=${distance}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });

        return () => mm.revert();
      }, wrapRef);

      cleanup = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <section id="eras" ref={wrapRef} className="relative bg-ink md:overflow-hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-8 md:snap-none md:gap-0 md:overflow-visible md:px-0 md:py-0"
      >
        {eras.map((era) => (
          <EraPanel key={era.id} era={era} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1 bg-paper/10 md:block">
        <div ref={progressBarRef} className="h-full w-full origin-left scale-x-0 bg-flame" />
      </div>
    </section>
  );
}
