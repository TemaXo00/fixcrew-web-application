<script setup lang="ts">
import type {
  ServiceResponseType,
  ServiceUpdateDescriptionType,
} from '@/types/info/services.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import TextareaComponent from '@/components/shared/inputs/TextareaComponent.vue'
import { updateServiceDescriptionSchema } from '@/utils/validation/info/service.validation.ts'

interface Props {
  id: string
  currentDescription: string
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

const { defineField, handleSubmit, errors, resetForm } = useForm<ServiceUpdateDescriptionType>({
  validationSchema: toTypedSchema(updateServiceDescriptionSchema),
  initialValues: {
    description: props.currentDescription,
  },
})

const [description, descriptionAttrs] = defineField('description')

const updateDescription = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updateDescription(props.id, values)
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
</script>

<template>
  <div class="flex flex-col gap-2">
    <TextareaComponent
      v-model="description"
      name="New Description"
      place-text="Service description"
      :is-necessary="true"
      v-bind="descriptionAttrs"
    />
    <ErrorShort
      v-if="errors.description"
      :error="errors.description"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updateDescription"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
