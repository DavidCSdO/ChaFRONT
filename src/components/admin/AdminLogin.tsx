"use client";

import { useState } from "react";
import { loginAction } from "@/app/admin/actions";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    const result = await loginAction(password);
    
    if (result.success) {
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/40 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-xl border border-dark/5 relative z-10 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center mb-6">
          <Lock className="text-dark/40" size={24} />
        </div>
        
        <h2 className="font-serif text-3xl text-dark mb-2">Área Restrita</h2>
        <p className="font-sans text-xs uppercase tracking-widest text-dark/40 mb-8">Digite a senha para acessar</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className={`w-full px-4 py-3 bg-secondary/30 rounded-xl font-sans text-center text-dark outline-none border transition-colors pr-12 ${error ? 'border-red-500' : 'border-dark/10 focus:border-gold'}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark/70 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="text-xs text-red-500 font-sans mt-1">Senha incorreta</p>}
          
          <button 
            type="submit"
            disabled={loading || !password}
            className="w-full mt-2 bg-dark text-primary py-4 rounded-xl font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Acessar Painel"}
          </button>
        </form>
      </div>
    </div>
  );
}
