<template>
  <div v-if="domains.length > 0" class="w-full flex flex-col gap-4">
    <UCheckboxGroup
      v-model="selectedDomains"
      :items="domains"
      value-key="domain"
      class="flex flex-col"
      variant="table"
      :ui="{
        container: 'flex items-start pt-4',
        label: 'w-full cursor-pointer',
        wrapper:
          'group hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors border-b border-gray-100 dark:border-gray-800',
      }"
    >
      <template #label="{ item }">
        <DomainsListRow :item="item" />
      </template>
    </UCheckboxGroup>

    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-100 dark:border-gray-800"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Rows per page:</span>
        <USelect
          v-model="limit"
          :items="[10, 20, 50, 100]"
          size="xs"
          class="w-20"
          @change="page = 1"
        />
      </div>

      <UPagination
        v-model:page="page"
        :items-per-page="limit"
        :total="totalDomains"
        :ui="{ rounded: 'rounded-full' }"
      />
    </div>
  </div>

  <DomainsListSkeleton v-else />
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

const toast = useToast();
const domains = ref<DomainList>([]);
const selectedDomains = inject("selectedDomains");

// Pagination State
const page = ref(1);
const limit = ref(20);
const totalDomains = ref(0);

async function getDomains() {
  try {
    domains.value = [];
    // Pass page and limit as query parameters to your API
    const response = await useApi(`domains`, {
      query: {
        page: page.value,
        limit: limit.value,
      },
    });

    // Assuming your API returns { data: [], total: number }
    if (response && typeof response === "object") {
      domains.value = (response.data || response) as DomainList;
      totalDomains.value = response.total || domains.value.length;
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: "An error occurred when getting domains",
      color: "error",
    });
  }
}

// Watch for changes in page or limit to refetch data
watch([page, limit], () => {
  getDomains();
});

onMounted(async () => {
  await getDomains();
});
</script>
