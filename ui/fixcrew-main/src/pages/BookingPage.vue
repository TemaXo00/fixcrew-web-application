<script setup lang="ts">
import { ref } from 'vue'

interface TypesSubCategories {
  id: number
  title: string
  description: string
}
interface TypesCategories {
  id: number
  title: string
  subCategories: TypesSubCategories[]
}
interface Types {
  id: number
  title: string
  categories: TypesCategories[]
}

const services: Types[] = [
  {
    id: 1,
    title: 'Residental Appliances',
    categories: [
      {
        id: 1,
        title: 'Refridgerators',
        subCategories: [
          {
            id: 1,
            title: 'Diagnostic',
            description:
              'Complete inspection and testing of all refrigerator components to identify issues',
          },
          {
            id: 2,
            title: 'Refrigerator',
            description: 'General repair and maintenance services for all refrigerator types',
          },
          {
            id: 3,
            title: 'Refrigerator temperature and sensor replacement',
            description:
              'Replace faulty temperature sensors to maintain proper cooling and food preservation',
          },
          {
            id: 4,
            title: 'Refrigerator defrost sensor replacement',
            description:
              'Install new defrost sensor to prevent ice buildup and ensure efficient operation',
          },
          {
            id: 5,
            title: 'Refrigerator evaporator fan replacement',
            description:
              'Replace malfunctioning evaporator fan to restore proper air circulation and cooling',
          },
          {
            id: 6,
            title: 'Refrigerator Control Board Replacement',
            description:
              'Install new control board to fix electronic issues and restore all refrigerator functions',
          },
          {
            id: 7,
            title: 'Refrigerator thermostat replacement',
            description:
              'Replace faulty thermostat for accurate temperature control and energy efficiency',
          },
          {
            id: 8,
            title: 'Refrigerator ice maker replacement',
            description: 'Install new ice maker assembly to restore automatic ice production',
          },
          {
            id: 9,
            title: 'Refrigerator water valve replacement',
            description:
              'Replace defective water inlet valve to fix water dispensing and ice making issues',
          },
          {
            id: 10,
            title: 'Refrigerator Door seal replacement',
            description:
              'Install new door gasket to prevent cold air leakage and improve energy efficiency',
          },
          {
            id: 11,
            title: 'Refrigerator defrost heater replacement',
            description:
              'Replace faulty defrost heater to prevent ice buildup and ensure proper cooling cycles',
          },
          {
            id: 12,
            title: 'Refrigerator compressor replacement',
            description:
              'Install new compressor to restore proper cooling when compressor has failed',
          },
          {
            id: 13,
            title: 'Refrigerator compressor start relay replacement',
            description:
              'Replace defective start relay to fix compressor starting issues and cooling problems',
          },
          {
            id: 14,
            title: 'Refrigerator sealed system repair',
            description:
              'Professional repair of the sealed cooling system including compressor, condenser, and evaporator',
          },
          {
            id: 15,
            title: 'Refrigerator freon leak repair',
            description:
              'Locate and repair refrigerant leaks, then recharge system to proper levels',
          },
          {
            id: 16,
            title: 'Refrigerator drain line cleaning',
            description:
              'Clear clogged drain lines to prevent water leaks and ice buildup in freezer',
          },
        ],
      },
    ],
  },
]

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
        class="p-4 mb-3 border border-gray-300 cursor-pointer rounded-lg hover:bg-gray-100 transition"
        @click="selectService(service)"
      >
        {{ service.title }}
      </div>
    </div>

    <div v-if="step === 2">
      <button
        @click="goBack"
        class="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
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
        class="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
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
        class="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
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
