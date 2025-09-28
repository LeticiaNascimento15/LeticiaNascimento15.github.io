let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const produtosContainer = document.getElementById("produtos");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalElement = document.getElementById("total");
const contador = document.getElementById("contador");
const limparBtn = document.getElementById("limpar");


fetch("itens.json")
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("produto");

      div.innerHTML = `
        <img src="${prod.img}" alt="${prod.nome}">
        <h3>${prod.nome}</h3>
        <p>R$ ${prod.preco.toFixed(2)}</p>
        <button onclick="adicionarCarrinho(${prod.id}, '${prod.nome}', ${prod.preco})">Adicionar</button>
      `;

      produtosContainer.appendChild(div);
    });
  });


function adicionarCarrinho(id, nome, preco) {
  carrinho.push({ id, nome, preco });
  salvarCarrinho();
  renderizarCarrinho();
}


function removerCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderizarCarrinho();
}


limparBtn.addEventListener("click", () => {
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
});


function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function renderizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)}
      <button onclick="removerCarrinho(${index})">X</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalElement.innerText = total.toFixed(2);
  contador.innerText = carrinho.length;
}


renderizarCarrinho();