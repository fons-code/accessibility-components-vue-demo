import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DynamicWorkflows from '../views/DynamicWorkflows.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/flujos-accesibles',
    name: 'DynamicWorkflows',
    component: DynamicWorkflows
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

