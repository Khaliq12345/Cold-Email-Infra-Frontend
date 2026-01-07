<template>
  <UHeader>
    <template #left>
      <div class="flex items-center gap-2">
        <h2 class="font-bold">Cold Email Infra</h2>
        <p>/</p>
        <Navigation />
      </div>
    </template>
    <template #right>
      <ThemeToggle />
      <button class="text-sm text-black dark:text-white rounded px-2 py-1">Support</button>
      <UAvatar text="U" />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
</script>
