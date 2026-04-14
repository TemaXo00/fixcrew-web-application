<script setup lang="ts">
import type { RegionCreateType, RegionResponseType } from '@/types/regions.types.ts'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { regionsApi } from '@/api/info/regions.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorDisplay from '@/components/shared/ErrorDisplay.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import Title from '@/components/shared/Title.vue'
import { createRegionSchema } from '@/utils/validation/region.validation.ts'

const emit = defineEmits<{
  (e: 'created', region: RegionResponseType): void
}>()

const isLoading = ref<boolean>(false)
const error = ref<string>('')

const { defineField, handleSubmit, errors, resetForm } = useForm<RegionCreateType>({
  validationSchema: toTypedSchema(createRegionSchema),
})

const [name, nameAttrs] = defineField('name')
const [response, responseAttrs] = defineField('avg_response')

const createRegion = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    error.value = ''
    const newRegion = await regionsApi.createRegion(values)
    resetForm()
    emit('created', newRegion)
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
  <form
    class="flex flex-col gap-2"
    @submit.prevent="createRegion"
  >
    <Title title="Create region" />
    <div class="flex flex-col large:flex-row gap-3">
      <div class="flex flex-col">
        <InputComponent
          v-model="name"
          name="Name"
          type="text"
          place-text="Region name"
          :is-necessary="true"
          v-bind="nameAttrs"
        />
        <ErrorDisplay
          v-if="errors.name"
          :error="errors.name"
        />
      </div>
      <div class="flex flex-col">
        <InputComponent
          v-model="response"
          name="Average Response"
          type="number"
          place-text="1"
          :is-necessary="true"
          v-bind="responseAttrs"
        />
        <ErrorDisplay
          v-if="errors.avg_response"
          :error="errors.avg_response"
        />
      </div>
    </div>
    <AccentButton
      name="Create region"
      class="w-60"
      type="submit"
    />
  </form>
  <ErrorDisplay :error="error" />
</template>

<style scoped></style>
