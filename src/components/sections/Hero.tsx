"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroScene from "@/components/3d/HeroScene";
import Image from "next/image";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 }); // After loader

    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    )
      .fromTo(
        dateRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center pointer-events-none">

        <div ref={textRef} className="flex flex-col items-center opacity-0 w-full max-w-[60vw] md:max-w-[40vw] lg:max-w-[30vw] relative">
          <Image
            src="/Group 1.png"
            alt="Julia & David"
            width={800}
            height={400}
            className="w-full h-auto object-contain drop-shadow-xl"
            priority
          />
        </div>

        <div ref={dateRef} className="mt-8 opacity-0">
          <p className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-dark/70">
            07 de Setembro de 2026
          </p>
        </div>

        <div ref={buttonsRef} className="mt-12 flex flex-col md:flex-row gap-6 opacity-0 pointer-events-auto">
          <a
            href="#historia"
            className="px-8 py-4 bg-dark text-primary font-sans text-xs tracking-widest uppercase rounded-full hover:bg-gold transition-colors duration-500"
          >
            Conheça nossa história
          </a>
          <a
            href="#lista-de-presentes"
            className="px-8 py-4 bg-transparent border border-dark/30 text-dark font-sans text-xs tracking-widest uppercase rounded-full hover:bg-dark hover:text-primary transition-colors duration-500"
          >
            Lista de presentes
          </a>
        </div>

      </div>
    </section>
  );
}
