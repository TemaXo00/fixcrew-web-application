<script setup lang="ts">
import { ref } from 'vue'
import slide1 from '@/assets/images/slider1pick.jpg'
import slide2 from '@/assets/images/sliderpick2.jpg'
import slide3 from '@/assets/images/sliderpick3.jpg'

const slides = ref([
  {
    image: slide1,
    title: 'COOLING PROBLEMS? WE FIX THEM FAST',
    description:
      'Expert refrigerator repair for all major brands. From ice maker issues to temperature problems. We get your appliances running efficiently',
    buttonText: 'Click here',
  },
  {
    image: slide2,
    title: 'EXPERT APPLIANCE REPAIR',
    description:
      'fast reliable repair for all your home appliances/Same-day service available with 90-day warranty on parts and labor.',
    buttonText: 'Learn More',
  },
  {
    image: slide3,
    title: 'EMERGENCY REPAIR',
    description: 'Fast response, support 24/7, emergency booking available',
    buttonText: 'Get Help',
  },
])

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-xl mt-8 shadow-lg">
    <div
      class="flex transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="min-w-full relative">
        <div class="relative bg-main">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover opacity-70"
          />
          <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
        >
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            {{ slide.title }}
          </h2>
          <p class="text-base sm:text-lg md:text-xl max-w-2xl mb-6 drop-shadow-md">
            {{ slide.description }}
          </p>
          <button
            class="bg-[#0077B6] hover:bg-[#006AA2] text-white font-sans rounded-[10px] px-6 py-3 text-base sm:text-lg transition-colors duration-200"
          >
            {{ slide.buttonText }}
          </button>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 backdrop-blur-sm transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-[#0077B6] w-6' : 'bg-white/70 hover:bg-white'"
      ></button>
    </div>
  </div>
</template>

<style scoped></style>
