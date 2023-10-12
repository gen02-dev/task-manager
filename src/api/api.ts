import axios from 'axios';
import { API_BASE_URL, TASKS_ENDPOINT } from './endpoints';
import { Task } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchTasks = async () => {
  const response = await api.get(TASKS_ENDPOINT);
  return response.data;
};

export const addTask = async (task: Task) => {
  const response = await api.post(TASKS_ENDPOINT, task);
  return response.data;
};

export const updateTask = async (taskId: string, task: Task) => {
  const response = await api.put(`${TASKS_ENDPOINT}/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  await api.delete(`${TASKS_ENDPOINT}/${taskId}`);
};
