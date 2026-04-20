<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SidebarLink from '@/components/layout-main/sidebar/SidebarLink.vue'
import SidebarWrapper from '@/components/layout-main/sidebar/SidebarWrapper.vue'

const router = useRouter()
const isOpen = ref(false)

const menuItems = computed(() =>
  router
    .getRoutes()
    .filter(route => route.meta?.showInSidebar === true)
    .map(route => ({
      name: route.name,
      to: route.path,
    })),
)

const closeSidebar = () => {
  isOpen.value = false
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const openSidebar = () => {
  isOpen.value = true
}

watch(
  () => router.currentRoute.value,
  () => {
    if (isOpen.value) {
      closeSidebar()
    }
  },
)

defineExpose({
  toggleSidebar,
  openSidebar,
})
</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 z-40 medium:hidden"
      @click="closeSidebar"
    />

    <SidebarWrapper
      class="fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 medium:translate-x-0 medium:relative"
      :class="[isOpen ? 'translate-x-0' : '-translate-x-full']"
    >
      <SidebarLink
        v-for="item in menuItems"
        :key="item.name"
        :to="item.to"
        :name="item.name"
        @click="closeSidebar"
      />
    </SidebarWrapper>
  </div>
</template>

<style scoped></style>
