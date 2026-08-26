import { motion, useReducedMotion } from "framer-motion";
import { Play } from "@phosphor-icons/react";
import { galleryItems } from "../../data/gallery";

export function Gallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="gallery" className="bg-ink px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            The Invitations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/70 md:text-lg">
            A running reel of commissioned pieces. Select a frame to watch it in full.
          </p>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, i) => (
            <motion.a
              key={item.id}
              href="#commission"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative mb-5 block w-full overflow-hidden break-inside-avoid border border-paper/10 ${
                item.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={`https://picsum.photos/seed/${item.seed}/800/${item.span === "tall" ? "1000" : "650"}`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale contrast-110 brightness-[0.65] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-flame/15 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/90 text-ink">
                  <Play size={22} weight="fill" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-flame">
                  {item.category}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-paper">{item.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
