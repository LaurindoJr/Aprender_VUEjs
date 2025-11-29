import { v4 as uuidv4 } from 'uuid';
import { pacientes, Paciente } from '../database/mock-db';

/**
 * @description
 * O PacienteRepository é responsável por interagir diretamente com a fonte de dados
 * (neste caso, o array `pacientes` em memória). Ele simula as operações CRUD
 * que seriam realizadas em um banco de dados real.
 *
 * Boas práticas:
 * - Abstrai a lógica de acesso a dados do restante da aplicação.
 * - Garante que a camada de Serviço não precise saber os detalhes de como os dados são armazenados.
 * - Facilita a troca da tecnologia de banco de dados no futuro.
 */
export class PacienteRepository {
  /**
   * Encontra todos os pacientes.
   * @returns Uma lista de todos os pacientes.
   */
  findAll(): Paciente[] {
    return pacientes;
  }

  /**
   * Encontra um paciente pelo ID.
   * @param id O ID do paciente.
   * @returns O paciente encontrado ou `undefined` se não existir.
   */
  findById(id: string): Paciente | undefined {
    return pacientes.find(p => p.id === id);
  }

  /**
   * Cria um novo paciente.
   * @param paciente Os dados do paciente a serem criados.
   * @returns O paciente recém-criado com um ID.
   */
  create(paciente: Omit<Paciente, 'id'>): Paciente {
    const newPaciente: Paciente = { id: uuidv4(), ...paciente };
    pacientes.push(newPaciente);
    return newPaciente;
  }

  /**
   * Atualiza um paciente existente.
   * @param id O ID do paciente a ser atualizado.
   * @param updatedFields Os campos a serem atualizados.
   * @returns O paciente atualizado ou `undefined` se não for encontrado.
   */
  update(id: string, updatedFields: Partial<Paciente>): Paciente | undefined {
    const index = pacientes.findIndex(p => p.id === id);
    if (index !== -1) {
      pacientes[index] = { ...pacientes[index], ...updatedFields };
      return pacientes[index];
    }
    return undefined;
  }

  /**
   * Remove um paciente pelo ID.
   * @param id O ID do paciente a ser removido.
   * @returns `true` se o paciente foi removido, `false` caso contrário.
   */
  delete(id: string): boolean {
    const initialLength = pacientes.length;
    const filteredPacientes = pacientes.filter(p => p.id !== id);
    // Se o paciente foi encontrado e removido, o tamanho do array será menor
    if (filteredPacientes.length < initialLength) {
      // Atualiza o array original (simulando a remoção)
      pacientes.splice(0, pacientes.length, ...filteredPacientes);
      return true;
    }
    return false;
  }
}
