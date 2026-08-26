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

const BASE_PERIOD = 90;
const BASE_THICKNESS = 56;

type OrnamentalBorderProps = {
  orientation: "left" | "bottom";
  /** Scales the whole motif (radii, period, thickness) uniformly. The SVG
   * has no viewBox on purpose, so the pattern repeats at a fixed real-world
   * size rather than stretching; shrinking it for mobile means scaling the
   * underlying numbers, not just the container's CSS size. */
  scale?: number;
};

export function OrnamentalBorder({ orientation, scale = 1 }: OrnamentalBorderProps) {
  const patternId = `border-fan-${orientation}-${scale}`;
  const vertical = orientation === "left";
  const PERIOD = BASE_PERIOD * scale;
  const THICKNESS = BASE_THICKNESS * scale;
  const bands = BANDS.map((band) => ({ ...band, r: band.r * scale }));

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
          {bands.map((band, i) => (
            <path
              key={i}
              d={halfDiscPath(band.r)}
              fill={band.fill}
              stroke={INK}
              strokeWidth={1.5 * scale}
            />
          ))}
          {dotOffsets.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={2.4 * scale} fill="#f3dfa8" stroke={INK} strokeWidth={0.75 * scale} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
