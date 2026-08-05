"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-gold text-primary shadow-2xl hover:bg-dark hover:scale-110 transition-all duration-500 z-40 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
      }`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={20} />
    </button>
  );
}
