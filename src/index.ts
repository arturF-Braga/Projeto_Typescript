// 1. Modelagem dos dados
interface Jogo {
  id: number;
  titulo: string;
  categoria: string;
  preco: number;
  disponivel: boolean;
}

let jogos: Jogo[] = [
  { id: 1, titulo: "The Witcher 3", categoria: "RPG", preco: 129.9, disponivel: true },
  { id: 2, titulo: "Elden Ring", categoria: "RPG", preco: 249.9, disponivel: false },
  { id: 3, titulo: "minecraft", categoria: "Aventura", preco: 99.9, disponivel: true }
];
//captura dos elementos do DOM
const formJogo = document.getElementById("form-jogo") as HTMLFormElement;
const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const selectCategoria = document.getElementById("categoria") as HTMLSelectElement;
const inputPreco = document.getElementById("preco") as HTMLInputElement;
const checkboxDisponivel = document.getElementById("disponivel") as HTMLInputElement;

const inputBusca = document.getElementById("busca") as HTMLInputElement;
const selectFiltroCategoria = document.getElementById("filtro-categoria") as HTMLSelectElement;

const listaJogosContainer = document.getElementById("lista-jogos") as HTMLDivElement;
const totalJogosEl = document.getElementById("total-jogos") as HTMLElement;
const totalDisponiveisEl = document.getElementById("total-disponiveis") as HTMLElement;
const totalEsgotadosEl = document.getElementById("total-esgotados") as HTMLElement;

//renderização da lista de jogos
function renderizar(): void {
  const termoBusca = inputBusca.value.toLowerCase();
  const categoriaFiltro = selectFiltroCategoria.value;

//filtragem
  const jogosFiltrados = jogos.filter((jogo) => {
    const combinaTitulo = jogo.titulo.toLowerCase().includes(termoBusca);
    const combinaCategoria = categoriaFiltro === "Todas" || jogo.categoria === categoriaFiltro;
    return combinaTitulo && combinaCategoria;
  });

  listaJogosContainer.innerHTML = "";

  if (jogosFiltrados.length === 0) {
    listaJogosContainer.innerHTML = "<p>Nenhum jogo encontrado no catálogo.</p>";
  } else {
    jogosFiltrados.forEach((jogo) => {
      const card = document.createElement("div");
      card.className = "card-jogo";
      card.innerHTML = `
        <h3>${jogo.titulo}</h3>
        <p><strong>Categoria:</strong> ${jogo.categoria}</p>
        <p><strong>Preço:</strong> R$ ${jogo.preco.toFixed(2)}</p>
        <p><strong>Status:</strong> ${jogo.disponivel ? "Disponível" : "Esgotado"}</p>
        <button class="btn-status">${jogo.disponivel ? "Marcar Esgotado" : "Marcar Disponível"}</button>
        <button class="btn-remover">Remover</button>
      `;

//alternar estado
      const btnStatus = card.querySelector(".btn-status") as HTMLButtonElement;
      btnStatus.addEventListener("click", () => alternarEstado(jogo.id));

//evento de remover
      const btnRemover = card.querySelector(".btn-remover") as HTMLButtonElement;
      btnRemover.addEventListener("click", () => removerJogo(jogo.id));

      listaJogosContainer.appendChild(card);
    });
  }

  atualizarResumo();
}

//atualização do total
function atualizarResumo(): void {
  const total = jogos.length;
  const disponiveis = jogos.filter((j) => j.disponivel).length;
  const esgotados = total - disponiveis;

  totalJogosEl.textContent = total.toString();
  totalDisponiveisEl.textContent = disponiveis.toString();
  totalEsgotadosEl.textContent = esgotados.toString();
}

//cadastro de novos itens com validação
formJogo.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const titulo = inputTitulo.value.trim();
  const categoria = selectCategoria.value;
  const preco = parseFloat(inputPreco.value);
  const disponivel = checkboxDisponivel.checked;

  if (!titulo || isNaN(preco) || preco <= 0) {
    alert("Por favor, preencha o título e informe um preço válido maior que zero.");
    return;
  }

  const novoJogo: Jogo = {
    id: Date.now(),
    titulo,
    categoria,
    preco,
    disponivel
  };

  jogos.push(novoJogo);
  formJogo.reset();
  renderizar();
});

//funções de alternar estado e remover jogo
function alternarEstado(id: number): void {
  jogos = jogos.map((j) => (j.id === id ? { ...j, disponivel: !j.disponivel } : j));
  renderizar();
}

function removerJogo(id: number): void {
  jogos = jogos.filter((j) => j.id !== id);
  renderizar();
}

//eventos de busca e filtro
inputBusca.addEventListener("input", renderizar);
selectFiltroCategoria.addEventListener("change", renderizar);

// Inicialização
renderizar();