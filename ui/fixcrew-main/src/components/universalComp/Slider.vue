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
  <div class="relative w-full overflow-hidden rounded-xl mt-4 sm:mt-6 md:mt-8 shadow-lg">
    <div
      class="flex transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="min-w-full relative">
        <div class="relative bg-main">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] object-cover opacity-70"
          />
          <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-8"
        >
          <h2
            class="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg max-w-4xl"
          >
            {{ slide.title }}
          </h2>
          <p
            class="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl mb-4 sm:mb-5 md:mb-6 drop-shadow-md px-2"
          >
            {{ slide.description }}
          </p>
          <button
            class="bg-[#0077B6] hover:bg-[#006AA2] text-white font-sans rounded-[10px] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-200"
          >
            {{ slide.buttonText }}
          </button>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2 backdrop-blur-sm transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2 backdrop-blur-sm transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <div
      class="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2"
    >
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="rounded-full transition-all duration-300"
        :class="[
          currentSlide === index
            ? 'bg-[#0077B6] w-4 sm:w-5 md:w-6 h-1.5 sm:h-2 md:h-2.5'
            : 'bg-white/70 hover:bg-white w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5',
        ]"
      ></button>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 480px) {
  .h-\[250px\] {
    height: 200px;
  }
}

@media (min-width: 1537px) {
  .h-\[550px\] {
    height: 600px;
  }

  .text-xl {
    font-size: 2.5rem;
  }
}

@media (max-width: 896px) and (orientation: landscape) {
  .h-\[250px\] {
    height: 300px;
  }

  .h-\[300px\] {
    height: 350px;
  }

  .absolute.inset-0.flex {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

@media (min-width: 640px) and (max-width: 768px) and (orientation: portrait) {
  .text-3xl {
    font-size: 2.5rem;
  }

  .max-w-sm {
    max-width: 28rem;
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
</style>
