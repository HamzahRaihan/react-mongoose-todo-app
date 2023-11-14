import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { TodosContextProvider } from './context/TodosContext';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <div>
      <div className="h-screen w-full ">
        <UserContextProvider>
          <TodosContextProvider>
            <Navigation />
            <Outlet />
          </TodosContextProvider>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
