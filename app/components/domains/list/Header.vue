<template>
  <div
    class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
  >
    <h2 class="text-lg sm:text-xl font-bold">Domains</h2>
    <div
      class="flex flex-col sm:flex-row gap-2 sm:gap-2 items-start sm:items-center"
    >
      <p class="text-sm">
        0 domains avalaible
        <a href="#" class="text-primary hover:underline">add more</a>
      </p>
      <UButton size="sm" to="/registrar/register" target="_blank"
        >Purchase subscription</UButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script>
