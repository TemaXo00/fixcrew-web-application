<script setup lang="ts">
import type { RegionResponseType } from '@/types/info/regions.types.ts'
import { ref } from 'vue'
import DeleteRegion from '@/components/regions/DeleteRegion.vue'
import UpdateRegion from '@/components/regions/UpdateRegion.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const props = defineProps<RegionResponseType>()

const emit = defineEmits<{
  (e: 'updated', region: RegionResponseType): void
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

const handleRegionUpdated = (updatedRegion: RegionResponseType) => {
  emit('updated', updatedRegion)
  isChangeOpen.value = false
}

const handleRegionDeleted = (deletedId: string) => {
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
      Average response:
      <span class="text-muted-accent">
        {{ props.avg_response }}
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
  <DeleteRegion
    v-if="isDeleteOpen"
    :id="props.id"
    @close="handleCloseDelete"
    @deleted="handleRegionDeleted"
  />
  <UpdateRegion
    v-if="isChangeOpen"
    :id="props.id"
    @close="handleCloseChange"
    @updated="handleRegionUpdated"
  />
</template>

<style scoped></style>
