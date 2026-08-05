"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flower } from "lucide-react";

export default function Loader() {
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Fade out inner content and shrink circle
    tl.to([monogramRef.current, subtitleRef.current], {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power2.inOut",
      delay: 0.5
    });

    // Animate the entire background to close as a circle
    tl.to(containerRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 1.2,
      ease: "power4.inOut"
    }, "-=0.2");

    // Hide container
    tl.set(containerRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary pointer-events-auto"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        
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
          
          <h1 className="font-serif text-5xl md:text-7xl text-dark tracking-widest text-center translate-x-2">
            J <span className="text-gold italic">&</span> D
          </h1>
        </div>

        <p 
          ref={subtitleRef}
          className="absolute mt-[20rem] md:mt-[26rem] font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-dark/50 opacity-0"
        >
          07 . 09 . 2026
        </p>
      </div>
    </div>
  );
}
