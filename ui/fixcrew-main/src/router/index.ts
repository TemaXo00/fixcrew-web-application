import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import BookingPage from '@/pages/BookingPage.vue'
import InfoPage from '@/pages/InfoPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

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
      name: 'Info',
      path: '/info/:slug',
      component: InfoPage,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
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
