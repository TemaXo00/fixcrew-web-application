<script setup lang="ts">
import type { AuthRestoreType } from '@/types/auth.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthHeader from '@/components/layout-auth/AuthHeader.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import PasswordInput from '@/components/shared/inputs/PasswordInput.vue'
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
    authStore.setError('Invalid restore link', 400)
    return
  }
  try {
    await authStore.restore(token.value, values)
    await router.push('/auth/login')
  }
  catch {}
})
</script>

<template>
  <AuthHeader name="Restore password" />
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
    <ErrorShort
      v-if="errors.password"
      :error="errors.password"
    />
    <AccentButton
      name="Restore"
      :is-loading="authStore.isLoading"
    />
  </form>
  <ErrorCode
    v-if="authStore.errorCode"
    :message="authStore.errorMessage"
    :code="authStore.errorCode"
    class="mt-5"
  />
</template>
