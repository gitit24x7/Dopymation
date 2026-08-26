import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Era } from "../../data/eras";
import { IndianMandala } from "./IndianMandala";
import { OrnamentalBorder } from "./OrnamentalBorder";

type EraPanelProps = {
  era: Era;
};

function ArtDecoFan({ color, mirrored = false }: { color: string; mirrored?: boolean }) {
  const widths = [100, 82, 64, 46, 28];
  return (
    <div
      className={`hidden shrink-0 flex-col items-center gap-[3px] md:flex ${mirrored ? "scale-x-[-1]" : ""}`}
      aria-hidden="true"
    >
      {widths.map((w) => (
        <div key={w} className="h-[3px]" style={{ width: `${w}%`, minWidth: `${w * 0.4}px`, backgroundColor: color }} />
      ))}
    </div>
  );
}

export function EraPanel({ era }: EraPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (era.id !== "bauhaus") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const panel = panelRef.current;
    if (!panel) return;

    function handlePointerMove(e: PointerEvent) {
      const rect = panel!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      if (circleRef.current) circleRef.current.style.transform = `translate(${relX * 60}px, ${relY * 60}px)`;
      if (squareRef.current) squareRef.current.style.transform = `translate(${relX * -40}px, ${relY * -40}px) rotate(${relX * 12}deg)`;
      if (triangleRef.current) triangleRef.current.style.transform = `translate(${relX * 30}px, ${relY * -30}px)`;
    }

    panel.addEventListener("pointermove", handlePointerMove);
    return () => panel.removeEventListener("pointermove", handlePointerMove);
  }, [era.id]);

  return (
    <div
      ref={panelRef}
      className="era-panel relative flex h-[72vh] w-[88vw] shrink-0 snap-center flex-col justify-center overflow-hidden px-8 py-14 md:h-[100dvh] md:w-screen md:snap-align-none md:px-16 lg:px-28"
      style={{ backgroundColor: era.background, color: era.foreground }}
    >
      <span className="absolute left-8 top-24 font-mono text-xs uppercase tracking-[0.2em] opacity-60 md:left-16 md:top-28 lg:left-28">
        {era.index} / 05
      </span>

      {era.id === "bauhaus" && (
        <>
          <div
            ref={circleRef}
            className="pointer-events-none absolute right-[18%] top-[20%] h-40 w-40 rounded-full transition-transform duration-300 ease-out md:h-56 md:w-56"
            style={{ backgroundColor: era.accent }}
          />
          <div
            ref={squareRef}
            className="pointer-events-none absolute bottom-[16%] right-[30%] h-32 w-32 transition-transform duration-300 ease-out md:h-44 md:w-44"
            style={{ backgroundColor: "#2450a8" }}
          />
          <div
            ref={triangleRef}
            className="pointer-events-none absolute right-[8%] top-[42%] h-0 w-0 transition-transform duration-300 ease-out"
            style={{
              borderLeft: "70px solid transparent",
              borderRight: "70px solid transparent",
              borderBottom: `120px solid ${era.foreground}`,
            }}
          />
        </>
      )}

      {era.id === "art-deco" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `repeating-conic-gradient(from 0deg at 85% 30%, ${era.accent}22 0deg 3deg, transparent 3deg 12deg)`,
          }}
        />
      )}

      {era.id === "indian" && (
        <>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] opacity-70"
            style={{
              background: `repeating-conic-gradient(from -20deg at 0% 45%, ${era.accent}33 0deg 0.5deg, transparent 0.5deg 8deg)`,
            }}
          />
          <div className="pointer-events-none absolute right-[4%] top-1/2 h-64 w-64 -translate-y-1/2 md:right-[8%] md:h-[420px] md:w-[420px]">
            <IndianMandala reduceMotion={!!reduceMotion} />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14">
            <OrnamentalBorder orientation="left" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14">
            <OrnamentalBorder orientation="bottom" />
          </div>
        </>
      )}

      {era.id === "brutalism" && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-3 w-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={`h-full flex-1 ${i % 2 === 0 ? "bg-[#111]" : "bg-[#f2c308]"}`} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-3 w-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className={`h-full flex-1 ${i % 2 === 0 ? "bg-[#f2c308]" : "bg-[#111]"}`} />
            ))}
          </div>
        </>
      )}

      {era.id === "swiss" ? (
        <div className="relative flex max-w-3xl flex-col items-start gap-8 md:flex-row md:items-stretch md:gap-14">
          <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:max-w-[7ch] md:text-6xl">
            {era.headline}
          </h3>
          <div className="hidden w-px shrink-0 self-stretch bg-current opacity-20 md:block" />
          <div className="flex max-w-sm flex-col justify-center gap-8">
            <p className="text-base leading-relaxed opacity-80 md:text-lg">{era.body}</p>
            {era.caption && (
              <div>
                <div className="h-px w-full bg-current opacity-20" />
                <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] opacity-60">
                  <span>{era.caption.left}</span>
                  <span>{era.caption.right}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : era.id === "brutalism" ? (
        <div
          className="relative w-fit max-w-xl border-4 border-black bg-[#e9e4d8] px-8 py-10 text-[#0c0c0c] md:px-12 md:py-12"
          style={{ boxShadow: "14px 14px 0 #000" }}
        >
          <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {era.headline}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed opacity-80 md:text-lg">{era.body}</p>
        </div>
      ) : era.id === "art-deco" ? (
        <div className="relative flex max-w-xl items-center gap-4 md:gap-8">
          <ArtDecoFan color={era.accent} />
          <div>
            <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {era.headline}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed opacity-80 md:text-lg">{era.body}</p>
          </div>
          <ArtDecoFan color={era.accent} mirrored />
        </div>
      ) : (
        <div className="relative max-w-xl">
          <h3 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {era.headline}
          </h3>
          <p className="mt-5 max-w-md text-base leading-relaxed opacity-80 md:text-lg">{era.body}</p>
        </div>
      )}
    </div>
  );
}
