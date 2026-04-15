<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/layout-main/Header.vue'
import MainView from '@/components/layout-main/MainView.vue'
import MainWrapper from '@/components/layout-main/MainWrapper.vue'
import Sidebar from '@/components/layout-main/sidebar/Sidebar.vue'

const sidebarRef = ref<InstanceType<typeof Sidebar> | null>(null)

const handleToggle = () => {
  sidebarRef.value?.toggleSidebar()
}
</script>

<template>
  <MainWrapper>
    <Header @toggle="handleToggle" />
    <Sidebar ref="sidebarRef" />
    <MainView>
      <router-view />
    </MainView>
  </MainWrapper>
</template>

<style scoped></style>
