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

const formatPrice = (price: number): string => `$${price.toFixed(2)}`

const calculateDiscountedPrice = (price: number, salePercent: number): number => price - (price * salePercent) / 100
</script>

<template>
  <div class="flex flex-col gap-3 p-4 border border-accent rounded-lg">
    <div class="flex flex-col gap-1">
      <p class="font-bold text-accent text-lg break-all">
        {{ props.name }}
      </p>
      <p class="text-dimmed text-sm">
        {{ props.description }}
      </p>
      <p class="text-sm">
        Status:
        <span
          :class="props.is_active ? 'text-muted-accent' : 'text-dimmed'"
          class="font-semibold"
        >
          {{ props.is_active ? 'Active' : 'Inactive' }}
        </span>
      </p>
    </div>

    <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-dimmed">
      <p>Category: {{ props.category?.name || 'N/A' }}</p>
      <p v-if="props.avg_time">
        Avg time: {{ props.avg_time }} min
      </p>
      <p class="flex items-center gap-2">
        Price:
        <span
          v-if="props.sale_percent > 0"
          class="line-through"
        >
          {{ formatPrice(props.price) }}
        </span>
        <span class="font-bold text-accent">
          {{ formatPrice(calculateDiscountedPrice(props.price, props.sale_percent)) }}
        </span>
        <span
          v-if="props.sale_percent > 0"
          class="text-muted-accent"
        >
          -{{ props.sale_percent }}%
        </span>
      </p>
    </div>

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
