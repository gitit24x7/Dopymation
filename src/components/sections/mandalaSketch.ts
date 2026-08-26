import p5 from "p5";

type Shape = "lotus" | "rosetteVine" | "scale" | "bullseye" | "rosette";

type Ring = {
  count: number;
  radiusFactor: number;
  sizeFactor: number;
  speed: number;
  fill: string;
  accent?: string;
  shape: Shape;
};

/**
 * Hand-built radial symmetry (rotate + translate around a center), the
 * standard p5.js technique for mandalas — there is no dedicated mandala
 * library on p5js.org/libraries. The composition blends a Mughal-medallion
 * cusped outline, a beaded lace border, Rajasthani vine-and-rosette
 * garlands (a scrollwork ring, not isolated motifs), a scale/chain band,
 * a bullseye ring, and a Madhubani starburst bindu, all outlined in a bold
 * ink stroke over a warm desi palette. The bullseye ring pairs orange with
 * a complementary blue centre, the same contrast meenakari enamel work
 * uses; every other ring stays warm-toned.
 */
const INK = "#20100a";

const RINGS: Ring[] = [
  { count: 16, radiusFactor: 0.43, sizeFactor: 0.115, speed: 0.045, fill: "#f2a93b", shape: "lotus" },
  { count: 12, radiusFactor: 0.335, sizeFactor: 0.05, speed: -0.055, fill: "#d6336c", accent: "#3a8f5c", shape: "rosetteVine" },
  { count: 26, radiusFactor: 0.265, sizeFactor: 0.028, speed: 0.075, fill: "#c0392b", shape: "scale" },
  { count: 8, radiusFactor: 0.2, sizeFactor: 0.065, speed: -0.05, fill: "#f2822e", shape: "bullseye" },
  { count: 10, radiusFactor: 0.135, sizeFactor: 0.065, speed: 0.08, fill: "#3a8f5c", shape: "lotus" },
  { count: 16, radiusFactor: 0.075, sizeFactor: 0.02, speed: -0.09, fill: "#e7c565", shape: "rosette" },
];

const BORDER = { radiusFactor: 0.475, sizeFactor: 0.032, count: 44, fill: "#f3dfa8" };

export function mandalaSketch(container: HTMLDivElement, reduceMotion: boolean) {
  return (p: p5) => {
    let angle = 0;

    const dims = () => {
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
      return { w, h, dim: Math.min(w, h) };
    };

    function lotus(size: number, color: string, depth = 0) {
      // A curved lotus bud, tip pointing outward (+x). p5 v2's bezierVertex()
      // takes one point per call (three calls per cubic segment) rather than
      // v1's single 6-argument call.
      p.stroke(INK);
      p.strokeWeight(Math.max(1, size * 0.05));
      p.fill(color);
      p.beginShape();
      p.vertex(0, 0);
      p.bezierVertex(size * 0.18, -size * 0.4);
      p.bezierVertex(size * 0.78, -size * 0.24);
      p.bezierVertex(size, 0);
      p.bezierVertex(size * 0.78, size * 0.24);
      p.bezierVertex(size * 0.18, size * 0.4);
      p.bezierVertex(0, 0);
      p.endShape(p.CLOSE);
      p.strokeWeight(Math.max(0.6, size * 0.02));
      p.line(size * 0.16, 0, size * 0.86, 0);

      if (depth > 0) {
        // A smaller bud nested at the tip: real (if shallow) self-similarity
        // rather than decoration, echoing the flower-within-flower motif
        // common to Mughal medallion scrollwork.
        p.push();
        p.translate(size * 0.72, 0);
        p.scale(0.42);
        lotus(size, color, depth - 1);
        p.pop();
      }
    }

    function scale_(size: number, color: string) {
      // A rounded scale/petal for the chain ring, like overlapping fish
      // scales or the repeating snake-band border in dense lace mandalas.
      p.stroke(INK);
      p.strokeWeight(Math.max(0.8, size * 0.09));
      p.fill(color);
      p.beginShape();
      p.vertex(-size * 0.5, 0);
      p.bezierVertex(-size * 0.2, -size * 0.6);
      p.bezierVertex(size * 0.35, -size * 0.32);
      p.bezierVertex(size * 0.58, 0);
      p.bezierVertex(size * 0.35, size * 0.32);
      p.bezierVertex(-size * 0.2, size * 0.6);
      p.bezierVertex(-size * 0.5, 0);
      p.endShape(p.CLOSE);
    }

    function rosette(size: number, petalColor: string, centerColor: string) {
      const petalR = size * 0.62;
      const petalSize = size * 0.62;
      p.stroke(INK);
      p.strokeWeight(Math.max(0.6, size * 0.08));
      p.fill(petalColor);
      const n = 6;
      for (let k = 0; k < n; k++) {
        const a = (p.TWO_PI / n) * k;
        p.circle(Math.cos(a) * petalR, Math.sin(a) * petalR, petalSize);
      }
      p.fill(centerColor);
      p.circle(0, 0, size * 0.6);
    }

    function bullseye(size: number, color: string) {
      // A plain orange dot with a complementary blue centre, the same
      // contrast Rajasthani meenakari enamel work pairs orange and blue in.
      p.stroke(INK);
      p.strokeWeight(Math.max(1, size * 0.1));
      p.fill(color);
      p.circle(0, 0, size);
      p.strokeWeight(Math.max(0.6, size * 0.045));
      p.fill("#2e6ff2");
      p.circle(0, 0, size * 0.44);
    }

    function drawBorder(dim: number, t: number) {
      // A beaded lace trim: overlapping circles whose union reads as a
      // continuous scalloped edge, the border language shared by dense
      // doily mandalas and Rajasthani textile borders alike.
      const radius = dim * BORDER.radiusFactor;
      const size = dim * BORDER.sizeFactor;
      const rotation = reduceMotion ? 0 : t * 0.02;
      p.stroke(INK);
      p.strokeWeight(Math.max(1, size * 0.1));
      for (let i = 0; i < BORDER.count; i++) {
        const a = (p.TWO_PI / BORDER.count) * i + rotation;
        p.fill(i % 2 === 0 ? BORDER.fill : "#e7c565");
        p.circle(Math.cos(a) * radius, Math.sin(a) * radius, size);
      }
    }

    function drawRosetteVineRing(ring: Ring, dim: number, t: number) {
      const radius = dim * ring.radiusFactor;
      const size = dim * ring.sizeFactor;
      const rotation = reduceMotion ? 0 : t * ring.speed;

      // Vine garland connecting each rosette to the next, drawn in the ring's
      // shared coordinate space (before each item's own rotate/translate) so
      // the curve can reach between two neighbouring positions.
      p.noFill();
      p.stroke(ring.accent ?? INK);
      p.strokeWeight(Math.max(1, size * 0.16));
      for (let i = 0; i < ring.count; i++) {
        const a1 = (p.TWO_PI / ring.count) * i + rotation;
        const a2 = (p.TWO_PI / ring.count) * (i + 1) + rotation;
        const x1 = Math.cos(a1) * radius;
        const y1 = Math.sin(a1) * radius;
        const x2 = Math.cos(a2) * radius;
        const y2 = Math.sin(a2) * radius;
        const mid = (a1 + a2) / 2;
        const pull = radius * 0.8;
        const cx = Math.cos(mid) * pull;
        const cy = Math.sin(mid) * pull;
        p.bezier(x1, y1, cx, cy, cx, cy, x2, y2);
      }

      for (let i = 0; i < ring.count; i++) {
        const a = (p.TWO_PI / ring.count) * i + rotation;
        p.push();
        p.translate(Math.cos(a) * radius, Math.sin(a) * radius);
        rosette(size, ring.fill, "#e7c565");
        p.pop();
      }
    }

    function drawMotif(shape: Shape, size: number, ring: Ring) {
      if (shape === "lotus") lotus(size, ring.fill, 1);
      else if (shape === "scale") scale_(size, ring.fill);
      else if (shape === "bullseye") bullseye(size, ring.fill);
      else if (shape === "rosette") rosette(size, ring.fill, INK);
    }

    function drawRing(ring: Ring, dim: number, t: number) {
      if (ring.shape === "rosetteVine") {
        drawRosetteVineRing(ring, dim, t);
        return;
      }
      const radius = dim * ring.radiusFactor;
      const size = dim * ring.sizeFactor;
      const rotation = reduceMotion ? 0 : t * ring.speed;

      for (let i = 0; i < ring.count; i++) {
        const a = (p.TWO_PI / ring.count) * i + rotation;
        p.push();
        p.rotate(a);
        p.translate(radius, 0);
        drawMotif(ring.shape, size, ring);
        p.pop();
      }
    }

    function starburst(dim: number) {
      const rayCount = 20;
      const outer = dim * 0.1;
      const inner = dim * 0.015;
      p.noStroke();
      p.fill("#6b1d18");
      for (let i = 0; i < rayCount; i++) {
        const a = (p.TWO_PI / rayCount) * i;
        const spread = p.PI / rayCount / 2;
        p.triangle(
          Math.cos(a - spread) * inner,
          Math.sin(a - spread) * inner,
          Math.cos(a) * outer,
          Math.sin(a) * outer,
          Math.cos(a + spread) * inner,
          Math.sin(a + spread) * inner
        );
      }
    }

    let rafId = 0;

    function renderFrame() {
      const { w, h, dim } = dims();
      if (w !== p.width || h !== p.height) p.resizeCanvas(w, h);

      p.clear();
      p.push();
      p.translate(w / 2, h / 2);

      const breathe = reduceMotion ? 1 : 1 + Math.sin(angle * 0.6) * 0.015;
      p.scale(breathe);

      drawBorder(dim, angle);
      for (const ring of RINGS) drawRing(ring, dim, angle);

      // Layered starburst bindu: dark-red rays, then indigo, gold, cream and
      // a vermillion tilak dot at the very centre.
      starburst(dim);
      p.stroke(INK);
      p.strokeWeight(dim * 0.005);
      p.fill("#2b2560");
      p.circle(0, 0, dim * 0.095);
      p.fill("#e7c565");
      p.circle(0, 0, dim * 0.068);
      p.fill("#f3dfa8");
      p.circle(0, 0, dim * 0.045);
      p.noStroke();
      p.fill("#c0392b");
      p.circle(0, 0, dim * 0.022);

      p.pop();
    }

    // Rendering is driven by our own rAF loop (calling renderFrame directly)
    // rather than p5's built-in draw()/loop(), so reduced-motion can freeze
    // the mandala on a single frame just by never starting the loop.
    p.setup = () => {
      const { w, h } = dims();
      p.createCanvas(w, h);
      renderFrame();

      if (!reduceMotion) {
        const tick = () => {
          angle += 0.01;
          renderFrame();
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      }

      const originalRemove = p.remove.bind(p);
      p.remove = () => {
        if (rafId) cancelAnimationFrame(rafId);
        originalRemove();
      };
    };
  };
}
