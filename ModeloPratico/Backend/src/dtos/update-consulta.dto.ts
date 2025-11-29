/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateConsultaDto:
 *       type: object
 *       properties:
 *         pacienteId:
 *           type: string
 *           format: uuid
 *           description: ID do paciente.
 *           example: "a1b2c3d4-e5f6-7890-1234-567890abcdef"
 *         medicoId:
 *           type: string
 *           format: uuid
 *           description: ID do médico.
 *           example: "f1e2d3c4-b5a6-9876-5432-10fedcba9876"
 *         data:
 *           type: string
 *           format: date-time
 *           description: Nova data e hora da consulta (ISO 8601).
 *           example: "2025-12-05T11:00:00Z"
 *         motivo:
 *           type: string
 *           description: Novo motivo da consulta.
 *           example: "Revisão de exames"
 *         observacoes:
 *           type: string
 *           nullable: true
 *           description: Novas observações adicionais sobre a consulta.
 *           example: "Encaminhar para especialista."
 *         status:
 *           type: string
 *           enum: [ "AGENDADA", "CONCLUIDA", "CANCELADA" ]
 *           description: Novo status da consulta.
 *           example: "CONCLUIDA"
 */
export class UpdateConsultaDto {
  pacienteId?: string;
  medicoId?: string;
  data?: string;
  motivo?: string;
  observacoes?: string;
  status?: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA';

  constructor(data: Partial<UpdateConsultaDto>) {
    Object.assign(this, data);
  }

  validate(): string[] {
    const errors: string[] = [];
    if (this.data && isNaN(new Date(this.data).getTime())) {
      errors.push('Data da consulta inválida. Use o formato ISO 8601.');
    }
    if (this.data && new Date(this.data) < new Date()) {
      errors.push('Não é permitido agendar consultas no passado.');
    }
    if (this.status && !['AGENDADA', 'CONCLUIDA', 'CANCELADA'].includes(this.status)) {
      errors.push('Status da consulta inválido. Use AGENDADA, CONCLUIDA ou CANCELADA.');
    }
    return errors;
  }
}
