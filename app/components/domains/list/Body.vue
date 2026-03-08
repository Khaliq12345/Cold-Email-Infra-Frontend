<template>
  <div v-if="domains.length > 0" class="w-full flex flex-col gap-4">
    <!-- // Check all option -->
    <div
      class="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3"
    >
      <UCheckbox label="Select All Domains" v-model="isAllSelected" />

      <span
        v-if="selectedDomains.length > 0"
        class="text-xs text-gray-500 font-medium"
      >
        {{ selectedDomains.length }} selected
      </span>
    </div>

    <!-- // Listing with all the domains -->
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

  <UEmpty v-else icon="i-heroicons-no-symbol" title="No domains found" />
</template>

<script lang="ts" setup>
import type { DomainList } from "~/types/domain";

const domains = defineModel<DomainList>("domains");
// Note: Ensure your provide/inject is using a ref/reactive array
const selectedDomains = inject<Ref<string[]>>("selectedDomains", ref([]));

// Pagination State
const page = defineModel("page");
const limit = defineModel("limit");
const totalDomains = defineModel("totalDomains");

// --- IMPROVED SELECT ALL LOGIC ---

// 1. Computed property to determine if "Select All" should be checked
const isAllSelected = computed({
  get() {
    return (
      domains.value.length > 0 &&
      domains.value.every((d) => selectedDomains.value.includes(d.domain))
    );
  },
  set(value: boolean) {
    if (value) {
      // Add only domains from the CURRENT page that aren't already selected
      const currentIds = domains.value.map((d) => d.domain);
      const newSelection = new Set([...selectedDomains.value, ...currentIds]);
      selectedDomains.value = Array.from(newSelection);
    } else {
      // Remove only the domains on the CURRENT page
      const currentIds = domains.value.map((d) => d.domain);
      selectedDomains.value = selectedDomains.value.filter(
        (id) => !currentIds.includes(id),
      );
    }
  },
});
</script>
