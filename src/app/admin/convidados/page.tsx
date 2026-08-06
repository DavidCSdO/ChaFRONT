import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import AdminLogin from "@/components/admin/AdminLogin";
import { Users, Gift, Image as ImageIcon, MessageSquare, Eye } from "lucide-react";

export const revalidate = 0; // Disable caching so it always fetches fresh data

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "casamento2026";

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch all stats in parallel
  const [
    { data: rsvps, error: rsvpError },
    { count: giftsCount },
    { count: polaroidsCount },
    { count: messagesCount },
    { count: pageViewsCount }
  ] = await Promise.all([
    supabase.from("rsvp").select("*").order("created_at", { ascending: false }),
    supabase.from("presentes").select('*', { count: 'exact', head: true }).eq('escolhido', true),
    supabase.from("polaroids").select('*', { count: 'exact', head: true }),
    supabase.from("mensagens").select('*', { count: 'exact', head: true }),
    supabase.from("page_views").select('*', { count: 'exact', head: true })
  ]);

  if (rsvpError) {
    return (
      <div className="p-8 text-center text-red-500 font-sans mt-20">
        Erro ao carregar banco de dados. <br/>
        Você já rodou o script SQL no Supabase?
      </div>
    );
  }

  const confirmedCount = rsvps?.filter(r => r.comparecer).length || 0;
  const declinedCount = rsvps?.filter(r => !r.comparecer).length || 0;

  return (
    <div className="min-h-screen bg-secondary p-8 md:p-16 pt-32 md:pt-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-dark mb-4">
          Centro de <span className="italic text-gold">Controle</span>
        </h1>
        <p className="font-sans text-dark/60 mb-10">
          Visão geral de tudo que está acontecendo no seu site de casamento.
        </p>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-dark/5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
              <Users size={20} className="text-dark/60" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-1">Confirmados</p>
              <p className="font-serif text-3xl text-forest">{confirmedCount}</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-dark/5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
              <Gift size={20} className="text-dark/60" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-1">Presentes</p>
              <p className="font-serif text-3xl text-dark">{giftsCount || 0}</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-dark/5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
              <ImageIcon size={20} className="text-dark/60" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-1">Fotos</p>
              <p className="font-serif text-3xl text-dark">{polaroidsCount || 0}</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-dark/5 flex flex-col justify-between">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={20} className="text-dark/60" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-1">Mensagens</p>
              <p className="font-serif text-3xl text-dark">{messagesCount || 0}</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-dark/5 flex flex-col justify-between col-span-2 md:col-span-1">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
              <Eye size={20} className="text-dark/60" />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-dark/40 mb-1">Acessos</p>
              <p className="font-serif text-3xl text-dark">{pageViewsCount || 0}</p>
            </div>
          </div>

        </div>

        {/* Table RSVP */}
        <h2 className="font-serif text-2xl text-dark mb-4">Lista de RSVP ({rsvps?.length || 0})</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-dark/5 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm whitespace-nowrap">
              <thead className="bg-primary/30 border-b border-dark/5 text-xs uppercase tracking-widest text-dark/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Nome</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Restrição Alimentar</th>
                  <th className="px-6 py-4 font-medium">Música Sugerida</th>
                  <th className="px-6 py-4 font-medium">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark/5">
                {rsvps?.map((rsvp) => (
                  <tr key={rsvp.id} className="hover:bg-primary/10 transition-colors">
                    <td className="px-6 py-4 text-dark font-medium">{rsvp.nome}</td>
                    <td className="px-6 py-4">
                      {rsvp.comparecer ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Confirmado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Ausente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-dark/70">{rsvp.restricao_alimentar || "-"}</td>
                    <td className="px-6 py-4 text-dark/70">{rsvp.musica || "-"}</td>
                    <td className="px-6 py-4 text-dark/40 text-xs">
                      {new Date(rsvp.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
                {rsvps?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-dark/40 font-medium">
                      Nenhuma confirmação recebida ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
