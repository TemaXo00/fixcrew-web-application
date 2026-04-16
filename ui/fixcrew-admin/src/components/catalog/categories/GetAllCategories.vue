<script setup lang="ts">
import type { CategoryResponseType } from '@/types/info/categories.types'
import type { TypeResponseType } from '@/types/info/types.types'
import { onMounted, ref, watch } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import CategoryItem from '@/components/catalog/categories/CategoryItem.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'

const categories = ref<CategoryResponseType[]>([])
const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)
const types = ref<TypeResponseType[]>([])
const selectedTypeId = ref<string>('')

const fetchTypes = async () => {
  types.value = await typesApi.getTypes()
}

const fetchCategories = async () => {
  try {
    isLoading.value = true
    error.value = null
    categories.value = await categoriesApi.getCategories(selectedTypeId.value || undefined)
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}

const handleCategoryCreated = (newCategory: CategoryResponseType) => {
  categories.value = [newCategory, ...categories.value]
}

const handleCategoryUpdated = (updatedCategory: CategoryResponseType) => {
  const index = categories.value.findIndex(c => c.id === updatedCategory.id)
  if (index !== -1) {
    categories.value[index] = updatedCategory
    categories.value = [...categories.value]
  }
}

const handleCategoryDeleted = (deletedId: string) => {
  categories.value = categories.value.filter(c => c.id !== deletedId)
}

watch(selectedTypeId, () => {
  fetchCategories()
})

defineExpose({
  handleCategoryCreated,
})

onMounted(async () => {
  await fetchTypes()
  await fetchCategories()
})
</script>

<template>
  <SpinnerLoader v-if="isLoading && !categories.length" />
  <div
    v-else
    class="flex flex-col gap-4"
  >
    <div class="flex flex-col gap-3">
      <Title title="Categories" />
      <div class="w-full small:w-64">
        <SelectComponent
          v-model="selectedTypeId"
          name="Filter by Type"
          :options="[
            { value: '', label: 'All Types' },
            ...types.map((t) => ({ value: t.id, label: t.name })),
          ]"
          placeholder="Filter by type"
        />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <CategoryItem
        v-for="category in categories"
        :id="category.id"
        :key="category.id"
        :name="category.name"
        :type_id="category.type_id"
        :type="category.type"
        @updated="handleCategoryUpdated"
        @deleted="handleCategoryDeleted"
      />
    </div>
  </div>
  <ErrorCode
    v-if="error"
    :code="error"
    class="flex items-center justify-center mt-4"
  />
</template>
