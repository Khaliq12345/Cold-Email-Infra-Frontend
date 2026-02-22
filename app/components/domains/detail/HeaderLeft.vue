<template>
  <div class="flex items-center gap-4">
    <template v-if="domainDetails">
      <!-- Show if there's domain details -->
      <div
        class="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-200 dark:border-blue-800"
      >
        <UIcon
          name="i-lucide-globe"
          class="text-blue-600 dark:text-blue-400 size-6"
        />
      </div>

      <div class="flex flex-col">
        <h2
          class="text-lg font-bold tracking-tight uppercase text-gray-900 dark:text-white leading-tight"
        >
          {{ domainDetails.domain }}
        </h2>
        <span
          class="text-xs text-gray-500 font-medium uppercase tracking-wider"
        >
          Active Domain
        </span>
      </div>
    </template>

    <template v-else>
      <!-- Only show when there's no domain or when it is loading -->
      <USkeleton class="w-12 h-12 rounded-xl" />
      <div class="space-y-2">
        <USkeleton class="h-5 w-32" />
        <USkeleton class="h-3 w-20" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  domainDetails: any;
}>();
</script>
