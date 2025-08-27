const conexion = require("./conexion");

conexion.query("SELECT * FROM student", (err, results) => {
    if (err) {
        console.error("Error en la consulta:", err);
    } else {
        console.log("Resultados:", results);
    }
    conexion.end(); 
});
