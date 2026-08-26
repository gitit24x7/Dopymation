import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 180, suffix: "+", label: "Invitations Directed" },
  { value: 5, suffix: "", label: "Signature Aesthetics" },
  { value: 72, suffix: "h", label: "Concept Turnaround" },
  { value: 12, suffix: "", label: "Countries Served" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, reduceMotion]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

export function Manifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-paper md:text-5xl">
            We treat every invitation as a short film.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
            A brief, a storyboard and a score. No stock templates: each commission is
            animated frame by frame around your story, then delivered ready to send.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 border-t border-paper/10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-r border-paper/10 py-8 pr-6 md:border-b-0"
            >
              <p className="font-mono text-4xl font-medium text-flame md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
