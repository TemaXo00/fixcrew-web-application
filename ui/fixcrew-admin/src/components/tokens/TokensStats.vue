<script setup lang="ts">
import type { TokensStats } from '@/types/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import StatsCard from '@/components/tokens/StatsCard.vue'

const stats = ref<TokensStats>()
const isLoading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
  try {
    isLoading.value = true
    stats.value = await tokenApi.getTokenStats()
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col medium:flex-row items-center justify-center gap-5">
    <StatsCard
      :value="stats?.all"
      name="All Tokens"
    />
    <StatsCard
      :value="stats?.created"
      name="Created Tokens"
    />
    <StatsCard
      :value="stats?.used"
      name="Used Tokens"
    />
    <StatsCard
      :value="stats?.revoked"
      name="Revoked Tokens"
    />
    <StatsCard
      :value="stats?.expired"
      name="Expired Tokens"
    />
  </div>
</template>

<style scoped></style>
