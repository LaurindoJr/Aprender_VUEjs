/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePacienteDto:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do paciente.
 *           example: "João da Silva Atualizado"
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail do paciente.
 *           example: "joao.atualizado@example.com"
 *         telefone:
 *           type: string
 *           description: Número de telefone do paciente.
 *           example: "11977776666"
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
 *           example: "Rua Nova, 456, Centro, Outra Cidade - SP"
 */
export class UpdatePacienteDto {
  nome?: string;
  email?: string;
  telefone?: string;
  dataNascimento?: string;
  cpf?: string;
  endereco?: string;

  constructor(data: Partial<UpdatePacienteDto>) {
    Object.assign(this, data);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (this.email && !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Email inválido.');
    }
    if (this.dataNascimento && !/^\d{4}-\d{2}-\d{2}$/.test(this.dataNascimento)) {
      errors.push('Data de Nascimento inválida. Use o formato AAAA-MM-DD.');
    }
    if (this.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(this.cpf)) {
      errors.push('CPF inválido. Use o formato 000.000.000-00.');
    }
    return errors;
  }
}
