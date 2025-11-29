<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/pacientes">Pacientes</router-link></li>
        <li><router-link to="/medicos">Médicos</router-link></li>
        <li><router-link to="/agendamento">Agendamentos</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar {
  grid-area: sidebar;
  background-color: #f8f9fa;
  padding: 1rem;
  border-right: 1px solid #ddd;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  color: #007bff;
}
</style>
