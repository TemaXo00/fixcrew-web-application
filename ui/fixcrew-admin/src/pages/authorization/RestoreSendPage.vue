<script setup lang="ts">
import type { AuthRestoreSendType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import AuthFooter from '@/components/authorization/AuthFooter.vue'
import AuthHeader from '@/components/authorization/AuthHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { useAuthStore } from '@/stores/auth.store'
import { restoreSendSchema } from '@/utils/validation/auth.validation'

const router = useRouter()
const authStore = useAuthStore()

const { defineField, handleSubmit, errors } = useForm<AuthRestoreSendType>({
  validationSchema: toTypedSchema(restoreSendSchema),
})

const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.sendRestore(values)
    await router.push('/auth/login')
  }
  catch {}
})
</script>

<template>
  <AuthHeader name="Restore account" />
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <InputComponent
      v-model="email"
      v-bind="emailAttrs"
      name="Email"
      type="email"
      place-text="example@example.com"
      :is-necessary="true"
    />
    <span
      v-if="errors.email"
      class="text-red-500 text-sm -mt-2 mb-2"
    >{{ errors.email }}</span>
    <AccentButton
      name="Send email"
      :is-loading="authStore.isLoading"
    />
    <ErrorDisplay :error="authStore.error" />
  </form>
  <AuthFooter
    name=""
    link-name="Back"
    link="/auth/login"
  />
</template>
