const form = document.getElementById("form");
const lista = document.querySelector(".lista");
const elemento = JSON.parse(localStorage.getItem("item")) || [];

elemento.forEach((element) => {
  criarLi(element);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const produto = event.target.elements["produto"];
  const quantidade = event.target.elements["quantidade"];
  const existe = elemento.find(encontrar => encontrar.produto === produto.value);

  const arrayItens = {
    'produto': produto.value,
    'quantidade': quantidade.value,
  };

  if (existe) {
    arrayItens.id = existe.id;

    atualizarElementos(arrayItens);
    elemento[elemento.findIndex(element => element.id === existe.id)] =
      arrayItens;
  } else {
    arrayItens.id = elemento[elemento.length - 1]
      ? elemento[elemento.length - 1].id + 1
      : 0;

    criarLi(arrayItens);

    elemento.push(arrayItens);
  }

  localStorage.setItem("item", JSON.stringify(elemento));

  limparLista(produto, quantidade);
});

// Para criar a LI com todos os formatos

function criarLi(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("itemDaLista");
  const strong = document.createElement("strong");

  strong.innerHTML = item.quantidade;
  novoItem.dataset.id = item.id;

  novoItem.appendChild(strong);

  novoItem.innerHTML += item.produto;
  lista.appendChild(novoItem);
}

//limpar os inputs e deixar o foco no próximo produto
function limparLista(produto, quantidade) {
  produto.value = "";
  quantidade.value = "";
  produto.focus();
  window.location.reload();
}

//Limpar a lista completa
const clear = document.getElementById("limpar");

clear.addEventListener("click", (limpar) => {
  localStorage.clear();
  window.location.reload();
});

//atualizar a quantidade de itens
function totalItens(quantidadee) {
  const total = document.querySelector(".p");
  total.innerHTML = quantidadee;
}
totalItens(elemento.length);

//atualizar o ID dos itens
function atualizarElementos(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

