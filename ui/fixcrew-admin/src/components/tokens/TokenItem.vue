<script setup lang="ts">
import type { TokenRevokeType } from '@/types/token.types.ts'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'

const props = defineProps<Props>()
const emit = defineEmits<{
  revoked: [tokenId: string, oldStatus: string]
}>()

const isLoading = ref<boolean>(false)
const error = ref<string>('')
const localStatus = ref(props.status)

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
    localStatus.value = 'REVOKED'
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
    class="flex flex-col large:flex-row justify-between gap-3 items-start large:items-center border border-accent min-h-20 p-3 rounded-lg text-sm small:text-lg"
  >
    <p class="font-black text-accent break-all min-w-[150px] large:min-w-[200px]">
      {{ props.email }}
    </p>
    <p class="font-medium text-dimmed min-w-[80px]">
      {{ localStatus.toLowerCase() }}
    </p>
    <p class="font-medium text-accent min-w-[80px]">
      {{ props.type.toLowerCase() }}
    </p>
    <p class="font-medium text-muted-accent text-xs smaller:text-sm small:text-base min-w-[100px]">
      {{ formatDate(expiresAt) }}
    </p>
    <div class="min-w-[100px]">
      <DangerousButton
        v-if="localStatus === 'CREATED'"
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
