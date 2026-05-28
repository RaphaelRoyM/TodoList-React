const express = require('express');// create server application
const cors = require("cors");
const app = express();// create an instance of express application
app.use(cors());// use cors middleware to allow cross-origin requests from the frontend application. This is necessary because the frontend and backend are running on different ports (frontend on port 3000 and backend on port 5000). Without this, the browser will block the requests from the frontend to the backend due to CORS policy.cross-origin resource sharing (CORS)
app.use(express.json());
const db = require("./db");

// we can use an array to store the todos in memory. This is just for demonstration purposes. In a real application, you would use a database to store the todos.


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/todos", (req, res) => {
  // res.json(todos);// send the todos as a JSON response. if we use res.send(todos) then it will send the todos as a string and it will not be parsed as a JSON object in the client side. so we need to use res.json(todos) to send the todos as a JSON response.
  // //in fronted we can use fetch("/todos") to get the todos from the server and then we can use response.json() to parse the response as a JSON object and then we can use the todos in our app.

  const sql = "SELECT * FROM todos";
  db.query(sql, (err, result) => {
    if (err) {
      // console.log("Error fetching todos from database");
      console.log(err);
      res.status(500).json({
        error: "Failed to fetch todos from database"
      });
    }
    res.json(result);
  });
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  const sql = `INSERT INTO todos (text,completed) VALUES (?,?)`;
  db.query(sql, [text, false], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to add todo to database"
      });
      return;
    }
    res.json({
      message: "Todo added successfully",
      todoId: result.insertId
    });
  });
});


app.delete("/todos/:id", (req, res) => {//:id is dynamic parameter . we use req.params.id to use it.

  const todoId = parseInt(req.params.id);

  const sql = "DELETE FROM todos WHERE id = ?";
  db.query(sql, [todoId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to delete todo from database"
      });
      return;
    }
    res.json({
      message: "Todo deleted successfully"
    });
  });
});


app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const sql = `UPDATE todos SET completed = NOT completed WHERE id=?`;
  db.query(sql, [todoId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update todo in database"
      });
      return;
    }
    res.json({
      message: "Todo updated successfully"
    });
  });
});


url = app.listen(5000, () => {
  console.log("server is running on port 5000");
});// start the server and listen on port 5000