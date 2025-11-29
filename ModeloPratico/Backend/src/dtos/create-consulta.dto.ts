/**
 * @swagger
 * components:
 *   schemas:
 *     CreateConsultaDto:
 *       type: object
 *       required:
 *         - pacienteId
 *         - medicoId
 *         - data
 *         - motivo
 *         - status
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
 *           description: Data e hora da consulta (ISO 8601).
 *           example: "2025-12-01T10:00:00Z"
 *         motivo:
 *           type: string
 *           description: Motivo da consulta.
 *           example: "Check-up geral"
 *         observacoes:
 *           type: string
 *           nullable: true
 *           description: Observações adicionais sobre a consulta.
 *           example: "Paciente com histórico de pressão alta."
 *         status:
 *           type: string
 *           enum: [ "AGENDADA", "CONCLUIDA", "CANCELADA" ]
 *           description: Status da consulta.
 *           example: "AGENDADA"
 */
export class CreateConsultaDto {
  pacienteId: string;
  medicoId: string;
  data: string;
  motivo: string;
  observacoes?: string;
  status: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA';

  constructor(pacienteId: string, medicoId: string, data: string, motivo: string, status: 'AGENDADA' | 'CONCLUIDA' | 'CANCELADA', observacoes?: string) {
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
    this.data = data;
    this.motivo = motivo;
    this.status = status;
    this.observacoes = observacoes;
  }

  validate(): string[] {
    const errors: string[] = [];
    if (!this.pacienteId || this.pacienteId.trim() === '') {
      errors.push('ID do paciente é obrigatório.');
    }
    if (!this.medicoId || this.medicoId.trim() === '') {
      errors.push('ID do médico é obrigatório.');
    }
    if (!this.data || isNaN(new Date(this.data).getTime())) {
      errors.push('Data da consulta inválida. Use o formato ISO 8601.');
    }
    if (new Date(this.data) < new Date()) {
      errors.push('Não é permitido agendar consultas no passado.');
    }
    if (!this.motivo || this.motivo.trim() === '') {
      errors.push('Motivo da consulta é obrigatório.');
    }
    if (!this.status || !['AGENDADA', 'CONCLUIDA', 'CANCELADA'].includes(this.status)) {
      errors.push('Status da consulta inválido. Use AGENDADA, CONCLUIDA ou CANCELADA.');
    }
    return errors;
  }
}
