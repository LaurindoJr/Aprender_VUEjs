import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Medico } from '@/types';
import { getMedicos } from '@/services/medicos.service';

export const useMedicoStore = defineStore('medicos', () => {
  const medicos = ref<Medico[]>([]);

  const fetchMedicos = async () => {
    try {
      medicos.value = await getMedicos();
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  };

  const getMedicoNome = (id: string) => {
    const medico = medicos.value.find((m) => m.id === id);
    return medico ? `${medico.nome} (${medico.especialidade})` : 'Desconhecido';
  };

  return {
    medicos,
    fetchMedicos,
    getMedicoNome,
  };
});
