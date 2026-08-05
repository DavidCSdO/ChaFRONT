"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Image from "next/image";
import { Mouse } from "lucide-react";

const quotesData = [
  { number: "O amor", title: "Encontro de Almas", text: "O amor não é apenas olhar um para o outro, mas sim olhar juntos na mesma direção. É encontrar na outra pessoa o lar que o coração sempre buscou.", image: "/carrocel/1.jpeg" },
  { number: "é", title: "Cumplicidade", text: "Mais do que dividir os dias, é multiplicar as alegrias e dividir os fardos. A verdadeira parceria transforma a rotina em poesia.", image: "/carrocel/2.jpeg" },
  { number: "Cumplicidade", title: "O Cuidado", text: "Amar é escolher a mesma pessoa todos os dias. É a arte de cuidar, de entender o silêncio e de celebrar até as menores vitórias.", image: "/carrocel/3.jpeg" },
  { number: "Para Sempre", title: "Para Sempre", text: "O 'para sempre' não é um destino, é a construção diária que fazemos lado a lado. Hoje celebramos apenas o começo do nosso infinito.", image: "/carrocel/4.jpeg" }
];

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Horizontal Scroll
      mm.add("(min-width: 768px)", () => {
        const scrollContainer = scrollContainerRef.current!;
        const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

        gsap.to(scrollContainer, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.1,
            invalidateOnRefresh: true,
          }
        });
      });

      // Mobile: Vertical Scroll with Fade Up
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray(".story-card");
        
        cards.forEach((card: unknown) => {
          gsap.fromTo(card as HTMLElement,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card as HTMLElement,
                start: "top 85%",
              }
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="historia" className="min-h-screen md:h-screen w-full bg-secondary overflow-hidden flex flex-col md:flex-row items-center relative py-20 md:py-0">

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="px-[8vw] md:px-0 md:pl-[20vw] md:pr-[20vw] flex flex-col md:flex-row items-center md:items-center gap-16 md:gap-[20vw] h-auto md:h-full w-full md:w-auto" ref={scrollContainerRef}>

        {/* Intro */}
        <div className="w-full md:min-w-[40vw] flex flex-col items-center md:items-start text-center md:text-left shrink-0 z-10">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-4 md:mb-6">A Essência</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Nossa essência <br className="hidden md:block" />
            em <span className="italic text-gold">palavras</span>
          </h2>

          <div className="mt-8 md:mt-12 flex items-center gap-3 text-dark/40 animate-pulse">
            <Mouse size={18} />
            <span className="font-sans text-[10px] md:text-[11px] tracking-widest uppercase">Role para baixo para navegar</span>
          </div>
        </div>

        {/* Timeline Cards */}
        {quotesData.map((item, i) => (
          <div key={i} className="story-card w-full max-w-[380px] md:max-w-none md:w-[450px] shrink-0 relative group mx-auto md:mx-0">
            {/* Glassmorphism Card */}
            <div className="relative bg-primary/40 md:bg-primary/20 backdrop-blur-xl border border-primary/50 rounded-2xl overflow-hidden shadow-2xl shadow-dark/5 transition-transform duration-700 md:group-hover:-translate-y-4">

              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover md:group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
              </div>

              <div className="p-6 md:p-14 pt-6 md:pt-8">
                <div className="font-script text-5xl md:text-6xl text-champagne mb-4 md:mb-6 opacity-80">{item.number}</div>
                <h3 className="font-sans text-lg md:text-xl font-medium tracking-wide text-dark mb-3 md:mb-4 uppercase">{item.title}</h3>
                <p className="font-sans text-sm md:text-base text-dark/70 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
