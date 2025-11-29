import { v4 as uuidv4 } from 'uuid';

interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string; // ou Date
  cpf: string;
  endereco: string;
}

interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
}

interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  data: string; // ou Date
  motivo: string;
  observacoes?: string;
  status: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA';
}

const pacientes: Paciente[] = [];
const medicos: Medico[] = [];
const consultas: Consulta[] = [];

// Adicionar alguns registros de exemplo
const paciente1Id = uuidv4();
const medico1Id = uuidv4();

pacientes.push({
  id: paciente1Id,
  nome: "Maria Silva",
  email: "maria.silva@example.com",
  telefone: "11987654321",
  dataNascimento: "1990-05-15",
  cpf: "123.456.789-00",
  endereco: "Rua das Flores, 123"
});

medicos.push({
  id: medico1Id,
  nome: "Dr. João Santos",
  especialidade: "Cardiologia",
  crm: "CRM/SP 123456",
  email: "joao.santos@example.com",
  telefone: "11912345678"
});

consultas.push({
  id: uuidv4(),
  pacienteId: paciente1Id,
  medicoId: medico1Id,
  data: new Date(new Date().setHours(new Date().getHours() + 24)).toISOString(), // Consulta para amanhã
  motivo: "Check-up anual",
  status: "AGENDADA"
});


export { pacientes, medicos, consultas, Paciente, Medico, Consulta };
