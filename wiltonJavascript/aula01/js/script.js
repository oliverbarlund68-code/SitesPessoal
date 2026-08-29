nome = "oliver robert"
alert("Olá, " + nome + "! Bem-vindo ao nosso site.")
console.log("O nome do usuário é: " + nome)
var IFTM = "Instituto Federal do Triângulo Mineiro"
for (var i = 0; i < IFTM.length; i++) {
    if (IFTM.charAt(i) === " ") {
        console.log("Letra na posição " + i + ": (espaço)")
    } else {
        if (IFTM.charAt(i) === "a" || IFTM.charAt(i) === "e" || IFTM.charAt(i) === "i" || IFTM.charAt(i) === "o" || IFTM.charAt(i) === "u") {
            console.log("Letra na posição " + i + ": " + IFTM.charAt(i) + " (vogal)")
        } else {
            console.log("Letra na posição " + i + ": " + IFTM.charAt(i) + " (consoante)")
        }
        console.log("Letra na posição " + i + ": " + IFTM.charAt(i))
}
    console.log("Letra na posição " + i + ": " + IFTM.charAt(i))
}
    //Exibe a primeira parte do nome
    nome = "oliver robert"
    nomeParticionado = nome.split(" ")
    console.log("Primeira parte do nome: " + nomeParticionado[0])
    console.log("Segunda parte do nome: " + nomeParticionado[1])
    //Exibe o primeiro nome em letras maiúsculas
    console.log("Primeira parte do nome em maiúsculas: " + nomeParticionado[0].toUpperCase())
    //Exibe o segundo nome em letras minúsculas
    console.log("Segunda parte do nome em minúsculas: " + nomeParticionado[1].toLowerCase())

    nome = prompt("Digite seu nome completo: ")
    alert("Olá, " + nome + "! Bem-vindo ao nosso site.")
    console.log("O nome do usuário é: " + nome)
    nomeParticionado = nome.split(" ")
    console.log("Primeira parte do nome: " + nomeParticionado[0])
    console.log("Última parte do nome: " + nomeParticionado[nomeParticionado.length - 1])
    //Solicita ao usuario que digite seu nome para colocar no console
    nome = prompt("Digite seu nome completo: ")
    console.log("O nome do usuário é: " + nome)
    //exibe o numero de caracteres do nome digitado pelo usuário
    console.log("O número de caracteres do nome digitado é: " + nome.length)