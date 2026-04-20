<script setup lang="ts">
import FileImage from '@/components/universalComp/FileImage.vue'
import { FileVisibilityEnum } from '@/interfaces/files.types'

interface Props {
  name?: string
  cover_id?: string
}

defineProps<Props>()
</script>

<template>
  <div class="relative">
    <FileImage
      :file-id="cover_id"
      :visibility="FileVisibilityEnum.public"
      class-name="aspect-video w-full sm:w-250 object-cover"
    />
    <div class="absolute inset-0 bg-black/65 z-10"></div>
    <p
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 text-white bg-[#004483] z-20 whitespace-nowrap text-center"
    >
      {{ name }}
    </p>
  </div>
</template>
