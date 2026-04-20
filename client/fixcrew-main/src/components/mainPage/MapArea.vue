<template>
  <div class="flex flex-col items-center bg-[#e7e7e7] p-10 rounded-2xl gap-3">
    <h2 class="text-5xl font-sans mb-14 text-[#626262]">Feel free to contact us 24/7</h2>
    <div class="w-full h-[600px] relative">
      <div ref="mapContainer" class="w-full h-full"></div>

      <div
        v-if="tooltip.visible"
        :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }"
        class="absolute bg-white shadow-lg rounded-xl p-3 text-sm pointer-events-none z-10"
      >
        <div class="font-semibold">{{ tooltip.title }}</div>
        <div>Avg. Response: {{ tooltip.response }}</div>
        <div>Same-day service available</div>
      </div>
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

async function fetchRegionBoundary(city: string): Promise<L.GeoJSON | null> {
  const query = `${city}, California, USA`
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=geojson&polygon_geojson=1&limit=1`

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LeafletMapApp/1.0',
      },
    })
    const data = await response.json()
    if (!data.features || data.features.length === 0) return null

    const feature = data.features[0]
    if (!feature.geometry) return null

    const geoJsonLayer = L.geoJSON(feature, {
      style: {
        color: '#3b82f6',
        weight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.4,
      },
    })

    return geoJsonLayer
  } catch (error) {
    console.error(`Failed to fetch boundary for ${city}:`, error)
    return null
  }
}

onMounted(async () => {
  if (!mapContainer.value) return

  const map = L.map(mapContainer.value).setView([37.3, -121.9], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Boundaries &copy; OpenStreetMap contributors',
  }).addTo(map)

  const bounds = L.latLngBounds()
  const locationMap = new Map(locations.map((loc) => [loc.name, loc]))

  for (const loc of locations) {
    const boundary = await fetchRegionBoundary(loc.name)
    if (boundary) {
      boundary.addTo(map)
      boundary.eachLayer((layer) => {
        if (layer instanceof L.Path) {
          layer.on('mouseover', (e: L.LeafletMouseEvent) => {
            tooltip.value.visible = true
            tooltip.value.x = e.originalEvent.clientX
            tooltip.value.y = e.originalEvent.clientY
            tooltip.value.title = loc.name
            tooltip.value.response = loc.response
          })
          layer.on('mousemove', (e: L.LeafletMouseEvent) => {
            tooltip.value.x = e.originalEvent.clientX
            tooltip.value.y = e.originalEvent.clientY
          })
          layer.on('mouseout', () => {
            tooltip.value.visible = false
          })
          if (layer.getBounds) {
            bounds.extend(layer.getBounds())
          }
        }
      })
    } else {
      const circle = L.circle(loc.coords, {
        radius: 2000,
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(map)

      circle.on('mouseover', (e: L.LeafletMouseEvent) => {
        tooltip.value.visible = true
        tooltip.value.x = e.originalEvent.clientX
        tooltip.value.y = e.originalEvent.clientY
        tooltip.value.title = loc.name
        tooltip.value.response = loc.response
      })
      circle.on('mousemove', (e: L.LeafletMouseEvent) => {
        tooltip.value.x = e.originalEvent.clientX
        tooltip.value.y = e.originalEvent.clientY
      })
      circle.on('mouseout', () => {
        tooltip.value.visible = false
      })

      bounds.extend(circle.getBounds())
    }
  }

  if (!bounds.isValid()) {
    bounds.extend([37.3, -121.9])
  }
  map.fitBounds(bounds, { padding: [30, 30] })
})
</script>

<style scoped></style>
