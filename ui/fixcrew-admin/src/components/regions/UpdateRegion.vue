<script setup lang="ts">
import type { RegionResponseType, RegionUpdateType } from '@/types/regions.types.ts'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { regionsApi } from '@/api/info/regions.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import { updateRegionSchema } from '@/utils/validation/region.validation.ts'

interface Props {
  id: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'updated', region: RegionResponseType): void
}>()

const closeWindow = (): void => {
  emits('close')
}

const isLoading = ref<boolean>(false)
const error = ref<string>()

const { defineField, handleSubmit, errors, resetForm } = useForm<RegionUpdateType>({
  validationSchema: toTypedSchema(updateRegionSchema),
})

const [response, responseAttrs] = defineField('avg_response')

const updateRegion = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = ''
    const updatedRegion = await regionsApi.updateRegion(props.id, values)
    resetForm()
    emits('updated', updatedRegion)
    closeWindow()
  }
  catch (err) {
    const apiError = extractApiError(err)
    error.value = apiError.message
  }
  finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <InputComponent
      v-model="response"
      name="New Average Response"
      type="number"
      place-text="1"
      :is-necessary="true"
      v-bind="responseAttrs"
    />
    <ErrorDisplay
      v-if="errors.avg_response"
      :error="errors.avg_response"
    />
    <div class="flex flex-col medium:flex-row gap-2">
      <OutlineButton
        name="Back"
        @click="closeWindow"
      />
      <AccentButton
        name="Submit"
        @click="updateRegion"
      />
    </div>
    <ErrorDisplay
      v-if="error"
      :error="error"
    />
  </div>
</template>

<style scoped></style>
