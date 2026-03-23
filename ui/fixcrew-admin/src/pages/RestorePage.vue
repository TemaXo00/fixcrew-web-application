<script setup lang="ts">
import FormWrapper from '@/components/authorization/FormWrapper.vue'
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormHeader from '@/components/authorization/FormHeader.vue'
import type { AuthRestore } from '@/interfaces/auth.interface.ts'
import InputComponent from '@/components/shared/InputComponent.vue'
import { computed, reactive, ref } from 'vue'
import ButtonComponent from '@/components/shared/ButtonComponent.vue'
import { user_routes } from '@/axios/configs.axios.ts'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const token = computed(() => route.query.token || null)
const isLoading = ref<boolean>(false)
const password = reactive<AuthRestore>({
  password: '',
})

async function submitForm(): Promise<void> {
  isLoading.value = true

  if (!token.value) {
    isLoading.value = false
    return
  }

  try {
    await user_routes.patch(`/auth/restore/${token.value}`, password)
    await router.push('/login')
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<template>
  <FormWrapper>
    <FormBackground>
      <FormHeader name="Restore password" />
      <form class="flex flex-col gap-3" @submit.prevent="submitForm">
        <InputComponent
          name="Password"
          type="password"
          place-text="Pass@wd123"
          :isNecessary="true"
          v-model="password.password"
        />
        <ButtonComponent name="Restore" :isLoading="isLoading" />
      </form>
    </FormBackground>
  </FormWrapper>
</template>

<style scoped></style>
