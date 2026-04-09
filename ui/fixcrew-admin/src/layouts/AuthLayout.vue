<script setup lang="ts">
import AuthBackground from '@/components/authorization/AuthBackground.vue'
import AuthWrapper from '@/components/authorization/AuthWrapper.vue'
</script>

<template>
  <AuthWrapper>
    <AuthBackground>
      <router-view />
    </AuthBackground>
  </AuthWrapper>
</template>

<style scoped></style>
