<template>
  <PageContainer
    title="Agendamento de Consultas"
    subtitle="Bem-vindo à área de agendamentos da clínica."
  >
    <template #actions>
      <AppButton @click="openNew">Novo Agendamento</AppButton>
    </template>

    <ConsultaList />

    <BaseModal :show="showModal" @close="closeModal">
      <template #header>
        <h2>{{ isEditing ? "Editar Agendamento" : "Novo Agendamento" }}</h2>
      </template>

      <ConsultaForm @formSubmitted="closeModal" />
    </BaseModal>

    <BaseToast
      :show="toast.showToast.value"
      :message="toast.toastMessage.value"
      :type="toast.toastType.value"
    />
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import AppButton from '@/components/common/AppButton.vue'
import ConsultaList from '@/components/ConsultaList.vue'
import ConsultaForm from '@/components/ConsultaForm.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseToast from '@/components/common/BaseToast.vue'
import { useToast } from '@/composables/useToast'
import { useConsultaStore } from '@/stores/consultas.store'

import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'

const toast = useToast()
const consultaStore = useConsultaStore()

const { editingConsulta } = storeToRefs(consultaStore)

const showModal = ref(false)
const isEditing = computed(() => !!editingConsulta.value)

watch(editingConsulta, (value) => (showModal.value = !!value))

function openNew() {
  consultaStore.setEditingConsulta(null)
  showModal.value = true
}

function closeModal() {
  consultaStore.setEditingConsulta(null)
  showModal.value = false
}
</script>

<style scoped>
.search-bar {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

</style>
