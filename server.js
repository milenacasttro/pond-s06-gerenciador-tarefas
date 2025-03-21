const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, testConnection } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para listar todas as tarefas
app.get('/api/tarefas', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tarefas ORDER BY data_criacao DESC');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// API para criar uma nova tarefa
app.post('/api/tarefas', async (req, res) => {
  try {
    const { titulo, descricao, data_limite, prioridade } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ error: 'O título é obrigatório' });
    }
    
    const query = `
      INSERT INTO tarefas (titulo, descricao, data_limite, prioridade)
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [titulo, descricao, data_limite, prioridade]);
    
    const novaTarefa = {
      id: result.insertId,
      titulo,
      descricao,
      data_limite,
      prioridade,
      concluida: false,
      data_criacao: new Date()
    };
    
    res.status(201).json(novaTarefa);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

// Iniciar o servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await testConnection();
});
