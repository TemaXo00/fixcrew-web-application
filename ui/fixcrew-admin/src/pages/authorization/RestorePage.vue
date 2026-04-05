<script setup lang="ts">
import type { AuthRestoreType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FormHeader from '@/components/authorization/FormHeader.vue'
import AccentButton from '@/components/shared/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import PasswordInput from '@/components/shared/PasswordInput.vue'
import { useAuthStore } from '@/stores/auth.store'
import { restoreSchema } from '@/utils/validation/auth.validation'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const token = computed(() => route.query.token as string | null)

const { defineField, handleSubmit, errors } = useForm<AuthRestoreType>({
  validationSchema: toTypedSchema(restoreSchema),
})

const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  if (!token.value) {
    authStore.setError('Invalid restore link')
    return
  }
  try {
    await authStore.restore(token.value, values)
    await router.push('/login')
  }
  catch {}
})
</script>

<template>
  <FormHeader name="Restore password" />
  <form
    class="flex flex-col gap-3"
    @submit.prevent="onSubmit"
  >
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
      name="Restore"
      :is-loading="authStore.isLoading"
    />
    <ErrorDisplay :error="authStore.error" />
  </form>
</template>
