import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Paciente } from '@/types';
import { getPacientes } from '@/services/pacientes.service';

export const usePacienteStore = defineStore('pacientes', () => {
  const pacientes = ref<Paciente[]>([]);

  const fetchPacientes = async () => {
    try {
      pacientes.value = await getPacientes();
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  const getPacienteNome = (id: string) => {
    const paciente = pacientes.value.find((p) => p.id === id);
    return paciente ? paciente.nome : 'Desconhecido';
  };

  return {
    pacientes,
    fetchPacientes,
    getPacienteNome,
  };
});
