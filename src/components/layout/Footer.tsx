import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-dark text-primary py-32 px-8 flex flex-col items-center overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col items-center relative z-10 w-full max-w-3xl">
        
        <div className="w-full max-w-[200px] md:max-w-[300px] mb-12 opacity-80 hover:opacity-100 transition-opacity duration-500 invert">
          <Image 
            src="/Group 1.png" 
            alt="Julia & David" 
            width={400} 
            height={200} 
            className="w-full h-auto object-contain"
          />
        </div>

        <h2 className="font-serif text-3xl md:text-5xl mb-6 text-center">
          Obrigado por fazer parte <br className="hidden md:block"/> da nossa história
        </h2>
        
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary/50 mb-16 text-center">
          07 de Setembro
        </p>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full font-sans text-xs text-primary/30 tracking-widest uppercase gap-4">
          <p>
            Desenvolvido com <span className="text-gold">♥</span>
          </p>
          <p>
            Processos e visuais criados por <span className="text-primary/70">David Cardoso</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
