import { v4 as uuidv4 } from 'uuid';
import { medicos, Medico } from '../database/mock-db';

/**
 * @description
 * O MedicoRepository é responsável por interagir diretamente com a fonte de dados
 * (neste caso, o array `medicos` em memória). Ele simula as operações CRUD
 * que seriam realizadas em um banco de dados real.
 *
 * Boas práticas:
 * - Abstrai a lógica de acesso a dados do restante da aplicação.
 * - Garante que a camada de Serviço não precise saber os detalhes de como os dados são armazenados.
 * - Facilita a troca da tecnologia de banco de dados no futuro.
 */
export class MedicoRepository {
  /**
   * Encontra todos os médicos.
   * @returns Uma lista de todos os médicos.
   */
  findAll(): Medico[] {
    return medicos;
  }

  /**
   * Encontra um médico pelo ID.
   * @param id O ID do médico.
   * @returns O médico encontrado ou `undefined` se não existir.
   */
  findById(id: string): Medico | undefined {
    return medicos.find(m => m.id === id);
  }

  /**
   * Cria um novo médico.
   * @param medico Os dados do médico a serem criados.
   * @returns O médico recém-criado com um ID.
   */
  create(medico: Omit<Medico, 'id'>): Medico {
    const newMedico: Medico = { id: uuidv4(), ...medico };
    medicos.push(newMedico);
    return newMedico;
  }

  /**
   * Atualiza um médico existente.
   * @param id O ID do médico a ser atualizado.
   * @param updatedFields Os campos a serem atualizados.
   * @returns O médico atualizado ou `undefined` se não for encontrado.
   */
  update(id: string, updatedFields: Partial<Medico>): Medico | undefined {
    const index = medicos.findIndex(m => m.id === id);
    if (index !== -1) {
      medicos[index] = { ...medicos[index], ...updatedFields };
      return medicos[index];
    }
    return undefined;
  }

  /**
   * Remove um médico pelo ID.
   * @param id O ID do médico a ser removido.
   * @returns `true` se o médico foi removido, `false` caso contrário.
   */
  delete(id: string): boolean {
    const initialLength = medicos.length;
    const filteredMedicos = medicos.filter(m => m.id !== id);
    if (filteredMedicos.length < initialLength) {
      medicos.splice(0, medicos.length, ...filteredMedicos);
      return true;
    }
    return false;
  }
}
