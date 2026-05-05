const API_URL = "https://chaback.onrender.com/api/presentes"

const btn = document.getElementById("dropdownBtn")
const lista = document.getElementById("dropdownLista")
const seta = document.getElementById("seta")

const campoBusca = document.getElementById("buscaPresente")
const btnCompartilhar = document.getElementById("btnCompartilhar")

let todosPresentes = []

/* DROPDOWN */
btn.addEventListener("click", () => {
  lista.classList.toggle("ativo")
  seta.classList.toggle("girar")
})

/* COMPARTILHAR WHATSAPP */
btnCompartilhar.addEventListener("click", () => {
  const url = window.location.href

  const texto = encodeURIComponent(
    "🎁 Confira nossa lista de presentes do chá de panela:\n\n" + url
  )

  window.open(`https://wa.me/?text=${texto}`, "_blank")
})

/* CARREGAR PRESENTES */
async function carregarPresentes() {
  try {
    const res = await fetch(API_URL)

    if (!res.ok) throw new Error("Erro na requisição")

    const data = await res.json()

    todosPresentes = data
    renderizarPresentes(data)

  } catch (e) {
    console.error("Erro ao carregar:", e)
    alert("Erro ao carregar a lista de presentes")
  }
}

/* RENDERIZAR */
function renderizarPresentes(listaPresentes) {

  const ul = document.getElementById("presentes")
  ul.innerHTML = ""

  /* ORDENAR: disponíveis primeiro */
  const ordenados = [...listaPresentes].sort((a, b) => {
    if (a.escolhido === b.escolhido) return 0
    return a.escolhido ? 1 : -1
  })

  const restantes = ordenados.filter(p => !p.escolhido).length
  const total = ordenados.length
  const escolhidos = total - restantes
  const porcentagem = total ? Math.round((escolhidos / total) * 100) : 0

  document.getElementById("textoProgresso").innerText =
    `🎉 ${escolhidos} de ${total} presentes já foram escolhidos`

  document.getElementById("barraInterna").style.width =
    `${porcentagem}%`

  document.getElementById("contadorPresentes").innerText =
    `🎁 ${restantes} presentes ainda disponíveis`

  ordenados.forEach(p => {

    const li = document.createElement("li")
    li.className = "cardPresente"

    if (p.escolhido) {
      li.classList.add("presenteEscolhido")
    }

    /* CORES */
    let coresHTML = ""

    if (p.cores && p.cores.length) {
      coresHTML = `
        <div class="coresSugestao">
          ${p.cores.map(c =>
            `<span class="corItem" style="background:${c}"></span>`
          ).join("")}
        </div>
      `
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
        data-id="${p.id}">
        ${p.escolhido ? "Escolhido" : "Escolher"}
      </button>
    `

    /* EVENTO (melhor que onclick inline) */
    const botao = li.querySelector(".botaoEscolher")

    if (!p.escolhido) {
      botao.addEventListener("click", () => escolher(p.id))
    }

    ul.appendChild(li)
  })
}

/* BUSCA */
campoBusca.addEventListener("input", () => {
  const termo = campoBusca.value.toLowerCase()

  const filtrados = todosPresentes.filter(p =>
    p.nome.toLowerCase().includes(termo)
  )

  renderizarPresentes(filtrados)
})

/* ESCOLHER PRESENTE */
async function escolher(id) {

  const nome = prompt("Digite seu nome")

  if (!nome) return

  try {

    const res = await fetch(`${API_URL}/${id}/escolher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome })
    })

    if (!res.ok) {
      const erro = await res.json()
      throw new Error(erro.erro || "Erro ao escolher presente")
    }

    alert("🎉 Presente reservado com sucesso!")

    await carregarPresentes()

  } catch (e) {
    console.error("Erro ao escolher:", e)
    alert(e.message)
  }
}

/* INICIAR */
carregarPresentes()