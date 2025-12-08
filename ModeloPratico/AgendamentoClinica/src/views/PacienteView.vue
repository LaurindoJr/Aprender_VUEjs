<template>
  <PageContainer
    title="Gestão de Pacientes"
    subtitle="Gerencie os pacientes da clínica aqui."
  >
    <template #actions>
      <AppButton @click="openModal">Cadastrar Paciente</AppButton>
    </template>
    
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
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PacienteForm from '../components/PacienteForm.vue';
import PacienteList from '../components/PacienteList.vue';
import BaseModal from '../components/common/BaseModal.vue';
import BaseToast from '../components/common/BaseToast.vue';
import PageContainer from '@/components/common/PageContainer.vue'; // Importa PageContainer
import AppButton from '@/components/common/AppButton.vue'; // Importa AppButton

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
/* O estilo .paciente-container, .header-container, h1, .add-button não são mais necessários aqui,
   pois PageContainer e AppButton já fornecem o estilo base. */
</style>
