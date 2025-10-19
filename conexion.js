const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sh01@2024",
    database: "UniVan_SHDM"
});

conexion.connect((err) => {
    if (err) throw err;
    console.log("Conexión exitosa");
});

module.exports = conexion;
