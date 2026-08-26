import { EnvelopeSimple, InstagramLogo } from "@phosphor-icons/react";

const links = [
  { href: "#eras", label: "Eras" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-paper/10 pt-10 md:flex-row md:items-center md:justify-between">
        <span className="font-display text-lg font-bold tracking-tight text-paper">
          DOPYMATION
        </span>

        <nav className="flex flex-wrap gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.14em] text-paper/60 transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/dopymation"
            aria-label="Dopymation on Instagram"
            className="text-paper/60 transition-colors hover:text-flame"
          >
            <InstagramLogo size={20} />
          </a>
          <a
            href="mailto:hello@dopymation.studio"
            aria-label="Email Dopymation"
            className="text-paper/60 transition-colors hover:text-flame"
          >
            <EnvelopeSimple size={20} />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-7xl font-mono text-xs text-paper/40">
        (c) 2026 Dopymation. All rights reserved.
      </p>
    </footer>
  );
}
