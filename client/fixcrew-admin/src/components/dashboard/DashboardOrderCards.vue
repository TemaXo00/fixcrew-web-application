<script setup lang="ts">
import type { OrderCalendar } from '@/types/order/order.types.ts'
import type { PaginatedResponse } from '@/types/shared/pagination.types.ts'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { extractApiError } from '@/api/error-handler.api.ts'
import { orderApi } from '@/api/order/order.api.ts'
import OrderCard from '@/components/dashboard/OrderCard.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'
import ErrorCode from '@/components/shared/errors/ErrorCode.vue'
import SpinnerLoader from '@/components/shared/SpinnerLoader.vue'
import Title from '@/components/shared/Title.vue'
import { useProfileStore } from '@/stores/profile.store.ts'

const cards = ref<PaginatedResponse<OrderCalendar> | null>(null)
const errorMessage = ref<string>('')
const errorCode = ref<number | null>(null)
const isLoading = ref<boolean>(false)
const store = useProfileStore()
const router = useRouter()

const fetchOrders = async () => {
  if (!store.user?.id)
    return

  try {
    isLoading.value = true
    errorMessage.value = ''
    errorCode.value = null
    cards.value = await orderApi.getPendingOrders(store.user?.id)
  }
  catch (error) {
    const apiError = extractApiError(error)
    errorMessage.value = apiError.message
    errorCode.value = apiError.statusCode
  }
  finally {
    isLoading.value = false
  }
}

const ensureUserAndFetch = async () => {
  if (store.user?.id) {
    await fetchOrders()
    return true
  }

  await store.getMe()

  if (store.user?.id) {
    await fetchOrders()
    return true
  }

  return false
}

const handleShowMore = () => {
  router.push({ name: 'NotFound' })
}

onMounted(async () => {
  const hasUser = await ensureUserAndFetch()

  if (!hasUser) {
    setTimeout(async () => {
      await ensureUserAndFetch()
    }, 2000)
  }
})
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Title
      title="Pending orders"
      class="text-lg text-dimmed"
    />

    <SpinnerLoader v-if="isLoading && !cards?.items?.length" />

    <div
      v-else-if="errorCode"
      class="w-full flex justify-center py-8"
    >
      <ErrorCode
        :message="errorMessage"
        :code="errorCode"
      />
    </div>

    <div
      v-else
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex flex-col gap-2">
        <OrderCard
          v-for="order in cards?.items"
          :key="order.id"
          :order="order"
        />
      </div>

      <OutlineButton
        v-if="cards?.hasNext"
        name="Show more"
        class="self-center mt-2"
        @click="handleShowMore"
      />
    </div>
  </div>
</template>

<style scoped></style>
