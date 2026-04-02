<script setup lang="ts">
import type { AuthRestoreSendType } from '@/types/auth.types.ts'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userRoutes } from '@/api/configs.api.ts'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormFooter from '@/components/authorization/FormFooter.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'

const router = useRouter()

const email = reactive<AuthRestoreSendType>({
  email: '',
})

const isLoading = ref<boolean>(false)

const submitForm = async (): Promise<void> => {
  isLoading.value = true

  try {
    await userRoutes.post('/tokens/password', email, {})
    await router.push('/login')
  }
  catch (error) {
    isLoading.value = false
    throw error
  }
}
</script>

<template>
    <FormWrapper>
        <FormBackground>
            <FormHeader name="Restore account" />
            <form
                class="flex flex-col gap-3"
                @submit.prevent="submitForm"
            >
                <InputComponent
                    v-model="email.email"
                    name="Email"
                    type="email"
                    place-text="example@example.com"
                    :is-necessary="true"
                />
                <ButtonComponent
                    name="Send email"
                    :is-loading="isLoading"
                />
            </form>
            <FormFooter
                name=""
                link-name="Back"
                link="/login"
            />
        </FormBackground>
    </FormWrapper>
</template>

<style scoped></style>
