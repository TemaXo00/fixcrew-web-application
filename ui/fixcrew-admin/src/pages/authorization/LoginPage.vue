<script setup lang="ts">
import type { AuthLoginType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import FormFooter from '@/components/authorization/FormFooter.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import AccentButton from '@/components/shared/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/InputComponent.vue'
import PasswordInput from '@/components/shared/PasswordInput.vue'
import { useAuthStore } from '@/stores/auth.store'
import { loginSchema } from '@/utils/validation/auth.validation'

const router = useRouter()
const authStore = useAuthStore()

const { defineField, handleSubmit, errors } = useForm<AuthLoginType>({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values)
    await router.push('/')
  }
  catch {}
})
</script>

<template>
  <FormHeader name="Welcome Back" />
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
    <PasswordInput
      v-model="password"
      name="Password"
      place-text="Pass@wd123"
      :is-necessary="true"
    />
    <AccentButton
      name="Log in"
      :is-loading="authStore.isLoading"
    />
    <ErrorDisplay :error="authStore.error" />
  </form>
  <FormFooter
    name="Forgot Password?"
    link-name="Restore"
    link="/restore"
  />
</template>
