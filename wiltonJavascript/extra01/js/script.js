texto = prompt("Digite um texto, Instituto Federal do triangulo Mineiro")

vetor = texto.split(" ")

iniciais = "";
for (i = 0; i < vetor.length; i++) {
    if (vetor[i].length > 2) 
        iniciais += vetor[i].charAt(0)
}
alert(iniciais)