<template>
  <div class="paciente-container">
    <div class="header-container">
      <h1>Gestão de Pacientes</h1>
      <button @click="openModal" class="add-button">Cadastrar Paciente</button>
    </div>
    <p>Gerencie os pacientes da clínica aqui.</p>
    
    <PacienteList ref="pacienteListRef" @editPaciente="startEditPaciente" />

    <BaseModal :show="showModal" @close="closeModal">
      <template #header>
        <h2>{{ selectedPaciente ? 'Editar Paciente' : 'Cadastrar Paciente' }}</h2>
      </template>
      <template #default>
        <PacienteForm :initial-paciente="selectedPaciente" @pacienteSaved="handlePacienteSaved" @cancelEdit="closeModal" />
      </template>
       <template #footer>
        <div></div>
      </template>
    </BaseModal>

    <BaseToast :show="showToast" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PacienteForm from '../components/PacienteForm.vue';
import PacienteList from '../components/PacienteList.vue';
import BaseModal from '../components/common/BaseModal.vue';
import BaseToast from '../components/common/BaseToast.vue';

interface Paciente {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  endereco: string;
}

const pacienteListRef = ref<InstanceType<typeof PacienteList> | null>(null);
const selectedPaciente = ref<Paciente | null>(null);
const showModal = ref(false);

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const openModal = () => {
  selectedPaciente.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPaciente.value = null;
};

const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handlePacienteSaved = () => {
  closeModal();
  triggerToast('Cadastro efetuado com sucesso!');
  if (pacienteListRef.value) {
    pacienteListRef.value.fetchPacientes();
  }
};

const startEditPaciente = (paciente: Paciente) => {
  selectedPaciente.value = paciente;
  showModal.value = true;
};
</script>

<style scoped>
.paciente-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: #2c3e50;
}

.add-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.add-button:hover {
  background-color: #36a374;
}
</style>
