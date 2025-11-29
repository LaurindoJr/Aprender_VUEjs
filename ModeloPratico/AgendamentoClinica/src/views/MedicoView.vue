<template>
  <div class="medico-container">
    <div class="header-container">
      <h1>Gestão de Médicos</h1>
      <button @click="openModal" class="add-button">Cadastrar Médico</button>
    </div>
    <p>Gerencie os médicos da clínica aqui.</p>
    
    <MedicoList ref="medicoListRef" @editMedico="startEditMedico" />

    <BaseModal :show="showModal" @close="closeModal">
      <template #header>
        <h2>{{ selectedMedico ? 'Editar Médico' : 'Cadastrar Médico' }}</h2>
      </template>
      <template #default>
        <MedicoForm :initial-medico="selectedMedico" @medicoSaved="handleMedicoSaved" @cancelEdit="closeModal" />
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
import MedicoForm from '../components/MedicoForm.vue';
import MedicoList from '../components/MedicoList.vue';
import BaseModal from '../components/common/BaseModal.vue';
import BaseToast from '../components/common/BaseToast.vue';

interface Medico {
  id?: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
}

const medicoListRef = ref<InstanceType<typeof MedicoList> | null>(null);
const selectedMedico = ref<Medico | null>(null);
const showModal = ref(false);

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const openModal = () => {
  selectedMedico.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedMedico.value = null;
};

const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const handleMedicoSaved = () => {
  closeModal();
  triggerToast('Cadastro efetuado com sucesso!');
  if (medicoListRef.value) {
    medicoListRef.value.fetchMedicos();
  }
};

const startEditMedico = (medico: Medico) => {
  selectedMedico.value = medico;
  showModal.value = true;
};
</script>

<style scoped>
.medico-container {
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
