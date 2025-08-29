const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let tarefas = [];

// Endpoint para buscar todas as tarefas
app.get('/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

// Endpoint para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
  const novaTarefa = req.body;
  novaTarefa.id = Date.now(); 
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Endpoint para remover uma tarefa por ID
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

// Exporta o app para o Vercel
module.exports = app;