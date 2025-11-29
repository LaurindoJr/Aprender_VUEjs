export interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  endereco: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
}

export interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  data: string;
  horario: string; // Adicionado a propriedade horario
  motivo: string;
  observacoes?: string;
  status: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA';
}
