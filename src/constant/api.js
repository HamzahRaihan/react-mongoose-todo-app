import axios from 'axios';

const baseUrl = 'https://express-todo-api-eta.vercel.app';

export const getAllTodos = async () => {
  const response = await axios.get(`${baseUrl}/todos`);
  return response.data.data;
};

export const getTodosByUser = async (id) => {
  const response = await axios.get(`${baseUrl}/todos/${id}`);
  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data.data;
};
