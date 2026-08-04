"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const images = [
  "/carrocel/1.jpeg",
  "/carrocel/2.jpeg",
  "/carrocel/3.jpeg",
  "/carrocel/4.jpeg",
  "/carrocel/5.jpeg",
  "/carrocel/6.jpeg",
  "/carrocel/7.jpeg",
  "/carrocel/8.jpeg",
  "/carrocel/9.jpeg",
  "/carrocel/10.jpeg",
  "/carrocel/11.jpeg",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
    
    items.forEach((item, i) => {
      // Get the image element inside the container
      const img = item.querySelector("img");
      if (!img) return;
      
      // We scale the image to 1.2 so it has a 10% overhang on top and bottom
      gsap.fromTo(img,
        { yPercent: -10, scale: 1.2 },
        {
          yPercent: 10,
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    });

  }, []);

  // Helper for varied heights
  const heights = ['400px', '600px', '500px', '700px'];

  return (
    <section id="galeria" className="w-full py-32 px-8 bg-primary" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-6">Memórias</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Nossa <span className="italic text-gold">Galeria</span>
          </h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, i) => (
            <div 
              key={i} 
              className="gallery-item break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ height: heights[i % 4] }}
            >
              <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
              
              <Image 
                src={src}
                alt={`Galeria ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
