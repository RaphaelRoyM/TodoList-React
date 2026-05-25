const express = require('express');// create server application
const cors = require("cors");
const app = express();// create an instance of express application
app.use(cors());// use cors middleware to allow cross-origin requests from the frontend application. This is necessary because the frontend and backend are running on different ports (frontend on port 3000 and backend on port 5000). Without this, the browser will block the requests from the frontend to the backend due to CORS policy.cross-origin resource sharing (CORS)
app.use(express.json());

// we can use an array to store the todos in memory. This is just for demonstration purposes. In a real application, you would use a database to store the todos.
const todos = [
  {
    id: 1,
    text: "Study React",
    completed: false
  },
  {
    id: 2,
    text: "Learn Express",
    completed: true
  }
];

app.get("/todos", (req, res) => {
  res.json(todos);// send the todos as a JSON response. if we use res.send(todos) then it will send the todos as a string and it will not be parsed as a JSON object in the client side. so we need to use res.json(todos) to send the todos as a JSON response.
  //in fronted we can use fetch("/todos") to get the todos from the server and then we can use response.json() to parse the response as a JSON object and then we can use the todos in our app.
});


app.get("/", (req, res) => {
  res.send("Hello World");
});



app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});














url = app.listen(5000, () => {
  console.log("server is running on port 5000");
});// start the server and listen on port 5000

