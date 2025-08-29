const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let tarefas = [];

app.get('/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const novaTarefa = req.body;
  novaTarefa.id = Date.now(); 
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tarefas.length;
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  if (tarefas.length < initialLength) {
    res.status(200).send({ message: "Tarefa removida com sucesso." });
  } else {
    res.status(404).send({ message: "Tarefa não encontrada." });
  }
});

module.exports = app;
