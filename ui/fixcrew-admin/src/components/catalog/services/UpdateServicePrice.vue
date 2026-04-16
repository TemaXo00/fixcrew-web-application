<script setup lang="ts">
import type { ServiceResponseType, ServiceUpdatePriceType } from '@/types/info/services.types'
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
import { updateServicePriceSchema } from '@/utils/validation/info/service.validation.ts'

interface Props {
  id: string
  currentPrice: number
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

const { defineField, handleSubmit, errors, resetForm } = useForm<ServiceUpdatePriceType>({
  validationSchema: toTypedSchema(updateServicePriceSchema),
  initialValues: {
    price: props.currentPrice,
  },
})

const [price, priceAttrs] = defineField('price')

const updatePrice = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = null
    const updatedService = await servicesApi.updatePrice(props.id, values)
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
      v-model="price"
      name="New Price"
      type="number"
      place-text="0"
      :is-necessary="true"
      v-bind="priceAttrs"
    />
    <ErrorShort
      v-if="errors.price"
      :error="errors.price"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        :is-loading="isLoading"
        @click="updatePrice"
      />
    </div>
    <ErrorCode
      v-if="error"
      :code="error"
    />
  </div>
</template>
