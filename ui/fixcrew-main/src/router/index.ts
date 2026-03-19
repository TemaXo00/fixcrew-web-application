import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import BookingPage from '@/pages/BookingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
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
