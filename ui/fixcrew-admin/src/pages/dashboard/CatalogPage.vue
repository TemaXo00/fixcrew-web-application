<script setup lang="ts">
import type { CategoryResponseType } from '@/types/info/categories.types'
import type { ServiceResponseType } from '@/types/info/services.types'
import type { TypeResponseType } from '@/types/info/types.types'
import { ref } from 'vue'
import CreateCategory from '@/components/catalog/categories/CreateCategory.vue'
import GetAllCategories from '@/components/catalog/categories/GetAllCategories.vue'
import CreateService from '@/components/catalog/services/CreateService.vue'
import GetAllServices from '@/components/catalog/services/GetAllServices.vue'
import CreateType from '@/components/catalog/types/CreateType.vue'
import GetAllTypes from '@/components/catalog/types/GetAllTypes.vue'
import AccentButton from '@/components/shared/buttons/AccentButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

type TabType = 'types' | 'categories' | 'services'

const activeTab = ref<TabType>('types')

const getAllTypesRef = ref<InstanceType<typeof GetAllTypes> | null>(null)
const getAllCategoriesRef = ref<InstanceType<typeof GetAllCategories> | null>(null)
const getAllServicesRef = ref<InstanceType<typeof GetAllServices> | null>(null)

const handleTypeCreated = (type: TypeResponseType) => {
  getAllTypesRef.value?.handleTypeCreated(type)
}

const handleCategoryCreated = (category: CategoryResponseType) => {
  getAllCategoriesRef.value?.handleCategoryCreated(category)
}

const handleServiceCreated = (service: ServiceResponseType) => {
  getAllServicesRef.value?.handleServiceCreated(service)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col small:flex-row gap-3 pb-4">
      <AccentButton
        v-if="activeTab === 'types'"
        name="Types"
        class="px-6 py-2 w-full small:w-auto"
      />
      <OutlineButton
        v-else
        name="Types"
        class="px-6 py-2 w-full small:w-auto"
        @click="activeTab = 'types'"
      />

      <AccentButton
        v-if="activeTab === 'categories'"
        name="Categories"
        class="px-6 py-2 w-full small:w-auto"
      />
      <OutlineButton
        v-else
        name="Categories"
        class="px-6 py-2 w-full small:w-auto"
        @click="activeTab = 'categories'"
      />

      <AccentButton
        v-if="activeTab === 'services'"
        name="Services"
        class="px-6 py-2 w-full small:w-auto"
      />
      <OutlineButton
        v-else
        name="Services"
        class="px-6 py-2 w-full small:w-auto"
        @click="activeTab = 'services'"
      />
    </div>

    <div
      v-if="activeTab === 'types'"
      class="flex flex-col gap-6"
    >
      <CreateType @created="handleTypeCreated" />
      <GetAllTypes ref="getAllTypesRef" />
    </div>

    <div
      v-if="activeTab === 'categories'"
      class="flex flex-col gap-6"
    >
      <CreateCategory @created="handleCategoryCreated" />
      <GetAllCategories ref="getAllCategoriesRef" />
    </div>

    <div
      v-if="activeTab === 'services'"
      class="flex flex-col gap-6"
    >
      <CreateService @created="handleServiceCreated" />
      <GetAllServices ref="getAllServicesRef" />
    </div>
  </div>
</template>
