<template>
  <div class="flex items-center gap-2 mb-3">
    <UIcon :name="icon" class="w-4 h-4" :class="iconColorClass" />
    <h4
      class="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider"
    >
      {{ title }}
    </h4>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "blue",
        "green",
        "purple",
        "red",
        "orange",
        "yellow",
        "gray",
      ].includes(value),
  },
});

const iconColorClass = computed(() => {
  const colorMap = {
    primary: "text-primary-500",
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    red: "text-red-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
    gray: "text-gray-500",
  };

  return colorMap[props.color] || "text-primary-500";
});
</script>
