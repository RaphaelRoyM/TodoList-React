import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


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
      return todo;
    });
    setTodos(updatedTodos);
  }
  return (
    <div>
      <h1>
        Todo App
      </h1>

      <TodoForm
        task={task}
        setTask={setTask}
        addTodo={addTodo}
      />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  )
}
export default App
//hello