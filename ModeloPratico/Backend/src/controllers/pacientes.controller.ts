import { Request, Response } from 'express';
import { PacienteService } from '../services/pacientes.service';
import { CreatePacienteDto } from '../dtos/create-paciente.dto';
import { UpdatePacienteDto } from '../dtos/update-paciente.dto';

/**
 * @description
 * O PacientesController é responsável por receber as requisições HTTP,
 * chamar a lógica de negócio apropriada no PacienteService e enviar as respostas HTTP.
 * Ele atua como a camada de apresentação da API.
 *
 * Boas práticas:
 * - Lida com a entrada e saída de dados (parsing do corpo da requisição, formatação da resposta).
 * - Não contém lógica de negócio complexa, apenas orquestra as chamadas ao serviço.
 * - Garante que a API siga o padrão RESTful.
 */
export class PacientesController {
  private pacienteService: PacienteService;

  constructor(pacienteService: PacienteService) {
    this.pacienteService = pacienteService;
  }

  /**
   * Lista todos os pacientes.
   * Rota: GET /pacientes
   */
  findAll = (req: Request, res: Response) => {
    try {
      const pacientes = this.pacienteService.findAll();
      res.status(200).json(pacientes);
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar pacientes.' });
    }
  };

  /**
   * Busca um paciente pelo ID.
   * Rota: GET /pacientes/:id
   */
  findById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const paciente = this.pacienteService.findById(id);
      if (paciente) {
        res.status(200).json(paciente);
      } else {
        res.status(404).send({ message: 'Paciente não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar paciente.' });
    }
  };

  /**
   * Cria um novo paciente.
   * Rota: POST /pacientes
   */
  create = (req: Request, res: Response) => {
    try {
      const createPacienteDto = new CreatePacienteDto(req.body.nome, req.body.email, req.body.telefone, req.body.dataNascimento, req.body.cpf, req.body.endereco);
      const newPaciente = this.pacienteService.create(createPacienteDto);
      res.status(201).json(newPaciente);
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao criar paciente.' });
    }
  };

  /**
   * Atualiza um paciente existente.
   * Rota: PUT /pacientes/:id
   */
  update = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatePacienteDto = new UpdatePacienteDto(req.body);
      const updatedPaciente = this.pacienteService.update(id, updatePacienteDto);
      if (updatedPaciente) {
        res.status(200).json(updatedPaciente);
      } else {
        res.status(404).send({ message: 'Paciente não encontrado.' });
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao atualizar paciente.' });
    }
  };

  /**
   * Remove um paciente.
   * Rota: DELETE /pacientes/:id
   */
  delete = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = this.pacienteService.delete(id);
      if (deleted) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).send({ message: 'Paciente não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao remover paciente.' });
    }
  };
}
