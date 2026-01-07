<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-lg bg-blue-500 flex items-center justify-center">
          <Icon name="i-lucide-globe" class="text-white p-2" size="30"/>
        </div>
        <div>
          <h1 class="text-xl font-bold">{{ name }}</h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">Domain Details</p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton variant="outline" size="sm">Settings</UButton>
        <UButton color="primary" size="sm">Manage</UButton>
      </div>
    </div>
    <div class="grid grid-cols-4 sm:grid-cols-4 gap-2 p-2">
      <div v-for="detail in details" :key="detail.label" class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ detail.label }}</p>
        <p class="font-medium text-sm">{{ detail.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

interface Detail {
  label: string;
  value: string;
}

const props = defineProps<Props>();
const details = ref<Detail[]>([
  { label: "Status", value: "Expired" },
  { label: "Inboxes", value: "100/100" },
  { label: "Redirect", value: "adchat.ai" },
  { label: "Created", value: "Day ago" },
]);
</script>