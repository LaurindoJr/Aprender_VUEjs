<template>
  <div class="consulta-form">
    <h2>{{ isEditing ? 'Editar Consulta' : 'Agendar Nova Consulta' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="paciente">Paciente:</label>
        <select id="paciente" v-model="form.pacienteId" required>
          <option value="" disabled>Selecione um paciente</option>
          <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
            {{ paciente.nome }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="medico">Médico:</label>
        <select id="medico" v-model="form.medicoId" required>
          <option value="" disabled>Selecione um médico</option>
          <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
            {{ medico.nome }} ({{ medico.especialidade }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="data">Data:</label>
        <input type="date" id="data" v-model="form.data" required />
      </div>

      <div class="form-group">
        <label for="horario">Horário:</label>
        <input type="time" id="horario" v-model="form.horario" required />
      </div>

      <div class="form-group">
        <label for="motivo">Motivo da Consulta:</label>
        <input type="text" id="motivo" v-model="form.motivo" required />
      </div>

      <div class="form-group">
        <label for="observacoes">Observações (opcional):</label>
        <textarea id="observacoes" v-model="form.observacoes"></textarea>
      </div>

      <div class="form-group" v-if="isEditing">
        <label for="status">Status:</label>
        <select id="status" v-model="form.status" required>
          <option value="AGENDADA">Agendada</option>
          <option value="CONCLUIDA">Concluída</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
      </div>

      <button type="submit">{{ isEditing ? 'Salvar Alterações' : 'Agendar Consulta' }}</button>
      <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-cancel">Cancelar Edição</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useConsultaStore } from '@/stores/consultas.store';
import { usePacienteStore } from '@/stores/pacientes.store';
import { useMedicoStore } from '@/stores/medicos.store';
import type { Consulta } from '@/types';

const consultaStore = useConsultaStore();
const pacienteStore = usePacienteStore();
const medicoStore = useMedicoStore();

const { pacientes } = storeToRefs(pacienteStore);
const { medicos } = storeToRefs(medicoStore);
const { editingConsulta } = storeToRefs(consultaStore); // Importa o estado de edição

const defaultForm: Omit<Consulta, 'id'> = {
  pacienteId: '',
  medicoId: '',
  data: '',
  horario: '', // Adicionado horario
  motivo: '',
  observacoes: '',
  status: 'AGENDADA'
};

const form = ref<Omit<Consulta, 'id'>>(JSON.parse(JSON.stringify(defaultForm)));

const isEditing = computed(() => !!editingConsulta.value);

watchEffect(() => {
  if (editingConsulta.value) {
    // Preenche o formulário com os dados da consulta em edição
    form.value = {
      pacienteId: editingConsulta.value.pacienteId,
      medicoId: editingConsulta.value.medicoId,
      data: editingConsulta.value.data,
      horario: editingConsulta.value.horario,
      motivo: editingConsulta.value.motivo,
      observacoes: editingConsulta.value.observacoes,
      status: editingConsulta.value.status,
    };
  } else {
    // Limpa o formulário se não houver consulta em edição
    form.value = JSON.parse(JSON.stringify(defaultForm));
  }
});

const submitForm = async () => {
  try {
    if (isEditing.value && editingConsulta.value) {
      await consultaStore.updateConsulta(editingConsulta.value.id, form.value);
      alert('Consulta atualizada com sucesso!');
    } else {
      await consultaStore.addConsulta(form.value);
      alert('Consulta agendada com sucesso!');
    }
    resetForm();
  } catch (error) {
    console.error('Erro ao processar consulta:', error);
    alert('Erro ao processar consulta. Verifique os dados e tente novamente.');
  }
};

const cancelEdit = () => {
  consultaStore.setEditingConsulta(null);
  resetForm();
};

const resetForm = () => {
  form.value = JSON.parse(JSON.stringify(defaultForm));
};

onMounted(() => {
  pacienteStore.fetchPacientes();
  medicoStore.fetchMedicos();
});
</script>

<style scoped>
.consulta-form {
  background-color: #f9f9f9;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="datetime-local"],
select,
textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Adicionado para espaçamento entre botões */
}

button:hover {
  background-color: #369f6f;
}

.btn-cancel {
  background-color: #e74c3c; /* Vermelho para cancelar */
}

.btn-cancel:hover {
  background-color: #c0392b;
}
</style>
