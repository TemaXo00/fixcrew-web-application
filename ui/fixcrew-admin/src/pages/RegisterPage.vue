<script setup lang="ts">
import type { AuthRegister } from '@/interfaces/auth.interface.ts'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userRoutes } from '@/axios/configs.axios.ts'
import AvatarInput from '@/components/authorization/AvatarInput.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'

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

const submitForm = async (): Promise<void> => {
  isLoading.value = true

  if (!token.value) {
    isLoading.value = false
    return
  }

  try {
    await userRoutes.post('/auth/register', user, {
      params: {
        token: token.value,
      },
    })
    await router.push('/')
  }
  catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<template>
    <FormWrapper>
        <FormBackground>
            <FormHeader name="Create an account" />
            <form
                class="flex flex-col gap-3"
                @submit.prevent="submitForm"
            >
                <InputComponent
                    v-model="user.name"
                    name="Name"
                    type="text"
                    place-text="John"
                    :is-necessary="true"
                />
                <InputComponent
                    v-model="user.surname"
                    name="Surname"
                    type="text"
                    place-text="Doe"
                    :is-necessary="true"
                />
                <InputComponent
                    v-model="user.phone_number"
                    name="Phone Number"
                    type="phone"
                    place-text="xxx-xxx-xxxx"
                    :is-necessary="true"
                />
                <InputComponent
                    v-model="user.email"
                    name="Email"
                    type="email"
                    place-text="example@example.com"
                    :is-necessary="true"
                />
                <InputComponent
                    v-model="user.password"
                    name="Password"
                    type="password"
                    place-text="Pass@wd123"
                    :is-necessary="true"
                />
                <AvatarInput
                    v-model="user.avatar_url"
                    name="Avatar"
                />
                <ButtonComponent
                    name="Sign up"
                    :is-loading="isLoading"
                />
            </form>
        </FormBackground>
    </FormWrapper>
</template>

<style scoped></style>
