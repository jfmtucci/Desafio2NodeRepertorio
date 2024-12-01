const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("canciones.json")));
});

app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  canciones.push(cancion);
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("Usuario Agregado Correctamente");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  const index = canciones.findIndex((u) => u.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("Cancion Modificado Correctamente");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("canciones.json"));
  const index = canciones.findIndex((u) => u.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("canciones.json", JSON.stringify(canciones));
  res.send("Usuario Eliminado Correctamente");
});

app.listen(port, console.log(`Servidor Activo en puerto ${port}`));
//{ "id": 1, "cancion": "A dios le pido", "artista": "Juanes", "tono": "Em" }
