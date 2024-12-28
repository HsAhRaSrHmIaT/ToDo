import axios from 'axios';

const TODO_API_BASE_URL = "http://localhost:8000/api/todos/";

export const getTodos = async () => {
    const response = await axios.get(TODO_API_BASE_URL);
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(TODO_API_BASE_URL, todo);
    return response.data;
};

export const updateTodo = async (id, todo) => {
    const response = await axios.patch(`${TODO_API_BASE_URL}${id}/`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${TODO_API_BASE_URL}${id}/`);
};