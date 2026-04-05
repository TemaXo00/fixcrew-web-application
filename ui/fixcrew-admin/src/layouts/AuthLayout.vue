<script setup lang="ts">
import FormBackground from '@/components/authorization/FormBackground.vue'
import FormWrapper from '@/components/authorization/FormWrapper.vue'
</script>

<template>
    <FormWrapper>
        <FormBackground>
            <router-view />
        </FormBackground>
    </FormWrapper>
</template>

<style scoped></style>
