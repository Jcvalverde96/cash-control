// Importar la libreria
const express = require("express");

//Objetos para llamar a los metodos de express
const app = express();

//Ruta inicial
app.get("/", function(req, res){
    res.send("Hola chavales");
});

// Configurar el puerto usado para el servidor local
app.listen(3000, function () {
    console.log("El servidor es http://localhost:3000")
});


