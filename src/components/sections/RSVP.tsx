"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    nome: "",
    comparecer: "sim",
    restricao: "",
    musica: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    const { error } = await supabase
      .from("rsvp")
      .insert([
        {
          nome: formData.nome,
          comparecer: formData.comparecer === "sim",
          restricao_alimentar: formData.restricao,
          musica: formData.musica
        }
      ]);

    if (error) {
      console.error(error);
      setStatus("error");
      alert("Houve um erro ao confirmar presença. Tente novamente.");
    } else {
      setStatus("success");
    }
  };

  return (
    <section id="confirmacao" className="w-full py-32 px-8 bg-primary relative overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-champagne/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Intro */}
        <div className="flex-1 text-center md:text-left">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-6">RSVP</p>
          <h2 className="font-serif text-5xl md:text-6xl text-dark leading-tight mb-6">
            Confirme sua <br/><span className="italic text-gold">Presença</span>
          </h2>
          <p className="font-sans text-dark/60 font-light leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
            Por favor, confirme sua presença até o dia 15 de Agosto. Sua resposta é muito importante para nossa organização.
          </p>

          <a 
            href="https://wa.me/5521999999999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-dark border-b border-dark/30 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            Dúvidas? Fale conosco no WhatsApp
          </a>
        </div>

        {/* Form */}
        <div className="flex-1 w-full bg-secondary/80 backdrop-blur-xl p-10 rounded-3xl border border-primary shadow-2xl shadow-dark/5">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px] animate-in fade-in zoom-in duration-500">
              <CheckCircle2 size={48} className="text-forest mb-6" />
              <h3 className="font-serif text-3xl text-dark mb-4">Presença Confirmada!</h3>
              <p className="font-sans text-sm text-dark/60">Aguardamos você para celebrar conosco.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-dark/70 mb-2 pl-4">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full bg-primary/50 border border-dark/10 rounded-full px-6 py-4 font-sans text-sm text-dark outline-none focus:border-gold transition-colors"
                  placeholder="Como gostaria de ser chamado?"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-dark/70 mb-2 pl-4">Irá Comparecer?</label>
                <select 
                  value={formData.comparecer}
                  onChange={(e) => setFormData({...formData, comparecer: e.target.value})}
                  className="w-full bg-primary/50 border border-dark/10 rounded-full px-6 py-4 font-sans text-sm text-dark outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  <option value="sim">Sim, com certeza!</option>
                  <option value="nao">Infelizmente não poderei.</option>
                </select>
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-dark/70 mb-2 pl-4">Restrição Alimentar?</label>
                <input 
                  type="text" 
                  value={formData.restricao}
                  onChange={(e) => setFormData({...formData, restricao: e.target.value})}
                  className="w-full bg-primary/50 border border-dark/10 rounded-full px-6 py-4 font-sans text-sm text-dark outline-none focus:border-gold transition-colors"
                  placeholder="Ex: Vegetariano, alergia a frutos do mar"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-dark/70 mb-2 pl-4">Música Sugerida</label>
                <input 
                  type="text" 
                  value={formData.musica}
                  onChange={(e) => setFormData({...formData, musica: e.target.value})}
                  className="w-full bg-primary/50 border border-dark/10 rounded-full px-6 py-4 font-sans text-sm text-dark outline-none focus:border-gold transition-colors"
                  placeholder="Aquela que não pode faltar!"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "submitting"}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-dark text-primary py-4 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span className="animate-pulse">Enviando...</span>
                ) : (
                  <>
                    Confirmar <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
