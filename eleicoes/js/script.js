// 1. Estado inicial da aplicação
const votosIniciais = {
  Lula: 0,
  Flávio: 0,
  Dandara: 0,
  Nulo: 0
};

// 2. Busca os votos no LocalStorage ou retorna o padrão zerado
function obterVotosSalvos() {
  const dados = localStorage.getItem('simulacao_votos');
  return dados ? JSON.parse(dados) : { ...votosIniciais };
}

// 3. Salva o objeto de votos atualizado no LocalStorage
function salvarVotos(votos) {
  localStorage.setItem('simulacao_votos', JSON.stringify(votos));
}

/**
 * 4. Função acionada ao clicar em qualquer botão de voto
 * @param {string} candidato - Nome exato da chave: 'Lula', 'Flávio', 'Dandara' ou 'Nulo'
 */
function votar(candidato) {
  const votos = obterVotosSalvos();

  if (votos.hasOwnProperty(candidato)) {
    votos[candidato]++;
    salvarVotos(votos);
    atualizarApuracao();
  } else {
    console.error("Candidato não encontrado no sistema:", candidato);
  }
}

/**
 * 5. Recalcula o total geral e dispara a atualização de cada candidato no DOM
 */
function atualizarApuracao() {
  const votos = obterVotosSalvos();
  
  // Soma dinâmica do total de votos computados
  const total = votos.Lula + votos.Flávio + votos.Dandara + votos.Nulo;
  
  // Atualiza a exibição do total no HTML
  const elementoTotal = document.getElementById('total-votos');
  if (elementoTotal) {
    elementoTotal.textContent = total;
  }

  // Atualiza as barras e porcentagens individuais
  atualizarCandidato('lula', votos.Lula, total);
  atualizarCandidato('flavio', votos.Flávio, total);
  atualizarCandidato('dandara', votos.Dandara, total);
  atualizarCandidato('nulo', votos.Nulo, total);
}

/**
 * 6. Função auxiliar para calcular porcentagens e alterar o DOM
 */
function atualizarCandidato(id, qtdVotos, total) {
  const porcentagem = total > 0 ? ((qtdVotos / total) * 100).toFixed(1) : 0;

  const elementoTexto = document.getElementById(`votos-${id}`);
  if (elementoTexto) {
    elementoTexto.textContent = `${qtdVotos} votos (${porcentagem}%)`;
  }

  const elementoBarra = document.getElementById(`barra-${id}`);
  if (elementoBarra) {
    elementoBarra.style.width = `${porcentagem}%`;
  }
}

/**
 * 7. Zera a votação e limpa os dados do LocalStorage
 */
function reiniciarVotacao() {
  localStorage.removeItem('simulacao_votos');
  atualizarApuracao();
}

// 8. Carrega a apuração salva no LocalStorage assim que a página é aberta
document.addEventListener('DOMContentLoaded', atualizarApuracao);