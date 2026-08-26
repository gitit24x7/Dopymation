import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";

export function FinalCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="commission" className="bg-flame px-6 py-24 md:px-12 md:py-32">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Ready to commission your story?
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
          Weddings, baby showers, birthdays, launches, anniversaries and baptisms.
          Tell us the date and we will direct the motion.
        </p>
        <div className="mt-10">
          <Button href="mailto:hello@dopymation.studio" variant="invert">
            Commission Your Story
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
