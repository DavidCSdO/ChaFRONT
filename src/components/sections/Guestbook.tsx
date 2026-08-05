"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquareHeart, PenTool } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Mensagem = {
  id: number;
  nome: string;
  texto: string;
};

export default function Guestbook() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchMensagens = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false });
      
    if (!error && data) {
      setMensagens(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const handleSubmit = async () => {
    if (!nome.trim() || !texto.trim()) return;
    
    setSubmitting(true);
    const { error } = await supabase
      .from("mensagens")
      .insert([{ nome: nome.trim(), texto: texto.trim() }]);
      
    setSubmitting(false);
    
    if (error) {
      alert("Houve um erro ao enviar sua mensagem. Tente novamente.");
    } else {
      setIsModalOpen(false);
      setNome("");
      setTexto("");
      alert("✨ Mensagem enviada com sucesso! Muito obrigado.");
      fetchMensagens(); 
    }
  };

  return (
    <section id="mensagens" className="w-full py-20 md:py-32 px-6 md:px-8 bg-primary relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-champagne/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-forest mb-4 md:mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-forest"></span>
              Livro de Visitas
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-dark leading-tight">
              Mensagens de <br className="hidden md:block" />
              <span className="italic text-gold">Carinho</span>
            </h2>
          </div>
          
          <div className="max-w-sm w-full">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-dark text-primary py-5 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-500 flex items-center justify-center gap-3 group shadow-xl shadow-dark/5"
            >
              <PenTool size={16} className="group-hover:-rotate-12 transition-transform duration-300" />
              Deixar uma Mensagem
            </button>
          </div>
        </div>

        {/* Masonry / Grid List */}
        {loading ? (
          <div className="w-full py-32 flex justify-center">
            <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          </div>
        ) : mensagens.length === 0 ? (
          <div className="w-full py-20 text-center flex flex-col items-center justify-center border border-dashed border-dark/20 rounded-3xl bg-secondary/30">
            <MessageSquareHeart size={48} className="text-dark/20 mb-6" />
            <p className="font-serif text-2xl text-dark/50">Seja o primeiro a deixar uma mensagem!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {mensagens.map((msg, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: (index % 10) * 0.1, ease: "easeOut" }}
                key={msg.id} 
                className="break-inside-avoid bg-secondary p-8 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:shadow-dark/5 transition-all duration-500 relative group"
              >
                <MessageSquareHeart size={20} className="text-gold/30 absolute top-8 right-8 group-hover:text-gold transition-colors duration-500" />
                <p className="font-sans text-dark/70 font-light leading-relaxed mb-6 whitespace-pre-wrap pr-6">
                  "{msg.texto}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-serif text-sm">
                    {msg.nome.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-serif text-lg text-dark">{msg.nome}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => !submitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-primary rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col border border-white"
            >
              {!submitting && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-dark/5 transition-colors z-10"
                >
                  <X size={20} className="text-dark/50 hover:text-dark transition-colors" />
                </button>
              )}

              <h3 className="font-serif text-3xl text-dark mb-2 leading-tight">Deixe seu <span className="italic text-gold">Recado</span></h3>
              <p className="font-sans text-dark/50 text-sm mb-8 leading-relaxed">
                Escreva uma mensagem de carinho para os noivos.
              </p>
              
              <div className="w-full relative z-10 flex flex-col gap-4">
                <input 
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu Nome"
                  disabled={submitting}
                  className="w-full bg-secondary border border-dark/5 rounded-2xl py-4 px-6 font-sans text-dark outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all disabled:opacity-50"
                />

                <textarea 
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escreva sua mensagem..."
                  disabled={submitting}
                  rows={4}
                  className="w-full bg-secondary border border-dark/5 rounded-2xl py-4 px-6 font-sans text-dark outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all disabled:opacity-50 resize-none"
                />

                <button 
                  onClick={handleSubmit}
                  disabled={!nome.trim() || !texto.trim() || submitting}
                  className="w-full mt-4 bg-dark text-primary py-5 rounded-2xl font-sans text-xs tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold transition-colors duration-500 flex items-center justify-center group"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  ) : (
                    "Enviar Mensagem"
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
