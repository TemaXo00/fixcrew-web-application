<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { refrigeratorMock } from '@/mocks/info.mock.ts'
import TopHeader from '@/components/TopHeader.vue'
import BottomHeader from '@/components/BottomHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import InfoComponent from '@/components/infoPage/InfoComponent.vue'
const route = useRoute()
const router = useRouter()
const slug = ref(route.params.slug)

if (slug.value !== 'info') {
  router.replace({name: 'NotFound'})
}


</script>

<template>
  <TopHeader />
  <BottomHeader />
  <InfoComponent />
  <FooterComponent />
</template>

<style scoped></style>
