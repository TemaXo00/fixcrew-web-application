<script setup lang="ts">
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import SidebarWrapper from '@/components/sidebar/SidebarWrapper.vue'
import { menuItems } from '@/utils/menu.utils.ts'
</script>

<template>
  <SidebarWrapper>
    <SidebarHeader />
    <div class="flex flex-col items-center gap-3">
      <SidebarLink
        v-for="item in menuItems"
        :key="item.name"
        :to="item.to"
        :name="item.name"
        :icon="item.icon"
      />
    </div>
  </SidebarWrapper>
</template>

<style scoped></style>
