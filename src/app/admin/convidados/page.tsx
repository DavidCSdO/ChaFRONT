import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable caching so it always fetches fresh data

export default async function AdminConvidados() {
  const { data: rsvps, error } = await supabase
    .from("rsvp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 font-sans mt-20">
        Erro ao carregar confirmações: {error.message}. <br/>
        Você já rodou o script SQL no Supabase?
      </div>
    );
  }

  const confirmedCount = rsvps?.filter(r => r.comparecer).length || 0;
  const declinedCount = rsvps?.filter(r => !r.comparecer).length || 0;

  return (
    <div className="min-h-screen bg-secondary p-8 md:p-16 pt-32 md:pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl text-dark mb-4">
          Painel de <span className="italic text-gold">Convidados</span>
        </h1>
        <p className="font-sans text-dark/60 mb-10">
          Visualize aqui todas as confirmações de presença do seu evento.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-dark/5">
            <p className="font-sans text-xs tracking-widest uppercase text-dark/40 mb-2">Total de Respostas</p>
            <p className="font-serif text-4xl text-dark">{rsvps?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-dark/5">
            <p className="font-sans text-xs tracking-widest uppercase text-forest mb-2">Confirmados</p>
            <p className="font-serif text-4xl text-forest">{confirmedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-dark/5">
            <p className="font-sans text-xs tracking-widest uppercase text-red-800/50 mb-2">Não irão comparecer</p>
            <p className="font-serif text-4xl text-red-800/80">{declinedCount}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-dark/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
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
