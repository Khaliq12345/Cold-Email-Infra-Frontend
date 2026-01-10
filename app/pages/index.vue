<template>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'default',
    middleware: 'auth',
  })
  onMounted(() => {
    navigateTo('/domains')
  })
</script>