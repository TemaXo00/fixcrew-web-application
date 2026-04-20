<script setup lang="ts">
import type { CategoryResponseType, CategoryUpdateTypeType } from '@/types/info/categories.types'
import type { TypeResponseType } from '@/types/info/types.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue'
import { updateCategoryTypeSchema } from '@/utils/validation/info/category.validation.ts'

interface Props {
  id: string
  currentTypeId: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updated', category: CategoryResponseType): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)
const types = ref<TypeResponseType[]>([])

const { defineField, handleSubmit, errors, resetForm } = useForm<CategoryUpdateTypeType>({
  validationSchema: toTypedSchema(updateCategoryTypeSchema),
  initialValues: {
    type_id: props.currentTypeId,
  },
})

const [type_id, typeAttrs] = defineField('type_id')

const fetchTypes = async () => {
  types.value = await typesApi.getTypes()
}

const updateCategoryType = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedCategory = await categoriesApi.updateCategoryType(props.id, values)
    resetForm()
    emits('updated', updatedCategory)
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
  await fetchTypes()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <SelectComponent
      v-model="type_id"
      name="New Type"
      :options="types.map((t) => ({ value: t.id, label: t.name }))"
      placeholder="Select type"
      :is-necessary="true"
      v-bind="typeAttrs"
    />
    <ErrorShort
      v-if="errors.type_id"
      :error="errors.type_id"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updateCategoryType"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
