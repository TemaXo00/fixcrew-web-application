<script setup lang="ts">
import CatalogHeadings from '@/components/catalogPages/CatalogHeadings.vue'
import { onMounted, ref, watch } from 'vue'
import type { TypesDetailedInterface } from '@/interfaces/types.interface.ts'
import { useRoute } from 'vue-router'
import { servicesApi } from '@/api/routes/services.api.ts'
import { extractApiError } from '@/api/error-handler.api.ts'
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CategoryCards from '@/components/catalogPages/CategoryCards.vue'
import ContactArea from '@/components/universalComp/ContactArea.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import SpinnerLoader from '@/components/universalComp/SpinnerLoader.vue'
import ErrorCode from '@/components/universalComp/ErrorCode.vue'
import router from '@/router'
import BreadcrumbsComp from '@/components/universalComp/BreadcrumbsComp.vue'

const route = useRoute()

const type = ref<TypesDetailedInterface>()
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const fetchTypeData = async (id: string | string[]) => {
  try {
    errorMessage.value = ''
    isLoading.value = true
    type.value = await servicesApi.getTypeById(id)
  } catch (error) {
    const apiError = extractApiError(error)
    errorMessage.value = apiError.message
    if (apiError.statusCode === 404) {
      await router.push({ name: 'NotFound' })
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchTypeData(route.params.id!)
})

watch(
  () => route.params.id,
  async (newId) => {
    await fetchTypeData(newId!)
  },
)
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <BreadcrumbsComp />
  <div
    class="flex flex-col items-center justify-center min-h-screen"
    v-if="isLoading || errorMessage"
  >
    <SpinnerLoader v-if="isLoading" />
    <ErrorCode :code="500" :message="errorMessage" v-if="errorMessage" />
  </div>
  <div class="max-w-2xl mx-auto p-5">
    <CatalogHeadings :name="type?.name" />
    <div class="flex flex-col gap-5 mt-8 mb-20">
      <CategoryCards
        v-for="category in type?.categories"
        :key="category.id"
        :id="String(category.id)"
        :name="category.name"
      />
    </div>
    <ContactArea />
  </div>
  <FooterComponent />
  <ScrollToTop />
</template>

<style scoped></style>
