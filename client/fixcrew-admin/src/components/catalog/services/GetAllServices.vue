<script setup lang="ts">
import type { ServiceResponseType } from '@/types/info/services.types'
import type { PaginatedResponse } from '@/types/shared/pagination.types'
import { onMounted, ref } from 'vue'
import { extractApiError } from '@/api/error-handler.api.ts'
import { servicesApi } from '@/api/info/services.api.ts'
import ServiceItem from '@/components/catalog/services/ServiceItem.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import Pagination from '@/components/shared/Pagination.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'

const servicesData = ref<PaginatedResponse<ServiceResponseType> | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<number | null>(null)
const currentPage = ref<number>(1)
const limit = ref<number>(10)

const fetchServices = async () => {
  try {
    isLoading.value = true
    error.value = null
    servicesData.value = await servicesApi.getServices({
      page: currentPage.value,
      limit: limit.value,
    })
  }
  catch (err: any) {
    const apiError = extractApiError(err)
    error.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}

const handleServiceCreated = (newService: ServiceResponseType) => {
  if (servicesData.value) {
    servicesData.value.items = [newService, ...servicesData.value.items]
    servicesData.value.total += 1
    servicesData.value.totalPages = Math.ceil(servicesData.value.total / limit.value)
  }
}

const handleServiceUpdated = (updatedService: ServiceResponseType) => {
  if (servicesData.value) {
    const index = servicesData.value.items.findIndex(s => s.id === updatedService.id)
    if (index !== -1) {
      servicesData.value.items[index] = updatedService
      servicesData.value.items = [...servicesData.value.items]
    }
  }
}

const handleServiceDeleted = (deletedId: string) => {
  if (servicesData.value) {
    servicesData.value.items = servicesData.value.items.filter(s => s.id !== deletedId)
    servicesData.value.total -= 1
    servicesData.value.totalPages = Math.ceil(servicesData.value.total / limit.value)
    if (servicesData.value.items.length === 0 && currentPage.value > 1) {
      currentPage.value--
      fetchServices()
    }
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchServices()
}

const handlePrev = () => {
  if (servicesData.value?.hasPrev) {
    currentPage.value--
    fetchServices()
  }
}

const handleNext = () => {
  if (servicesData.value?.hasNext) {
    currentPage.value++
    fetchServices()
  }
}

defineExpose({
  handleServiceCreated,
})

onMounted(async () => {
  await fetchServices()
})
</script>

<template>
  <SpinnerLoader v-if="isLoading && !servicesData" />
  <div
    v-else
    class="flex flex-col gap-4"
  >
    <Title title="Services" />

    <div
      v-if="isLoading && servicesData"
      class="text-center py-2 text-sm text-dimmed"
    >
      Updating...
    </div>

    <div class="flex flex-col gap-4">
      <ServiceItem
        v-for="service in servicesData?.items"
        :id="service.id"
        :key="service.id"
        :name="service.name"
        :slug="service.slug"
        :description="service.description"
        :price="service.price"
        :sale_percent="service.sale_percent"
        :avg_time="service.avg_time"
        :is_active="service.is_active"
        :category_id="service.category_id"
        :category="service.category"
        :cover_id="service.cover_id"
        @updated="handleServiceUpdated"
        @deleted="handleServiceDeleted"
      />
    </div>

    <ErrorCode
      v-if="error"
      :code="error"
      class="flex items-center justify-center"
    />

    <Pagination
      :current-page="servicesData?.page || currentPage"
      :total-pages="servicesData?.totalPages || 1"
      :has-next="servicesData?.hasNext || false"
      :has-prev="servicesData?.hasPrev || false"
      @page-change="handlePageChange"
      @prev="handlePrev"
      @next="handleNext"
    />
  </div>
</template>
