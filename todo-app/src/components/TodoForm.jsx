function TodoForm({ task, setTask, addTodo }) {//passing props from App.jsx to TodoForm.jsx(parent to child)
  return (
    <div>
      <input type="text" placeholder="Enter a task" value={task} onChange={(e) => setTask(e.target.value)} />
      <p>{task}</p>

      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
export default TodoForm;