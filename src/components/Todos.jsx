/* eslint-disable react/prop-types */
function Todos({ todos, handleEditButton, handleEditModal, handleDelete }) {
  return (
    <div className="flex bg-neutral-200 p-2 gap-3">
      <span>
        <input type="checkbox" checked={todos.isComplete} onChange={(e) => handleEditButton(todos._id, todos.todo, e.target.checked)} />
      </span>
      <h1 className={`${!todos.isComplete ? '' : 'line-through'}`}>{todos.todo}</h1>
      <button className="border border-black px-2" onClick={() => handleEditModal(todos._id)}>
        edit
      </button>
      <button className="border border-black px-2" onClick={() => handleDelete(todos._id)}>
        delete
      </button>
    </div>
  );
}

export default Todos;
