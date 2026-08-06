"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import Image from "next/image";

const timelineData = [
  { number: "O amor", title: "Encontro de Almas", text: "O amor não é apenas olhar um para o outro, mas sim olhar juntos na mesma direção. É encontrar na outra pessoa o lar que o coração sempre buscou.", image: "/carrocel/1.jpeg" },
  { number: "é", title: "Cumplicidade", text: "Mais do que dividir os dias, é multiplicar as alegrias e dividir os fardos. A verdadeira parceria transforma a rotina em poesia.", image: "/carrocel/2.jpeg" },
  { number: "Cumplicidade", title: "O Cuidado", text: "Amar é escolher a mesma pessoa todos os dias. É a arte de cuidar, de entender o silêncio e de celebrar até as menores vitórias.", image: "/carrocel/3.jpeg" },
  { number: "Para Sempre", title: "Para Sempre", text: "O 'para sempre' não é um destino, é a construção diária que fazemos lado a lado. Hoje celebramos apenas o começo do nosso infinito.", image: "/carrocel/4.jpeg" }
];

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !lineFillRef.current) return;

    const ctx = gsap.context(() => {
      // Animate central line
      gsap.to(lineFillRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // Animate cards
      const cards = gsap.utils.toArray(".timeline-card");
      cards.forEach((card: any, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(card, 
          { opacity: 0, x: isLeft ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );

        // Animate dot
        const dot = card.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, backgroundColor: "transparent" },
            {
              scale: 1,
              backgroundColor: "var(--color-gold)",
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                start: "top center",
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="historia" className="w-full bg-secondary relative py-32 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center mb-24">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-forest mb-4">A Essência</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Nossa essência <br className="hidden md:block" />
            em <span className="italic text-gold">palavras</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full pb-20">
          
          {/* Central Line */}
          <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-dark/10 -translate-x-1/2 md:translate-x-[-1px]">
            <div ref={lineFillRef} className="absolute top-0 left-0 w-full bg-gold h-0 shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
          </div>

          <div className="flex flex-col gap-16 md:gap-32">
            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`timeline-card relative flex flex-col md:flex-row items-center justify-between w-full ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 w-4 h-4 rounded-full border-2 border-gold bg-secondary z-20 -translate-x-1/2 md:translate-x-[-50%] md:-translate-y-1/2 timeline-dot shadow-md"></div>
                  
                  {/* Content (Text) */}
                  <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} mb-8 md:mb-0`}>
                    <div className="font-script text-4xl md:text-5xl text-champagne mb-2">{item.number}</div>
                    <h3 className="font-serif text-2xl md:text-3xl text-dark mb-4">{item.title}</h3>
                    <p className="font-sans text-sm md:text-base text-dark/70 leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                  {/* Content (Image) */}
                  <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isLeft ? "md:pl-16" : "md:pr-16"}`}>
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-dark/10 group">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
