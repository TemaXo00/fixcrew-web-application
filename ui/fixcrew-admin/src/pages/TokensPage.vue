<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GetAllTokens from '@/components/tokens/GetAllTokens.vue'
import TokenActions from '@/components/tokens/TokenActions.vue'
import TokensStats from '@/components/tokens/TokensStats.vue'

const tokensListRef = ref<{ refreshTokens: () => void } | null>(null)
const statsRef = ref<{ refreshStats: () => void } | null>(null)
const tokenActionsRef = ref<{ tokensListRef: any, statsRef: any } | null>(null)

onMounted(() => {
  if (tokenActionsRef.value) {
    tokenActionsRef.value.tokensListRef = tokensListRef.value
    tokenActionsRef.value.statsRef = statsRef.value
  }
})
</script>

<template>
  <TokensStats ref="statsRef" />
  <TokenActions ref="tokenActionsRef" />
  <GetAllTokens ref="tokensListRef" />
</template>

<style scoped></style>
