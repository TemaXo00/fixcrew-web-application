<script setup lang="ts">
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import type { AuthRestoreSend } from '@/interfaces/auth.interface.ts'
import InputComponent from '@/components/shared/InputComponent.vue'
import { reactive, ref } from 'vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import { user_routes } from '@/axios/configs.axios.ts'
import { useRouter } from 'vue-router'
import FormFooter from '@/components/authorization/FormFooter.vue'

const router = useRouter()

const email = reactive<AuthRestoreSend>({
  email: '',
})

const isLoading = ref<boolean>(false)

async function submitForm(): Promise<void> {
  isLoading.value = true

  try {
    await user_routes.post('/tokens/password', email, {})
    await router.push('/login')
  } catch (error) {
    console.log(error)
    isLoading.value = false
  }
}
</script>

<template>
  <FormWrapper>
    <FormBackground>
      <FormHeader name="Restore account" />
      <form class="flex flex-col gap-3" @submit.prevent="submitForm">
        <InputComponent
          name="Email"
          type="email"
          place-text="example@example.com"
          :isNecessary="true"
          v-model="email.email"
        />
        <ButtonComponent name="Send email" :isLoading="isLoading" />
      </form>
      <FormFooter name="" linkName="Back" link="/login" />
    </FormBackground>
  </FormWrapper>
</template>

<style scoped></style>
