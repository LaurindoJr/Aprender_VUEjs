import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useConsultaStore } from '../consultas.store';
import * as consultasService from '@/services/consultas.service';
import type { Consulta } from '@/types';

vi.mock('@/services/consultas.service', () => ({
  getConsultas: vi.fn(),
  createConsulta: vi.fn(),
  updateConsulta: vi.fn(),
  deleteConsulta: vi.fn(),
}));

describe('Consulta Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('fetchConsultas deve carregar consultas', async () => {
    const mockConsultas: Consulta[] = [
      { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' },
      { id: '2', pacienteId: 'p2', medicoId: 'm2', data: '2025-12-02', horario: '11:00', motivo: 'Urgência', status: 'CONCLUIDA' },
    ];
    vi.mocked(consultasService).getConsultas.mockResolvedValue(mockConsultas);

    const store = useConsultaStore();
    await store.fetchConsultas();

    expect(consultasService.getConsultas).toHaveBeenCalledTimes(1);
    expect(store.consultas).toEqual(mockConsultas);
  });

  it('addConsulta deve adicionar uma nova consulta', async () => {
    const newConsultaData: Omit<Consulta, 'id'> = { pacienteId: 'p3', medicoId: 'm3', data: '2025-12-03', horario: '12:00', motivo: 'Check-up', status: 'AGENDADA' };
    const createdConsulta: Consulta = { id: '3', ...newConsultaData };
    vi.mocked(consultasService).createConsulta.mockResolvedValue(createdConsulta);

    const store = useConsultaStore();
    store.consultas = []; 
    await store.addConsulta(newConsultaData);

    expect(consultasService.createConsulta).toHaveBeenCalledWith(newConsultaData);
    expect(store.consultas).toContainEqual(createdConsulta);
  });

  it('updateConsulta deve atualizar uma consulta existente', async () => {
    const existingConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    const updatedData: Partial<Consulta> = { horario: '10:30', status: 'CONCLUIDA' };
    const updatedConsulta: Consulta = { ...existingConsulta, ...updatedData };

    vi.mocked(consultasService).updateConsulta.mockResolvedValue(updatedConsulta);

    const store = useConsultaStore();
    store.consultas = [existingConsulta];
    store.setEditingConsulta(existingConsulta); // Define a consulta em edição

    await store.updateConsulta('1', updatedData);

    expect(consultasService.updateConsulta).toHaveBeenCalledWith('1', updatedData);
    expect(store.consultas).toContainEqual(updatedConsulta);
    expect(store.editingConsulta).toBeNull(); // Verifica se a consulta em edição foi limpa
  });

  it('removeConsulta deve remover uma consulta', async () => {
    const existingConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    vi.mocked(consultasService).deleteConsulta.mockResolvedValue(undefined);

    const store = useConsultaStore();
    store.consultas = [existingConsulta];
    await store.removeConsulta('1');

    expect(consultasService.deleteConsulta).toHaveBeenCalledWith('1');
    expect(store.consultas).not.toContainEqual(existingConsulta);
    expect(store.consultas).toHaveLength(0);
  });

  it('setEditingConsulta deve definir a consulta em edição', () => {
    const mockConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    const store = useConsultaStore();
    store.setEditingConsulta(mockConsulta);
    expect(store.editingConsulta).toEqual(mockConsulta);
  });

  it('setEditingConsulta deve limpar a consulta em edição quando null é passado', () => {
    const mockConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    const store = useConsultaStore();
    store.setEditingConsulta(mockConsulta);
    store.setEditingConsulta(null);
    expect(store.editingConsulta).toBeNull();
  });

  it('fetchConsultas deve lidar com erros e atualizar o estado de erro', async () => {
    const mockError = new Error('Falha na API de consultas');
    vi.mocked(consultasService).getConsultas.mockRejectedValue(mockError);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const store = useConsultaStore();

    // Espera que a promessa seja rejeitada e verifica o erro
    await expect(store.fetchConsultas()).rejects.toThrow(mockError);

    expect(store.isLoading).toBeFalsy();
    expect(store.error).toBe(mockError.message);
    expect(store.consultas).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao buscar consultas', mockError);
    consoleErrorSpy.mockRestore();
  });

  it('addConsulta deve lidar com erros', async () => {
    const error = new Error('Erro ao criar');
    vi.mocked(consultasService).createConsulta.mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const store = useConsultaStore();
    store.consultas = [];
    const newConsultaData: Omit<Consulta, 'id'> = { pacienteId: 'p3', medicoId: 'm3', data: '2025-12-03', horario: '12:00', motivo: 'Check-up', status: 'AGENDADA' };

    await expect(store.addConsulta(newConsultaData)).rejects.toThrow(error);
    expect(store.isLoading).toBeFalsy();
    expect(store.error).toBe(error.message);
    expect(store.consultas).toHaveLength(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao agendar consulta', error);
    consoleErrorSpy.mockRestore();
  });

  it('updateConsulta deve lidar com erros', async () => {
    const error = new Error('Erro ao atualizar');
    vi.mocked(consultasService).updateConsulta.mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const store = useConsultaStore();
    const existingConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    store.consultas = [existingConsulta];
    const updatedData: Partial<Consulta> = { horario: '10:30', status: 'CONCLUIDA' };

    await expect(store.updateConsulta('1', updatedData)).rejects.toThrow(error);
    expect(store.isLoading).toBeFalsy();
    expect(store.error).toBe(error.message);
    expect(store.consultas).toContainEqual(existingConsulta); // O estado não deve ser alterado
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao atualizar consulta', error);
    consoleErrorSpy.mockRestore();
  });

  it('removeConsulta deve lidar com erros', async () => {
    const error = new Error('Erro ao remover');
    vi.mocked(consultasService).deleteConsulta.mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const store = useConsultaStore();
    const existingConsulta: Consulta = { id: '1', pacienteId: 'p1', medicoId: 'm1', data: '2025-12-01', horario: '10:00', motivo: 'Rotina', status: 'AGENDADA' };
    store.consultas = [existingConsulta];

    await expect(store.removeConsulta('1')).rejects.toThrow(error);
    expect(store.isLoading).toBeFalsy();
    expect(store.error).toBe(error.message);
    expect(store.consultas).toContainEqual(existingConsulta); // O estado não deve ser alterado
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao cancelar consulta', error);
    consoleErrorSpy.mockRestore();
  });
});
