import { Router } from 'express';
import pacientesRoutes from './pacientes.routes';
import medicosRoutes from './medicos.routes';
import consultasRoutes from './consultas.routes';

const router = Router();

router.use('/pacientes', pacientesRoutes);
router.use('/medicos', medicosRoutes);
router.use('/consultas', consultasRoutes);

export default router;
