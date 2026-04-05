<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import SidebarWrapper from '@/components/sidebar/SidebarWrapper.vue'

const router = useRouter()

const menuItems = computed(() => router
  .getRoutes()
  .filter(route => route.meta?.showInSidebar === true)
  .map(route => ({
    name: route.name,
    to: route.path,
  })))
</script>

<template>
  <SidebarWrapper>
    <SidebarLink
      v-for="item in menuItems"
      :key="item.name"
      :to="item.to"
      :name="item.name"
    />
  </SidebarWrapper>
</template>

<style scoped></style>
