<script setup lang="ts">
import type { InviteSendType } from '@/types/token.types.ts'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api'
import { tokenApi } from '@/api/user/tokens.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { tokenValidation } from '@/utils/validation/token.validation.ts'

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'tokenCreated'): void
}>()

const isLoading = ref<boolean>(false)
const errorCode = ref<number | null>(null)
const errorMessage = ref<string>('')

const closeWindow = () => {
  emits('close')
}

const { defineField, handleSubmit, errors, resetForm } = useForm<InviteSendType>({
  validationSchema: toTypedSchema(tokenValidation),
})

const [email, emailAttrs] = defineField('email')

const inviteSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  errorCode.value = null
  errorMessage.value = ''

  try {
    await tokenApi.createInviteToken(values)
    resetForm()
    emits('tokenCreated')
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
})
</script>

<template>
  <form
    class="flex flex-col gap-3"
    @submit="inviteSubmit"
  >
    <InputComponent
      v-model="email"
      name="Email"
      type="email"
      place-text="example@example.com"
      :is-necessary="true"
      v-bind="emailAttrs"
    />
    <ErrorShort
      v-if="errors.email"
      :error="errors.email"
    />
    <div class="flex flex-row gap-3">
      <AccentButton
        name="Send invite"
        :is-loading="isLoading"
        @click="inviteSubmit"
      />
      <OutlineButton
        name="Close"
        @click="closeWindow"
      />
    </div>
    <ErrorCode
      v-if="errorCode"
      :message="errorMessage"
      :code="errorCode"
    />
  </form>
</template>
