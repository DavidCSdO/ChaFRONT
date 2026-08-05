"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Gift } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 2.5 }
    );

    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        duration: 2,
        delay: 6,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-8 py-6 mix-blend-difference text-primary pointer-events-auto"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-4 font-sans text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          <Menu size={20} />
          <span className="hidden md:inline-block">Menu</span>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 w-16 md:w-20 aspect-[2/1] invert opacity-90">
          <Image src="/JD.png" alt="JD Logo" fill className="object-contain" priority sizes="80px" />
        </div>

        <a
          href="#lista-de-presentes"
          className="relative flex items-center justify-center border border-primary/30 w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-2 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-primary hover:text-dark transition-colors duration-500"
        >
          <Gift size={16} className="md:hidden" />
          <span className="hidden md:inline-block">Lista de Presentes</span>

          <span
            ref={tooltipRef}
            className="absolute top-[calc(100%+8px)] right-0 md:hidden whitespace-nowrap bg-primary text-dark px-3 py-1.5 rounded font-sans text-[9px] uppercase tracking-widest shadow-lg pointer-events-none before:content-[''] before:absolute before:-top-1 before:right-3 before:w-2 before:h-2 before:bg-primary before:rotate-45"
          >
            Lista de Presentes
          </span>
        </a>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[85vw] md:w-[400px] bg-secondary z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-10 py-8 border-b border-dark/5">
          <div className="w-16 md:w-20 aspect-[2/1] opacity-90 relative">
            <Image src="/JD.png" alt="JD Logo" fill className="object-contain" priority sizes="80px" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-dark/50 hover:text-dark transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-12 flex flex-col gap-6">
          <a href="#historia" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">Nossa História</a>
          <a href="#o-grande-dia" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">O Grande Dia</a>
          <a href="#cronograma" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">Cronograma</a>
          <a href="#galeria" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">Galeria</a>
          <a href="#mensagens" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">Mensagens</a>
          <a href="#lista-de-presentes" onClick={() => setIsOpen(false)} className="font-sans text-3xl md:text-4xl text-dark hover:text-gold transition-colors duration-300">Lista de Presentes</a>
        </div>

        <div className="px-10 py-12 border-t border-dark/5">
          <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-dark/40 mb-4">[ CONTATO ]</p>
          <p className="font-sans text-sm text-dark/70 mb-1">cardosodavid92@gmail.com</p>
          <p className="font-sans text-sm text-dark/70">+55 (24) 9 99292-8110</p>
        </div>
      </div>
    </>
  );
}
