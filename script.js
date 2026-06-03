// ─── CONFIGURAÇÃO SUPABASE ────────────────────────────────
const SUPABASE_URL = "https://hrbbadmjkrvkuctzdnqi.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyYmJhZG1qa3J2a3VjdHpkbnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NTgxNjUsImV4cCI6MjA5NjAzNDE2NX0.2-svdDf-SBjpE_D__26DF0wDmwnzQV0OyLMTDdfWlMI"
const headers = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
}

const API = `${SUPABASE_URL}/rest/v1/presentes`

// ─── ELEMENTOS ───────────────────────────────────────────
const btn             = document.getElementById("dropdownBtn")
const lista           = document.getElementById("dropdownLista")
const seta            = document.getElementById("seta")
const campoBusca      = document.getElementById("buscaPresente")
const btnCompartilhar = document.getElementById("btnCompartilhar")

let todosPresentes = []

// ─── DROPDOWN ────────────────────────────────────────────
btn.addEventListener("click", () => {
  lista.classList.toggle("ativo")
  seta.classList.toggle("girar")
})

// ─── COMPARTILHAR WHATSAPP ────────────────────────────────
btnCompartilhar.addEventListener("click", () => {
  const url   = window.location.href
  const texto = encodeURIComponent(
    "🎁 Confira nossa lista de presentes do chá de panela:\n\n" + url
  )
  window.open(`https://wa.me/?text=${texto}`, "_blank")
})

// ─── CARREGAR PRESENTES ───────────────────────────────────
async function carregarPresentes() {
  try {
    const res  = await fetch(`${API}?order=id`, { headers })
    const data = await res.json()

    todosPresentes = data
    renderizarPresentes(data)

  } catch (e) {
    console.error(e)
    alert("Erro ao carregar a lista de presentes")
  }
}

// ─── RENDERIZAR ───────────────────────────────────────────
function renderizarPresentes(listaPresentes) {
  const ul = document.getElementById("presentes")
  ul.innerHTML = ""

  // disponíveis primeiro
  listaPresentes.sort((a, b) => {
    if (a.escolhido === b.escolhido) return 0
    return a.escolhido ? 1 : -1
  })

  const total     = listaPresentes.length
  const escolhidos = listaPresentes.filter(p => p.escolhido).length
  const restantes  = total - escolhidos
  const porcentagem = Math.round((escolhidos / total) * 100)

  document.getElementById("textoProgresso").innerText =
    `🎉 ${escolhidos} de ${total} presentes já foram escolhidos`

  document.getElementById("barraInterna").style.width = `${porcentagem}%`

  document.getElementById("contadorPresentes").innerText =
    `🎁 ${restantes} presentes ainda disponíveis`

  listaPresentes.forEach(p => {
    const li = document.createElement("li")
    li.className = "cardPresente"

    if (p.escolhido) li.classList.add("presenteEscolhido")

    let coresHTML = ""
    if (p.cores && p.cores.length) {
      coresHTML = `
        <div class="coresSugestao">
          ${p.cores.map(c =>
            `<span class="corItem" style="background:${c}"></span>`
          ).join("")}
        </div>`
    }

    li.innerHTML = `
      <div class="infoPresente">
        <span class="icone">🎁</span>
        <div class="nomePresente">
          ${p.nome}
          ${coresHTML}
          ${p.escolhido ? `<small> — escolhido por ${p.escolhido_por}</small>` : ""}
        </div>
      </div>
      <button class="botaoEscolher"
        ${p.escolhido ? "disabled" : ""}
        onclick="escolher(${p.id})">
        ${p.escolhido ? "Escolhido" : "Escolher"}
      </button>`

    ul.appendChild(li)
  })
}

// ─── BUSCA ────────────────────────────────────────────────
campoBusca.addEventListener("input", () => {
  const termo    = campoBusca.value.toLowerCase()
  const filtrados = todosPresentes.filter(p =>
    p.nome.toLowerCase().includes(termo)
  )
  renderizarPresentes(filtrados)
})

// ─── ESCOLHER PRESENTE ────────────────────────────────────
async function escolher(id) {
  const nome = prompt("Digite seu nome")
  if (!nome || nome.trim() === "") return

  // UPDATE só funciona se escolhido = false (proteção contra corrida)
  const res = await fetch(
    `${API}?id=eq.${id}&escolhido=eq.false`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Prefer": "return=representation"   // retorna a linha atualizada
      },
      body: JSON.stringify({
        escolhido: true,
        escolhido_por: nome.trim()
      })
    }
  )

  const data = await res.json()

  if (!res.ok || data.length === 0) {
    alert("Este presente já foi escolhido por outra pessoa 😕")
  } else {
    alert("🎉 Presente reservado com sucesso!")
  }

  carregarPresentes()
}

// ─── INIT ─────────────────────────────────────────────────
carregarPresentes()