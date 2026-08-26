import { useEffect, useRef } from "react";
import p5 from "p5";
import { mandalaSketch } from "./mandalaSketch";

export function IndianMandala({ reduceMotion }: { reduceMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const instance = new p5(mandalaSketch(containerRef.current, reduceMotion), containerRef.current);
    return () => instance.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
