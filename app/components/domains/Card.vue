<template>
  <UCard class="relative overflow-hidden">
    <template #header>
      <div class="blur-[3px] select-none pointer-events-none">
        <DomainsChartHeader />
      </div>
    </template>

    <template #default>
      <div
        class="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-gray-900/60 backdrop-blur-[2px]"
      >
        <div class="flex flex-col items-center gap-2">
          <UIcon
            name="i-heroicons-clock"
            class="w-8 h-8 text-primary-500 animate-pulse"
          />
          <span
            class="text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 px-4 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700"
          >
            Coming Soon
          </span>
        </div>
      </div>

      <div class="blur-[3px] select-none pointer-events-none">
        <DomainsChartBody />
      </div>
    </template>
  </UCard>
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";
</script>
