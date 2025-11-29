/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateMedicoDto:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome completo do médico.
 *           example: "Dra. Ana Costa Atualizada"
 *         especialidade:
 *           type: string
 *           description: Especialidade médica.
 *           example: "Cardiologia"
 *         crm:
 *           type: string
 *           description: Número do CRM do médico.
 *           example: "CRM/SP 123456"
 *         email:
 *           type: string
 *           format: email
 *           description: Endereço de e-mail do médico.
 *           example: "ana.costa.atualizada@example.com"
 *         telefone:
 *           type: string
 *           description: Número de telefone do médico.
 *           example: "11999998888"
 */
export class UpdateMedicoDto {
  nome?: string;
  especialidade?: string;
  crm?: string;
  email?: string;
  telefone?: string;

  constructor(data: Partial<UpdateMedicoDto>) {
    Object.assign(this, data);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (this.crm && !/^CRM\/[A-Z]{2}\s\d{6}$/.test(this.crm)) {
      errors.push('CRM inválido. Use o formato CRM/UF 000000.');
    }
    if (this.email && !/\S+@\S+\.\S+/.test(this.email)) {
      errors.push('Email inválido.');
    }
    return errors;
  }
}
