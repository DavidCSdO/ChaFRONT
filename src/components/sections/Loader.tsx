"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Draw the ring
    tl.fromTo(
      ringRef.current?.querySelector("circle") as Element,
      { strokeDasharray: "1000", strokeDashoffset: "1000" },
      { strokeDashoffset: "0", duration: 2, ease: "power2.inOut" }
    );

    // Fade in text
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Fade out loader
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
    >
      <div className="relative flex flex-col items-center justify-center">
        <svg
          ref={ringRef}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute opacity-20"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="2"
          />
        </svg>
        <h1
          ref={textRef}
          className="font-serif text-4xl md:text-6xl text-gold tracking-widest text-center"
          style={{ opacity: 0 }}
        >
          Julia & David
        </h1>
      </div>
    </div>
  );
}
