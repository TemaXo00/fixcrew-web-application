<script setup lang="ts">
import { ref } from 'vue'
import type { Types, TypesCategories, TypesSubCategories } from '@/interfaces/booking.interface.ts'
import { services } from '@/mocks/booking.mock.ts'

const step = ref(1)
const selectedService = ref<Types | null>(null)
const selectedCategory = ref<TypesCategories | null>(null)
const selectedSubCategory = ref<TypesSubCategories | null>(null)

const selectService = (service: Types) => {
  selectedService.value = service
  step.value = 2
}

const selectCategory = (category: TypesCategories) => {
  selectedCategory.value = category
  step.value = 3
}

const selectSubCategory = (sub: TypesSubCategories) => {
  selectedSubCategory.value = sub
  step.value = 4
}

const goBack = () => {
  if (step.value === 4) {
    step.value = 3
    selectedSubCategory.value = null
  } else if (step.value === 3) {
    step.value = 2
    selectedCategory.value = null
  } else if (step.value === 2) {
    step.value = 1
    selectedService.value = null
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-5">
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
      <button
        @click="goBack"
        class="mb-4 px-4 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-gray-300 transition"
      >
        Back
      </button>
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
      <button
        @click="goBack"
        class="mb-4 px-4 py-2 bg-[#00B4D8] text-white rounded-lg hover:bg-gray-300 transition"
      >
        Back
      </button>
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
      <button
        @click="goBack"
        class="mb-4 px-4 py-2 bg-[#00B4D8] rounded-lg hover:bg-gray-300 transition text-white"
      >
        Back
      </button>
      <h2 class="text-2xl font-bold mb-4">Summary</h2>
      <div class="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div class="font-medium">{{ selectedService?.title }}</div>
        <div class="text-gray-700">{{ selectedCategory?.title }}</div>
        <div class="text-gray-600">{{ selectedSubCategory?.title }}</div>
        <div class="text-sm text-gray-500 mt-2">{{ selectedSubCategory?.description }}</div>
      </div>
    </div>
  </div>
</template>
