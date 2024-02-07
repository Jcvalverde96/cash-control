let mysql = require("mysql");


let conexion = mysql.createConnection({
    host: "localhost",
    database: "CashControl",
    user: "jcval",
    password: "Carletesjc96"
})

conexion.connect(function(err){
    if(err){
        throw err;
    } else {
        console.log("Conexion exitosa");
    }
});


conexion.end();
