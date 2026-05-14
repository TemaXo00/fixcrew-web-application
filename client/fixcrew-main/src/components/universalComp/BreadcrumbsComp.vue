<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { servicesApi } from '@/api/routes/services.api.ts'
import { ref, watch } from 'vue'

interface BreadcrumbItem {
  name: string
  path: string
  isClickable: boolean
}

const route = useRoute()
const router = useRouter()

const breadcrumbs = ref<BreadcrumbItem[]>([])
const isLoading = ref(false)

const buildBreadcrumbs = async () => {
  isLoading.value = true
  const crumbs: BreadcrumbItem[] = []

  crumbs.push({
    name: 'Home',
    path: '/',
    isClickable: route.path !== '/',
  })

  const routeName = route.name as string

  if (routeName === 'TypeDetailed') {
    const typeId = route.params.id as string
    try {
      const typeData = await servicesApi.getTypeById(typeId)
      crumbs.push({
        name: typeData.name,
        path: `/type/${typeId}`,
        isClickable: false,
      })
    } catch {
      crumbs.push({
        name: typeId,
        path: `/type/${typeId}`,
        isClickable: false,
      })
    }
  }

  if (routeName === 'CategoryDetailedPage') {
    const categoryId = route.params.id as string
    try {
      const category = await servicesApi.getCategoryById(categoryId)
      if (category.type_id) {
        const typeData = await servicesApi.getTypeById(category.type_id)
        crumbs.push({
          name: typeData.name,
          path: `/type/${category.type_id}`,
          isClickable: true,
        })
      }
      crumbs.push({
        name: category.name,
        path: `/category/${categoryId}`,
        isClickable: false,
      })
    } catch {
      crumbs.push({
        name: categoryId,
        path: `/category/${categoryId}`,
        isClickable: false,
      })
    }
  }

  if (routeName === 'Service') {
    const serviceSlug = route.params.slug as string
    try {
      const service = await servicesApi.getServiceBySlug(serviceSlug)
      if (service.category_id) {
        const category = await servicesApi.getCategoryById(String(service.category_id))
        if (category.type_id) {
          const typeData = await servicesApi.getTypeById(category.type_id)
          crumbs.push({
            name: typeData.name,
            path: `/type/${category.type_id}`,
            isClickable: true,
          })
        }
        crumbs.push({
          name: category.name,
          path: `/category/${service.category_id}`,
          isClickable: true,
        })
      }
      crumbs.push({
        name: service.name,
        path: `/service/${serviceSlug}`,
        isClickable: false,
      })
    } catch {
      crumbs.push({
        name: serviceSlug,
        path: `/service/${serviceSlug}`,
        isClickable: false,
      })
    }
  }

  breadcrumbs.value = crumbs
  isLoading.value = false
}

const navigateTo = (path: string) => {
  router.push(path)
}

watch(
  () => route.fullPath,
  async () => {
    await buildBreadcrumbs()
  },
  { immediate: true },
)
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb" v-if="!isLoading">
    <ol class="flex flex-wrap items-center justify-center gap-3 my-6">
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center gap-3">
        <span
          v-if="index > 0"
          class="text-[#9CA3AF] select-none text-base sm:text-lg"
          aria-hidden="true"
        >
          >
        </span>
        <span
          v-if="crumb.isClickable"
          @click="navigateTo(crumb.path)"
          class="text-main hover:text-[#0077B6] hover:underline cursor-pointer transition-colors text-base sm:text-lg font-medium"
        >
          {{ crumb.name }}
        </span>
        <span
          v-else
          class="text-[#626262] cursor-default text-base sm:text-lg font-medium"
          aria-current="page"
        >
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  width: 100%;
}
</style>
