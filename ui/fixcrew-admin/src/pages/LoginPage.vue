<script setup lang="ts">
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import type { AuthLogin } from '@/interfaces/auth.interface.ts'
import InputComponent from '@/components/shared/InputComponent.vue'
import { reactive, ref } from 'vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import { user_routes } from '@/axios/configs.axios.ts'
import { useRouter } from 'vue-router'
import FormFooter from '@/components/authorization/FormFooter.vue'

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
  }
}
</script>

<template>
  <FormWrapper>
    <FormBackground>
      <FormHeader name="Welcome Back" />
      <form class="flex flex-col gap-3" @submit.prevent="submitForm">
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
        <ButtonComponent
          name="Log in"
          :isLoading="isLoading"
        />
      </form>
      <FormFooter name="Forgot Password?" linkName="Restore" link="/restore" />
    </FormBackground>
  </FormWrapper>
</template>

<style scoped></style>
