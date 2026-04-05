import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { HomeIcon, TicketIcon } from '@heroicons/vue/24/solid'

export interface MenuItem {
  to: RouteLocationRaw
  name: string
  icon: Component
}

export const menuItems: MenuItem[] = [
  {
    to: '/',
    name: 'Dashboard',
    icon: HomeIcon,
  },
  {
    to: '/tokens',
    name: 'Tokens',
    icon: TicketIcon,
  },
]
