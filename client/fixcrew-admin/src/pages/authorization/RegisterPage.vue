<script setup lang="ts">
import type { AuthRegister } from '@/types/user/auth.types.ts'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthFooter from '@/components/layout-auth/AuthFooter.vue'
import AuthHeader from '@/components/layout-auth/AuthHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import PasswordInput from '@/components/shared/inputs/PasswordInput.vue'
import { useAuthStore } from '@/stores/auth.store'
import { registerSchema } from '@/utils/validation/user/auth.validation.ts'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const token = computed(() => route.query.token as string | null)

const { defineField, handleSubmit, errors } = useForm<AuthRegister>({
  validationSchema: toTypedSchema(registerSchema),
})

const [name, nameAttrs] = defineField('name')
const [surname, surnameAttrs] = defineField('surname')
const [phone_number, phoneAttrs] = defineField('phone_number')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  if (!token.value) {
    authStore.setError('Invalid registration link', 400)
    return
  }
  try {
    await authStore.register(values, token.value)
    await router.push('/')
  }
  catch {}
})
</script>

<template>
  <AuthHeader name="Create an account" />
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
    <InputComponent
      v-model="name"
      v-bind="nameAttrs"
      name="Name"
      type="text"
      place-text="John"
      :is-necessary="true"
    />
    <ErrorShort
      v-if="errors.name"
      :error="errors.name"
    />
    <InputComponent
      v-model="surname"
      v-bind="surnameAttrs"
      name="Surname"
      type="text"
      place-text="Doe"
      :is-necessary="true"
    />
    <ErrorShort
      v-if="errors.surname"
      :error="errors.surname"
    />
    <InputComponent
      v-model="phone_number"
      v-bind="phoneAttrs"
      name="Phone Number"
      type="tel"
      place-text="xxx-xxx-xxxx"
      :is-necessary="true"
    />
    <ErrorShort
      v-if="errors.phone_number"
      :error="errors.phone_number"
    />
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
      v-bind="passwordAttrs"
      name="Password"
      place-text="Pass@wd123"
      :is-necessary="true"
    />
    <ErrorShort
      v-if="errors.password"
      :error="errors.password"
    />
    <AccentButton
      name="Sign up"
      :is-loading="authStore.isLoading"
    />
  </form>
  <ErrorCode
    v-if="authStore.errorCode"
    :message="authStore.errorMessage"
    :code="authStore.errorCode"
    class="mt-5"
  />
  <AuthFooter
    name="Already have account?"
    link="/auth/login"
    link-name="Login"
  />
</template>
