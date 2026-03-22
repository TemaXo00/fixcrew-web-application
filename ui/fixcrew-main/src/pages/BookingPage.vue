<script setup lang="ts">
import { ref } from 'vue'
import type { Types, TypesCategories, TypesSubCategories } from '@/interfaces/booking.interface.ts'
import { services } from '@/mocks/booking.mock.ts'

const step = ref(1)
const selectedService = ref<Types | null>(null)
const selectedCategory = ref<TypesCategories | null>(null)
const selectedSubCategory = ref<TypesSubCategories | null>(null)

const previewUrls = ref<string[]>([])
const selectedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const selectService = (service: Types) => {
  selectedService.value = service
  proceed()
}

const selectCategory = (category: TypesCategories) => {
  selectedCategory.value = category
  proceed()
}

const selectSubCategory = (sub: TypesSubCategories) => {
  selectedSubCategory.value = sub
  proceed()
}

const goBack = () => {
  if (step.value >= 0) step.value--
}

const proceed = () => {
  step.value++
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (files) {
    const newFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

    if (newFiles.length !== Array.from(files).length) {
      alert('Some files were skipped. Please upload only image files.')
    }

    newFiles.forEach((file) => {
      selectedFiles.value.push(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        previewUrls.value.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeImage = (index: number) => {
  previewUrls.value.splice(index, 1)
  selectedFiles.value.splice(index, 1)
}

const details = ref<string>('')
</script>

<template>
  <div class="max-w-2xl mx-auto p-5">
    <button
      @click="goBack"
      class="mb-4 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      v-if="step > 1"
    >
      Back
    </button>

    <div v-if="step === 1">
      <h2 class="text-2xl font-bold mb-4">Select Service</h2>
      <div
        v-for="service in services"
        :key="service.id"
        class="p-4 mb-3 border border-[#00B4D8] cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectService(service)"
      >
        {{ service.title }}
      </div>
    </div>

    <div v-if="step === 2">
      <h2 class="text-2xl font-bold mb-4">Select Category</h2>
      <div
        v-for="category in selectedService?.categories"
        :key="category.id"
        class="p-4 mb-3 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectCategory(category)"
      >
        {{ category.title }}
      </div>
    </div>

    <div v-if="step === 3">
      <h2 class="text-2xl font-bold mb-4">Select Subcategory</h2>
      <div
        v-for="sub in selectedCategory?.subCategories"
        :key="sub.id"
        class="p-4 mb-3 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectSubCategory(sub)"
      >
        <div class="font-medium">{{ sub.title }}</div>
        <div class="text-sm text-gray-600 mt-1">{{ sub.description }}</div>
      </div>
    </div>

    <div v-if="step === 4">
      <h2 class="text-2xl font-bold mb-4">Summary</h2>
      <div class="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div class="font-medium">{{ selectedService?.title }}</div>
        <div class="text-gray-700">{{ selectedCategory?.title }}</div>
        <div class="text-gray-600">{{ selectedSubCategory?.title }}</div>
        <div class="text-sm text-gray-500 mt-2">{{ selectedSubCategory?.description }}</div>
      </div>
      <button
        @click="proceed"
        class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Next
      </button>
    </div>

    <div v-if="step === 5">
      <div class="flex flex-col gap-10">
        <div class="text-3xl font-sans font-bold">Additional details (optional)</div>
        <textarea
          class="w-[100%] h-[300px] border-2 border-[#EAEAEA] pt-[20px] p-[20px] resize-none hover:border-gray-500 rounded-2xl"
          type="text"
          v-model="details"
          placeholder="Write a short description and include specific details needed for the appointment..."
          style="display: flex; align-items: flex-start; padding-top: 8px"
        />

        <div class="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            ref="fileInput"
            multiple
            class="hidden"
          />
          <button
            @click="fileInput?.click()"
            class="px-6 py-3 bg-white border-2 border-[#00B4D8] text-[#00B4D8] rounded-xl hover:bg-[#00B4D8] hover:text-white transition flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              ></path>
            </svg>
            Upload Images
          </button>

          <div class="flex flex-wrap gap-4">
            <div v-for="(url, index) in previewUrls" :key="index" class="relative w-32 h-32">
              <img :src="url" class="w-full h-full object-cover rounded-lg" alt="Preview" />
              <button
                @click="removeImage(index)"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="proceed"
        class="mb-4 mt-10 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Next
      </button>
    </div>
  </div>
</template>
