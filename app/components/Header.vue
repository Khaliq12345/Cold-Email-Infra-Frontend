<template>
  <UHeader :toggle="false">
    <template #left>
      <div class="flex items-center gap-1 sm:gap-2">
        <h2 class="text-sm sm:text-lg font-bold">Enterprise</h2>
        <span class="text-gray-400 hidden sm:inline">/</span>
        <Navigation />
      </div>
    </template>
    <template #right>
      <ThemeToggle />
      <UButton variant="ghost" size="sm" icon="i-lucide-headphones">
        <span class="hidden sm:inline ml-1">Support</span>
      </UButton>
      <UAvatar text="U" size="sm" />
    </template>
  </UHeader>
</template>
<script setup lang="ts">
</script>
