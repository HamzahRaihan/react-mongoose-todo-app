import TodoList from '../components/TodoList';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function Todos() {
  const { userData } = useContext(UserContext);

  return (
    <div>
      {userData == null && <div>You have not log in yet</div>}
      <TodoList />
    </div>
  );
}

export default Todos;
