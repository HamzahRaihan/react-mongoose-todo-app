/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { getTodosByUser } from '../constant/api';
import axios from 'axios';
import { token_user } from '../constant/key';
import { UserContext } from './UserContext';

export const TodosContext = createContext({
  todos: [],
  loading: true,
  filteredTodo: [],
  handleSubmit: async () => {},
  handleDelete: async () => {},
  handleEdit: async () => {},
});

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem(token_user);

  const { id } = useContext(UserContext);

  useEffect(() => {
    const getTodos = async () => {
      setTodos(await getTodosByUser(id));
    };
    getTodos();
    setLoading(false);
  }, [id]);

  const handleSubmit = async (todo, fileUrl) => {
    const { data } = await axios.post(
      'https://express-todo-api-eta.vercel.app/todos',
      { todo: todo, isComplete: false, userId: id, fileUrl: fileUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos([...todos, data.addTodos]);
    setLoading(false);
  };

  const handleEdit = async (id, todo, isChecked) => {
    setLoading(true);
    const index = todos.findIndex((item) => item._id == id);
    console.log('🚀 ~ file: TodosContext.jsx:46 ~ handleEdit ~ id:', id);
    await axios.put(
      `https://express-todo-api-eta.vercel.app/todos/${id}`,
      {
        todo: todo,
        isComplete: isChecked,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedTodos = [...todos];

    updatedTodos[index] = { ...updatedTodos[index], todo: todo, isComplete: isChecked };

    setTodos(updatedTodos);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const deleteTodo = todos.filter((item) => item._id !== id);
    await axios.delete(`https://express-todo-api-eta.vercel.app/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodos(deleteTodo);
    setLoading(false);
  };

  return <TodosContext.Provider value={{ todos, handleEdit, handleSubmit, loading, handleDelete }}>{children}</TodosContext.Provider>;
};
