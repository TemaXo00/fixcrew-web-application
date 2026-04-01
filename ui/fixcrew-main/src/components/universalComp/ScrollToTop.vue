<template>
  <Transition name="fade">
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-950 text-white border-none cursor-pointer text-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:bg-teal-600 shadow-md z-[1000]"
      aria-label="Наверх"
    >
      ↑
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref<boolean>(false)

const checkScroll = (): void => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted((): void => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted((): void => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
