import { Request, Response } from 'express';
import { ConsultaService } from '../services/consultas.service';
import { CreateConsultaDto } from '../dtos/create-consulta.dto';
import { UpdateConsultaDto } from '../dtos/update-consulta.dto';

/**
 * @description
 * O ConsultasController é responsável por receber as requisições HTTP,
 * chamar a lógica de negócio apropriada no ConsultaService e enviar as respostas HTTP.
 * Ele atua como a camada de apresentação da API.
 *
 * Boas práticas:
 * - Lida com a entrada e saída de dados (parsing do corpo da requisição, formatação da resposta).
 * - Não contém lógica de negócio complexa, apenas orquestra as chamadas ao serviço.
 * - Garante que a API siga o padrão RESTful.
 */
export class ConsultasController {
  private consultaService: ConsultaService;

  constructor(consultaService: ConsultaService) {
    this.consultaService = consultaService;
  }

  /**
   * Lista todas as consultas.
   * Rota: GET /consultas
   */
  findAll = (req: Request, res: Response) => {
    try {
      const consultas = this.consultaService.findAll();
      res.status(200).json(consultas);
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar consultas.' });
    }
  };

  /**
   * Busca uma consulta pelo ID.
   * Rota: GET /consultas/:id
   */
  findById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const consulta = this.consultaService.findById(id);
      if (consulta) {
        res.status(200).json(consulta);
      } else {
        res.status(404).send({ message: 'Consulta não encontrada.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao buscar consulta.' });
    }
  };

  /**
   * Cria uma nova consulta.
   * Rota: POST /consultas
   */
  create = (req: Request, res: Response) => {
    try {
      const createConsultaDto = new CreateConsultaDto(
        req.body.pacienteId,
        req.body.medicoId,
        req.body.data,
        req.body.motivo,
        req.body.status,
        req.body.observacoes
      );
      const newConsulta = this.consultaService.create(createConsultaDto);
      res.status(201).json(newConsulta);
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao criar consulta.' });
    }
  };

  /**
   * Atualiza uma consulta existente.
   * Rota: PUT /consultas/:id
   */
  update = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateConsultaDto = new UpdateConsultaDto(req.body);
      const updatedConsulta = this.consultaService.update(id, updateConsultaDto);
      if (updatedConsulta) {
        res.status(200).json(updatedConsulta);
      } else {
        res.status(404).send({ message: 'Consulta não encontrada.' });
      }
    } catch (error: any) {
      res.status(400).send({ message: error.message || 'Erro ao atualizar consulta.' });
    }
  };

  /**
   * Remove uma consulta.
   * Rota: DELETE /consultas/:id
   */
  delete = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = this.consultaService.delete(id);
      if (deleted) {
        res.status(204).send(); // No Content
      } else {
        res.status(404).send({ message: 'Consulta não encontrada.' });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message || 'Erro ao remover consulta.' });
    }
  };
}
