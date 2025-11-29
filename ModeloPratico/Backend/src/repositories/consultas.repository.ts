import { v4 as uuidv4 } from 'uuid';
import { consultas, Consulta } from '../database/mock-db';

/**
 * @description
 * O ConsultaRepository é responsável por interagir diretamente com a fonte de dados
 * (neste caso, o array `consultas` em memória). Ele simula as operações CRUD
 * que seriam realizadas em um banco de dados real.
 *
 * Boas práticas:
 * - Abstrai a lógica de acesso a dados do restante da aplicação.
 * - Garante que a camada de Serviço não precise saber os detalhes de como os dados são armazenados.
 * - Facilita a troca da tecnologia de banco de dados no futuro.
 */
export class ConsultaRepository {
  /**
   * Encontra todas as consultas.
   * @returns Uma lista de todas as consultas.
   */
  findAll(): Consulta[] {
    return consultas;
  }

  /**
   * Encontra uma consulta pelo ID.
   * @param id O ID da consulta.
   * @returns A consulta encontrada ou `undefined` se não existir.
   */
  findById(id: string): Consulta | undefined {
    return consultas.find(c => c.id === id);
  }

  /**
   * Cria uma nova consulta.
   * @param consulta Os dados da consulta a serem criados.
   * @returns A consulta recém-criada com um ID.
   */
  create(consulta: Omit<Consulta, 'id'>): Consulta {
    const newConsulta: Consulta = { id: uuidv4(), ...consulta };
    consultas.push(newConsulta);
    return newConsulta;
  }

  /**
   * Atualiza uma consulta existente.
   * @param id O ID da consulta a ser atualizada.
   * @param updatedFields Os campos a serem atualizados.
   * @returns A consulta atualizada ou `undefined` se não for encontrada.
   */
  update(id: string, updatedFields: Partial<Consulta>): Consulta | undefined {
    const index = consultas.findIndex(c => c.id === id);
    if (index !== -1) {
      consultas[index] = { ...consultas[index], ...updatedFields };
      return consultas[index];
    }
    return undefined;
  }

  /**
   * Remove uma consulta pelo ID.
   * @param id O ID da consulta a ser removida.
   * @returns `true` se a consulta foi removida, `false` caso contrário.
   */
  delete(id: string): boolean {
    const initialLength = consultas.length;
    const filteredConsultas = consultas.filter(c => c.id !== id);
    if (filteredConsultas.length < initialLength) {
      consultas.splice(0, consultas.length, ...filteredConsultas);
      return true;
    }
    return false;
  }

  /**
   * Encontra consultas para um médico em um determinado horário.
   * @param medicoId O ID do médico.
   * @param data A data e hora da consulta.
   * @returns Uma lista de consultas que correspondem aos critérios.
   */
  findByMedicoAndData(medicoId: string, data: string): Consulta[] {
    return consultas.filter(c => c.medicoId === medicoId && c.data === data);
  }
}
