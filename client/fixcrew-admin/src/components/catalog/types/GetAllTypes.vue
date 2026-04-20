<script setup lang="ts">
import type { TypeResponseType } from '@/types/info/types.types'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import TypeItem from '@/components/catalog/types/TypeItem.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'

const types = ref<TypeResponseType[]>([])
const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)

const fetchTypes = async () => {
  try {
    isLoading.value = true
    error.value = null
    types.value = await typesApi.getTypes()
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}

const handleTypeCreated = (newType: TypeResponseType) => {
  types.value = [newType, ...types.value]
}

const handleTypeUpdated = (updatedType: TypeResponseType) => {
  const index = types.value.findIndex(t => t.id === updatedType.id)
  if (index !== -1) {
    types.value[index] = updatedType
    types.value = [...types.value]
  }
}

const handleTypeDeleted = (deletedId: string) => {
  types.value = types.value.filter(t => t.id !== deletedId)
}

defineExpose({
  handleTypeCreated,
})

onMounted(async () => {
  await fetchTypes()
})
</script>

<template>
  <SpinnerLoader v-if="isLoading && !types.length" />
  <div
    v-else
    class="flex flex-col gap-4"
  >
    <Title title="Types" />
    <div class="flex flex-col gap-3">
      <TypeItem
        v-for="type in types"
        :id="type.id"
        :key="type.id"
        :name="type.name"
        :categories="type.categories"
        @updated="handleTypeUpdated"
        @deleted="handleTypeDeleted"
      />
    </div>
  </div>
  <ErrorCode
    v-if="error"
    :code="error"
    class="flex items-center justify-center mt-4"
  />
</template>
