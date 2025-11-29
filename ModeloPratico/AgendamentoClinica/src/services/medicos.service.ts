import apiClient from './api';
import type { Medico } from '@/types';

export const getMedicos = async (): Promise<Medico[]> => {
  const response = await apiClient.get<Medico[]>('/medicos');
  return response.data;
};
