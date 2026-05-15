import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import BookingPage from '@/pages/BookingPage.vue'
import ServicePage from '@/pages/ServicePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import TypeDetailedPage from '@/pages/TypeDetailedPage.vue'
import CategoryDetailedPage from '../pages/CategoryDetailedPage.vue'
import PrivacyPolicy from '@/pages/PrivacyPolicy.vue'
import AboutPage from '@/pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: MainPage,
      meta: {
        title: 'Home',
      }
    },
    {
      name: 'Booking',
      path: '/booking',
      component: BookingPage,
      meta: {
        title: 'Booking',
      }
    },
    {
      name: 'TypeDetailed',
      path: '/type/:id',
      component: TypeDetailedPage,
    },
    {
      name: 'CategoryDetailedPage',
      path: '/category/:id',
      component: CategoryDetailedPage,
    },
    {
      name: 'Service',
      path: '/service/:slug',
      component: ServicePage,
    },
    {
      name: 'PrivacyPolicy',
      path: '/privacy-policy',
      component: PrivacyPolicy
    },
    {
      name: 'About',
      path: '/about',
      component: AboutPage,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
})

router.beforeEach((to) => {
  const baseTitle: string = 'FixCrew';

  if (to.meta.title) {
    document.title = `${baseTitle} - ${to.meta.title}`
  }
  else {
    document.title = `${baseTitle}`
  }
})

export default router
