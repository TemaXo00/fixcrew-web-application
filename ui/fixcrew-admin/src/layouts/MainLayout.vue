<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/main/Header.vue'
import MainView from '@/components/main/MainView.vue'
import MainWrapper from '@/components/main/MainWrapper.vue'
import Sidebar from '@/components/main/sidebar/Sidebar.vue'

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
