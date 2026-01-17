<template>
  <div class="flex items-center justify-between group">
    <div class="flex items-center gap-2">
      <UIcon
        :name="icon"
        class="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200 transition-colors"
      />
      <span class="text-sm text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
    </div>

    <UButton
      v-if="!isCustomValue"
      size="xs"
      :color="computedColor"
      :label="formattedValue"
      :ui="{
        font: buttonFont,
        padding: { xs: 'px-2 py-0.5' },
      }"
      class="min-w-[3rem] justify-center"
    />

    <span v-else class="text-sm font-medium text-gray-900 dark:text-gray-100">
      {{ formattedValue }}
    </span>
  </div>
</template>

<script setup>
import {
  formatValue,
  formatPercentage,
  formatNumber,
  getHealthColor,
} from "@/utils/formatters";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
  type: {
    type: String,
    default: "number",
    validator: (value) =>
      ["number", "percentage", "health", "boolean", "text"].includes(value),
  },
  color: {
    type: String,
    default: "",
    validator: (value) =>
      [
        "",
        "primary",
        "success",
        "warning",
        "error",
        "info",
        "neutral",
        "gray",
      ].includes(value),
  },
  booleanLabels: {
    type: Object,
    default: () => ({ true: "Oui", false: "Non" }),
  },
});

const isCustomValue = computed(() => props.type === "text");

const computedColor = computed(() => {
  if (props.color) return props.color;

  if (props.type === "health") {
    return getHealthColor(props.value);
  }

  if (props.type === "percentage") return "info";
  if (props.type === "boolean") return props.value ? "success" : "neutral";

  return "primary";
});

const formattedValue = computed(() => {
  const { value, type, booleanLabels } = props;

  if (value === undefined || value === null) return "N/A";

  switch (type) {
    case "percentage":
      return formatPercentage(value);
    case "health":
      return formatValue(value);
    case "boolean":
      return booleanLabels[value] || (value ? "Oui" : "Non");
    case "number":
      return formatNumber(value);
    case "text":
      return value;
    default:
      return String(value);
  }
});

const buttonFont = computed(() => {
  return ["number", "percentage", "health"].includes(props.type)
    ? "font-mono font-semibold text-xs"
    : "font-semibold text-xs";
});
</script>
