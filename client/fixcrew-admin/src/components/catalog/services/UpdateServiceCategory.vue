<script setup lang="ts">
import type { CategoryResponseType } from '@/types/info/categories.types'
import type { ServiceResponseType, ServiceUpdateCategoryType } from '@/types/info/services.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue'
import { updateServiceCategorySchema } from '@/utils/validation/info/service.validation.ts'

interface Props {
  id: string
  currentCategoryId: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updated', service: ServiceResponseType): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)
const categories = ref<CategoryResponseType[]>([])

const { defineField, handleSubmit, errors, resetForm } = useForm<ServiceUpdateCategoryType>({
  validationSchema: toTypedSchema(updateServiceCategorySchema),
  initialValues: {
    category_id: props.currentCategoryId,
  },
})

const [category_id, categoryAttrs] = defineField('category_id')

const fetchCategories = async () => {
  categories.value = await categoriesApi.getCategories()
}

const updateCategory = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updateCategory(props.id, values)
    resetForm()
    emits('updated', updatedService)
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    error.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
})

onMounted(async () => {
  await fetchCategories()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <SelectComponent
      v-model="category_id"
      name="New Category"
      :options="
        categories.map((c) => ({ value: c.id, label: `${c.name} (${c.type?.name || 'No type'})` }))
      "
      placeholder="Select category"
      :is-necessary="true"
      v-bind="categoryAttrs"
    />
    <ErrorShort
      v-if="errors.category_id"
      :error="errors.category_id"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updateCategory"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
