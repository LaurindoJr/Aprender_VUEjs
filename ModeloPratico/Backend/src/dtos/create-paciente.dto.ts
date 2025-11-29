/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePacienteDto:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - dataNascimento
 *         - cpf
 *         - endereco
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do paciente.
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail do paciente.
 *           example: "joao.silva@example.com"
 *         telefone:
 *           type: string
 *           description: Número de telefone do paciente.
 *           example: "11987654321"
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do paciente (AAAA-MM-DD).
 *           example: "1985-10-20"
 *         cpf:
 *           type: string
 *           description: CPF do paciente.
 *           example: "123.456.789-00"
 *         endereco:
 *           type: string
 *           description: Endereço completo do paciente.
 *           example: "Rua Exemplo, 123, Bairro, Cidade - UF"
 */
export class CreatePacienteDto {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  endereco: string;

  constructor(nome: string, email: string, telefone: string, dataNascimento: string, cpf: string, endereco: string) {
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.endereco = endereco;
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.nome || this.nome.trim() === '') {
      errors.push('Nome é obrigatório.');
    }
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Email inválido.');
    }
    if (!this.telefone || this.telefone.trim() === '') {
      errors.push('Telefone é obrigatório.');
    }
    if (!this.dataNascimento || !/^\d{4}-\d{2}-\d{2}$/.test(this.dataNascimento)) {
      errors.push('Data de Nascimento inválida. Use o formato AAAA-MM-DD.');
    }
    if (!this.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.cpf)) {
      errors.push('CPF inválido. Use o formato 000.000.000-00.');
    }
    if (!this.endereco || this.endereco.trim() === '') {
      errors.push('Endereço é obrigatório.');
    }
    return errors;
  }
}
