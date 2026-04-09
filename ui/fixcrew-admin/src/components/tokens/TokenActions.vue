<script setup lang="ts">
import { ref } from 'vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import Title from '@/components/shared/Title.vue'
import CreateToken from '@/components/tokens/CreateToken.vue'
import DeleteTokens from '@/components/tokens/DeleteTokens.vue'

const createOpen = ref<boolean>(false)
const deleteOpen = ref<boolean>(false)

const tokensListRef = ref<{ refreshTokens: () => void } | null>(null)
const statsRef = ref<{ refreshStats: () => void } | null>(null)

const handleOpen = () => {
  if (deleteOpen.value === true && createOpen.value === false) {
    deleteOpen.value = false
  }
  createOpen.value = !createOpen.value
}

const handleDelete = () => {
  if (createOpen.value === true && deleteOpen.value === false) {
    createOpen.value = false
  }
  deleteOpen.value = !deleteOpen.value
}

const handleTokenCreated = () => {
  tokensListRef.value?.refreshTokens()
  statsRef.value?.refreshStats()
}

const handleTokensDeleted = () => {
  tokensListRef.value?.refreshTokens()
  statsRef.value?.refreshStats()
}

defineExpose({
  tokensListRef,
  statsRef,
})
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <Title title="Token Actions" />
    <div class="flex flex-col medium:flex-row items-start medium:items-center gap-3">
      <AccentButton
        name="Create invite token"
        :is-loading="createOpen"
        @click="handleOpen"
      />
      <DangerousButton
        name="Delete not active tokens"
        :is-loading="deleteOpen"
        @click="handleDelete"
      />
    </div>
    <CreateToken
      v-if="createOpen"
      @close="handleOpen"
      @token-created="handleTokenCreated"
    />
    <DeleteTokens
      v-if="deleteOpen"
      @close="handleDelete"
      @tokens-deleted="handleTokensDeleted"
    />
  </div>
</template>

<style scoped></style>
