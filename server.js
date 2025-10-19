const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const conexion = require("./conexion");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const queryStudent = "SELECT * FROM student WHERE email = ?";
  conexion.query(queryStudent, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length > 0) {
      const student = results[0];
      const match = await bcrypt.compare(password, student.password_hash);

      if (match) {
        return res.json({ role: "student", name: student.nombre });
      } else {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
    }

    const queryDriver = "SELECT * FROM driver WHERE email = ?";
    conexion.query(queryDriver, [email], async (err2, results2) => {
      if (err2) return res.status(500).json({ error: "Error en el servidor" });

      if (results2.length > 0) {
        const driver = results2[0];
        const match = await bcrypt.compare(password, driver.password_hash);

        if (match) {
          return res.json({ role: "driver", name: driver.nombre });
        } else {
          return res.status(401).json({ error: "Contraseña incorrecta" });
        }
      }

      return res.status(404).json({ error: "Usuario no encontrado" });
    });
  });
});


app.post("/signup", async (req, res) => {
  const { email, password, role, nombre, age, phone } = req.body;

  if (!email || !password || !role || !nombre || !age || !phone) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "student") {
    const { university, career } = req.body;
    const query = `
      INSERT INTO student (career, university, nombre, age, email, phone, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(query, [career, university, nombre, age, email, phone, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Estudiante registrado correctamente" });
    });

  } else if (role === "driver") {
    const { type_card, license_number } = req.body;
    const query = `
      INSERT INTO driver (type_card, license_number, nombre, age, email, phone, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conexion.query(query, [type_card, license_number, nombre, age, email, phone, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({ message: "Conductor registrado correctamente" });
    });
  } else {
    return res.status(400).json({ error: "Rol inválido" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

