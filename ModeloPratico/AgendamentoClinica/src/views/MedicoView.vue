<template>
  <PageContainer
    title="Gestão de Médicos"
    subtitle="Gerencie os médicos da clínica aqui."
  >
    <template #actions>
      <AppButton @click="openModal">Cadastrar Médico</AppButton>
    </template>
    
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
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MedicoForm from '../components/MedicoForm.vue';
import MedicoList from '../components/MedicoList.vue';
import BaseModal from '../components/common/BaseModal.vue';
import BaseToast from '../components/common/BaseToast.vue';
import PageContainer from '@/components/common/PageContainer.vue'; // Importa PageContainer
import AppButton from '@/components/common/AppButton.vue'; // Importa AppButton

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
/* O estilo .medico-container, .header-container, h1, .add-button não são mais necessários aqui,
   pois PageContainer e AppButton já fornecem o estilo base. */
</style>
