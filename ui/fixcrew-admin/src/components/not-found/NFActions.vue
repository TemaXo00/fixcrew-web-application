<script setup lang="ts">
import { useRouter } from 'vue-router'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="flex flex-col medium:flex-row gap-3">
    <AccentButton
      name="Go to home"
      @click="goHome"
    />
    <OutlineButton
      name="Back"
      @click="goBack"
    />
  </div>
</template>

<style scoped></style>
