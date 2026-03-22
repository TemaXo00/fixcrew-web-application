import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RestorePage from '@/pages/RestorePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: 'Home',
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage,
      meta: {
        title: 'Register',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/restore',
      name: 'Restore',
      component: RestorePage,
      meta: {
        title: 'Restore'
      }
    }
  ],
})

router.beforeEach((to) => {
  const baseTitle: string = 'Admin'

  document.title = to.meta.title ? `${baseTitle} - ${to.meta.title}` : baseTitle

  return true
})

export default router
