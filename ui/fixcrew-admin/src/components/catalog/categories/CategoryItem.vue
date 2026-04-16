<script setup lang="ts">
import type { CategoryResponseType } from '@/types/info/categories.types'
import { ref } from 'vue'
import DeleteCategory from '@/components/catalog/categories/DeleteCategory.vue'
import UpdateCategoryName from '@/components/catalog/categories/UpdateCategoryName.vue'
import UpdateCategoryType from '@/components/catalog/categories/UpdateCategoryType.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const props = defineProps<CategoryResponseType>()

const emit = defineEmits<{
  (e: 'updated', category: CategoryResponseType): void
  (e: 'deleted', id: string): void
}>()

const activeModal = ref<string | null>(null)

const closeAll = () => {
  activeModal.value = null
}

const handleOpen = (modalName: string) => {
  if (activeModal.value === modalName) {
    activeModal.value = null
  }
  else {
    activeModal.value = modalName
  }
}

const handleCategoryUpdated = (updatedCategory: CategoryResponseType) => {
  emit('updated', updatedCategory)
  closeAll()
}

const handleCategoryDeleted = (deletedId: string) => {
  emit('deleted', deletedId)
  closeAll()
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 border border-accent rounded-lg">
    <div class="flex flex-col gap-2 small:flex-row small:justify-between small:items-center">
      <p class="font-bold text-accent break-all text-lg">
        {{ props.name }}
      </p>
      <p class="font-medium text-dimmed text-sm">
        Type:
        <span class="bg-muted-accent text-container px-2 py-0.5 rounded-md text-xs font-semibold">
          {{ props.type?.name || 'N/A' }}
        </span>
      </p>
    </div>

    <div class="flex flex-wrap gap-3 mt-2">
      <OutlineButton
        name="Change Name"
        class="px-4 py-2"
        @click="handleOpen('name')"
      />
      <OutlineButton
        name="Change Type"
        class="px-4 py-2"
        @click="handleOpen('type')"
      />
      <DangerousButton
        name="Delete"
        class="px-4 py-2"
        @click="handleOpen('delete')"
      />
    </div>

    <DeleteCategory
      v-if="activeModal === 'delete'"
      :id="props.id"
      @close="closeAll"
      @deleted="handleCategoryDeleted"
    />
    <UpdateCategoryName
      v-if="activeModal === 'name'"
      :id="props.id"
      :current-name="props.name"
      @close="closeAll"
      @updated="handleCategoryUpdated"
    />
    <UpdateCategoryType
      v-if="activeModal === 'type'"
      :id="props.id"
      :current-type-id="props.type_id"
      @close="closeAll"
      @updated="handleCategoryUpdated"
    />
  </div>
</template>
