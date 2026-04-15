<script setup lang="ts">
import type { AuthLoginType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import AuthFooter from '@/components/layout-auth/AuthFooter.vue'
import AuthHeader from '@/components/layout-auth/AuthHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import PasswordInput from '@/components/shared/inputs/PasswordInput.vue'
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
  <AuthHeader name="Welcome Back" />
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
    <ErrorShort
      v-if="errors.email"
      :error="errors.email"
    />
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
    <ErrorCode
      v-if="authStore.errorCode"
      :message="authStore.errorMessage"
      :code="authStore.errorCode"
    />
  </form>
  <AuthFooter
    name="Forgot Password?"
    link-name="Restore"
    link="/auth/restore"
  />
</template>
