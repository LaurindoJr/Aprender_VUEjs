<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'success', // success, error, warning
    validator: (value: string) => ['success', 'error', 'warning'].includes(value),
  },
});

const validatedType = computed(() => {
  const validTypes = ['success', 'error', 'warning'];
  return validTypes.includes(props.type) ? props.type : 'success';
});
</script>

<template>
  <div v-if="show" class="toast-container" :class="validatedType">
    {{ message }}
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  z-index: 2000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.success {
  background-color: #42b983; /* Verde do Vue */
}

.error {
  background-color: #e74c3c; /* Vermelho */
}

.warning {
  background-color: #f39c12; /* Amarelo */
}
</style>
