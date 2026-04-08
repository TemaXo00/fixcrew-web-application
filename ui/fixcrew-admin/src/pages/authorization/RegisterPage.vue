<script setup lang="ts">
import type { AuthRegister } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormHeader from '@/components/authorization/FormHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import PasswordInput from '@/components/shared/inputs/PasswordInput.vue'
import { useAuthStore } from '@/stores/auth.store'
import { registerSchema } from '@/utils/validation/auth.validation'
import FormFooter from '@/components/authorization/FormFooter.vue'

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
    authStore.setError('Invalid registration link')
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
  <FormHeader name="Create an account" />
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
    <span
      v-if="errors.name"
      class="text-red-500 text-sm -mt-2 mb-2"
    >{{ errors.name }}</span>
    <InputComponent
      v-model="surname"
      v-bind="surnameAttrs"
      name="Surname"
      type="text"
      place-text="Doe"
      :is-necessary="true"
    />
    <span
      v-if="errors.surname"
      class="text-red-500 text-sm -mt-2 mb-2"
    >{{
      errors.surname
    }}</span>
    <InputComponent
      v-model="phone_number"
      v-bind="phoneAttrs"
      name="Phone Number"
      type="tel"
      place-text="xxx-xxx-xxxx"
      :is-necessary="true"
    />
    <span
      v-if="errors.phone_number"
      class="text-red-500 text-sm -mt-2 mb-2"
    >{{
      errors.phone_number
    }}</span>
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
      v-bind="passwordAttrs"
      name="Password"
      place-text="Pass@wd123"
      :is-necessary="true"
    />
    <span
      v-if="errors.password"
      class="text-red-500 text-sm -mt-2 mb-2"
    >{{
      errors.password
    }}</span>
    <AccentButton
      name="Sign up"
      :is-loading="authStore.isLoading"
    />
    <FormFooter
      name="Already have account?"
      link="/auth/login"
      link-name="Login"
    />
    <ErrorDisplay :error="authStore.error" />
  </form>
</template>
