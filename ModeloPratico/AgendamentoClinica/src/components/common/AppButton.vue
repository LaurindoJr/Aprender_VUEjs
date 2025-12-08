<template>
  <button
    class="app-btn"
    :class="[variant]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  variant: { type: String, default: 'primary' },
  disabled: Boolean,
});
</script>

<style scoped>
.app-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: 0.2s;
}

.primary {
  background: #42b883;
  color: #fff;
}

.primary:hover {
  background: #369f6b;
}

.secondary {
  background: #e8e8e8;
  color: #333;
}

.secondary:hover {
  background: #dcdcdc;
}

.app-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
