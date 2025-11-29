import { Paciente } from '../database/mock-db';
import { PacienteRepository } from '../repositories/pacientes.repository';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

/**
 * @description
 * O PacienteService contém a lógica de negócio relacionada aos pacientes.
 * Ele interage com o PacienteRepository para acessar os dados e aplica as regras de negócio.
 *
 * Boas práticas:
 * - Separa a lógica de negócio da camada de apresentação (Controllers) e da camada de dados (Repositories).
 * - Garante que as regras de negócio sejam aplicadas de forma consistente.
 * - Facilita a testabilidade da lógica de negócio.
 */
export class PacienteService {
  private pacienteRepository: PacienteRepository;

  constructor(pacienteRepository: PacienteRepository) {
    this.pacienteRepository = pacienteRepository;
  }

  /**
   * Retorna todos os pacientes.
   * @returns Uma lista de pacientes.
   */
  findAll(): Paciente[] {
    return this.pacienteRepository.findAll();
  }

  /**
   * Retorna um paciente pelo ID.
   * @param id O ID do paciente.
   * @returns O paciente encontrado ou `undefined`.
   */
  findById(id: string): Paciente | undefined {
    return this.pacienteRepository.findById(id);
  }

  /**
   * Cria um novo paciente.
   * @param createPacienteDto Os dados para criar o paciente.
   * @returns O paciente recém-criado.
   * @throws Error se os dados forem inválidos.
   */
  create(createPacienteDto: CreatePacienteDto): Paciente {
    const errors = createPacienteDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    return this.pacienteRepository.create(createPacienteDto);
  }

  /**
   * Atualiza um paciente existente.
   * @param id O ID do paciente a ser atualizado.
   * @param updatePacienteDto Os dados para atualizar o paciente.
   * @returns O paciente atualizado ou `undefined` se não for encontrado.
   * @throws Error se os dados forem inválidos.
   */
  update(id: string, updatePacienteDto: UpdatePacienteDto): Paciente | undefined {
    const errors = updatePacienteDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    return this.pacienteRepository.update(id, updatePacienteDto);
  }

  /**
   * Remove um paciente pelo ID.
   * @param id O ID do paciente a ser removido.
   * @returns `true` se o paciente foi removido, `false` caso contrário.
   */
  delete(id: string): boolean {
    return this.pacienteRepository.delete(id);
  }
}
