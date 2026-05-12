import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginPage from '@/pages/authorization/LoginPage.vue'
import RegisterPage from '@/pages/authorization/RegisterPage.vue'
import RestorePage from '@/pages/authorization/RestorePage.vue'
import RestoreSendPage from '@/pages/authorization/RestoreSendPage.vue'
import CatalogPage from '@/pages/dashboard/CatalogPage.vue'
import DashboardPage from '@/pages/dashboard/DashboardPage.vue'
import RegionsPage from '@/pages/dashboard/RegionsPage.vue'
import TokensPage from '@/pages/dashboard/TokensPage.vue'
import NotFound from '@/pages/NotFound.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      redirect: '/auth/login',
      children: [
        {
          path: 'register',
          name: 'Register',
          component: RegisterPage,
          meta: {
            title: 'Register',
            requiresGuest: true,
          },
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginPage,
          meta: {
            title: 'Login',
            requiresGuest: true,
          },
        },
        {
          path: 'restore',
          name: 'Restore send',
          component: RestoreSendPage,
          meta: {
            title: 'Restore send',
            requiresGuest: true,
          },
        },
        {
          path: 'restore/use',
          name: 'Restore',
          component: RestorePage,
          meta: {
            title: 'Restore',
            requiresGuest: true,
          },
        },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DashboardPage,
          meta: {
            title: 'Dashboard',
            showInSidebar: true,
          },
        },
        {
          path: 'tokens',
          name: 'Tokens',
          component: TokensPage,
          meta: {
            title: 'Tokens',
            showInSidebar: true,
          },
        },
        {
          path: 'regions',
          name: 'Regions',
          component: RegionsPage,
          meta: {
            title: 'Regions',
            showInSidebar: true,
          },
        },
        {
          path: 'catalog',
          name: 'Catalog',
          component: CatalogPage,
          meta: {
            title: 'Catalog',
            showInSidebar: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Not Found',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const baseTitle: string = 'Admin'
  document.title = to.meta.title ? `${baseTitle} - ${to.meta.title}` : baseTitle

  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.accessToken) {
    const refreshed = await authStore.init()
    if (!refreshed) {
      return next('/auth/login')
    }
  }

  if (to.meta.requiresGuest && authStore.accessToken) {
    return next('/')
  }

  next()
})

export default router
