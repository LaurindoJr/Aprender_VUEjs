import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Consulta } from '@/types';
import { getConsultas, createConsulta, updateConsulta as updateConsultaService, deleteConsulta as deleteConsultaService } from '@/services/consultas.service';

export const useConsultaStore = defineStore('consultas', () => {
  const consultas = ref<Consulta[]>([]);
  const editingConsulta = ref<Consulta | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Função auxiliar para encapsular a lógica de carregamento e erro
  const executeAsyncOperation = async (operation: () => Promise<void>, errorMessage: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      await operation();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : errorMessage;
      console.error(errorMessage, err);
      throw err; // Re-lança o erro para que os componentes possam tratá-lo se necessário
    } finally {
      isLoading.value = false;
    }
  };

  const fetchConsultas = async () => {
    await executeAsyncOperation(async () => {
      consultas.value = await getConsultas();
    }, 'Erro ao buscar consultas');
  };

  const addConsulta = async (consultaData: Omit<Consulta, 'id'>) => {
    await executeAsyncOperation(async () => {
      const novaConsulta = await createConsulta(consultaData);
      consultas.value.push(novaConsulta);
    }, 'Erro ao agendar consulta');
  };

  const updateConsulta = async (id: string, consultaData: Partial<Consulta>) => {
    await executeAsyncOperation(async () => {
      const consultaAtualizada = await updateConsultaService(id, consultaData);
      const index = consultas.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        consultas.value[index] = consultaAtualizada;
      }
      editingConsulta.value = null;
    }, 'Erro ao atualizar consulta');
  };

  const removeConsulta = async (id: string) => {
    await executeAsyncOperation(async () => {
      await deleteConsultaService(id);
      consultas.value = consultas.value.filter((c) => c.id !== id);
    }, 'Erro ao cancelar consulta');
  };

  const setEditingConsulta = (consulta: Consulta | null) => {
    editingConsulta.value = consulta;
  };

  return {
    consultas,
    editingConsulta,
    isLoading,
    error,
    fetchConsultas,
    addConsulta,
    updateConsulta,
    removeConsulta,
    setEditingConsulta,
  };
});
