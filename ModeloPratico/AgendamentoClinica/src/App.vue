<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>

<template>
  <div class="app-container">
    <TheNavbar class="navbar-area" />
    <TheSidebar class="sidebar-area" />
    <TheHeader class="header-area" />
    <main class="main-content">
      <RouterView />
    </main>
    <TheFooter class="footer-area" />
  </div>
</template>

<style scoped>
.app-container {
  display: grid;
  grid-template-areas:
    'navbar navbar'
    'sidebar header'
    'sidebar main'
    'sidebar footer';
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;
}

.navbar-area {
  grid-area: navbar;
}

.sidebar-area {
  grid-area: sidebar;
}

.header-area {
  grid-area: header;
}

.main-content {
  grid-area: main;
  padding: 2rem;
  background-color: #f0f2f5;
}

.footer-area {
  grid-area: footer;
}
</style>
