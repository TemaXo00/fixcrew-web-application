<script setup lang="ts">
import type { CategoryResponseType, CategoryUpdateNameType } from '@/types/info/categories.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { updateCategoryNameSchema } from '@/utils/validation/info/category.validation.ts'

interface Props {
  id: string
  currentName: string
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

const { defineField, handleSubmit, errors, resetForm } = useForm<CategoryUpdateNameType>({
  validationSchema: toTypedSchema(updateCategoryNameSchema),
  initialValues: {
    name: props.currentName,
  },
})

const [name, nameAttrs] = defineField('name')

const updateCategoryName = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedCategory = await categoriesApi.updateCategoryName(props.id, values)
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
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputComponent
      v-model="name"
      name="New Name"
      type="text"
      place-text="Category name"
      :is-necessary="true"
      v-bind="nameAttrs"
    />
    <ErrorShort
      v-if="errors.name"
      :error="errors.name"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updateCategoryName"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
