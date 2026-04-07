<script setup lang="ts">
import { ref } from 'vue'
import AccentButton from '@/components/shared/AccentButton.vue'
import DangerousButton from '@/components/shared/DangerousButton.vue'
import Title from '@/components/shared/Title.vue'
import CreateToken from '@/components/tokens/CreateToken.vue'

const createOpen = ref<boolean>(false)
const deleteOpen = ref<boolean>(false)

const handleOpen = () => {
  createOpen.value = !createOpen.value
}

const handleDelete = () => {
  deleteOpen.value = !deleteOpen.value
}
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <Title title="Token Actions" />
    <div class="flex flex-col medium:flex-row items-start medium:items-center gap-3">
      <AccentButton
        name="Create token"
        :is-loading="createOpen"
        @click="handleOpen"
      />
      <DangerousButton
        name="Delete not active tokens"
        :is-loading="deleteOpen"
        @click="handleDelete"
      />
    </div>
    <CreateToken v-if="createOpen" />
  </div>
</template>

<style scoped></style>
