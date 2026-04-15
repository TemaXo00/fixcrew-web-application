<script setup lang="ts">
import { useRouter } from 'vue-router'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const router = useRouter()

const goHome = () => router.push('/')
const goBack = () => router.go(-1)
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <OutlineButton
      class="text-lg medium:text-2xl medium:px-12 medium:py-4 border-2 medium:border-4"
      name="Back"
      @click="goBack"
    />
    <button
      class="text-sm medium:text-lg text-muted-accent font-normal font-secondary underline hover:text-muted-accent/80 transition-all duration-300"
      @click="goHome"
    >
      Go to home
    </button>
  </div>
</template>

<style scoped></style>
