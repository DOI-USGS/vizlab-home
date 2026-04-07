import { createRouter, createWebHistory } from "vue-router"
import Error404Page from "@/views/Error404Page.vue"
import HomePage from "@/views/HomePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "VisualizationContent",
      component: HomePage
    },
    {
      path: "/index.html",
      name: "Index",
      component: HomePage
    },
    {
      path: "/404",
      name: "Error404",
      component: Error404Page
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Error404" }
    }
  ]
})

export default router
