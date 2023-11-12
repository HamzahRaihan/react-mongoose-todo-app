import axios from 'axios';
import { token_user } from './key';

const baseUrl = 'https://express-todo-api-eta.vercel.app';

export const getAllTodos = async () => {
  const response = await axios.get(`${baseUrl}/todos`);
  return response.data.data;
};

export const getTodosByUser = async (id) => {
  const response = await axios.get(`${baseUrl}/todos/${id}`);
  return response.data.data;
};

export const login = async (user) => {
  const response = await axios.post(`${baseUrl}/users/auth`, user);
  localStorage.setItem(token_user, response.data.token);
};
