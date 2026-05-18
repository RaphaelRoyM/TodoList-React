import { useState } from "react";



function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {
    setTodos([...todos, task]);
    setTask("");
  }

  return (
    <div>
      <h1>
        Todo App
      </h1>
      <input type="text" placeholder="Enter a task" value={task} onChange={(e) => setTask(e.target.value)} />
      <p>{task}</p>

      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {
          todos.map((todos, index) => (
            <li key={index} >{todos}</li>
          ))
        }
      </ul>
    </div>
  )
}
export default App