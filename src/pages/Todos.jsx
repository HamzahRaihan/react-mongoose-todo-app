import { Navigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Todos() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData == null && <Navigate to="/login" />}
      <TodoList />
    </div>
  );
}

export default Todos;
