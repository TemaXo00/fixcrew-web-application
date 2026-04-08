<script setup lang="ts">
import NFActions from '@/components/not-found/NFActions.vue'
import NFBackground from '@/components/not-found/NFBackground.vue'
import NFHeader from '@/components/not-found/NFHeader.vue'
import NFText from '@/components/not-found/NFText.vue'
import NFWrapper from '@/components/not-found/NFWrapper.vue'
</script>

<template>
  <NFWrapper>
    <NFBackground>
      <NFHeader />
      <NFText />
      <NFActions />
    </NFBackground>
  </NFWrapper>
</template>

<style scoped></style>
