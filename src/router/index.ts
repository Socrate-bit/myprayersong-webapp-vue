import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/funnel',
      name: 'funnel',
      component: () => import('../views/FunnelPage/FunnelPage.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentPage/PaymentPage.vue')
    }
  ]
})

export default router
