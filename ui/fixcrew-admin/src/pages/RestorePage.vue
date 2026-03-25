<script setup lang="ts">
import type { AuthRestoreType } from '@/interfaces/auth.interface.ts'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userRoutes } from '@/axios/configs.axios.ts'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import InputComponent from '@/components/shared/InputComponent.vue'

const route = useRoute()
const router = useRouter()

const token = computed(() => route.query.token || null)
const isLoading = ref<boolean>(false)
const password = reactive<AuthRestoreType>({
  password: '',
})

const submitForm = async (): Promise<void> => {
  isLoading.value = true

  if (!token.value) {
    isLoading.value = false
    return
  }

  try {
    await userRoutes.patch(`/auth/restore/${token.value}`, password)
    await router.push('/login')
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
            <FormHeader name="Restore password" />
            <form
                class="flex flex-col gap-3"
                @submit.prevent="submitForm"
            >
                <InputComponent
                    v-model="password.password"
                    name="Password"
                    type="password"
                    place-text="Pass@wd123"
                    :is-necessary="true"
                />
                <ButtonComponent
                    name="Restore"
                    :is-loading="isLoading"
                />
            </form>
        </FormBackground>
    </FormWrapper>
</template>

<style scoped></style>
