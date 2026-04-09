<script setup lang="ts">
import NotFoundBg from '@/components/notFound/NotFoundBg.vue'
import NotFoundWrapper from '@/components/notFound/NotFoundWrapper.vue'
import NotFoundImage from '@/components/notFound/NotFoundImage.vue'
import NotFoundText from '@/components/notFound/NotFoundText.vue'
import NotFoundActions from '@/components/notFound/NotFoundActions.vue'
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
