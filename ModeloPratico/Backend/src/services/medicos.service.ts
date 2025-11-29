import { Medico } from '../database/mock-db';
import { MedicoRepository } from '../repositories/medicos.repository';
import { CreateMedicoDto } from '../dtos/create-medico.dto';
import { UpdateMedicoDto } from '../dtos/update-medico.dto';

/**
 * @description
 * O MedicoService contém a lógica de negócio relacionada aos médicos.
 * Ele interage com o MedicoRepository para acessar os dados e aplica as regras de negócio.
 *
 * Boas práticas:
 * - Separa a lógica de negócio da camada de apresentação (Controllers) e da camada de dados (Repositories).
 * - Garante que as regras de negócio sejam aplicadas de forma consistente.
 * - Facilita a testabilidade da lógica de negócio.
 */
export class MedicoService {
  private medicoRepository: MedicoRepository;

  constructor(medicoRepository: MedicoRepository) {
    this.medicoRepository = medicoRepository;
  }

  /**
   * Retorna todos os médicos.
   * @returns Uma lista de médicos.
   */
  findAll(): Medico[] {
    return this.medicoRepository.findAll();
  }

  /**
   * Retorna um médico pelo ID.
   * @param id O ID do médico.
   * @returns O médico encontrado ou `undefined`.
   */
  findById(id: string): Medico | undefined {
    return this.medicoRepository.findById(id);
  }

  /**
   * Cria um novo médico.
   * @param createMedicoDto Os dados para criar o médico.
   * @returns O médico recém-criado.
   * @throws Error se os dados forem inválidos.
   */
  create(createMedicoDto: CreateMedicoDto): Medico {
    const errors = createMedicoDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    return this.medicoRepository.create(createMedicoDto);
  }

  /**
   * Atualiza um médico existente.
   * @param id O ID do médico a ser atualizado.
   * @param updateMedicoDto Os dados para atualizar o médico.
   * @returns O médico atualizado ou `undefined` se não for encontrado.
   * @throws Error se os dados forem inválidos.
   */
  update(id: string, updateMedicoDto: UpdateMedicoDto): Medico | undefined {
    const errors = updateMedicoDto.validate();
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    return this.medicoRepository.update(id, updateMedicoDto);
  }

  /**
   * Remove um médico pelo ID.
   * @param id O ID do médico a ser removido.
   * @returns `true` se o médico foi removido, `false` caso contrário.
   */
  delete(id: string): boolean {
    return this.medicoRepository.delete(id);
  }
}
