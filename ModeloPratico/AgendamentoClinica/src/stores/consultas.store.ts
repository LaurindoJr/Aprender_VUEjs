import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Consulta } from '@/types';
import { getConsultas, createConsulta, updateConsulta as updateConsultaService, deleteConsulta as deleteConsultaService } from '@/services/consultas.service';

export const useConsultaStore = defineStore('consultas', () => {
  const consultas = ref<Consulta[]>([]);
  const editingConsulta = ref<Consulta | null>(null);

  const fetchConsultas = async () => {
    try {
      consultas.value = await getConsultas();
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  };

  const addConsulta = async (consultaData: Omit<Consulta, 'id'>) => {
    try {
      const novaConsulta = await createConsulta(consultaData);
      consultas.value.push(novaConsulta);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      throw error;
    }
  };

  const updateConsulta = async (id: string, consultaData: Partial<Consulta>) => {
    try {
      const consultaAtualizada = await updateConsultaService(id, consultaData);
      const index = consultas.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        consultas.value[index] = consultaAtualizada;
      }
      editingConsulta.value = null; 
    } catch (error) {
      console.error('Erro ao atualizar consulta:', error);
      throw error;
    }
  };

  const removeConsulta = async (id: string) => {
    try {
      await deleteConsultaService(id);
      consultas.value = consultas.value.filter((c) => c.id !== id);
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      throw error;
    }
  };

  const setEditingConsulta = (consulta: Consulta | null) => {
    editingConsulta.value = consulta;
  };

  return {
    consultas,
    editingConsulta, 
    fetchConsultas,
    addConsulta,
    updateConsulta, 
    removeConsulta,
    setEditingConsulta, 
  };
});
