import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { TodosContextProvider } from './context/todosContext';

function App() {
  return (
    <div>
      <div className="h-screen w-full ">
        <UserContextProvider>
          <TodosContextProvider>
            <Outlet />
          </TodosContextProvider>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
