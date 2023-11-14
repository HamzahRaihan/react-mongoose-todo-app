import { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../context/TodosContext';
import { filterTodos } from '../utils/utils';
import Todos from './Todos';

function TodoList() {
  const [input, setInput] = useState('');
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState('');
  const [todoId, setTodoId] = useState('');
  const [tab, setTab] = useState('all');
  const { todos, handleSubmit, handleEdit, handleDelete, loading } = useContext(TodosContext);

  const handleAddTodo = (e) => {
    e.preventDefault();
    handleSubmit(input);
  };

  const handleEditModal = (id) => {
    setModal(true);
    setTodoId(id);
  };

  const handleEditButton = (todoId, edit, complete) => {
    console.log('🚀 ~ file: TodoList.jsx:23 ~ handleEditButton ~ complete:', complete);
    handleEdit(todoId, edit, complete);
    setModal(false);
    setEdit('');
  };

  const buttons = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Complete', value: 'complete' },
  ];

  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  return (
    <div className="p-7">
      <form className="flex gap-2" onSubmit={handleAddTodo}>
        <input className="border border-black" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="border border-black px-2">add</button>
      </form>
      <div className="flex gap-2">
        {buttons.map((btn) => (
          <button className={`${tab == btn.value ? 'font-bold' : ''}`} key={btn.value} value={btn.value} onClick={() => setTab(btn.value)}>
            {btn.name}
          </button>
        ))}
      </div>
      {loading && <div>Loading</div>}
      {!loading && visibleTodos?.length === 0 && <div>tidak ada data</div>}
      {!loading && visibleTodos?.length > 0 && visibleTodos.map((item) => <Todos key={item._id} todos={item} handleEditButton={handleEditButton} handleEditModal={handleEditModal} handleDelete={handleDelete} />)}
      {modal && (
        <div className="black border border-black p-2">
          <input className="border border-black" type="text" value={edit} onChange={(e) => setEdit(e.target.value)} />
          <button onClick={() => handleEditButton(todoId, edit)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
