<script setup lang="ts">
import type { TokensStats } from '@/types/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import Title from '@/components/shared/Title.vue'
import StatsCard from '@/components/tokens/StatsCard.vue'

const stats = ref<TokensStats>()
const isLoading = ref<boolean>(false)
const errorCode = ref<number | null>(null)

const fetchStats = async () => {
  try {
    errorCode.value = null
    isLoading.value = true
    stats.value = await tokenApi.getTokenStats()
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    errorCode.value = apiError.statusCode
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
  <ErrorCode
    v-if="errorCode"
    :code="errorCode"
  />
  <div
    v-else
    class="flex flex-col gap-2"
  >
    <Title title="Token Stats" />
    <div class="flex flex-col xl:flex-row items-center justify-center gap-3">
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
  </div>
</template>

<style scoped></style>
