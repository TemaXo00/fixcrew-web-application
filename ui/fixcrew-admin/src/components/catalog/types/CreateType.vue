<script setup lang="ts">
import type { TypeCreateType, TypeResponseType } from '@/types/info/types.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { typesApi } from '@/api/info/types.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import Title from '@/components/shared/Title.vue'
import { createTypeSchema } from '@/utils/validation/info/type.validation'

const emit = defineEmits<{
  (e: 'created', type: TypeResponseType): void
}>()

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)

const { defineField, handleSubmit, errors, resetForm } = useForm<TypeCreateType>({
  validationSchema: toTypedSchema(createTypeSchema),
})

const [name, nameAttrs] = defineField('name')

const createType = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    const newType = await typesApi.createType(values)
    resetForm()
    emit('created', newType)
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
</script>

<template>
  <form
    class="flex flex-col gap-2"
    @submit.prevent="createType"
  >
    <Title title="Create type" />
    <div class="flex flex-col">
      <InputComponent
        v-model="name"
        name="Name"
        type="text"
        place-text="Type name"
        :is-necessary="true"
        v-bind="nameAttrs"
      />
      <ErrorShort
        v-if="errors.name"
        :error="errors.name"
      />
    </div>
    <AccentButton
      name="Create type"
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
