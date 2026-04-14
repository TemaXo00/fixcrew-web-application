<script setup lang="ts">
interface Props {
  region: string,
  response: number,
}

defineProps<Props>()
</script>

<template>
  <div class="border-4 border-[#EAEAEA] text-gray-600 p-8 rounded-lg text-xl flex flex-col gap-2 hover:scale-103 hover:border-gray-400 hover:transition hover:duration-300">
    <div class="flex items-center justify-start">
      <img src="@/assets/images/location.svg" alt="location" class="mr-5 h-6.5" />
      <div class="text-2xl font-sans">{{region}}</div>
    </div>
    <div class="">Avg.Response: {{response}} min</div>
    <div class="font-semibold">Same-day service available for emergency repairs</div>
  </div>
</template>

<style scoped></style>
