import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoList() {
  const [input, setInput] = useState('');

  const { todos, filteredTodo, handleSubmit, handleDelete, loading } = useContext(TodosContext);

  const handleAddTodo = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleAddTodo}>
        <input className="border border-black" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="border border-black px-2">add</button>
      </form>
      {loading && <div>Loading</div>}
      {!loading && filteredTodo.length === 0 && <div>tidak ada data</div>}
      {!loading &&
        filteredTodo.length > 0 &&
        filteredTodo.map((item) => (
          <div key={item._id}>
            <h1 className="bg-neutral-200 p-2">{item.todo}</h1>
            <button onClick={() => handleDelete(item._id)}>delete</button>
          </div>
        ))}
    </div>
  );
}

export default TodoList;
