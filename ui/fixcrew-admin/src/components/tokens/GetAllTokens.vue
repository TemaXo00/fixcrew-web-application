<script setup lang="ts">
import type { PaginatedResponse } from '@/types/pagination.types.ts'
import type { Token } from '@/types/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import TokenItem from '@/components/tokens/TokenItem.vue'

const tokens = ref<PaginatedResponse<Token>>()
const isLoading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
  try {
    isLoading.value = true
    tokens.value = await tokenApi.getTokens()
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
  <TokenItem
    v-for="token in tokens?.items"
    :key="token.id"
    :token-id="token.id"
    :email="token.email"
    :status="token.status"
    :type="token.type"
    :expires-at="token.expires_at"
  />
</template>

<style scoped></style>
