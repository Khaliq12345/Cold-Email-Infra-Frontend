<template>
  <div
    class="mx-auto max-w-3xl space-y-6 rounded-lg relative min-h-[350px] p-6"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">DOMAIN STATS</h3>
      <UIcon
        v-if="pending"
        name="i-heroicons-arrow-path"
        class="animate-spin size-4 text-gray-400"
      />
    </div>

    <div
      v-if="pending"
      class="flex flex-col items-center justify-center h-[300px] bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700"
    >
      <UIcon
        name="i-heroicons-arrow-path"
        class="size-8 animate-spin text-primary-500 mb-2"
      />
      <p class="text-xs text-gray-500 font-medium">
        Fetching domain statistics...
      </p>
    </div>

    <div
      v-else-if="!domainStats || domainStats.length === 0"
      class="flex flex-col items-center justify-center h-[300px] text-center"
    >
      <UIcon name="i-heroicons-chart-bar" class="size-10 text-gray-300 mb-2" />
      <p class="text-sm text-gray-500">
        No mailbox data found for these domains.
      </p>
    </div>

    <BarChart
      v-else
      :data="domainStats"
      :height="300"
      :categories="domainStatsCategories"
      :y-axis="['total_count']"
      :x-num-ticks="domainStats.length"
      :radius="4"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :y-formatter="yFormatter"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="false"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  domainStats: any[];
  pending: boolean;
}>();
// Chart options
defineOptions({
  tags: ["barcharts", "vertical"],
});
const domainStatsCategories = computed(() => ({
  total_count: {
    name: "Total Mailboxes",
    color: "#22c55e",
  },
}));
const xFormatter = (i: number): string => `${props.domainStats[i]?.domain}`;
const yFormatter = (tick: number) => tick.toString();
</script>
