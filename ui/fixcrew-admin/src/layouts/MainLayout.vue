<script setup lang="ts">
import MainView from '@/components/main/MainView.vue'
import MainWrapper from '@/components/main/MainWrapper.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
</script>

<template>
  <MainWrapper>
    <Sidebar />
    <MainView>
      <router-view />
    </MainView>
  </MainWrapper>
</template>

<style scoped></style>
