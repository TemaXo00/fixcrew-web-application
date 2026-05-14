<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => router.push('/')

const goBack = () => {
  router.back()

  setTimeout(() => {
    const currentRoute = router.currentRoute.value
    if (currentRoute.name === 'NotFound') {
      router.push('/')
    }
  }, 100)
}
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <button
      class="text-[32px] px-12 py-4 transition ease-in duration-300 outline-none font-semibold rounded-xl hover:scale-103 border border-main text-main"
      @click="goBack"
    >
      Go back
    </button>
    <button
      class="text-[24px] text-muted font-normal underline hover:text-muted/80 transition-all duration-300"
      @click="goHome"
    >
      Go to home
    </button>
  </div>
</template>

<style scoped></style>
