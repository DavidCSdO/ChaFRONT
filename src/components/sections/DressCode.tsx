"use client";

import { motion } from "framer-motion";

const dressGroups = [
  {
    role: "Madrinhas",
    desc: "Vestidos longos e esvoaçantes no tom Rosa Antigo (Cinnamon Rose). Escolhemos essa cor com muito carinho para harmonizar com a decoração.",
    colors: ["#9a505b", "#B6616D", "#C07883", "#CD8C96", "#D8A0A8"], 
    icon: "👗"
  },
  {
    role: "Padrinhos",
    desc: "Terno completo na cor Cinza Gelo, gravata no tom Rosa Antigo (para combinar com sua par) e sapato social marrom.",
    colors: ["#D5D7D8", "#C4C7C9", "#B6616D", "#7A5243"], 
    icon: "👔"
  },
  {
    role: "Demoiselles",
    desc: "Nossas queridas demoiselles irão nos abençoar vestindo Azul Bebê.",
    colors: ["#9EC0DE", "#B9D4EB", "#D0E3F3"], 
    icon: "🩵"
  },
  {
    role: "Pajens",
    desc: "Os pequenos estarão vestidos iguais aos padrinhos: Terno Cinza Gelo, gravata Rosa Antigo e sapatinho marrom.",
    colors: ["#D5D7D8", "#C4C7C9", "#B6616D", "#7A5243"],
    icon: "👦"
  },
  {
    role: "Damas",
    desc: "As nossas lindas daminhas irão vestir vestido branco ou marfim com a faixa no tom Rosa Antigo.",
    colors: ["#FFFFFF", "#F9F6F0", "#B6616D"], 
    icon: "👧"
  },
  {
    role: "Convidados",
    desc: "Traje Passeio Completo. Pedimos gentilmente que evitem as cores brancas (reservada para a noiva) e os tons exclusivos dos padrinhos/madrinhas.",
    colors: [],
    icon: "✨"
  }
];

export default function DressCode() {
  return (
    <section id="dresscode" className="w-full py-32 px-6 md:px-8 bg-primary relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-forest mb-4">Dress Code</p>
          <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
            Guia de <span className="italic text-gold">Estilo</span>
          </h2>
          <p className="font-sans text-dark/60 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
            Separamos algumas orientações de cores e trajes para que todos se sintam confortáveis e para mantermos a harmonia visual no nosso grande dia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dressGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-secondary/50 border border-dark/5 p-8 rounded-[2rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col"
            >
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 origin-left">{group.icon}</div>
              <h3 className="font-serif text-2xl text-dark mb-4 group-hover:text-gold transition-colors">{group.role}</h3>
              <p className="font-sans text-sm text-dark/70 leading-relaxed flex-grow">
                {group.desc}
              </p>
              
              {group.colors.length > 0 && (
                <div className="mt-8 pt-6 border-t border-dark/5">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-3">Paleta de Cores</p>
                  <div className="flex flex-wrap gap-2">
                    {group.colors.map((color, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="w-10 h-10 rounded-full shadow-sm ring-1 ring-black/5 hover:scale-110 transition-transform cursor-pointer border-2 border-white/50"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
