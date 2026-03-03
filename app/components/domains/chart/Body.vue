<template>
  <div class="mx-auto max-w-3xl space-y-6 rounded-lg relative p-6">
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
    <div v-else class="overflow-y-auto max-h-[600px]">
      <BarChart
        :data="domainStats"
        :height="chartHeight"
        :categories="domainStatsCategories"
        :y-axis="['total_count']"
        :x-num-ticks="5"
        :radius="4"
        :x-grid-line="true"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :orientation="Orientation.Horizontal"
        :legend-position="LegendPosition.TopRight"
        :hide-legend="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Orientation, LegendPosition } from "vue-chrts";

const props = defineProps<{
  domainStats: any[];
  pending: boolean;
}>();

defineOptions({
  tags: ["barcharts", "horizontal"],
});

const chartHeight = computed(() =>
  Math.max(300, props.domainStats.length * 40),
);

const domainStatsCategories = computed(() => ({
  total_count: {
    name: "Total Mailboxes",
    color: "#22c55e",
  },
}));

// In horizontal mode:
const xFormatter = (tick: number): string => tick.toString();
const yFormatter = (i: number): string => props.domainStats[i]?.domain ?? "";
</script>
