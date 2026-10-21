const temperatura = 25;
if(temperatura >= 25) {
   console.log("Está Calor Hoje");
} else if (temperatura >= 18){
   console.log("Está Frio");
} else {
    console.log("Está com temperatura Normal");
}
switch(temperatura) {
   case "calor":
      console.log("Agradavel");
   break;
   case "Frio":
      console.log("Está Frio");
   break;
   case "Temperatura Normal":
      console.log("Está Com Temperatura Normal");
   break;
   default:
}
const numeroParImpar = 8;
const classificado = (numeroParImpar % 2 === 0) ? "par" : "impar";
console.log(classificado);