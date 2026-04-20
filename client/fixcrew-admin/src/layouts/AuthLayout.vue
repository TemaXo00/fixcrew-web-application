<script setup lang="ts">
import AuthBackground from '@/components/layout-auth/AuthBackground.vue'
import AuthWrapper from '@/components/layout-auth/AuthWrapper.vue'
</script>

<template>
  <AuthWrapper>
    <AuthBackground>
      <router-view />
    </AuthBackground>
  </AuthWrapper>
</template>

<style scoped></style>
