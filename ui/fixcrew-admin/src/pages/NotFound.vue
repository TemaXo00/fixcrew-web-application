<script setup lang="ts">
import NotFoundActions from '@/components/layout-not-found/NotFoundActions.vue'
import NotFoundBg from '@/components/layout-not-found/NotFoundBg.vue'
import NotFoundImage from '@/components/layout-not-found/NotFoundImage.vue'
import NotFoundText from '@/components/layout-not-found/NotFoundText.vue'
import NotFoundWrapper from '@/components/layout-not-found/NotFoundWrapper.vue'
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
