import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // To persist todos in local storage, we can use the useEffect hook to save the todos whenever they change and initialize the state from local storage when the component mounts. since we are using database to store the todos, we don't need to use local storage to persist the todos. But if we want to use local storage to persist the todos, we can uncomment the above code and use it in our app.
  // const [todos, setTodos] = useState(() => {
  //   const savedTodos = localStorage.getItem("todos");
  //   return savedTodos ? JSON.parse(savedTodos) : [];
  // });

  //when the todos state changes, we save the updated todos to local storage. This way, even if the user refreshes the page, their todos will still be there.since we are using database to store the todos, we don't need to use local storage to persist the todos. But if we want to use local storage to persist the todos, we can uncomment the above code and use it in our app.
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  async function fetchTodos() {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();
    setTodos(data);
  }

  async function addTodo() {

    if (task.trim() === "") return;//if trim is not used then " " empty space is considered as a task and it will be added to the list of todos



    // setTodos([...todos,
    // {
    //   text: task,
    //   completed: false
    // }
    // ]);

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json"//request body contains json
      },
      body: JSON.stringify({ text: task })//convert js object into json string and send it in the request body
    });
    await fetchTodos();// after adding a new todo, we fetch the updated list of todos from the server 
    setTask("");
  }



  useEffect(() => {
    fetchTodos();
  }, []);// when the component mounts, we fetch the todos from the server and set the todos state with the fetched data. since we are using database to store the todos, we need to fetch the todos from the server when the component mounts. But if we are using local storage to persist the todos, we don't need to fetch the todos from the server when the component mounts. We can just initialize the state from local storage when the component mounts.

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
export default App;