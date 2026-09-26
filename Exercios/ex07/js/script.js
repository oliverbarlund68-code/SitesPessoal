user = { usuarios: [
    {usuario:"Oliver", senha:"123"},
    {usuario:"Roberto", senha:"253"},
    {usuario:"Marcia", senha:"435"}
]
}
users = JSON.parse(localStorage.setItem("users"));
if (users == null) 
    document,write(`<p>Não a usuarios cadastrados</p>`);
else {
    users = JSON.parse(users);
}

for(i=0; i <users.usuarios.length; i++)
    document.write(`<p>${users.usuarios[i].usuario}</p>`);

console.log(users[0]);