import { Router } from 'express';
import { PacientesController } from '../controllers/pacientes.controller';
import { PacienteService } from '../services/pacientes.service';
import { PacienteRepository } from '../repositories/pacientes.repository';

/**
 * @description
 * Este arquivo define as rotas para a entidade Paciente.
 * Ele instancia o Repository, Service e Controller, e associa os métodos do Controller
 * às rotas HTTP correspondentes.
 *
 * Boas práticas:
 * - Agrupa rotas relacionadas a um recurso específico.
 * - Mantém a lógica de roteamento separada da lógica de negócio e de dados.
 * - Facilita a manutenção e a escalabilidade da API.
 */

const router = Router();

const pacienteRepository = new PacienteRepository();
const pacienteService = new PacienteService(pacienteRepository);
const pacientesController = new PacientesController(pacienteService);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Lista todos os pacientes
 *     responses:
 *       '200':
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Cria um novo paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePacienteDto'
 *     responses:
 *       '201':
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', pacientesController.findAll);
router.post('/', pacientesController.create);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Busca um paciente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do paciente
 *     responses:
 *       '200':
 *         description: Detalhes do paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Atualiza um paciente existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePacienteDto'
 *     responses:
 *       '200':
 *         description: Paciente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     tags:
 *       - Pacientes
 *     summary: Remove um paciente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do paciente
 *     responses:
 *       '204':
 *         description: Paciente removido com sucesso
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', pacientesController.findById);
router.put('/:id', pacientesController.update);
router.delete('/:id', pacientesController.delete);

export default router;
