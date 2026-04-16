<script setup lang="ts">
import type { CategoryCreateType, CategoryResponseType } from '@/types/info/categories.types'
import type { TypeResponseType } from '@/types/info/types.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue'
import Title from '@/components/shared/Title.vue'
import { createCategorySchema } from '@/utils/validation/info/category.validation.ts'

const emit = defineEmits<{
  (e: 'created', category: CategoryResponseType): void
}>()

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)
const types = ref<TypeResponseType[]>([])

const { defineField, handleSubmit, errors, resetForm } = useForm<CategoryCreateType>({
  validationSchema: toTypedSchema(createCategorySchema),
})

const [name, nameAttrs] = defineField('name')
const [type_id, typeAttrs] = defineField('type_id')

const fetchTypes = async () => {
  types.value = await typesApi.getTypes()
}

const createCategory = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    const newCategory = await categoriesApi.createCategory(values)
    resetForm()
    emit('created', newCategory)
  }
  catch (err) {
    const apiError = extractApiError(err)
    errorMessage.value = apiError.message
    errorCode.value = apiError.statusCode
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
  <form
    class="flex flex-col gap-4"
    @submit.prevent="createCategory"
  >
    <Title title="Create category" />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <InputComponent
          v-model="name"
          name="Name"
          type="text"
          place-text="Category name"
          :is-necessary="true"
          v-bind="nameAttrs"
        />
        <ErrorShort
          v-if="errors.name"
          :error="errors.name"
        />
      </div>

      <div class="flex flex-col">
        <SelectComponent
          v-model="type_id"
          name="Type"
          :options="types.map((t) => ({ value: t.id, label: t.name }))"
          placeholder="Select type"
          :is-necessary="true"
          v-bind="typeAttrs"
        />
        <ErrorShort
          v-if="errors.type_id"
          :error="errors.type_id"
        />
      </div>
    </div>

    <AccentButton
      name="Create category"
      class="w-60"
      type="submit"
    />
  </form>
  <ErrorCode
    v-if="errorCode"
    :message="errorMessage"
    :code="errorCode"
  />
</template>
