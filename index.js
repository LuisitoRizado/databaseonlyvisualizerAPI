const express = require("express");
const { Parser } = require("node-sql-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

const parser = new Parser();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/process", (req, res) => {
  try {
    const { sqlSentence } = req.body;

    if (!sqlSentence)
      return res.status(400).json({ error: "Sentencia SQL es requerida" });

    const sqlJSON = parser.astify(sqlSentence);

    return res.json(sqlJSON);
  } catch (error) {
    return res.status(400).json({
      error: "Error al procesar la sentencia SQL",
      details: error.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor ejecutándose en el puerto ${PORT}`)
);
