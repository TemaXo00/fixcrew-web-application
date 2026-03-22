<script setup lang="ts">
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import type { AuthLogin } from '@/interfaces/auth.interface.ts'
import InputComponent from '@/components/shared/InputComponent.vue'
import { reactive, ref } from 'vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import { user_routes } from '@/axios/configs.axios.ts'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive<AuthLogin>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)

async function submitForm(): Promise<void> {
  isLoading.value = true

  try {
    await user_routes.post('/auth/login', user, {})
    await router.push('/')
  } catch (error) {
    isLoading.value = false
    console.log(error)
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message || 'Login failed')
    }
  }
}
</script>

<template>
  <FormWrapper>
    <FormBackground>
      <FormHeader name="Welcome Back" />
      <InputComponent
        name="Email"
        type="email"
        place-text="example@example.com"
        :isNecessary="true"
        v-model="user.email"
      />
      <InputComponent
        name="Password"
        type="password"
        place-text="Pass@wd123"
        :isNecessary="true"
        v-model="user.password"
      />
      <ButtonComponent name="Log in" :isLoading="isLoading" @click="submitForm" />
    </FormBackground>
  </FormWrapper>
</template>

<style scoped></style>
