
let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  { id: 1, nome: "Mouse", preco: 59.9, quantidade: 12 },
  { id: 2, nome: "Teclado", preco: 99.9, quantidade: 5 },
  { id: 3, nome: "Monitor", preco: 799.9, quantidade: 2 },
  { id: 4, nome: "Cabo HDMI", preco: 29.9, quantidade: 30 },
  { id: 5, nome: "Pen Drive", preco: 49.9, quantidade: 0 },
  { id: 6, nome: "Webcam", preco: 199.9, quantidade: 4 },
  { id: 7, nome: "SSD 240GB", preco: 299.9, quantidade: 6 },
  { id: 8, nome: "HD Externo", preco: 499.9, quantidade: 3 },
  { id: 9, nome: "Notebook", preco: 3499.9, quantidade: 1 },
  { id: 10, nome: "Suporte de Notebook", preco: 89.9, quantidade: 0 }
];


function atualizarLocalStorage() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}


function listarProdutos() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  lista.innerHTML = "";
  produtos.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nome} - R$${p.preco.toFixed(2)} - Quantidade: ${p.quantidade}`;
    lista.appendChild(item);
  });
}

function mostrarNomes() {
  const nomes = produtos.map(p => p.nome);
  alert("Nomes dos produtos:\n" + nomes.join("\n"));
}

function calcularTotal() {
  const total = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
  alert("Valor total do estoque: R$" + total.toFixed(2));
}

function verificarEsgotados() {
  const esgotado = produtos.some(p => p.quantidade === 0);
  alert(esgotado ? "⚠️ Há produtos esgotados!" : "✅ Todos os produtos têm estoque.");
}

function verificarPrecos() {
  const todosCaros = produtos.every(p => p.preco > 10);
  alert(todosCaros ? "✅ Todos os produtos têm preço justo." : "⚠️ Há produtos com preço muito baixo.");
}

function buscarProduto() {
  const nome = prompt("Digite o nome do produto:");
  if (!nome || nome.trim() === "") {
    alert("Busca cancelada ou nome vazio.");
    return;
  }

  const nomeBusca = nome.trim().toLowerCase();
  const produto = produtos.find(p => p.nome.toLowerCase() === nomeBusca);

  if (produto) {
    alert(`🔍 Produto encontrado:\nNome: ${produto.nome}\nPreço: R$${produto.preco.toFixed(2)}\nQuantidade: ${produto.quantidade}`);
  } else {
    alert("❌ Produto não encontrado.");
  }
}
function adicionarProduto() {
  const nome = prompt("Nome do produto:");
  const preco = parseFloat(prompt("Preço do produto:"));
  const quantidade = parseInt(prompt("Quantidade disponível:"));

  if (!nome || isNaN(preco) || isNaN(quantidade) || preco <= 0 || quantidade < 0) {
    alert("❌ Dados inválidos. Verifique os valores informados.");
    return;
  }

  const id = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
  produtos.push({ id, nome, preco, quantidade });

  atualizarLocalStorage();
  listarProdutos();
  alert("✅ Produto adicionado com sucesso.");
}

function aplicarDesconto() {
  const percentual = parseFloat(prompt("Digite o percentual de desconto (ex: 10 para 10%):"));

  if (isNaN(percentual) || percentual <= 0 || percentual > 100) {
    alert("❌ Percentual inválido.");
    return;
  }

  produtos = produtos.map(p => ({
    ...p,
    preco: +(p.preco * (1 - percentual / 100)).toFixed(2)
  }));

  atualizarLocalStorage();
  listarProdutos();
  alert(`✅ Desconto de ${percentual}% aplicado com sucesso!`);
}

window.onload = () => {
  listarProdutos();
};
