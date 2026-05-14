<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import InfoComponent from '@/components/infoPage/InfoComponent.vue'
import type { ServiceInterface } from '@/interfaces/service.interface.ts'
import { servicesApi } from '@/api/routes/services.api.ts'
import { extractApiError } from '@/api/error-handler.api.ts'
import SpinnerLoader from '@/components/universalComp/SpinnerLoader.vue'
import ErrorCode from '@/components/universalComp/ErrorCode.vue'
import ScrollToTop from '@/components/universalComp/ScrollToTop.vue'
import BreadcrumbsComp from '@/components/universalComp/BreadcrumbsComp.vue'

const route = useRoute()
const router = useRouter()
const slug = ref<string | string[] | undefined>(route.params.slug)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)

const isLoading = ref<boolean>(false)

const service = ref<ServiceInterface | null>(null)

onMounted(async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    service.value = await servicesApi.getServiceBySlug(slug.value)
  } catch (error) {
    const apiError = extractApiError(error)
    errorMessage.value = apiError.message
    errorCode.value = apiError.statusCode
    if (errorCode.value === 404) {
      await router.push({ name: 'NotFound' })
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <TopHeader />
  <BottomHeader />
  <BreadcrumbsComp />
  <div
    v-if="isLoading || errorCode"
    class="flex flex-col items-center justify-center h-screen w-screen"
  >
    <SpinnerLoader class="w-25 h-25" v-if="isLoading" />
    <ErrorCode v-if="errorCode" :code="errorCode" message="Something Went Wrong" />
  </div>
  <InfoComponent :info="service" />
  <FooterComponent />
  <ScrollToTop />
</template>

<style scoped></style>
