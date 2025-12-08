<template>
  <div class="medico-list">
    <h2>Médicos Cadastrados</h2>
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Buscar médico por nome, especialidade ou CRM..." @input="filterMedicos" />
    </div>
    <div v-if="filteredMedicos.length === 0" class="no-medicos">
      Nenhum médico cadastrado ainda ou encontrado com o termo de busca.
    </div>
    <div v-else class="medicos-grid">
      <div v-for="medico in filteredMedicos" :key="medico.id" class="medico-card">
        <h3>{{ medico.nome }}</h3>
        <p><strong>Especialidade:</strong> {{ medico.especialidade }}</p>
        <p><strong>CRM:</strong> {{ medico.crm }}</p>
        <p><strong>Email:</strong> {{ medico.email }}</p>
        <p><strong>Telefone:</strong> {{ medico.telefone }}</p>
        <div class="card-actions">
          <button @click="editMedico(medico)" class="btn-edit">Editar</button>
          <button @click="deleteMedico(medico.id!)" class="btn-delete">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
}

const emits = defineEmits(['editMedico']);

const medicos = ref<Medico[]>([]);
const filteredMedicos = ref<Medico[]>([]);
const searchTerm = ref('');

const fetchMedicos = async () => {
  try {
    const response = await axios.get<Medico[]>(`${API_BASE_URL}/medicos`);
    medicos.value = response.data;
    filterMedicos(); // Atualiza a lista filtrada após buscar
  } catch (error) {
    console.error('Erro ao buscar médicos:', error);
  }
};

const filterMedicos = () => {
  if (!searchTerm.value) {
    filteredMedicos.value = medicos.value;
  } else {
    const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
    filteredMedicos.value = medicos.value.filter(medico =>
      medico.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
      medico.especialidade.toLowerCase().includes(lowerCaseSearchTerm) ||
      medico.crm.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
};

const editMedico = (medico: Medico) => {
  emits('editMedico', medico);
};

const deleteMedico = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir este médico?')) {
    try {
      await axios.delete(`${API_BASE_URL}/medicos/${id}`);
      alert('Médico excluído com sucesso!');
      fetchMedicos(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao excluir médico:', error);
      alert('Erro ao excluir médico. Tente novamente.');
    }
  }
};

onMounted(() => {
  fetchMedicos();
});

watch(medicos, filterMedicos);

defineExpose({
  fetchMedicos
});
</script>

<style scoped>
.medico-list {
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

.no-medicos {
  text-align: center;
  color: #777;
  font-style: italic;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}

.medicos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.medico-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #fefefe;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.medico-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.medico-card p {
  margin-bottom: 8px;
  line-height: 1.5;
}

.medico-card strong {
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
