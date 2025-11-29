<template>
  <div class="agendamento-container">
    <div class="header-container">
      <h1>Agendamento de Consultas</h1>
      <button @click="openFormForNewConsulta" class="add-button">Cadastrar Agendamento</button>
    </div>
    <p>Bem-vindo à página de agendamento de consultas da clínica.</p>
    
    <ConsultaList />

    <BaseModal :show="showModal" @close="closeModal">
      <template #header>
        <h2>{{ isEditing ? 'Editar Agendamento' : 'Cadastrar Agendamento' }}</h2>
      </template>
      <template #default>
        <ConsultaForm />
      </template>
       <template #footer>
        <div></div>
      </template>
    </BaseModal>

    <BaseToast :show="showToast" :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import ConsultaForm from '../components/ConsultaForm.vue';
import ConsultaList from '../components/ConsultaList.vue';
import BaseModal from '../components/common/BaseModal.vue';
import BaseToast from '../components/common/BaseToast.vue';
import { useConsultaStore } from '@/stores/consultas.store';

const consultaStore = useConsultaStore();
const { editingConsulta } = storeToRefs(consultaStore);

const showModal = ref(false);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const isEditing = computed(() => !!editingConsulta.value);

// Observa o estado de editingConsulta para abrir/fechar o modal
watch(editingConsulta, (newValue) => {
  showModal.value = !!newValue;
});

const openFormForNewConsulta = () => {
  consultaStore.setEditingConsulta(null); // Garante que o formulário esteja limpo para nova consulta
  showModal.value = true;
};

const closeModal = () => {
  consultaStore.setEditingConsulta(null); // Limpa o estado de edição ao fechar o modal
  showModal.value = false;
};

</script>

<style scoped>
.agendamento-container {
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
