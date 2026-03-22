<script setup lang="ts">
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import type { AuthRegister } from '@/interfaces/auth.interface.ts'
import InputComponent from '@/components/shared/InputComponent.vue'
import { computed, reactive, ref } from 'vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import { user_routes } from '@/axios/configs.axios.ts'
import { useRoute, useRouter } from 'vue-router'
import AvatarInput from '@/components/authorization/AvatarInput.vue'

const route = useRoute()
const router = useRouter()

const token = computed(() => route.query.token || null)
const isLoading = ref<boolean>(false)
const user = reactive<AuthRegister>({
  name: '',
  surname: '',
  phone_number: '',
  email: '',
  password: '',
  avatar_url: null as File | null,
})

async function submitForm(): Promise<void> {
  isLoading.value = true

  if (!token.value) {
    isLoading.value = false
    return
  }

  try {
    await user_routes.post('/auth/register', user, {
      params: {
        token: token.value,
      },
    })
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
      <FormHeader name="Create an account" />
      <div class="flex flex-col gap-3">
        <InputComponent
          name="Name"
          type="text"
          place-text="John"
          :isNecessary="true"
          v-model="user.name"
        />
        <InputComponent
          name="Surname"
          type="text"
          place-text="Doe"
          :isNecessary="true"
          v-model="user.surname"
        />
        <InputComponent
          name="Phone Number"
          type="phone"
          place-text="xxx-xxx-xxxx"
          :isNecessary="true"
          v-model="user.phone_number"
        />
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
        <AvatarInput name="Avatar" v-model="user.avatar_url" />
      </div>
      <ButtonComponent name="Sign up" :isLoading="isLoading" @click="submitForm" />
    </FormBackground>
  </FormWrapper>
</template>

<style scoped></style>
