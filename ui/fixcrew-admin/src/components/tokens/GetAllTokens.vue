<script setup lang="ts">
import type { PaginatedResponse } from '@/types/shared/pagination.types.ts'
import type { Token } from '@/types/user/token.types.ts'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import Pagination from '@/components/shared/Pagination.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'
import TokenItem from '@/components/tokens/TokenItem.vue'

const tokens = ref<PaginatedResponse<Token>>()
const isLoading = ref<boolean>(false)
const errorCode = ref<number | null>(null)
const currentPage = ref<number>(1)
const limit = ref<number>(10)

const fetchTokens = async () => {
  try {
    isLoading.value = true
    errorCode.value = null
    tokens.value = await tokenApi.getTokens({ page: currentPage.value, limit: limit.value })
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    errorCode.value = apiError.statusCode
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
  <SpinnerLoader v-if="isLoading && !tokens" />

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

    <ErrorCode
      v-if="errorCode"
      :code="errorCode"
    />

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
</template>
