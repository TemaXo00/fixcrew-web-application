<script setup lang="ts">
import type { TypeResponseType } from '@/types/info/types.types'
import { ref } from 'vue'
import DeleteType from '@/components/catalog/types/DeleteType.vue'
import UpdateType from '@/components/catalog/types/UpdateType.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const props = defineProps<TypeResponseType>()

const emit = defineEmits<{
  (e: 'updated', type: TypeResponseType): void
  (e: 'deleted', id: string): void
}>()

const isChangeOpen = ref<boolean>(false)
const isDeleteOpen = ref<boolean>(false)

const handleDeleteOpen = (): void => {
  if (isChangeOpen.value === true && isDeleteOpen.value === false) {
    isChangeOpen.value = false
  }
  isDeleteOpen.value = !isDeleteOpen.value
}

const handleChangeOpen = (): void => {
  if (isDeleteOpen.value === true && isChangeOpen.value === false) {
    isDeleteOpen.value = false
  }
  isChangeOpen.value = !isChangeOpen.value
}

const handleTypeUpdated = (updatedType: TypeResponseType) => {
  emit('updated', updatedType)
  isChangeOpen.value = false
}

const handleTypeDeleted = (deletedId: string) => {
  emit('deleted', deletedId)
  isDeleteOpen.value = false
}

const handleCloseChange = () => {
  isChangeOpen.value = false
}

const handleCloseDelete = () => {
  isDeleteOpen.value = false
}
</script>

<template>
  <div
    class="flex flex-col items-start gap-3 large:grid large:grid-cols-4 large:items-center large:gap-5 p-3 min-h-20 border border-accent rounded-lg"
  >
    <p class="font-bold text-accent break-all min-w-37.5 large:min-w-50">
      {{ props.name }}
    </p>
    <p class="font-medium text-dimmed text-xs smaller:text-sm small:text-base min-w-25">
      Categories:
      <span class="text-muted-accent">
        {{ props.categories?.length || 0 }}
      </span>
    </p>
    <OutlineButton
      name="Change"
      :is-loading="isChangeOpen"
      class="w-40"
      @click="handleChangeOpen"
    />
    <DangerousButton
      name="Delete"
      :is-loading="isDeleteOpen"
      class="w-40"
      @click="handleDeleteOpen"
    />
  </div>
  <DeleteType
    v-if="isDeleteOpen"
    :id="props.id"
    @close="handleCloseDelete"
    @deleted="handleTypeDeleted"
  />
  <UpdateType
    v-if="isChangeOpen"
    :id="props.id"
    :current-name="props.name"
    @close="handleCloseChange"
    @updated="handleTypeUpdated"
  />
</template>
