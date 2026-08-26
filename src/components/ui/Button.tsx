import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "invert" | "outline";
  size?: "md" | "sm";
  /** Additive layout classes only (margin, width). Never pass padding, font-size, or color utilities here; use `size`/`variant` instead. */
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid: "bg-flame text-ink hover:bg-white",
  invert: "bg-ink text-paper hover:bg-white hover:text-ink",
  outline: "bg-transparent text-paper border border-paper/40 hover:border-paper",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-7 py-4 text-sm",
  sm: "px-5 py-2.5 text-xs",
};

export function Button({ children, href, onClick, variant = "solid", size = "md", className = "" }: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18 });
  const springY = useSpring(y, { stiffness: 250, damping: 18 });

  function handlePointerMove(e: React.PointerEvent) {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  const classes = `inline-flex items-center justify-center whitespace-nowrap font-display font-semibold uppercase tracking-[0.06em] transition-colors duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-flex items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={classes}
    >
      {content}
    </button>
  );
}
