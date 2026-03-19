<script setup lang="ts">
interface TypesSubCategories {
  id: number
  title: string
  description: string
}
interface TypesCategories {
  id: number
  title: string
  subCategoriesTitles: string
  subCategories: TypesSubCategories[]
}

interface Types {
  id: number
  title: string
  categories: TypesCategories[]
}

const services: Types[] = [
  {
    id: 1,
    title: 'Residental Appliances',
    categories: [
      {
        id: 1,
        title: 'Refridgerators',
        subCategoriesTitles:
          'Diagnostic, Temperature and Sensor Replacement, Defrost Sensor Replacement...',
        subCategories: [
          {
            id: 1,
            title: 'Diagnostic',
            description: 'Repair',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="bg-color"></div>
</template>

<style scoped></style>
