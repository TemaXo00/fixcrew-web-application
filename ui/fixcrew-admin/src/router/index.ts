import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginPage from '@/pages/authorization/LoginPage.vue'
import RegisterPage from '@/pages/authorization/RegisterPage.vue'
import RestorePage from '@/pages/authorization/RestorePage.vue'
import RestoreSendPage from '@/pages/authorization/RestoreSendPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import TokensPage from '@/pages/TokensPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'register',
          name: 'Register',
          component: RegisterPage,
          meta: {
            title: 'Register',
          },
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginPage,
          meta: {
            title: 'Login',
          },
        },
        {
          path: 'restore',
          name: 'Restore send',
          component: RestoreSendPage,
          meta: {
            title: 'Restore send',
          },
        },
        {
          path: 'restore/use',
          name: 'Restore',
          component: RestorePage,
          meta: {
            title: 'Restore',
          },
        },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: DashboardPage,
          meta: {
            title: 'Dashboard',
          },
        },
        {
          path: 'tokens',
          component: TokensPage,
          meta: {
            title: 'Tokens',
          },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const baseTitle: string = 'Admin'

  document.title = to.meta.title ? `${baseTitle} - ${to.meta.title}` : baseTitle

  return true
})

export default router
