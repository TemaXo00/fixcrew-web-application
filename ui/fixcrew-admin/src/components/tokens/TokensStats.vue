<script setup lang="ts">
import type { TokensStats } from '@/types/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import StatsCard from '@/components/tokens/StatsCard.vue'

const stats = ref<TokensStats>()
const isLoading = ref<boolean>(false)
const error = ref<string>('')

const fetchStats = async () => {
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
}

const refreshStats = () => {
  fetchStats()
}

defineExpose({
  refreshStats,
})

onMounted(async () => {
  await fetchStats()
})
</script>

<template>
  <div
    v-if="error"
    class="flex items-center justify-center p-12"
  >
    <ErrorDisplay :error="error" />
  </div>
  <div
    v-else
    class="flex flex-col xl:flex-row items-center justify-center gap-3"
  >
    <StatsCard
      :value="stats?.all"
      name="All Tokens"
      :is-loading="isLoading"
    />
    <StatsCard
      :value="stats?.created"
      name="Created Tokens"
      :is-loading="isLoading"
    />
    <StatsCard
      :value="stats?.used"
      name="Used Tokens"
      :is-loading="isLoading"
    />
    <StatsCard
      :value="stats?.revoked"
      name="Revoked Tokens"
      :is-loading="isLoading"
    />
    <StatsCard
      :value="stats?.expired"
      name="Expired Tokens"
      :is-loading="isLoading"
    />
  </div>
</template>

<style scoped></style>
