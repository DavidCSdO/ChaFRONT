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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  // Menu Links
  const links = [
    { id: '01', href: '#historia', label: 'Nossa História' },
    { id: '02', href: '#o-grande-dia', label: 'O Grande Dia' },
    { id: '03', href: '#cronograma', label: 'Cronograma' },
    { id: '04', href: '#galeria', label: 'Galeria' },
    { id: '05', href: '#dresscode', label: 'Dress Code' },
    { id: '06', href: '#polaroids', label: 'Lembranças' },
    { id: '07', href: '#mensagens', label: 'Mensagens' },
    { id: '08', href: '#lista-de-presentes', label: 'Presentes' },
  ];

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
        data-lenis-prevent="true"
        className={`fixed inset-0 bg-dark/20 backdrop-blur-sm z-50 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        data-lenis-prevent="true"
        className={`fixed top-0 left-0 h-full w-[90vw] max-w-[480px] bg-secondary z-50 transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col shadow-2xl border-r border-dark/5 overscroll-contain ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-8 md:px-12 py-8 border-b border-dark/5">
          <div className="w-16 md:w-20 aspect-[2/1] opacity-90 relative">
            <Image src="/JD.png" alt="JD Logo" fill className="object-contain" priority sizes="80px" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-dark/5 text-dark/50 hover:bg-gold hover:text-white transition-colors duration-300"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 md:px-12 py-10 flex flex-col gap-6 md:gap-8">
          {links.map((link, index) => (
            <a 
              key={link.id} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={`group flex items-baseline gap-4 w-fit transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
              style={{ transitionDelay: `${isOpen ? 150 + index * 50 : 0}ms` }}
            >
              <span className="font-serif text-3xl md:text-4xl text-dark group-hover:text-gold group-hover:translate-x-3 transition-all duration-300">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <div className="px-8 md:px-12 py-10 border-t border-dark/5 bg-white/30 backdrop-blur-md">
          <div className={`transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-dark/40 mb-4">[ CONTATO ]</p>
            <a href="mailto:cardosodavid92@gmail.com" className="block font-sans text-sm text-dark/70 hover:text-gold transition-colors mb-2">cardosodavid92@gmail.com</a>
            <a href="https://wa.me/55249992928110" target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-dark/70 hover:text-gold transition-colors mb-8">+55 (24) 9 99292-8110</a>
            
            <a href="/admin/convidados" className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-dark/30 hover:text-gold transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              Acesso Restrito
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
