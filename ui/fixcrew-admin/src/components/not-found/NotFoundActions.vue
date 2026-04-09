<script setup lang="ts">
import { useRouter } from 'vue-router'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const router = useRouter()

const goHome = () => router.push('/')
const goBack = () => router.go(-1)
</script>

<template>
  <div class="flex flex-col items-start medium:items-center gap-5">
    <OutlineButton
      class="text-2xl px-12 py-4"
      name="Back"
      @click="goBack"
    />
    <button
      class="text-lg text-muted-accent font-normal underline hover:text-muted-accent/80 transition-all duration-300"
      @click="goHome"
    >
      Go to home
    </button>
  </div>
</template>

<style scoped></style>
