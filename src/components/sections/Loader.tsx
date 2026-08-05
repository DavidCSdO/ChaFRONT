"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flower } from "lucide-react";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
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
        
        {/* Circle Monogram */}
        <div 
          ref={monogramRef}
          className="relative opacity-0 flex items-center justify-center w-56 h-56 md:w-72 md:h-72 rounded-full border border-dark/20 bg-primary/50 backdrop-blur-sm shadow-xl"
        >
          {/* Floral Ornaments */}
          <Flower size={20} strokeWidth={1} className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold opacity-80 rotate-45" />
          <Flower size={20} strokeWidth={1} className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-gold opacity-80 -rotate-45" />
          <Flower size={20} strokeWidth={1} className="absolute top-1/2 -left-3 -translate-y-1/2 text-gold opacity-80 -rotate-45" />
          <Flower size={20} strokeWidth={1} className="absolute top-1/2 -right-3 -translate-y-1/2 text-gold opacity-80 rotate-45" />
          
          <h1 className="font-serif text-5xl md:text-7xl text-dark tracking-widest text-center mt-2">
            J <span className="text-gold italic">&</span> D
          </h1>
        </div>

        <p 
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-dark/50 mt-8 opacity-0"
        >
          07 . 09 . 2026
        </p>
      </div>
    </div>
  );
}
