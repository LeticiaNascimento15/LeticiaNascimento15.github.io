
async function carregarFilmes() {
  try {
    const response = await fetch("https://rafaelescalfoni.github.io/desenv_web/filmes.json");
    const filmes = await response.json();

    console.log(filmes); 
    mostrarFilmes(filmes);

  } catch (error) {
    console.error("Erro ao carregar filmes:", error);
  }
}


function mostrarFilmes(filmes) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  filmes.forEach(filme => {
    
    let faixaClass = "";
    if (filme.classificacao <= 14) faixaClass = "verde";
    else if (filme.classificacao < 18) faixaClass = "amarelo";
    else faixaClass = "vermelho";


    let estrelas = "★".repeat(Math.round(filme.opinioes[0]?.rating || 0));
    let estrelasVazias = "☆".repeat(5 - Math.round(filme.opinioes[0]?.rating || 0));

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${filme.figura}" alt="${filme.titulo}">
      <div class="card-content">
        <h2>${filme.titulo}</h2>
        <span class="faixa ${faixaClass}">${filme.classificacao} anos</span>
        <p>${filme.resumo}</p>
        <p><strong>Gêneros:</strong> ${filme.generos.join(", ")}</p>
        <p><strong>Elenco:</strong> ${filme.elenco.join(", ")}</p>
        <p><strong>Semelhantes:</strong> ${filme.titulosSemelhantes.join(", ")}</p>
        <p class="estrelas">${estrelas}${estrelasVazias}</p>
      </div>
    `;
    catalogo.appendChild(card);
  });
}


carregarFilmes();