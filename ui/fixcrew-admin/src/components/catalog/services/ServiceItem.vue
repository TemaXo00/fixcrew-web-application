<script setup lang="ts">
import type { ServiceResponseType } from '@/types/info/services.types'
import { ref } from 'vue'
import DeleteService from '@/components/catalog/services/DeleteService.vue'
import ToggleServiceActive from '@/components/catalog/services/ToggleServiceActive.vue'
import UpdateServiceCategory from '@/components/catalog/services/UpdateServiceCategory.vue'
import UpdateServiceDescription from '@/components/catalog/services/UpdateServiceDescription.vue'
import UpdateServiceName from '@/components/catalog/services/UpdateServiceName.vue'
import UpdateServicePrice from '@/components/catalog/services/UpdateServicePrice.vue'
import UpdateServiceSalePercent from '@/components/catalog/services/UpdateServiceSalePercent.vue'
import DangerousButton from '@/components/shared/buttons/DangerousButton.vue'
import OutlineButton from '@/components/shared/buttons/OutlineButton.vue'

const props = defineProps<ServiceResponseType>()

const emit = defineEmits<{
  (e: 'updated', service: ServiceResponseType): void
  (e: 'deleted', id: string): void
}>()

const activeModal = ref<string | null>(null)

const closeAll = () => {
  activeModal.value = null
}

const handleOpen = (modalName: string) => {
  if (activeModal.value === modalName) {
    activeModal.value = null
  }
  else {
    activeModal.value = modalName
  }
}

const handleServiceUpdated = (updatedService: ServiceResponseType) => {
  emit('updated', updatedService)
  closeAll()
}

const handleServiceDeleted = (deletedId: string) => {
  emit('deleted', deletedId)
  closeAll()
}

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)

const calculateDiscountedPrice = (price: number, salePercent: number): number =>
  price - (price * salePercent) / 100
</script>

<template>
  <div class="flex flex-col gap-4 p-4 border border-accent rounded-lg">
    <div class="flex flex-col gap-3 large:grid large:grid-cols-3 large:gap-4">
      <div class="flex flex-col">
        <p class="font-bold text-accent break-all text-lg">
          {{ props.name }}
        </p>
        <p class="text-sm text-dimmed mt-1">
          Category:
          <span class="bg-muted-accent text-container px-2 py-0.5 rounded-md text-xs font-semibold">
            {{ props.category?.name || 'N/A' }}
          </span>
        </p>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-medium text-dimmed">Price:</span>
          <span
            v-if="props.sale_percent > 0"
            class="line-through text-dimmed"
          >
            {{ formatPrice(props.price) }}
          </span>
          <span class="font-bold text-accent text-lg">
            {{ formatPrice(calculateDiscountedPrice(props.price, props.sale_percent)) }}
          </span>
          <span
            v-if="props.sale_percent > 0"
            class="bg-muted-accent text-container px-2 py-0.5 rounded-md text-xs font-semibold"
          >
            -{{ props.sale_percent }}%
          </span>
        </div>
        <p
          v-if="props.avg_time"
          class="text-sm text-dimmed mt-1"
        >
          Avg time:
          <span class="bg-muted-accent text-container px-2 py-0.5 rounded-md text-xs font-semibold">
            {{ props.avg_time }} min
          </span>
        </p>
      </div>
      <div class="flex items-center">
        <span
          :class="props.is_active ? 'bg-muted-accent' : 'bg-dimmed'"
          class="px-3 py-1 rounded-full text-white text-xs font-semibold w-fit"
        >
          {{ props.is_active ? 'Active' : 'Inactive' }}
        </span>
      </div>
    </div>

    <p class="text-dimmed text-sm line-clamp-2">
      {{ props.description }}
    </p>

    <div class="flex flex-wrap gap-3 mt-2">
      <OutlineButton
        name="Change Name"
        class="px-4 py-2"
        @click="handleOpen('name')"
      />
      <OutlineButton
        name="Description"
        class="px-4 py-2"
        @click="handleOpen('description')"
      />
      <OutlineButton
        name="Price"
        class="px-4 py-2"
        @click="handleOpen('price')"
      />
      <OutlineButton
        name="Sale %"
        class="px-4 py-2"
        @click="handleOpen('sale')"
      />
      <OutlineButton
        name="Category"
        class="px-4 py-2"
        @click="handleOpen('category')"
      />
      <OutlineButton
        :name="props.is_active ? 'Deactivate' : 'Activate'"
        class="px-4 py-2"
        @click="handleOpen('toggle')"
      />
      <DangerousButton
        name="Delete"
        class="px-4 py-2"
        @click="handleOpen('delete')"
      />
    </div>

    <UpdateServiceName
      v-if="activeModal === 'name'"
      :id="props.id"
      :current-name="props.name"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <UpdateServiceDescription
      v-if="activeModal === 'description'"
      :id="props.id"
      :current-description="props.description"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <UpdateServicePrice
      v-if="activeModal === 'price'"
      :id="props.id"
      :current-price="props.price"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <UpdateServiceSalePercent
      v-if="activeModal === 'sale'"
      :id="props.id"
      :current-sale-percent="props.sale_percent"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <UpdateServiceCategory
      v-if="activeModal === 'category'"
      :id="props.id"
      :current-category-id="props.category_id"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <ToggleServiceActive
      v-if="activeModal === 'toggle'"
      :id="props.id"
      :is-active="props.is_active"
      @close="closeAll"
      @updated="handleServiceUpdated"
    />
    <DeleteService
      v-if="activeModal === 'delete'"
      :id="props.id"
      @close="closeAll"
      @deleted="handleServiceDeleted"
    />
  </div>
</template>
