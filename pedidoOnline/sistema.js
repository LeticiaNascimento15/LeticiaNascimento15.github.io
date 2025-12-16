(() => {
  const formPedido = document.getElementById("formPedido");
  const inputCliente = document.getElementById("cliente");
  const inputItem = document.getElementById("item");
  const inputValor = document.getElementById("valor");
  const saida = document.getElementById("saida");

  const btnListar = document.getElementById("btnListar");
  const btnTotal = document.getElementById("btnTotal");
  const btnBuscar = document.getElementById("btnBuscar");

  
  let pedidos = [];

 

 
  const validarPedido = ({ cliente, item, valor }) => {
    if (!cliente || !item || valor <= 0) {
      throw new Error("Preencha todos os campos corretamente.");
    }
  };

 
  const adicionarPedido = (pedido) => {
    pedidos = [...pedidos, pedido];
  };

 
  const listarPedidos = () => {
    if (pedidos.length === 0) {
      saida.innerHTML = "<p>Nenhum pedido cadastrado.</p>";
      return;
    }

    const lista = pedidos
      .map(
        ({ cliente, item, valor }) =>
          <p><strong>${cliente}</strong> - ${item} (R$ ${valor.toFixed(2)})</p>
      )
      .join("");

    saida.innerHTML = lista;
  };

 
  const calcularTotal = () => {
    const total = pedidos.reduce((soma, { valor }) => soma + valor, 0);
    saida.innerHTML = `<p><strong>Total de vendas:</strong> R$ ${total.toFixed(
      2
    )}</p>`;
  };

 
  const buscarPorCliente = (nomeCliente) => {
    const resultados = pedidos.filter(
      ({ cliente }) =>
        cliente.toLowerCase() === nomeCliente.toLowerCase()
    );

    if (resultados.length === 0) {
      saida.innerHTML = "<p>Nenhum pedido encontrado.</p>";
      return;
    }

    saida.innerHTML = resultados
      .map(
        ({ item, valor }) =>
          <p>${item} - R$ ${valor.toFixed(2)}</p>
      )
      .join("");
  };

 
  const enviarParaServidor = async (pedido) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pedido),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar pedido.");
      }

      await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

 
 
  formPedido.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const pedido = {
        cliente: inputCliente.value.trim(),
        item: inputItem.value.trim(),
        valor: Number(inputValor.value),
      };

      validarPedido(pedido);
      adicionarPedido(pedido);
      await enviarParaServidor(pedido);

      formPedido.reset();
      saida.innerHTML = "<p>Pedido adicionado com sucesso!</p>";
    } catch (error) {
      saida.innerHTML = <p style="color:red;">${error.message}</p>;
    }
  });

  btnListar.addEventListener("click", listarPedidos);
  btnTotal.addEventListener("click", calcularTotal);

  btnBuscar.addEventListener("click", () => {
    const nome = prompt("Digite o nome do cliente:");
    if (nome) {
      buscarPorCliente(nome);
    }
  });
})();