import { useState } from "react";



function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {

    if (task.trim() === "") return;//if trim is not used then " " empty space is considered as a task and it will be added to the list of todos
    setTodos([...todos,
    {
      text: task,
      completed: false
    }
    ]);
    setTask("");
  }

  function deleteTodo(indexToDelete) {
    const updatedTodos = todos.filter((todo, index) => {//why splice is not used because splice mutates the original array and filter returns a new array without mutating the original array
      return index !== indexToDelete;
    });
    setTodos(updatedTodos);
  }

  function toggleComplete(indexToToggle) {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
    });
    setTodos(updatedTodos);
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
          todos.map((todo, index) => (
            <li key={index} >
              <span>
                {
                  todo.completed ? "✅" : "❌"
                }
                {todo.text}
              </span>

              <button onClick={() => deleteTodo(index)}>
                Delete
              </button>
              <button onClick={() => toggleComplete(index)}>
                Mark Completed
              </button>

            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default App