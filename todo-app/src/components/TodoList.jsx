import TodoItem from "./TodoItem";
function TodoList({ todos, deleteTodo, toggleComplete }) {
  return (
    <ul>
      {
        todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))
      }
    </ul>
  );
}
export default TodoList;