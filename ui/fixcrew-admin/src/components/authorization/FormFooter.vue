<script setup lang="ts">
interface Props {
  name: string
  link: string
  linkName: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex flex-col items-center gap-3 small:flex-row">
        <p class="text-dimmed text-lg font-primary">
            {{ name }}
        </p>
        <RouterLink
            :to="link"
            class="text-muted-accent text-lg font-primary hover:underline"
        >
            {{ linkName }}
        </RouterLink>
    </div>
</template>

<style scoped></style>
