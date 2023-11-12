/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllTodos, getTodosByUser } from '../constant/api';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './userContext';

export const TodosContext = createContext({
  todos: [],
  todosByUser: [],
});

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todosByUser, setTodosByUser] = useState([]);
  const navigate = useNavigate();

  const ctx = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    if (ctx.userData == undefined && ctx.userData == null) {
      navigate('/login');
    }
    if (ctx.userData !== undefined && ctx.userData !== null) {
      navigate('/');
    }
  }, [navigate, ctx.userData]);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getAllTodos());
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const fetchTodosByUser = async () => {
      setTodosByUser(await getTodosByUser('654f386d87666723fedbc854'));
    };
    fetchTodosByUser();
  }, [id]);

  return <TodosContext.Provider value={{ todos: todos, todosByUser: todosByUser }}>{children}</TodosContext.Provider>;
};
