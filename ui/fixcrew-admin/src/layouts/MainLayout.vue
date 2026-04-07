<script setup lang="ts">
import { ref } from 'vue'
import MainView from '@/components/main/MainView.vue'
import MainWrapper from '@/components/main/MainWrapper.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'

const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null)

const handleToggle = () => {
  sidebarRef.value?.toggleSidebar()
}
</script>

<template>
  <MainWrapper>
    <SidebarHeader @toggle="handleToggle" />
    <Sidebar ref="sidebarRef" />
    <MainView>
      <router-view />
    </MainView>
  </MainWrapper>
</template>

<style scoped></style>
