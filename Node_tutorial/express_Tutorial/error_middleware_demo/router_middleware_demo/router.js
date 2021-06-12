const express = require('express');

const router = express.Router();

app.get("/", async (req, res) => {
  try {
    const db = await getDB();
    res.status(200).json(db.todos);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }

  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err.message
  //     });
  //   }
  //   const db = JSON.parse(data);
  //   res.status(200).json(db.todos);
  // });
});

app.get("/:id", async (req, res) => {
  try {
    const db = await getDB();
    const todo = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );
    if (!todo) {
      res.status(404).end();
    } else {
      res.status(200).json(todo);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }

  // fs.readFile('./db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err.message
  //     });
  //   }
  //   const db = JSON.parse(data);
  //   const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id));
  //   if (!todo) {
  //     res.status(404).end();
  //   } else {
  //     res.status(200).json(todo);
  //   }
  // });
});

app.post("/", async (req, res) => {
  try {
    // 1. get req.body
    const todo = req.body;
    // 2. validate data
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field "title" is required!',
      });
    }
    // 3. store data into db
    const db = await getDB();
    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    await saveDB(db);
    // 4. send response
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.patch('/:id', async (req, res) => {
  try {
    // 1. get req.body
    const todo = req.body;
    // 2. search db
    const db = await getDB();
    const result = db.todos.find(todo => todo.id === Number.parseInt(req.params.id));
    if (!result) {
      return res.status(404).end();
    }
    // 3. validate data
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field "title" is required!',
      });
    }
    // 4. update database
    Object.assign(result, todo);
    await saveDB(db);
    // 5. return response
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const todoId = Number.parseInt(req.params.id);
    const db = getDB();
    db.todos.findIndex(todo => todo.id === todoId);
    if (index === -1) {
      return res.status(404).end();
    }
    db.todos.splice(index, 1);
    await saveDB(db);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;