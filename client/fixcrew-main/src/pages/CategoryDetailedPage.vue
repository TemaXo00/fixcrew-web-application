<script setup lang="ts">
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import ContactArea from '@/components/universalComp/ContactArea.vue'
import CatalogHeadings from '@/components/catalogPages/CatalogHeadings.vue'
import type { CategoryInterface } from '@/interfaces/category.interface.ts'
import { onMounted, ref, watch } from 'vue'
import { servicesApi } from '@/api/routes/services.api.ts'
import { useRoute } from 'vue-router'
import { extractApiError } from '@/api/error-handler.api.ts'
import router from '@/router'
import ServiceCards from '@/components/catalogPages/ServiceCards.vue'
import BreadcrumbsComp from '@/components/universalComp/BreadcrumbsComp.vue'

const route = useRoute()

const category = ref<CategoryInterface>()
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>('')

const fetchCategories = async (id: string | string[]) => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    category.value = await servicesApi.getCategoryById(id)
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
  await fetchCategories(route.params.id!)
})

watch(
  () => route.params.id,
  async (newId) => {
    await fetchCategories(newId!)
  },
)
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <BreadcrumbsComp />
  <div class="max-w-2xl mx-auto p-5">
    <CatalogHeadings :name="category?.name" />
    <div class="flex flex-col gap-5 mt-8 mb-20">
      <ServiceCards
        v-for="service in category?.services"
        :key="service.slug"
        :name="service.name"
        :slug="service.slug"
      />
    </div>
    <ContactArea />
  </div>
  <FooterComponent />
  <ScrollToTop />
</template>

<style scoped></style>
