<script setup lang="ts">
import DashboardCalendar from '@/components/dashboard/DashboardCalendar.vue'
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardOrderCards from '@/components/dashboard/DashboardOrderCards.vue'
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <DashboardHeader />
    <div class="flex flex-col xl:flex-row gap-8">
      <div class="w-full xl:w-2/5">
        <DashboardOrderCards />
      </div>
      <div class="w-full xl:w-3/5">
        <DashboardCalendar />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
