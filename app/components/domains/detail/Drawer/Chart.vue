<template>
  <div class="w-full">
    <BarChart
      :data="chartData"
      :categories="categories"
      :height="250"
      :y-axis="['sent', 'inbox', 'spam', 'promotion']"
      :stacked="true"
      :hide-legend="false"
      :legend-position="'top'"
      :x-formatter="dateFormatter"
      :y-formatter="numberFormatter"
      :radius="4"
      class="w-full"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
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
const categories = {
  sent: {
    name: "Sent",
    color: "#3b82f6", // Blue-500
  },
  inbox: {
    name: "Inbox",
    color: "#10b981", // Emerald-500
  },
  spam: {
    name: "Spam",
    color: "#ef4444", // Red-500
  },
  promotion: {
    name: "Promotion",
    color: "#f59e0b", // Amber-500
  },
};

// Formatters
function dateFormatter(value) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });
}

function numberFormatter(value) {
  return value.toLocaleString();
}
</script>
