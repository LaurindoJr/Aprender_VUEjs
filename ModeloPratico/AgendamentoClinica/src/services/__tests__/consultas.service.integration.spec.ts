import { describe, it, expect } from 'vitest';
import { getConsultas } from '../consultas.service'; // 

describe('Consultas Service - Teste de Integração', () => {
 
  it('deve buscar consultas da API real com sucesso', async () => {
    try {
      const consultas = await getConsultas();
      expect(consultas).toBeInstanceOf(Array);
     
      if (consultas.length > 0) {
        expect(consultas[0]).toHaveProperty('id');
        expect(consultas[0]).toHaveProperty('pacienteId');
        expect(consultas[0]).toHaveProperty('medicoId');
        expect(consultas[0]).toHaveProperty('data');
        
      }
    } catch (error: unknown) {
      
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro no teste de integração ao buscar consultas:', errorMessage);
      throw new Error(`Falha no teste de integração: A API pode não estar em execução ou acessível. Erro: ${errorMessage}`);
    }
  }, 10000); // Aumenta o timeout para 10 segundos para permitir a chamada de rede
});
