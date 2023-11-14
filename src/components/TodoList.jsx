import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoList() {
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState('');
  const [todoId, setTodoId] = useState('');
  console.log('🚀 ~ file: TodoList.jsx:9 ~ TodoList ~ todoId:', todoId);
  const { todos, handleSubmit, handleEdit, handleDelete, loading } = useContext(TodosContext);

  const handleAddTodo = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };

  const handleEditModal = (id) => {
    setModal(true);
    setTodoId(id);
  };

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleAddTodo}>
        <input className="border border-black" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="border border-black px-2">add</button>
      </form>
      {loading && <div>Loading</div>}
      {!loading && todos?.length === 0 && <div>tidak ada data</div>}
      {!loading &&
        todos?.length > 0 &&
        todos.map((item) => (
          <div key={item._id}>
            <h1 className="bg-neutral-200 p-2">{item.todo}</h1>
            <button onClick={() => handleEditModal(item._id)}>edit</button>
            <button onClick={() => handleDelete(item._id)}>delete</button>
          </div>
        ))}
      {modal && (
        <div className="black border border-black p-2">
          <input className="border border-black" type="text" value={edit} onChange={(e) => setEdit(e.target.value)} />
          <button onClick={() => handleEdit(todoId, edit)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
