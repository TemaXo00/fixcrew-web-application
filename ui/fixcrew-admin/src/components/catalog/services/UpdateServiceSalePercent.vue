<script setup lang="ts">
import type {
  ServiceResponseType,
  ServiceUpdateSalePercentType,
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
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { updateServiceSalePercentSchema } from '@/utils/validation/info/service.validation.ts'

interface Props {
  id: string
  currentSalePercent: number
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

const { defineField, handleSubmit, errors, resetForm } = useForm<ServiceUpdateSalePercentType>({
  validationSchema: toTypedSchema(updateServiceSalePercentSchema),
  initialValues: {
    sale_percent: props.currentSalePercent,
  },
})

const [sale_percent, saleAttrs] = defineField('sale_percent')

const updateSalePercent = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updateSalePercent(props.id, values)
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
      v-model="sale_percent"
      name="New Sale Percent"
      type="number"
      place-text="0"
      :is-necessary="true"
      v-bind="saleAttrs"
    />
    <ErrorShort
      v-if="errors.sale_percent"
      :error="errors.sale_percent"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updateSalePercent"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
