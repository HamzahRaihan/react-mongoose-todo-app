import axios from 'axios';

const baseUrl = 'https://express-todo-api-eta.vercel.app';

export const getAllTodos = async () => {
  const response = await axios.get(`${baseUrl}/todos`);
  return response.data.data;
};

export const getTodosByID = async (id) => {
  const response = await axios.get(`${baseUrl}/todos/${id}`);
  return response.data.data;
};

export const getTodosByUser = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/users/${id}/todos`);
    return response.data.data;
  } catch (error) {
    console.log('You have not log in yet');
  }
};

export const register = async (name, email, password) => {
  const { data } = await axios.post(`${baseUrl}/users`, {
    name: name,
    email: email,
    password: password,
  });
  return data.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`);
  return response.data.data;
};
