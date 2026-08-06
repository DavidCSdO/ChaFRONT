"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, UploadCloud, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Polaroid = {
  id: string;
  image_url: string;
  guest_name: string;
  message: string;
  created_at: string;
};

export default function PolaroidWall() {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPolaroids = async () => {
    const { data, error } = await supabase
      .from("polaroids")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPolaroids(data);
    }
  };

  useEffect(() => {
    fetchPolaroids();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !guestName.trim()) return;

    setStatus("uploading");
    
    try {
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('polaroids')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('polaroids')
        .getPublicUrl(filePath);

      // 3. Insert into Database
      const { error: dbError } = await supabase
        .from('polaroids')
        .insert([
          {
            image_url: publicUrl,
            guest_name: guestName.trim(),
            message: message.trim()
          }
        ]);

      if (dbError) throw dbError;

      setStatus("success");
      fetchPolaroids();
      
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus("idle");
        setFile(null);
        setPreviewUrl(null);
        setGuestName("");
        setMessage("");
      }, 2000);

    } catch (error) {
      console.error(error);
      setStatus("error");
      alert("Erro ao enviar foto. Tente novamente.");
    }
  };

  return (
    <section id="polaroids" className="w-full py-32 bg-secondary relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/40 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-forest mb-4">Galeria dos Convidados</p>
            <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight">
              Varal de <br className="hidden md:block" />
              <span className="italic text-gold">Lembranças</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 bg-dark text-primary px-8 py-4 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300"
          >
            <Camera size={16} /> Deixar uma Foto
          </button>
        </div>

        {/* Polaroid Wall (Varal) */}
        <div className="relative w-full min-h-[500px] mt-10">
          
          {/* Clothesline string */}
          <div className="absolute top-10 left-0 right-0 h-[2px] bg-dark/20 w-full z-0" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}></div>
          
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 pt-12 relative z-10">
            {polaroids.map((polaroid, i) => {
              // Random rotation between -6 and +6 degrees
              const rotation = (i % 2 === 0 ? -1 : 1) * ((i % 3) + 2);
              
              return (
                <motion.div
                  key={polaroid.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i % 5) * 0.1 }}
                  className="relative group cursor-pointer"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Pin / Peg */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-8 bg-dark/80 rounded-sm z-20 shadow-md"></div>
                  
                  {/* Polaroid Card */}
                  <div className="bg-white p-4 pb-12 md:pb-16 shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-500 w-[240px] md:w-[280px] origin-top group-hover:-rotate-2 group-hover:scale-105">
                    <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={polaroid.image_url} 
                        alt={polaroid.guest_name}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="font-script text-3xl text-dark">{polaroid.guest_name}</h4>
                      {polaroid.message && (
                        <p className="font-sans text-[11px] text-dark/50 mt-2 uppercase tracking-widest px-2 line-clamp-2">{polaroid.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {polaroids.length === 0 && (
              <div className="w-full text-center py-20 text-dark/40 font-sans text-sm uppercase tracking-widest">
                O varal está vazio. Seja o primeiro a pendurar uma foto!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => status !== "uploading" && setIsModalOpen(false)}
              className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl z-10"
            >
              {status !== "uploading" && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-dark/40 hover:text-dark transition-colors"
                >
                  <X size={20} />
                </button>
              )}

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <CheckCircle2 size={64} className="text-forest mb-4" />
                  <h3 className="font-serif text-3xl text-dark mb-2">Foto Pendurada!</h3>
                  <p className="font-sans text-dark/50 text-sm">Sua lembrança já está no varal.</p>
                </div>
              ) : (
                <form onSubmit={handleUpload} className="flex flex-col gap-5">
                  <h3 className="font-serif text-3xl text-dark mb-2">Pendurar Foto</h3>
                  
                  {/* Image Picker */}
                  <div className="w-full aspect-square border-2 border-dashed border-dark/20 rounded-2xl bg-secondary/30 flex flex-col items-center justify-center relative group overflow-hidden">
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                        <button 
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="absolute top-4 right-4 bg-dark/70 text-white p-2 rounded-full hover:bg-red-500 transition-colors z-20"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors z-10"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud size={32} className="text-dark/40 mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-sans text-xs uppercase tracking-widest text-dark/50">Tocar para escolher foto</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>

                  <div>
                    <input 
                      type="text" 
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Seu Nome"
                      className="w-full bg-secondary/50 border border-dark/10 rounded-xl px-4 py-3 font-sans text-sm text-dark outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  
                  <div>
                    <input 
                      type="text" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mensagem curta (opcional)"
                      maxLength={60}
                      className="w-full bg-secondary/50 border border-dark/10 rounded-xl px-4 py-3 font-sans text-sm text-dark outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={!file || !guestName.trim() || status === "uploading"}
                    className="mt-2 w-full flex items-center justify-center gap-3 bg-dark text-primary py-4 rounded-xl font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors disabled:opacity-50"
                  >
                    {status === "uploading" ? "Enviando..." : "Adicionar ao Varal"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
