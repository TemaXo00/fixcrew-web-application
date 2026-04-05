<script setup lang="ts">
import type { InviteSendType } from '@/types/token.types.ts'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api'
import { tokenApi } from '@/api/user/tokens.api.ts'
import AccentButton from '@/components/shared/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import { tokenValidation } from '@/utils/validation/token.validation.ts'

const isLoading = ref<boolean>(false)
const error = ref<string>('')

const { defineField, handleSubmit, errors, resetForm } = useForm<InviteSendType>({
  validationSchema: toTypedSchema(tokenValidation),
})

const [email, emailAttrs] = defineField('email')

const inviteSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  error.value = ''

  try {
    await tokenApi.createInviteToken(values)
    resetForm()
  }
  catch (err) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <form @submit="inviteSubmit">
    <InputComponent
      v-model="email"
      name="Email"
      type="email"
      place-text="example@example.com"
      :is-necessary="true"
      v-bind="emailAttrs"
    />
    <ErrorDisplay
      v-if="errors.email"
      :error="errors.email"
    />
    <AccentButton
      name="Send invite"
      :is-loading="isLoading"
    />
    <ErrorDisplay
      v-if="error"
      :error="error"
    />
  </form>
</template>
