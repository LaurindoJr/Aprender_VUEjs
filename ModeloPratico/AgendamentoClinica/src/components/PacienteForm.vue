<template>
  <div class="paciente-form">
    <h2>{{ isEditing ? 'Editar Paciente' : 'Cadastrar Novo Paciente' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="form.nome" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="text" id="telefone" v-model="form.telefone" required />
      </div>

      <div class="form-group">
        <label for="dataNascimento">Data de Nascimento:</label>
        <input type="date" id="dataNascimento" v-model="form.dataNascimento" required />
      </div>

      <div class="form-group">
        <label for="cpf">CPF:</label>
        <input type="text" id="cpf" v-model="form.cpf" required />
      </div>

      <div class="form-group">
        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" v-model="form.endereco" required />
      </div>

      <button type="submit">{{ isEditing ? 'Salvar Alterações' : 'Cadastrar Paciente' }}</button>
      <button type="button" @click="cancelEdit" v-if="isEditing" class="btn-cancel">Cancelar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface Paciente {
  id?: string; // Opcional para criação
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  endereco: string;
}

const props = defineProps<{
  initialPaciente?: Paciente | null;
}>();

const emits = defineEmits(['pacienteSaved', 'cancelEdit']);

const form = ref<Paciente>({
  nome: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  cpf: '',
  endereco: '',
});

const isEditing = ref(false);

const resetForm = () => {
  form.value = {
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    endereco: '',
  };
};

watch(() => props.initialPaciente, (newVal) => {
  if (newVal) {
    form.value = { ...newVal };
    isEditing.value = true;
  } else {
    resetForm();
    isEditing.value = false;
  }
}, { immediate: true });

const submitForm = async () => {
  try {
    if (isEditing.value && form.value.id) {
      await axios.put(`${API_BASE_URL}/pacientes/${form.value.id}`, form.value);
      alert('Paciente atualizado com sucesso!');
    } else {
      await axios.post(`${API_BASE_URL}/pacientes`, form.value);
      alert('Paciente cadastrado com sucesso!');
    }
    resetForm();
    emits('pacienteSaved');
  } catch (error) {
    console.error('Erro ao salvar paciente:', error);
    alert('Erro ao salvar paciente. Verifique os dados e tente novamente.');
  }
};

const cancelEdit = () => {
  resetForm();
  emits('cancelEdit');
};
</script>

<style scoped>
.paciente-form {
  background-color: #f9f9f9;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="date"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #369f6f;
}

.btn-cancel {
  background-color: #e74c3c;
  margin-top: 10px;
}

.btn-cancel:hover {
  background-color: #c0392b;
}
</style>
