function TodoItem({ todo, index, deleteTodo, toggleComplete }) {
  console.log(todo);
  return (
    <li>

      <span>
        {todo.completed ? "✅" : "❌"}
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>

      <button onClick={() => toggleComplete(todo.id)}>
        Mark Completed
      </button>

    </li>
  );
}

export default TodoItem;