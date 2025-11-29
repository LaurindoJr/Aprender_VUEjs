import { Router } from 'express';
import { MedicosController } from '../controllers/medicos.controller';
import { MedicoService } from '../services/medicos.service';
import { MedicoRepository } from '../repositories/medicos.repository';

/**
 * @description
 * Este arquivo define as rotas para a entidade Médico.
 * Ele instancia o Repository, Service e Controller, e associa os métodos do Controller
 * às rotas HTTP correspondentes.
 *
 * Boas práticas:
 * - Agrupa rotas relacionadas a um recurso específico.
 * - Mantém a lógica de roteamento separada da lógica de negócio e de dados.
 * - Facilita a manutenção e a escalabilidade da API.
 */

const router = Router();

const medicoRepository = new MedicoRepository();
const medicoService = new MedicoService(medicoRepository);
const medicosController = new MedicosController(medicoService);

/**
 * @swagger
 * /medicos:
 *   get:
 *     tags:
 *       - Médicos
 *     summary: Lista todos os médicos
 *     responses:
 *       '200':
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medico'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Médicos
 *     summary: Cria um novo médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMedicoDto'
 *     responses:
 *       '201':
 *         description: Médico criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', medicosController.findAll);
router.post('/', medicosController.create);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     tags:
 *       - Médicos
 *     summary: Busca um médico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do médico
 *     responses:
 *       '200':
 *         description: Detalhes do médico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   put:
 *     tags:
 *       - Médicos
 *     summary: Atualiza um médico existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do médico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMedicoDto'
 *     responses:
 *       '200':
 *         description: Médico atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medico'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     tags:
 *       - Médicos
 *     summary: Remove um médico
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do médico
 *     responses:
 *       '204':
 *         description: Médico removido com sucesso
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', medicosController.findById);
router.put('/:id', medicosController.update);
router.delete('/:id', medicosController.delete);

export default router;
