const INK = "#20100a";

// Nested half-disc "fan" scallops, largest to smallest, drawn back-to-front
// so each smaller circle sits on top of the last and reads as a concentric
// ring. Same trick used by the mandala rings: no arc/annulus path math
// needed, just stacked filled circles.
const BANDS = [
  { r: 45, fill: "#f3dfa8" },
  { r: 37, fill: "#12807d" },
  { r: 29, fill: "#f4795b" },
  { r: 21, fill: "#e7c565" },
  { r: 13, fill: "#3a8f5c" },
  { r: 6, fill: "#f2a93b" },
];

const PERIOD = 90;
const THICKNESS = 56;

type OrnamentalBorderProps = {
  orientation: "left" | "bottom";
};

export function OrnamentalBorder({ orientation }: OrnamentalBorderProps) {
  const patternId = `border-fan-${orientation}`;
  const vertical = orientation === "left";

  const patternWidth = vertical ? THICKNESS : PERIOD;
  const patternHeight = vertical ? PERIOD : THICKNESS;
  const cx = vertical ? 0 : patternWidth / 2;
  const cy = vertical ? patternHeight / 2 : patternHeight;
  const dotOffsets = vertical
    ? [
        { x: THICKNESS * 0.78, y: PERIOD * 0.08 },
        { x: THICKNESS * 0.6, y: PERIOD * 0.5 },
        { x: THICKNESS * 0.82, y: PERIOD * 0.9 },
      ]
    : [
        { x: PERIOD * 0.08, y: THICKNESS * 0.22 },
        { x: PERIOD * 0.5, y: THICKNESS * 0.4 },
        { x: PERIOD * 0.9, y: THICKNESS * 0.22 },
      ];

  function halfDiscPath(r: number) {
    if (vertical) {
      // Bulges toward +x (rightward, into the panel).
      return `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`;
    }
    // Bulges toward -y (upward, into the panel).
    return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z`;
  }

  return (
    <svg
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          patternUnits="userSpaceOnUse"
          width={patternWidth}
          height={patternHeight}
        >
          {BANDS.map((band) => (
            <path
              key={band.r}
              d={halfDiscPath(band.r)}
              fill={band.fill}
              stroke={INK}
              strokeWidth={1.5}
            />
          ))}
          {dotOffsets.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={2.4} fill="#f3dfa8" stroke={INK} strokeWidth={0.75} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
