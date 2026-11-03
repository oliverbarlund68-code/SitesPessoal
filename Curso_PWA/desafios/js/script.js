// Aguarda o HTML carregar completamente antes de rodar o código
document.getElementById('btnCalcular').addEventListener('click', function() {
    
    // Captura os valores digitados nos inputs e converte para números decimais
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const divResultado = document.getElementById('resultado');

    // Valida se os campos foram preenchidos corretamente
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        divResultado.innerHTML = "Por favor, preencha todas as notas.";
        divResultado.style.color = "red";
        return;
    }

    // Calcula a média aritmética
    const media = (nota1 + nota2 + nota3) / 3;

    // Define a situação do aluno
    let situacao = "";
    let cor = "";

    if (media >= 7.0) {
        situacao = "Aprovado!";
        cor = "green";
    } else if (media >= 5.0) {
        situacao = "Recuperação!";
        cor = "orange";
    } else {
        situacao = "Reprovado!";
        cor = "red";
    }

    // Exibe o resultado na tela com a cor correspondente
    divResultado.innerHTML = `Média: ${media.toFixed(2)}<br><span style="color: ${cor}">${situacao}</span>`;
});
