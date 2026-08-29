alert("CALCULADORA")
operando1 = prompt("Digite o primeiro numero")
operando2 = prompt("Digite o segundo numero")
operacao = prompt("Digite a operação desejada: +, -, *, /")

if (operacao == "+") {
    resultado = parseFloat(operando1) + parseFloat(operando2)
    alert("O resultado da soma é: " + resultado)
} else if (operacao == "-") {
    resultado = parseFloat(operando1) - parseFloat(operando2)
    alert("O resultado da subtração é: " + resultado)
} else if (operacao == "*") {
    resultado = parseFloat(operando1) * parseFloat(operando2)
    alert("O resultado da multiplicação é: " + resultado)
} else if (operacao == "/") {
    if (parseFloat(operando2) == 0) {
        alert("Erro: Divisão por zero não é permitida.")
    } else {
        resultado = parseFloat(operando1) / parseFloat(operando2)
        alert("O resultado da divisão é: " + resultado)
    }
} else {
    alert("Operação inválida. Por favor, digite +, -, * ou /.")
}
switch (operacao) {
    case "+":
        resultado = parseFloat(operando1) + parseFloat(operando2)
        alert("O resultado da soma é: " + resultado)
        break
    case "-":
        resultado = parseFloat(operando1) - parseFloat(operando2)
        alert("O resultado da subtração é: " + resultado)
        break
    case "*":
        resultado = parseFloat(operando1) * parseFloat(operando2)
        alert("O resultado da multiplicação é: " + resultado)
        break
    case "/":
        if (parseFloat(operando2) == 0) {
            alert("Erro: Divisão por zero não é permitida.")
        } else {
            resultado = parseFloat(operando1) / parseFloat(operando2)
            alert("O resultado da divisão é: " + resultado)
        }
        break
    default:
        alert("Operação inválida. Por favor, digite +, -, * ou /.")
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
{
document.write("<p>Oliver Robert</p>");
    document.write("rgb(204, 115, 115)")
}