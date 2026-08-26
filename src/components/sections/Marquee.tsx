const categories = [
  "Weddings",
  "Baby Showers",
  "Birthdays",
  "Corporate Launches",
  "Anniversaries",
  "Baptisms",
];

export function Marquee() {
  const items = [...categories, ...categories];

  return (
    <div className="overflow-hidden border-y border-paper/10 bg-ink py-5">
      <div className="marquee-track flex w-max animate-[marquee_32s_linear_infinite] items-center gap-6">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-6 font-display text-2xl font-semibold uppercase tracking-tight text-paper/85 md:text-3xl"
          >
            {item}
            <span className="text-flame">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
