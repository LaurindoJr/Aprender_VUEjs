<template>
  <div class="page-container">
    <div class="page-header">
      <h1>{{ title }}</h1>
      <slot name="actions"></slot>
    </div>

    <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
});
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 30px;
}

.page-header {
  color: black;   
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtitle {
  color: black;
  margin-bottom: 20px;
}

.content {
  color: black;
  margin-top: 20px;
}
</style>
