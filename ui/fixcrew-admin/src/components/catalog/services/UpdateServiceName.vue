<script setup lang="ts">
import type { ServiceResponseType, ServiceUpdateNameType } from '@/types/info/services.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { updateServiceNameSchema } from '@/utils/validation/info/service.validation.ts'

interface Props {
  id: string
  currentName: string
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

const { defineField, handleSubmit, errors, resetForm } = useForm<ServiceUpdateNameType>({
  validationSchema: toTypedSchema(updateServiceNameSchema),
  initialValues: {
    name: props.currentName,
  },
})

const [name, nameAttrs] = defineField('name')

const updateName = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updateName(props.id, values)
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
    <InputComponent
      v-model="name"
      name="New Name"
      type="text"
      place-text="Service name"
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
        @click="updateName"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
