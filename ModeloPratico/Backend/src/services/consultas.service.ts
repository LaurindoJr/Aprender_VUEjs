import { Consulta } from '../database/mock-db';
import { ConsultaRepository } from '../repositories/consultas.repository';
import { PacienteRepository } from '../repositories/pacientes.repository';
import { MedicoRepository } from '../repositories/medicos.repository';
import { CreateConsultaDto } from '../dtos/create-consulta.dto';
import { UpdateConsultaDto } from '../dtos/update-consulta.dto';

/**
 * @description
 * O ConsultaService contém a lógica de negócio relacionada às consultas.
 * Ele interage com o ConsultaRepository para acessar os dados e aplica as regras de negócio.
 *
 * Boas práticas:
 * - Separa a lógica de negócio da camada de apresentação (Controllers) e da camada de dados (Repositories).
 * - Garante que as regras de negócio sejam aplicadas de forma consistente.
 * - Facilita a testabilidade da lógica de negócio.
 */
export class ConsultaService {
  private consultaRepository: ConsultaRepository;
  private pacienteRepository: PacienteRepository;
  private medicoRepository: MedicoRepository;

  constructor(consultaRepository: ConsultaRepository, pacienteRepository: PacienteRepository, medicoRepository: MedicoRepository) {
    this.consultaRepository = consultaRepository;
    this.pacienteRepository = pacienteRepository;
    this.medicoRepository = medicoRepository;
  }

  /**
   * Retorna todas as consultas.
   * @returns Uma lista de consultas.
   */
  findAll(): Consulta[] {
    return this.consultaRepository.findAll();
  }

  /**
   * Retorna uma consulta pelo ID.
   * @param id O ID da consulta.
   * @returns A consulta encontrada ou `undefined`.
   */
  findById(id: string): Consulta | undefined {
    return this.consultaRepository.findById(id);
  }

  /**
   * Cria uma nova consulta.
   * @param createConsultaDto Os dados para criar a consulta.
   * @returns A consulta recém-criada.
   * @throws Error se os dados forem inválidos ou regras de negócio violadas.
   */
  create(createConsultaDto: CreateConsultaDto): Consulta {
    const errors = createConsultaDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    // Regra de negócio: Validar se pacienteId existe
    if (!this.pacienteRepository.findById(createConsultaDto.pacienteId)) {
      throw new Error('Paciente não encontrado.');
    }

    // Regra de negócio: Validar se medicoId existe
    if (!this.medicoRepository.findById(createConsultaDto.medicoId)) {
      throw new Error('Médico não encontrado.');
    }

    // Regra de negócio: Não permitir duas consultas para o mesmo médico no mesmo horário
    const existingConsultas = this.consultaRepository.findByMedicoAndData(createConsultaDto.medicoId, createConsultaDto.data);
    if (existingConsultas.length > 0) {
      throw new Error('Já existe uma consulta agendada para este médico neste horário.');
    }

    return this.consultaRepository.create(createConsultaDto);
  }

  /**
   * Atualiza uma consulta existente.
   * @param id O ID da consulta a ser atualizada.
   * @param updateConsultaDto Os dados para atualizar a consulta.
   * @returns A consulta atualizada ou `undefined` se não for encontrada.
   * @throws Error se os dados forem inválidos ou regras de negócio violadas.
   */
  update(id: string, updateConsultaDto: UpdateConsultaDto): Consulta | undefined {
    const errors = updateConsultaDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const existingConsulta = this.consultaRepository.findById(id);
    if (!existingConsulta) {
      return undefined;
    }

    // Se pacienteId for atualizado, validar se existe
    if (updateConsultaDto.pacienteId && !this.pacienteRepository.findById(updateConsultaDto.pacienteId)) {
      throw new Error('Paciente não encontrado.');
    }

    // Se medicoId for atualizado, validar se existe
    if (updateConsultaDto.medicoId && !this.medicoRepository.findById(updateConsultaDto.medicoId)) {
      throw new Error('Médico não encontrado.');
    }

    // Regra de negócio: Não permitir duas consultas para o mesmo médico no mesmo horário (se data ou medicoId mudarem)
    if (updateConsultaDto.medicoId || updateConsultaDto.data) {
      const targetMedicoId = updateConsultaDto.medicoId || existingConsulta.medicoId;
      const targetData = updateConsultaDto.data || existingConsulta.data;

      const existingConsultas = this.consultaRepository.findByMedicoAndData(targetMedicoId, targetData);
      const conflictingConsultas = existingConsultas.filter(c => c.id !== id); // Excluir a própria consulta sendo atualizada

      if (conflictingConsultas.length > 0) {
        throw new Error('Já existe uma consulta agendada para este médico neste horário.');
      }
    }

    return this.consultaRepository.update(id, updateConsultaDto);
  }

  /**
   * Remove uma consulta pelo ID.
   * @param id O ID da consulta a ser removida.
   * @returns `true` se a consulta foi removida, `false` caso contrário.
   */
  delete(id: string): boolean {
    return this.consultaRepository.delete(id);
  }
}
