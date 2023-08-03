import axios from 'axios';
import queryString from 'query-string';
import { CostInterface, CostGetQueryInterface } from 'interfaces/cost';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCosts = async (query?: CostGetQueryInterface): Promise<PaginatedInterface<CostInterface>> => {
  const response = await axios.get('/api/costs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCost = async (cost: CostInterface) => {
  const response = await axios.post('/api/costs', cost);
  return response.data;
};

export const updateCostById = async (id: string, cost: CostInterface) => {
  const response = await axios.put(`/api/costs/${id}`, cost);
  return response.data;
};

export const getCostById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/costs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCostById = async (id: string) => {
  const response = await axios.delete(`/api/costs/${id}`);
  return response.data;
};
