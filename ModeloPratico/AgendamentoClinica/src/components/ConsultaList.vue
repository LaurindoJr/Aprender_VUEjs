<template>
  <div class="consulta-list">
    <h2>Consultas Agendadas</h2>
    <div v-if="consultas.length === 0" class="no-consultas">
      Nenhuma consulta agendada ainda.
    </div>
    <div v-else class="consultas-grid">
      <div v-for="consulta in consultas" :key="consulta.id" class="consulta-card">
        <h3>Consulta ID: {{ consulta.id }}</h3>
        <p><strong>Paciente:</strong> {{ getPacienteNome(consulta.pacienteId) }}</p>
        <p><strong>Médico:</strong> {{ getMedicoNome(consulta.medicoId) }}</p>
        <p><strong>Data:</strong> {{ formatDateTime(consulta.data) }}</p>
        <p><strong>Motivo:</strong> {{ consulta.motivo }}</p>
        <p v-if="consulta.observacoes"><strong>Observações:</strong> {{ consulta.observacoes }}</p>
        <p><strong>Status:</strong> <span :class="['status', consulta.status.toLowerCase()]">{{ consulta.status }}</span></p>
        <div class="card-actions">
          <button @click="editConsulta(consulta)" class="btn-edit">Editar</button>
          <button @click="deleteConsulta(consulta.id)" class="btn-delete">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useConsultaStore } from '@/stores/consultas.store';
import { usePacienteStore } from '@/stores/pacientes.store';
import { useMedicoStore } from '@/stores/medicos.store';
import type { Consulta } from '@/types';

const consultaStore = useConsultaStore();
const pacienteStore = usePacienteStore();
const medicoStore = useMedicoStore();

const { consultas } = storeToRefs(consultaStore);
const { getPacienteNome } = pacienteStore;
const { getMedicoNome } = medicoStore;

const formatDateTime = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString('pt-BR', options);
};

const editConsulta = (consulta: Consulta) => {
  consultaStore.setEditingConsulta(consulta);
};

const deleteConsulta = async (id: string) => {
  if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
    try {
      await consultaStore.removeConsulta(id);
      alert('Consulta cancelada com sucesso!');
    } catch {
      alert('Erro ao cancelar consulta. Tente novamente.');
    }
  }
};

onMounted(() => {
  pacienteStore.fetchPacientes();
  medicoStore.fetchMedicos();
  consultaStore.fetchConsultas();
});
</script>

<style scoped>
.consulta-list {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

h2 {
  color: #34495e;
  text-align: center;
  margin-bottom: 20px;
}

.no-consultas {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}

.consultas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.consulta-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #fefefe;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.consulta-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.consulta-card p {
  margin-bottom: 8px;
  line-height: 1.5;
}

.consulta-card strong {
  color: #444;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  font-size: 0.9em;
}

.status.agendada {
  background-color: #3498db; /* Azul */
}

.status.concluida {
  background-color: #27ae60; /* Verde */
}

.status.cancelada {
  background-color: #e74c3c; /* Vermelho */
}

.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #f39c12; /* Laranja */
  color: white;
}

.btn-edit:hover {
  background-color: #e67e22;
}

.btn-delete {
  background-color: #e74c3c; /* Vermelho */
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}
</style>
