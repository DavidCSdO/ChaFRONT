"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Image from "next/image";
import { Mouse } from "lucide-react";

const timelineData = [
  { year: "2018", title: "O Primeiro Olhar", text: "Nos conhecemos em um café no centro da cidade. Foi apenas uma troca de olhares, mas o suficiente para mudar tudo.", image: "/carrocel/1.jpeg" },
  { year: "2020", title: "O Reencontro", text: "O destino nos colocou no mesmo lugar novamente, dessa vez para não nos separarmos mais.", image: "/carrocel/2.jpeg" },
  { year: "2023", title: "O Pedido", text: "Em uma viagem inesquecível, sob as luzes de Paris, decidimos dar o próximo passo em nossa jornada.", image: "/carrocel/3.jpeg" },
  { year: "2026", title: "O Grande Dia", text: "Estamos prontos para celebrar o nosso amor com as pessoas mais importantes das nossas vidas.", image: "/carrocel/4.jpeg" }
];

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current!;
      const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

      gsap.to(scrollContainer, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="historia" className="h-screen w-full bg-secondary overflow-hidden flex items-center relative">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="pl-[10vw] md:pl-[20vw] pr-[20vw] flex items-center gap-[10vw] md:gap-[20vw] h-full" ref={scrollContainerRef}>
        
        {/* Intro */}
        <div className="min-w-[80vw] md:min-w-[40vw] flex flex-col items-start shrink-0 z-10">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-6">Nossa História</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Cada detalhe <br/>
            nos trouxe <span className="italic text-gold">aqui</span>
          </h2>
          
          <div className="mt-12 flex items-center gap-3 text-dark/40 animate-pulse">
            <Mouse size={18} />
            <span className="font-sans text-[10px] md:text-[11px] tracking-widest uppercase">Role para baixo para navegar</span>
          </div>
        </div>

        {/* Timeline Cards */}
        {timelineData.map((item, i) => (
          <div key={i} className="w-[75vw] max-w-[300px] md:max-w-none md:min-w-[450px] shrink-0 relative group">
            {/* Glassmorphism Card */}
            <div className="relative bg-primary/20 backdrop-blur-xl border border-primary/50 rounded-2xl overflow-hidden shadow-2xl shadow-dark/5 transition-transform duration-700 group-hover:-translate-y-4">
              
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 300px, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent"></div>
              </div>

              <div className="p-6 md:p-14 pt-6 md:pt-8">
                <div className="font-serif text-3xl md:text-5xl text-champagne mb-4 md:mb-6 opacity-80">{item.year}</div>
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
