<template>
  <div>
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
    >
      <div class="flex items-center gap-3">
        <div
          v-if="domainInfo"
          class="w-14 h-14 rounded-lg bg-blue-500 flex items-center justify-center"
        >
          <Icon name="i-lucide-globe" class="text-white p-2" size="30" />
        </div>
        <USkeleton v-else class="w-14 h-14 rounded-lg" />

        <div v-if="domainInfo">
          <h1 class="text-xl font-bold">
            {{ domainInfo.domain_name || name }}
          </h1>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ domainInfo.description }}
          </p>
        </div>
        <div v-else class="space-y-2">
          <USkeleton class="h-6 w-48" />
          <USkeleton class="h-4 w-64" />
        </div>
      </div>

      <div class="flex gap-2">
        <template v-if="domainInfo">
          <UButton variant="outline" size="sm">Settings</UButton>
          <UButton color="primary" size="sm">Manage</UButton>
        </template>
        <template v-else>
          <USkeleton class="h-8 w-20 rounded-md" />
          <USkeleton class="h-8 w-20 rounded-md" />
        </template>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="grid grid-cols-4 gap-2 p-2">
      <template v-if="domainInfo">
        <div v-for="stat in stats" :key="stat.label" class="text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ stat.label }}
          </p>
          <p class="font-medium text-sm">{{ stat.value }}</p>
        </div>
      </template>
      <template v-else>
        <div v-for="i in 4" :key="i" class="text-center space-y-1">
          <USkeleton class="h-4 w-16 mx-auto" />
          <USkeleton class="h-5 w-12 mx-auto" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DomainInfo } from "~/types/domain";

interface Props {
  name: string | null;
  domainInfo?: DomainInfo | null;
}

const props = defineProps<Props>();

const stats = computed(() => [
  {
    label: "Status",
    value: props.domainInfo?.active ? "Active" : "Inactive",
  },
  {
    label: "Messages",
    value: props.domainInfo?.msgs_total || "0",
  },
  {
    label: "Mailboxes Left",
    value: props.domainInfo?.mboxes_left || "0",
  },
  {
    label: "Created",
    value: formatDate(props.domainInfo?.created),
  },
]);

function formatDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString();
}
</script>
