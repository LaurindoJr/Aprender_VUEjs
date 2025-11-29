import { createRouter, createWebHistory } from 'vue-router'
import AgendamentoView from '../views/AgendamentoView.vue' 
import PacienteView from '../views/PacienteView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/agendamento', 
      name: 'agendamento',
      component: AgendamentoView,
    },
    {
      path: '/pacientes', 
      name: 'pacientes',
      component: PacienteView,
    },
    {
      path: '/medicos', 
      name: 'medicos',
      component: () => import('../views/MedicoView.vue'),
    },
  ],
})

export default router
