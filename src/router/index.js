import { createRouter, createWebHistory } from 'vue-router'
import VisualizationView from '../views/VisualizationView.vue'
import Error404 from '../components/Error404.vue'

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
    },
    {
      path: "/404",
      name: "error404",
      component: Error404
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'not-found', 
      component: Error404 }
  ]
})

export default router
