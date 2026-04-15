<script setup lang="ts">
import type { AuthRestoreSendType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import AuthFooter from '@/components/layout-auth/AuthFooter.vue'
import AuthHeader from '@/components/layout-auth/AuthHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
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
    <ErrorShort
      v-if="errors.email"
      :error="errors.email"
    />
    <AccentButton
      name="Send email"
      :is-loading="authStore.isLoading"
    />
  </form>
  <AuthFooter
    name=""
    link-name="Back"
    link="/auth/login"
  />
</template>
