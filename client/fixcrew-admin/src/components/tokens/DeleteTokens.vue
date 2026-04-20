<script setup lang="ts">
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { tokenApi } from '@/api/user/tokens.api.ts'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'tokensDeleted'): void
}>()

const isLoading = ref<boolean>(false)
const errorCode = ref<number | null>(null)
const errorMessage = ref<string>('')

const closeWindow = () => {
  emits('close')
}

const deleteTokens = async () => {
  isLoading.value = true
  errorCode.value = null
  errorMessage.value = ''

  try {
    await tokenApi.removeTokens()
    emits('tokensDeleted')
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    errorMessage.value = apiError.message
    errorCode.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <p class="text-red-400">
      Are you really sure want to delete tokens? Action remove all tokens with statuses:
      <span class="font-semibold">'REVOKED', 'EXPIRED', 'USED'</span>
    </p>
    <p class="text-red-500 font-semibold">
      This action cannot be undone later!
    </p>
    <div class="flex flex-col medium:flex-row items-center gap-3">
      <DangerousButton
        name="Yes, i want to delete"
        :is-loading="isLoading"
        @click="deleteTokens"
      />
      <OutlineButton
        name="No, i want to cancel"
        @click="closeWindow"
      />
    </div>
    <ErrorCode
      v-if="errorCode"
      :message="errorMessage"
      :code="errorCode"
    />
  </div>
</template>

<style scoped></style>
