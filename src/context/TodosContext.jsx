/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getAllTodos } from '../constant/api';
import axios from 'axios';
import { ACCOUNT_KEY, token_user } from '../constant/key';

export const TodosContext = createContext({
  todos: [],
  loading: true,
  filteredTodo: [],
  handleSubmit: async () => {},
  handleDelete: async () => {},
});

export const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTodo, setFilteredTodo] = useState([]);

  const token = localStorage.getItem(token_user);
  const id = JSON.parse(localStorage.getItem(ACCOUNT_KEY));

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getAllTodos());
    };
    fetchTodos();
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
    const filtered = todos.filter((f) => f.userId._id === id.id);
    setFilteredTodo(filtered);
  }, [todos]);

  const handleSubmit = async (todo) => {
    const { data } = await axios.post(
      'https://express-todo-api-eta.vercel.app/todos',
      { todo: todo, isComplete: false, userId: id.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFilteredTodo([...filteredTodo, data.addTodos]);
  };

  const handleDelete = async (id) => {
    const deleteTodo = filteredTodo.filter((item) => item._id !== id);
    await axios.delete(`https://express-todo-api-eta.vercel.app/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFilteredTodo(deleteTodo);
  };

  return <TodosContext.Provider value={{ todos, filteredTodo, handleSubmit, loading, handleDelete }}>{children}</TodosContext.Provider>;
};
