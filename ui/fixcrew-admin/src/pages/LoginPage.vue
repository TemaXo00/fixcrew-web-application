<script setup lang="ts">
import type { AuthLoginType } from '@/interfaces/auth.interface.ts'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userRoutes } from '@/axios/configs.axios.ts'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormFooter from '@/components/authorization/FormFooter.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'

const router = useRouter()

const user = reactive<AuthLoginType>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)

const submitForm = async (): Promise<void> => {
  isLoading.value = true

  try {
    await userRoutes.post('/auth/login', user, {})
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
            <FormHeader name="Welcome Back" />
            <form
                class="flex flex-col gap-3"
                @submit.prevent="submitForm"
            >
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
                <ButtonComponent
                    name="Log in"
                    :is-loading="isLoading"
                />
            </form>
            <FormFooter
                name="Forgot Password?"
                link-name="Restore"
                link="/restore"
            />
        </FormBackground>
    </FormWrapper>
</template>

<style scoped></style>
