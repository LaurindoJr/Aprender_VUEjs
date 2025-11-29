<template>
  <div class="paciente-list">
    <h2>Pacientes Cadastrados</h2>
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Buscar paciente por nome ou CPF..." @input="filterPacientes" />
    </div>
    <div v-if="filteredPacientes.length === 0" class="no-pacientes">
      Nenhum paciente cadastrado ainda ou encontrado com o termo de busca.
    </div>
    <div v-else class="pacientes-grid">
      <div v-for="paciente in filteredPacientes" :key="paciente.id" class="paciente-card">
        <h3>{{ paciente.nome }}</h3>
        <p><strong>Email:</strong> {{ paciente.email }}</p>
        <p><strong>Telefone:</strong> {{ paciente.telefone }}</p>
        <p><strong>CPF:</strong> {{ paciente.cpf }}</p>
        <p><strong>Data Nasc.:</strong> {{ formatDate(paciente.dataNascimento) }}</p>
        <p><strong>Endereço:</strong> {{ paciente.endereco }}</p>
        <div class="card-actions">
          <button @click="editPaciente(paciente)" class="btn-edit">Editar</button>
          <button @click="deletePaciente(paciente.id!)" class="btn-delete">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  endereco: string;
}

const emits = defineEmits(['editPaciente']);

const pacientes = ref<Paciente[]>([]);
const filteredPacientes = ref<Paciente[]>([]);
const searchTerm = ref('');

const fetchPacientes = async () => {
  try {
    const response = await axios.get<Paciente[]>(`${API_BASE_URL}/pacientes`);
    pacientes.value = response.data;
    filterPacientes(); // Atualiza a lista filtrada após buscar
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
  }
};

const filterPacientes = () => {
  if (!searchTerm.value) {
    filteredPacientes.value = pacientes.value;
  } else {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    filteredPacientes.value = pacientes.value.filter(paciente =>
      paciente.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
      paciente.cpf.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

const editPaciente = (paciente: Paciente) => {
  emits('editPaciente', paciente);
};

const deletePaciente = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir este paciente?')) {
    try {
      await axios.delete(`${API_BASE_URL}/pacientes/${id}`);
      alert('Paciente excluído com sucesso!');
      fetchPacientes(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      alert('Erro ao excluir paciente. Tente novamente.');
    }
  }
};

onMounted(() => {
  fetchPacientes();
});

watch(pacientes, filterPacientes); // Re-filtra quando a lista de pacientes muda

defineExpose({
  fetchPacientes
});
</script>

<style scoped>
.paciente-list {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

h2 {
  color: #34495e;
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  width: calc(100% - 40px);
  max-width: 500px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
}

.no-pacientes {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}

.pacientes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.paciente-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #fefefe;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.paciente-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.paciente-card p {
  margin-bottom: 8px;
  line-height: 1.5;
}

.paciente-card strong {
  color: #444;
}

.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #f39c12; /* Laranja */
  color: white;
}

.btn-edit:hover {
  background-color: #e67e22;
}

.btn-delete {
  background-color: #e74c3c; /* Vermelho */
  color: white;
}

.btn-delete:hover {
  background-color: #c0392b;
}
</style>
