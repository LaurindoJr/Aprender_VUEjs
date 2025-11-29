import { Request, Response } from 'express';
import { MedicoService } from '../services/medicos.service';
import { CreateMedicoDto } from '../dtos/create-medico.dto';
import { UpdateMedicoDto } from '../dtos/update-medico.dto';

/**
 * @description
 * O MedicosController é responsável por receber as requisições HTTP,
 * chamar a lógica de negócio apropriada no MedicoService e enviar as respostas HTTP.
 * Ele atua como a camada de apresentação da API.
 *
 * Boas práticas:
 * - Lida com a entrada e saída de dados (parsing do corpo da requisição, formatação da resposta).
 * - Não contém lógica de negócio complexa, apenas orquestra as chamadas ao serviço.
 * - Garante que a API siga o padrão RESTful.
 */
export class MedicosController {
  private medicoService: MedicoService;

  constructor(medicoService: MedicoService) {
    this.medicoService = medicoService;
  }

  /**
   * Lista todos os médicos.
   * Rota: GET /medicos
   */
  findAll = (req: Request, res: Response) => {
    try {
      const medicos = this.medicoService.findAll();
      res.status(200).json(medicos);
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar médicos.' });
    }
  };

  /**
   * Busca um médico pelo ID.
   * Rota: GET /medicos/:id
   */
  findById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const medico = this.medicoService.findById(id);
      if (medico) {
        res.status(200).json(medico);
      } else {
        res.status(404).send({ message: 'Médico não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar médico.' });
    }
  };

  /**
   * Cria um novo médico.
   * Rota: POST /medicos
   */
  create = (req: Request, res: Response) => {
    try {
      const createMedicoDto = new CreateMedicoDto(req.body.nome, req.body.especialidade, req.body.crm, req.body.email, req.body.telefone);
      const newMedico = this.medicoService.create(createMedicoDto);
      res.status(201).json(newMedico);
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao criar médico.' });
    }
  };

  /**
   * Atualiza um médico existente.
   * Rota: PUT /medicos/:id
   */
  update = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateMedicoDto = new UpdateMedicoDto(req.body);
      const updatedMedico = this.medicoService.update(id, updateMedicoDto);
      if (updatedMedico) {
        res.status(200).json(updatedMedico);
      } else {
        res.status(404).send({ message: 'Médico não encontrado.' });
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao atualizar médico.' });
    }
  };

  /**
   * Remove um médico.
   * Rota: DELETE /medicos/:id
   */
  delete = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = this.medicoService.delete(id);
      if (deleted) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).send({ message: 'Médico não encontrado.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao remover médico.' });
    }
  };
}
