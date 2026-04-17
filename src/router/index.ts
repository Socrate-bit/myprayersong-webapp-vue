import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage/LandingPage.vue'
import { usePostHog } from '@/composables/usePostHog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/SuccessPage/SuccessPage.vue')
    },
    {
      path: '/failure',
      name: 'failure',
      component: () => import('../views/FailurePage/FailurePage.vue')
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/LegalPage/TermsPage.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/LegalPage/PrivacyPage.vue')
    },
    {
      path: '/track-order',
      name: 'track-order',
      component: () => import('../views/TrackOrderPage/TrackOrderPage.vue')
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('../views/ReviewsPage/ReviewsPage.vue')
    }
  ]
})

const { posthog } = usePostHog()
posthog.is_capturing()

router.afterEach(() => {
  // Track Meta Pixel PageView
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }

  posthog.capture('page_view', {
    url: window.location.href
  })
})

export default router
