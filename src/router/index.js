import { createRouter, createWebHistory } from 'vue-router'
import VisualizationView from '../views/VisualizationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'VisualizationContent',
      component: VisualizationView
    },
    {
      path: '/index.html',
      name: 'Index',
      component: VisualizationView
    }
  ]
})

export default router
