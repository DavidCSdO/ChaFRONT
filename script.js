const API = "https://chaback-production.up.railway.app/api"

const btn = document.getElementById("dropdownBtn")
const lista = document.getElementById("dropdownLista")
const seta = document.getElementById("seta")

const campoBusca = document.getElementById("buscaPresente")
const btnCompartilhar = document.getElementById("btnCompartilhar")

let todosPresentes = []

btn.addEventListener("click", () => {

lista.classList.toggle("ativo")
seta.classList.toggle("girar")

})

/* COMPARTILHAR NO WHATSAPP */

btnCompartilhar.addEventListener("click", () => {

const url = window.location.href

const texto = encodeURIComponent(
"🎁 Confira nossa lista de presentes do chá de panela:\n\n" + url
)

window.open(`https://wa.me/?text=${texto}`, "_blank")

})

async function carregarPresentes(){

const res = await fetch(`${API}/presentes`)
const data = await res.json()

todosPresentes = data

renderizarPresentes(data)

}

function renderizarPresentes(listaPresentes){

const ul = document.getElementById("presentes")
ul.innerHTML = ""

/* ORDENAR DISPONÍVEIS PRIMEIRO */

listaPresentes.sort((a,b)=>{

if(a.escolhido === b.escolhido) return 0

return a.escolhido ? 1 : -1

})

const restantes = listaPresentes.filter(p => !p.escolhido).length
const total = listaPresentes.length

const escolhidos = total - restantes

const porcentagem = Math.round((escolhidos / total) * 100)

document.getElementById("textoProgresso").innerText =
`🎉 ${escolhidos} de ${total} presentes já foram escolhidos`

document.getElementById("barraInterna").style.width =
`${porcentagem}%`

document.getElementById("contadorPresentes").innerText =
`🎁 ${restantes} presentes ainda disponíveis`

listaPresentes.forEach(p=>{

const li = document.createElement("li")
li.className = "cardPresente"

if(p.escolhido){
li.classList.add("presenteEscolhido")
}

li.innerHTML = `

<div class="infoPresente">

<span class="icone">🎁</span>

<span class="nomePresente">
${p.nome}
${p.escolhido ? `<small> — escolhido por ${p.escolhido_por}</small>` : ""}
</span>

</div>

<button class="botaoEscolher"
${p.escolhido ? "disabled" : ""}
onclick="escolher(${p.id})">

${p.escolhido ? "Escolhido" : "Escolher"}

</button>

`

ul.appendChild(li)

})

}

/* BUSCA EM TEMPO REAL */

campoBusca.addEventListener("input", () => {

const termo = campoBusca.value.toLowerCase()

const filtrados = todosPresentes.filter(p =>
p.nome.toLowerCase().includes(termo)
)

renderizarPresentes(filtrados)

})

async function escolher(id){

const nome = prompt("Digite seu nome")

if(!nome) return

await fetch(`${API}/presentes/${id}/escolher`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({nome})

})

carregarPresentes()

}

carregarPresentes()