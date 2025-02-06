import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory todos storage
let todos = [
  {
    id: Date.now().toString(),
    title: "Todo 1",
    isDone: false
  },
  {
    id: Date.now().toString(),
    title: "Todo 2",
    isDone: true
  },
  {
    id: Date.now().toString(),
    title: "Todo 3",
    isDone: false
  },
  {
    id: Date.now().toString(),
    title: "Todo 4",
    isDone: true
  },
  {
    id: Date.now().toString(),
    title: "Todo 5",
    isDone: false
  },
];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get all todos
app.post('/todos', (req, res) => {
  const newTodo = {
    isDone: false,
    ...req.body,
    id: Date.now().toString(),
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = req.params.id.toString();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo non trouvé' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...req.body,
    id
  };

  todos[todoIndex] = updatedTodo;
  res.json(updatedTodo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo non trouvé' });
  }

  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});