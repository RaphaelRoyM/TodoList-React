function TodoItem({ todo, index, deleteTodo, toggleComplete }) {
  return (
    <li>

      <span>
        {todo.completed ? "✅" : "❌"}
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(index)}>
        Delete
      </button>

      <button onClick={() => toggleComplete(index)}>
        Mark Completed
      </button>

    </li>
  );
}

export default TodoItem;