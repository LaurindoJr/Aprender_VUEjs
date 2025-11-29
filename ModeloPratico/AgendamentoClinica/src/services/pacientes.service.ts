import apiClient from './api';
import type { Paciente } from '@/types';

export const getPacientes = async (): Promise<Paciente[]> => {
  const response = await apiClient.get<Paciente[]>('/pacientes');
  return response.data;
};
