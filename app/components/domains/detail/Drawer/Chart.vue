<template>
  <div class="w-full">
    <BarChart
      :data="chartData"
      :categories="categories"
      :height="height"
      :y-axis="yAxis"
      :stacked="stacked"
      :hide-legend="hideLegend"
      :legend-position="legendPosition"
      :x-formatter="dateFormatter"
      :y-formatter="numberFormatter"
      :radius="radius"
      class="w-full"
    />
  </div>
</template>

<script setup>
import { dateFormatter, numberFormatter } from "@/utils/formatters";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  height: {
    type: Number,
    default: 250,
  },
  stacked: {
    type: Boolean,
    default: true,
  },
  hideLegend: {
    type: Boolean,
    default: false,
  },
  legendPosition: {
    type: String,
    default: "top",
  },
  radius: {
    type: Number,
    default: 4,
  },
  colorScheme: {
    type: Object,
    default: () => ({
      sent: "#3b82f6", // Blue-500
      inbox: "#10b981", // Emerald-500
      spam: "#ef4444", // Red-500
      promotion: "#f59e0b", // Amber-500
    }),
  },
});

// Prepare data for the chart
const chartData = computed(() => {
  return props.data.map((item) => ({
    dt: item.dt,
    sent: item.sent,
    inbox: item.inbox,
    spam: item.spam,
    promotion: item.promotion,
  }));
});

// Category configuration with modern colors
const categories = computed(() => ({
  sent: {
    name: "Sent",
    color: props.colorScheme.sent,
  },
  inbox: {
    name: "Inbox",
    color: props.colorScheme.inbox,
  },
  spam: {
    name: "Spam",
    color: props.colorScheme.spam,
  },
  promotion: {
    name: "Promotion",
    color: props.colorScheme.promotion,
  },
}));

// Y-axis keys
const yAxis = computed(() => {
  return Object.keys(categories.value);
});
</script>