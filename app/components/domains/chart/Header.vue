<template>
  <div
    class="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-2"
  >
    <div class="w-full md:w-auto">
      <h3 class="text-xl lg:text-2xl font-bold text-nowrap">
        All domains - Default
      </h3>
      <p class="text-gray-400 text-sm">
        Overview of your connected infrastructure
      </p>
    </div>

    <div
      class="flex items-center gap-3 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-lg"
    >
      <div class="p-2 text-right">
        <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Domains
        </h4>
        <p class="text-sm md:text-base font-bold text-primary-600">
          {{ formatNumber(total_domains) }}
        </p>
      </div>

      <div class="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

      <div class="p-2 text-right">
        <h4 class="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Mailboxes
        </h4>
        <p class="text-sm md:text-base font-bold text-primary-600">
          {{ formatNumber(total_mailboxes) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  total_domains: number;
  total_mailboxes: number;
}>();

/**
 * Formats numbers with commas (e.g., 10000 -> 10,000)
 */
const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num || 0);
};
</script>
