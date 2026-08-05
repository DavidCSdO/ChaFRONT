"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Monogram fade and scale in
    tl.fromTo(
      monogramRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );

    // Subtitle fade in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Wait a moment, then fade out text
    tl.to([monogramRef.current, subtitleRef.current], {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5
    });

    // Open Curtains
    tl.to(leftCurtainRef.current, {
      xPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "open");

    tl.to(rightCurtainRef.current, {
      xPercent: 100,
      duration: 1.2,
      ease: "power4.inOut"
    }, "open");

    // Hide container
    tl.set(containerRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex pointer-events-none"
    >
      {/* Left Curtain */}
      <div 
        ref={leftCurtainRef} 
        className="w-1/2 h-full bg-primary flex items-center justify-end overflow-hidden pointer-events-auto"
      >
      </div>

      {/* Right Curtain */}
      <div 
        ref={rightCurtainRef} 
        className="w-1/2 h-full bg-primary flex items-center justify-start overflow-hidden pointer-events-auto"
      >
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1
          ref={monogramRef}
          className="font-serif text-6xl md:text-8xl text-dark tracking-widest text-center opacity-0"
        >
          J <span className="text-gold italic">&</span> D
        </h1>
        <p 
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-dark/50 mt-6 opacity-0"
        >
          07 . 09 . 2026
        </p>
      </div>
    </div>
  );
}
