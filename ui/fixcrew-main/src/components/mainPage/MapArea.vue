<template>
  <div class="text-center max-w-1xl">
    <h2 class="text-5xl font-sans mb-14 text-[#626262]">Feel free to contact us 24/7</h2>
  </div>

  <div class="w-full h-[600px] relative">
    <div ref="mapContainer" class="w-full h-full"></div>

    <div
      v-if="tooltip.visible"
      :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
      class="absolute bg-white shadow-lg rounded-xl p-3 text-sm pointer-events-none"
    >
      <div class="font-semibold">{{ tooltip.title }}</div>
      <div>Avg. Response: {{ tooltip.response }}</div>
      <div>Same-day service available</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLElement | null>(null)

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  title: '',
  response: '',
})

type Location = {
  name: string
  coords: [number, number]
  response: string
}

const locations: Location[] = [
  { name: 'Los Gatos', coords: [37.2358, -121.9624], response: '15 min' },
  { name: 'San Jose', coords: [37.3382, -121.8863], response: '30 min' },
  { name: 'Cupertino', coords: [37.3229, -122.0322], response: '35 min' },
  { name: 'Mountain View', coords: [37.3861, -122.0839], response: '35 min' },
  { name: 'Campbell', coords: [37.2872, -121.9499], response: '30 min' },
  { name: 'Los Altos', coords: [37.3852, -122.1141], response: '35 min' },
  { name: 'Palo Alto', coords: [37.4419, -122.143], response: '35 min' },
]

onMounted(() => {
  if (!mapContainer.value) return

  const map = L.map(mapContainer.value).setView([37.3, -121.9], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  locations.forEach((loc) => {
    const marker = L.circleMarker(loc.coords, {
      radius: 6,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 1,
    }).addTo(map)

    marker.on('mouseover', (e: any) => {
      tooltip.value.visible = true
      tooltip.value.x = e.originalEvent.clientX
      tooltip.value.y = e.originalEvent.clientY
      tooltip.value.title = loc.name
      tooltip.value.response = loc.response
    })

    marker.on('mouseout', () => {
      tooltip.value.visible = false
    })
  })
})
</script>

<style scoped></style>
