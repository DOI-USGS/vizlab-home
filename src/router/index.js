import { createRouter, createWebHistory } from 'vue-router'
import VisualizationView from '../views/VisualizationView.vue'

function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

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
      name: "Error404",
      component: lazyLoad('VisualizationContent')
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: { name: "VisualizationContent" }
    }
  ]
})

export default router
