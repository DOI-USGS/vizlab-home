import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'VisualizationContent',
      component: HomePage
    },
    {
      path: '/index.html',
      name: 'Index',
      component: HomePage
    },
    {
      path: "/404",
      name: "Error404",
      component: lazyLoad('Error404Page')
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: { name: "Error404" }
    },
    {
      path: "/collections/:sectionId",
      name: "SectionDetail",
      component: () => import("@/views/SectionDetailPage.vue"),
      props: true
    }
  ]
})

export default router
