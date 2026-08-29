document.write("<p>Oliver Robert</p>")
var Nome = window.prompt("Digite o nome da disciplina")
if (Nome == "Sistemas para Internet") {
    window.alert("Parabéns, você acertou o nome da disciplina!")
} else {
    window.alert("Você errou o nome da disciplina. Tente novamente.")
}
for (var i = 0; i < 5; i++) {
    var idade = window.prompt("Digite sua idade")
    if (idade < 0 || idade > 120) {
        window.alert("Idade inválida. Por favor, digite uma idade entre 0 e 120.")
    } else {
        window.alert("Idade válida: " + idade)
        break
    }
}