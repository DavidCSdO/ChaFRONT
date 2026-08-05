"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scheduleData = [
  { time: "15:30", title: "A Cerimônia", desc: "O momento mais importante, onde diremos 'Sim'." },
  { time: "", title: "Coquetel", desc: "Aperitivos e boa conversa enquanto tiramos as fotos oficiais." },
  { time: "", title: "O Jantar", desc: "Um menu especial preparado para celebrarmos juntos." },
  { time: "", title: "Celebração", desc: "Momento do bolo, docinhos e muitas fotos para eternizarmos esse dia!" }
];

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".schedule-item");

      // Animate the vertical line height on scroll
      if (lineRef.current && containerRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          }
        );
      }

      items.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cronograma" className="relative w-full py-32 px-8 bg-secondary overflow-hidden" ref={containerRef}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        <div className="text-center mb-24">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-6">Programação</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Nosso <span className="italic text-gold">Cronograma</span>
          </h2>
        </div>

        <div className="w-full relative">
          {/* Background Vertical Line */}
          <div className="absolute left-[23px] md:left-1/2 top-4 bottom-4 w-[2px] bg-dark/10 md:-translate-x-1/2"></div>

          {/* Animated Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-[23px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gold md:-translate-x-1/2 origin-top"
          ></div>

          {scheduleData.map((event, i) => (
            <div key={i} className="schedule-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-20 last:mb-0">

              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-gold top-2 md:top-auto md:-translate-x-1/2 md:translate-y-0 z-10 shadow-[0_0_15px_rgba(200,166,106,0.6)]"></div>

              {/* Time (Left side on desktop) */}
              <div className="md:w-1/2 flex md:justify-end pl-12 md:pl-0 md:pr-16 mb-2 md:mb-0">
                {event.time && (
                  <p className="font-serif text-5xl text-champagne">{event.time}</p>
                )}
              </div>

              {/* Content (Right side on desktop) */}
              <div className="md:w-1/2 flex flex-col items-start pl-12 md:pl-16">
                <h3 className="font-sans text-2xl tracking-widest uppercase text-dark mb-3">{event.title}</h3>
                <p className="font-sans text-dark/60 max-w-sm font-light leading-relaxed">
                  {event.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
