import axios from 'axios';
import queryString from 'query-string';
import { TaskSummaryInterface, TaskSummaryGetQueryInterface } from 'interfaces/task-summary';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTaskSummaries = async (
  query?: TaskSummaryGetQueryInterface,
): Promise<PaginatedInterface<TaskSummaryInterface>> => {
  const response = await axios.get('/api/task-summaries', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTaskSummary = async (taskSummary: TaskSummaryInterface) => {
  const response = await axios.post('/api/task-summaries', taskSummary);
  return response.data;
};

export const updateTaskSummaryById = async (id: string, taskSummary: TaskSummaryInterface) => {
  const response = await axios.put(`/api/task-summaries/${id}`, taskSummary);
  return response.data;
};

export const getTaskSummaryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/task-summaries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTaskSummaryById = async (id: string) => {
  const response = await axios.delete(`/api/task-summaries/${id}`);
  return response.data;
};
