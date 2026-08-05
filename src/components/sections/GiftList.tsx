"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Gift, Check, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Presente = {
  id: number;
  nome: string;
  cores: string;
  escolhido: boolean;
  escolhido_por: string | null;
};

export default function GiftList() {
  const [gifts, setGifts] = useState<Presente[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [selectedGift, setSelectedGift] = useState<Presente | null>(null);
  const [guestName, setGuestName] = useState("");
  const [reserving, setReserving] = useState(false);

  const fetchGifts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("presentes")
      .select("*")
      .order("id", { ascending: true });
      
    if (!error && data) {
      setGifts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleReserve = async () => {
    if (!guestName.trim() || !selectedGift) return;
    
    setReserving(true);
    const { error } = await supabase
      .from("presentes")
      .update({ escolhido: true, escolhido_por: guestName.trim() })
      .eq("id", selectedGift.id)
      .eq("escolhido", false); 
      
    setReserving(false);
    
    if (error) {
      alert("Houve um erro ou o presente já foi escolhido por outra pessoa.");
    } else {
      setSelectedGift(null);
      setGuestName("");
      alert("🎉 Presente reservado com sucesso! Muito obrigado.");
      fetchGifts(); 
    }
  };

  const parseColors = (coresStr: string) => {
    if (!coresStr) return [];
    return coresStr.replace(/[{}]/g, "").split(",").map(c => c.trim()).filter(Boolean);
  };

  const filteredGifts = gifts
    .filter(g => g.nome.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      // Available first
      if (a.escolhido === b.escolhido) return 0;
      return a.escolhido ? 1 : -1;
    });

  const total = gifts.length;
  const chosenCount = gifts.filter(g => g.escolhido).length;
  const progress = total === 0 ? 0 : Math.round((chosenCount / total) * 100);

  return (
    <section id="lista-de-presentes" className="w-full py-20 md:py-32 px-6 md:px-8 bg-secondary relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]"></div>
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-forest mb-4 md:mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-forest"></span>
              Lista de Presentes
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-dark leading-tight">
              Montando nosso <br className="hidden md:block" />
              <span className="italic text-gold">Lar</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-dark/60 text-sm leading-relaxed mb-8">
              Preparamos uma lista para quem desejar nos abençoar nessa nova etapa. Sua presença é o mais importante, mas se quiser contribuir, fique à vontade.
            </p>
            
            {/* Minimal Search & Progress */}
            <div className="flex flex-col gap-6 w-full">
              <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-dark/30 transition-colors group-focus-within:text-gold" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar presente..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-dark/10 py-3 pl-10 pr-4 font-sans text-sm text-dark outline-none focus:border-gold transition-colors placeholder:text-dark/30"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-dark/40">Progresso da lista</span>
                  <span className="font-serif text-gold text-lg">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-dark/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                    className="h-full bg-gradient-to-r from-gold/50 to-gold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="w-full py-32 flex justify-center">
            <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredGifts.map((gift, index) => {
              const cores = parseColors(gift.cores);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={gift.id} 
                  className="h-full"
                >
                  <div 
                    className={`group relative p-6 md:p-8 rounded-[2rem] border transition-all duration-500 ease-out flex flex-col justify-between h-full min-h-[240px] md:min-h-[300px] overflow-hidden ${
                      gift.escolhido 
                      ? "bg-transparent border-dark/5 opacity-60 grayscale" 
                      : "bg-white border-gold/10 hover:border-gold/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(184,115,115,0.15)] cursor-pointer shadow-sm"
                    }`}
                    onClick={() => !gift.escolhido && setSelectedGift(gift)}
                  >
                    {/* Subtle background glow for unselected */}
                    {!gift.escolhido && (
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-champagne/10 rounded-full blur-3xl group-hover:bg-champagne/20 transition-all duration-500 pointer-events-none"></div>
                    )}

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${gift.escolhido ? "bg-dark/5 text-dark/30" : "bg-secondary text-gold group-hover:bg-gold group-hover:text-primary group-hover:scale-110 shadow-sm"}`}>
                          {gift.escolhido ? <Check size={20} className="md:w-6 md:h-6" /> : <Gift size={20} className="md:w-6 md:h-6" />}
                        </div>
                        
                        {cores.length > 0 && (
                          <div className="flex flex-col items-end gap-2 bg-primary/50 px-3 py-2 rounded-xl border border-dark/5">
                            <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-dark/50">Cores</span>
                            <div className="flex gap-1.5">
                              {cores.map((c, i) => (
                                <span 
                                  key={i} 
                                  className="w-4 h-4 md:w-5 md:h-5 rounded-full shadow-sm ring-1 ring-black/5 border border-white/50"
                                  style={{ backgroundColor: c }}
                                  title={c}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-serif text-2xl md:text-3xl text-dark leading-snug group-hover:text-gold transition-colors duration-500">{gift.nome}</h3>
                    </div>
                    
                    {gift.escolhido ? (
                      <div className="mt-6 pt-5 border-t border-dark/5 relative z-10">
                        <p className="font-sans text-[10px] text-dark/50 uppercase tracking-[0.2em] flex items-center gap-2">
                          <Check size={12} className="text-forest/50"/> Presenteado por
                        </p>
                        <span className="font-serif text-lg md:text-xl text-dark/80 mt-1 block">{gift.escolhido_por}</span>
                      </div>
                    ) : (
                      <div className="mt-6 pt-5 border-t border-dark/5 relative z-10">
                        <div className="w-full flex items-center justify-between text-dark/50 group-hover:text-gold transition-colors duration-500">
                          <span className="font-sans text-[11px] md:text-xs uppercase tracking-widest font-medium">Presentear</span>
                          <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                            <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Premium */}
      <AnimatePresence>
        {selectedGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => !reserving && setSelectedGift(null)}
              className="absolute inset-0 bg-dark/20 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-primary rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden border border-white"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

              {!reserving && (
                <button 
                  onClick={() => setSelectedGift(null)}
                  className="absolute top-8 right-8 p-3 rounded-full hover:bg-dark/5 transition-colors z-10"
                >
                  <X size={20} className="text-dark/50 hover:text-dark transition-colors" />
                </button>
              )}

              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-gold mb-8 shadow-sm relative z-10 border border-gold/10">
                <Gift size={28} />
              </div>

              <h3 className="font-serif text-4xl text-dark mb-4 leading-tight relative z-10">{selectedGift.nome}</h3>
              <p className="font-sans text-dark/50 text-sm mb-10 leading-relaxed relative z-10 max-w-[280px]">
                Deixe seu nome abaixo para confirmar que você escolheu nos abençoar com este item.
              </p>
              
              <div className="w-full relative z-10">
                <input 
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Seu Nome Completo"
                  disabled={reserving}
                  className="w-full bg-secondary border border-dark/5 rounded-2xl py-5 px-6 font-sans text-dark outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all mb-6 text-center disabled:opacity-50"
                />

                <button 
                  onClick={handleReserve}
                  disabled={!guestName.trim() || reserving}
                  className="w-full bg-dark text-primary py-5 rounded-2xl font-sans text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold transition-colors duration-500 flex items-center justify-center group"
                >
                  {reserving ? (
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  ) : (
                    <span className="flex items-center gap-3">
                      Confirmar Escolha
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
