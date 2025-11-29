import apiClient from './api';
import type { Consulta } from '@/types';

export const getConsultas = async (): Promise<Consulta[]> => {
  const response = await apiClient.get<Consulta[]>('/consultas');
  return response.data;
};

export const createConsulta = async (consultaData: Omit<Consulta, 'id'>): Promise<Consulta> => {
  const response = await apiClient.post<Consulta>('/consultas', consultaData);
  return response.data;
};

export const updateConsulta = async (id: string, consultaData: Partial<Consulta>): Promise<Consulta> => {
  const response = await apiClient.put<Consulta>(`/consultas/${id}`, consultaData);
  return response.data;
};

export const deleteConsulta = async (id: string): Promise<void> => {
  await apiClient.delete(`/consultas/${id}`);
};
