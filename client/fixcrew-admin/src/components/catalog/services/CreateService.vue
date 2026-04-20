<script setup lang="ts">
import type { CategoryResponseType } from '@/types/info/categories.types'
import type { ServiceCreateType, ServiceResponseType } from '@/types/info/services.types'
import { toTypedSchema } from '@vee-validate/yup'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { categoriesApi } from '@/api/info/categories.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import ErrorShort from '@/components/shared/errors/ErrorShort.vue'
import FileInput from '@/components/shared/inputs/FileInput.vue'
import InputComponent from '@/components/shared/inputs/InputComponent.vue'
import SelectComponent from '@/components/shared/inputs/SelectComponent.vue'
import TextareaComponent from '@/components/shared/inputs/TextareaComponent.vue'
import Title from '@/components/shared/Title.vue'
import { FileVisibilityEnum } from '@/types/file/files.types'
import { createServiceSchema } from '@/utils/validation/info/service.validation.ts'

const emit = defineEmits<{
  (e: 'created', service: ServiceResponseType): void
}>()

const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)
const categories = ref<CategoryResponseType[]>([])

const { defineField, handleSubmit, errors, resetForm, setFieldValue } = useForm<ServiceCreateType>({
  validationSchema: toTypedSchema(createServiceSchema),
})

const [name, nameAttrs] = defineField('name')
const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')
const [sale_percent, saleAttrs] = defineField('sale_percent')
const [avg_time, avgTimeAttrs] = defineField('avg_time')
const [category_id, categoryAttrs] = defineField('category_id')
const [cover_id, coverAttrs] = defineField('cover_id')

const fetchCategories = async () => {
  categories.value = await categoriesApi.getCategories()
}

const handleCoverUpload = (id: string) => {
  setFieldValue('cover_id', id)
}

const createService = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    const newService = await servicesApi.createService(values)
    resetForm()
    setFieldValue('cover_id', null)
    emit('created', newService)
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
  await fetchCategories()
})
</script>

<template>
  <form
    class="flex flex-col gap-4"
    @submit.prevent="createService"
  >
    <Title title="Create service" />
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <InputComponent
          v-model="name"
          name="Name"
          type="text"
          place-text="Service name"
          :is-necessary="true"
          v-bind="nameAttrs"
        />
        <ErrorShort
          v-if="errors.name"
          :error="errors.name"
        />
      </div>

      <div class="flex flex-col">
        <TextareaComponent
          v-model="description"
          name="Description"
          place-text="Service description"
          :is-necessary="true"
          v-bind="descriptionAttrs"
        />
        <ErrorShort
          v-if="errors.description"
          :error="errors.description"
        />
      </div>

      <FileInput
        v-model="cover_id"
        v-bind="coverAttrs"
        name="Cover Image"
        bucket="services"
        :visibility="FileVisibilityEnum.public"
        :max-size-mb="5"
        @upload-success="handleCoverUpload"
      />
      <ErrorShort
        v-if="errors.cover_id"
        :error="errors.cover_id"
      />

      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <InputComponent
            v-model="price"
            name="Price"
            type="number"
            place-text="0"
            :is-necessary="true"
            v-bind="priceAttrs"
          />
          <ErrorShort
            v-if="errors.price"
            :error="errors.price"
          />
        </div>

        <div class="flex flex-col">
          <InputComponent
            v-model="sale_percent"
            name="Sale Percent"
            type="number"
            place-text="0"
            v-bind="saleAttrs"
          />
          <ErrorShort
            v-if="errors.sale_percent"
            :error="errors.sale_percent"
          />
        </div>

        <div class="flex flex-col">
          <InputComponent
            v-model="avg_time"
            name="Average Time (minutes)"
            type="number"
            place-text="Optional"
            v-bind="avgTimeAttrs"
          />
          <ErrorShort
            v-if="errors.avg_time"
            :error="errors.avg_time"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <SelectComponent
          v-model="category_id"
          name="Category"
          :options="
            categories.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.type?.name || 'No type'})`,
            }))
          "
          placeholder="Select category"
          :is-necessary="true"
          v-bind="categoryAttrs"
        />
        <ErrorShort
          v-if="errors.category_id"
          :error="errors.category_id"
        />
      </div>
    </div>
    <AccentButton
      name="Create service"
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
