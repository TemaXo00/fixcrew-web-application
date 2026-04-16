<!-- components/catalog/types/UpdateType.vue -->
<script setup lang="ts">
import type { TypeResponseType, TypeUpdateType } from '@/types/info/types.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { updateTypeSchema } from '@/utils/validation/info/type.validation'

interface Props {
  id: string
  currentName: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updated', type: TypeResponseType): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)

const { defineField, handleSubmit, errors, resetForm } = useForm<TypeUpdateType>({
  validationSchema: toTypedSchema(updateTypeSchema),
  initialValues: {
    name: props.currentName,
  },
})

const [name, nameAttrs] = defineField('name')

const updateType = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedType = await typesApi.updateType(props.id, values)
    resetForm()
    emits('updated', updatedType)
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
      place-text="Type name"
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
        @click="updateType"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
