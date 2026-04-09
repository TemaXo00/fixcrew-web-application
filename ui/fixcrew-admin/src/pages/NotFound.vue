<script setup lang="ts">
import NotFoundActions from '@/components/not-found/NotFoundActions.vue'
import NotFoundBg from '@/components/not-found/NotFoundBg.vue'
import NotFoundImage from '@/components/not-found/NotFoundImage.vue'
import NotFoundText from '@/components/not-found/NotFoundText.vue'
import NotFoundWrapper from '@/components/not-found/NotFoundWrapper.vue'
</script>

<template>
  <NotFoundBg>
    <NotFoundWrapper>
      <NotFoundImage />
      <NotFoundText />
      <NotFoundActions />
    </NotFoundWrapper>
  </NotFoundBg>
</template>

<style scoped></style>
