<template>
  <div class="w-full space-y-4">
    <div
      v-for="i in skeletonCount"
      :key="i"
      class="w-full border-b border-gray-100 dark:border-gray-800 last:border-none"
    >
      <!-- Trigger skeleton -->
      <div class="w-full flex items-center justify-between p-3">
        <USkeleton class="h-5 w-2/5" />
        <USkeleton class="h-5 w-5" />
      </div>

      <!-- Content skeleton -->
      <div class="w-full px-3 pb-3 flex flex-wrap items-center">
        <!-- Badges skeleton -->
        <div class="flex flex-wrap items-center gap-4 grow">
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
        </div>

        <!-- Buttons skeleton -->
        <div class="ml-auto flex gap-2 mt-2 sm:mt-0">
          <USkeleton class="h-4 w-15 rounded-md" />
          <USkeleton class="h-4 w-15 rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const skeletonCount = ref(3);
</script>
