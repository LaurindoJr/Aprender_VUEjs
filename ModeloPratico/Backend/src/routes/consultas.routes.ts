import { Router } from 'express';
import { ConsultasController } from '../controllers/consultas.controller';
import { ConsultaService } from '../services/consultas.service';
import { ConsultaRepository } from '../repositories/consultas.repository';
import { PacienteRepository } from '../repositories/pacientes.repository';
import { MedicoRepository } from '../repositories/medicos.repository';

/**
 * @description
 * Este arquivo define as rotas para a entidade Consulta.
 * Ele instancia os Repositories, Services e Controller, e associa os métodos do Controller
 * às rotas HTTP correspondentes.
 *
 * Boas práticas:
 * - Agrupa rotas relacionadas a um recurso específico.
 * - Mantém a lógica de roteamento separada da lógica de negócio e de dados.
 * - Facilita a manutenção e a escalabilidade da API.
 */

const router = Router();

const consultaRepository = new ConsultaRepository();
const pacienteRepository = new PacienteRepository();
const medicoRepository = new MedicoRepository();
const consultaService = new ConsultaService(consultaRepository, pacienteRepository, medicoRepository);
const consultasController = new ConsultasController(consultaService);

/**
 * @swagger
 * /consultas:
 *   get:
 *     tags:
 *       - Consultas
 *     summary: Lista todas as consultas
 *     responses:
 *       '200':
 *         description: Lista de consultas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Consultas
 *     summary: Cria uma nova consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateConsultaDto'
 *     responses:
 *       '201':
 *         description: Consulta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', consultasController.findAll);
router.post('/', consultasController.create);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     tags:
 *       - Consultas
 *     summary: Busca uma consulta pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da consulta
 *     responses:
 *       '200':
 *         description: Detalhes da consulta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   put:
 *     tags:
 *       - Consultas
 *     summary: Atualiza uma consulta existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateConsultaDto'
 *     responses:
 *       '200':
 *         description: Consulta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     tags:
 *       - Consultas
 *     summary: Remove uma consulta
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da consulta
 *     responses:
 *       '204':
 *         description: Consulta removida com sucesso
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', consultasController.findById);
router.put('/:id', consultasController.update);
router.delete('/:id', consultasController.delete);

export default router;
