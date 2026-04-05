<script setup lang="ts">
import type { TokenRevokeType } from '@/types/token.types.ts'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import DangerousButton from '@/components/shared/DangerousButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'

const props = defineProps<Props>()
const emit = defineEmits<{
  revoked: [tokenId: string, oldStatus: string]
}>()

const isLoading = ref<boolean>(false)
const error = ref<string>('')

interface Props {
  tokenId: string
  email: string
  status: string
  type: string
  expiresAt: string
}

const tokenRevoke = ref<TokenRevokeType>({
  id: props.tokenId,
})

const revokeToken = async () => {
  isLoading.value = true
  error.value = ''

  try {
    await tokenApi.revokeToken(tokenRevoke.value)
    emit('revoked', props.tokenId, props.status)
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
}

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()
</script>

<template>
  <div
    class="flex flex-col small:grid small:grid-cols-5 gap-2 items-start small:items-center bg-dimmed/30 min-h-20 p-3 small:p-2 rounded-lg text-sm small:text-lg"
  >
    <p class="font-black text-accent break-all w-full small:w-auto">
      {{ props.email }}
    </p>
    <p class="font-medium text-container">
      {{ props.status.toLowerCase() }}
    </p>
    <p class="font-medium text-container">
      {{ props.type.toLowerCase() }}
    </p>
    <p class="font-medium text-container text-xs smaller:text-sm small:text-base">
      {{ formatDate(expiresAt) }}
    </p>
    <div class="w-full small:w-auto mt-2 small:mt-0">
      <DangerousButton
        v-if="status === 'CREATED'"
        name="Revoke"
        :is-loading="isLoading"
        @click="revokeToken"
      />
    </div>
  </div>
  <ErrorDisplay
    v-if="error"
    :error="error"
  />
</template>
