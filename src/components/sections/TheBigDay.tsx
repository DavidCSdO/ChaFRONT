import { MapPin } from "lucide-react";

export default function TheBigDay() {
  return (
    <section id="o-grande-dia" className="relative w-full min-h-screen bg-primary py-32 px-8 md:px-24 flex flex-col md:flex-row items-center gap-16 md:gap-32">
      
      {/* Text Content */}
      <div className="flex-1 flex flex-col items-start z-10">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-forest mb-6">Celebração</p>
        <h2 className="font-serif text-5xl md:text-7xl text-dark leading-tight mb-12">
          O Grande <span className="italic text-gold">Dia</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-12">
          
          {/* Date Card */}
          <div className="bg-secondary/50 rounded-3xl p-10 md:p-16 border border-dark/5 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-champagne)_0%,_transparent_70%)] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-dark/50 mb-6 relative z-10">Quando</h3>
            <p className="font-serif text-7xl md:text-8xl text-dark mb-4 relative z-10">07</p>
            <p className="font-serif text-4xl text-dark/90 mb-4 relative z-10">Setembro</p>
            <p className="font-sans text-sm tracking-[0.2em] text-dark/70 uppercase relative z-10">Sexta-feira, às 15:30h</p>
          </div>

          {/* Location Card */}
          <div className="bg-dark rounded-3xl p-10 md:p-16 border border-dark flex flex-col justify-center items-center text-center relative overflow-hidden group">
            {/* Dark elegant background texture / glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-forest)_0%,_transparent_70%)] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-primary/50 mb-6 relative z-10">Onde</h3>
            <p className="font-serif text-4xl md:text-5xl text-primary mb-6 relative z-10">Dom Lengruber</p>
            <p className="font-sans text-sm tracking-[0.1em] text-primary/70 leading-loose relative z-10 mb-10">
              Vale dos Esquilos<br />
              R. Pinho da Silva, 2500<br />
              Retiro, Petrópolis - RJ
            </p>
            
            <a 
              href="https://maps.app.goo.gl/uXX5Bv41T8JvR4qVA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 group/btn flex items-center gap-4 bg-primary text-dark px-8 py-4 rounded-full font-sans text-xs tracking-widest uppercase hover:bg-gold hover:text-primary transition-all duration-500"
            >
              <MapPin size={16} className="group-hover/btn:-translate-y-1 transition-transform" />
              Ver no Mapa
            </a>
          </div>

        </div>

        <div className="w-full flex justify-center mt-20 relative">
          <div className="w-full max-w-5xl h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative group">
            <div className="absolute inset-0 bg-dark/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-1000 z-10"></div>
            <iframe 
              src="https://maps.google.com/maps?q=Dom%20Lengruber,%20Vale%20dos%20Esquilos,%20Petr%C3%B3polis&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
