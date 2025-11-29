/**
 * @swagger
 * components:
 *   schemas:
 *     CreateMedicoDto:
 *       type: object
 *       required:
 *         - nome
 *         - especialidade
 *         - crm
 *         - email
 *         - telefone
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do médico.
 *           example: "Dra. Ana Costa"
 *         especialidade:
 *           type: string
 *           description: Especialidade médica.
 *           example: "Pediatria"
 *         crm:
 *           type: string
 *           description: Número do CRM do médico.
 *           example: "CRM/SP 123456"
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail do médico.
 *           example: "ana.costa@example.com"
 *         telefone:
 *           type: string
 *           description: Número de telefone do médico.
 *           example: "11998877665"
 */
export class CreateMedicoDto {
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;

  constructor(nome: string, especialidade: string, crm: string, email: string, telefone: string) {
    this.nome = nome;
    this.especialidade = especialidade;
    this.crm = crm;
    this.email = email;
    this.telefone = telefone;
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.nome || this.nome.trim() === '') {
      errors.push('Nome é obrigatório.');
    }
    if (!this.especialidade || this.especialidade.trim() === '') {
      errors.push('Especialidade é obrigatória.');
    }
    if (!this.crm || !/^CRM\/[A-Z]{2}\s\d{6}$/.test(this.crm)) {
      errors.push('CRM inválido. Use o formato CRM/UF 000000.');
    }
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Email inválido.');
    }
    if (!this.telefone || this.telefone.trim() === '') {
      errors.push('Telefone é obrigatório.');
    }
    return errors;
  }
}
