<template>
  <UCard :ui="cardUi">
    <UCollapsible v-model:open="isOpen" class="w-full" :label="label">
      <template #default>
        <div
          class="flex items-center justify-between p-2 cursor-pointer rounded-t-lg transition-colors"
          :class="headerClasses"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
              :class="iconContainerClasses"
            >
              <UIcon :name="icon" class="w-5 h-5" />
            </div>
            <div>
              <h3
                class="font-semibold text-gray-900 dark:text-gray-100 text-sm"
              >
                {{ title }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ subtitle }}
              </p>
            </div>
          </div>
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-lucide-chevron-down"
            :ui="buttonUi"
            @click.stop
          />
        </div>
      </template>

      <template #content>
        <div class="border-t border-gray-200 dark:border-gray-800">
          <slot name="content"></slot>
        </div>
      </template>
    </UCollapsible>
  </UCard>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "purple", "blue", "green", "orange", "red"].includes(value),
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(props.defaultOpen);

// Couleurs dynamiques basées sur la prop color
const colorMap = {
  primary: {
    open: "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
    closed: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  },
  purple: {
    open: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    closed: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  },
  blue: {
    open: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    closed: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  },
  green: {
    open: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    closed: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  },
};

const cardUi = {
  root: "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
  body: "p-0",
  divide: "divide-y-0",
};

const headerClasses = computed(() => {
  return isOpen.value
    ? "bg-gray-100/60 dark:bg-gray-900/40"
    : "hover:bg-gray-50 dark:hover:bg-gray-900";
});

const iconContainerClasses = computed(() => {
  return isOpen.value
    ? colorMap[props.color].open
    : colorMap[props.color].closed;
});

const buttonUi = computed(() => ({
  icon:
    "transition-transform duration-200" + (isOpen.value ? " rotate-180" : ""),
}));
</script>
