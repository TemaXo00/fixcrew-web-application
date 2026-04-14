<script setup lang="ts">
import type { PaginatedResponse } from '@/types/pagination.types.ts'
import type { Token } from '@/types/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import Pagination from '@/components/shared/Pagination.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'
import TokenItem from '@/components/tokens/TokenItem.vue'

const tokens = ref<PaginatedResponse<Token>>()
const isLoading = ref<boolean>(false)
const error = ref<string>('')
const currentPage = ref<number>(1)
const limit = ref<number>(10)

const fetchTokens = async () => {
  try {
    isLoading.value = true
    error.value = ''
    tokens.value = await tokenApi.getTokens({ page: currentPage.value, limit: limit.value })
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
}

const refreshTokens = () => {
  fetchTokens()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchTokens()
}

const handlePrev = () => {
  if (tokens.value?.hasPrev) {
    currentPage.value--
    fetchTokens()
  }
}

const handleNext = () => {
  if (tokens.value?.hasNext) {
    currentPage.value++
    fetchTokens()
  }
}

const handleTokenRevoked = (tokenId: string) => {
  if (tokens.value?.items) {
    const tokenIndex = tokens.value.items.findIndex(t => t.id === tokenId)
    if (tokenIndex !== -1 && tokens.value.items[tokenIndex]) {
      tokens.value.items[tokenIndex].status = 'REVOKED'
    }
  }
}

defineExpose({
  refreshTokens,
})

onMounted(async () => {
  await fetchTokens()
})
</script>

<template>
  <div
    v-if="isLoading && !tokens"
    class="flex items-center justify-center border-accent border p-10 rounded-lg"
  >
    <SpinnerLoader />
  </div>

  <div
    v-else
    class="flex flex-col gap-3"
  >
    <div
      v-if="isLoading && tokens"
      class="text-center py-2 text-sm text-dimmed"
    >
      Updating...
    </div>
    <Title title="Tokens" />
    <TokenItem
      v-for="token in tokens?.items"
      :key="token.id"
      :token-id="token.id"
      :email="token.email"
      :status="token.status"
      :type="token.type"
      :expires-at="token.expires_at"
      @revoked="handleTokenRevoked"
    />

    <div
      v-if="!tokens?.items?.length && !isLoading"
      class="text-center py-8 text-container"
    >
      No tokens found
    </div>

    <Pagination
      :current-page="tokens?.page || currentPage"
      :total-pages="tokens?.totalPages || 1"
      :has-next="tokens?.hasNext || false"
      :has-prev="tokens?.hasPrev || false"
      @page-change="handlePageChange"
      @prev="handlePrev"
      @next="handleNext"
    />
  </div>

  <ErrorDisplay
    v-if="error"
    :error="error"
    class="flex flex-col items-center justify-center"
  />
</template>
