<template>
  <div class="flex flex-col gap-4">
    <!-- // First Section of the header, it contains title and some actions -->
    <div
      class="relative w-full flex flex-col sm:flex-row sm:items-center justify-between"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold truncate">Domains</h2>
        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-arrow-path"
          class="sm:hidden rounded-full"
          @click="emit('refresh')"
        />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <UModal
          :ui="{
            width: 'w-full sm:max-w-lg md:max-w-xl',
            container: 'flex items-center justify-center p-4',
          }"
        >
          <UButton
            icon="i-heroicons-server-stack"
            :label="isMobile ? '' : 'NS Setup'"
            color="gray"
            variant="outline"
            class="shrink-0"
          />
          <template #content>
            <div class="p-4 sm:p-8 overflow-y-auto max-h-[90vh]">
              <div class="mb-4 md:mb-6">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                  Configuration Instructions
                </h3>
              </div>
              <NameServer />
            </div>
          </template>
        </UModal>

        <UButton
          variant="ghost"
          color="gray"
          icon="i-heroicons-arrow-path"
          size="md"
          class="hidden sm:flex rounded-full px-2"
          @click="emit('refresh')"
        />

        <DomainActions
          :selectedDomains="selectedDomains"
          title="Bulk Actions"
          @refresh="
            () => {
              selectedDomains = [];
            }
          "
        />
      </div>
    </div>

    <!-- // Section Section, contains the filters -->
    <div
      class="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <!-- Row 1: Search (full width on mobile, grows on desktop) -->
      <div class="flex flex-col sm:flex-row gap-3">
        <UInput
          v-model="filters.domain"
          icon="i-heroicons-magnifying-glass"
          placeholder="Filter by domain..."
          class="w-full sm:flex-1"
        />

        <!-- Row 2 filters: wrap nicely on mobile -->
        <div class="flex flex-wrap gap-3 flex-1">
          <UInput
            v-model="filters.mailboxesCount"
            type="number"
            icon="i-heroicons-envelope"
            placeholder="Total Mailboxes"
            class="w-full md:w-43"
          />
          <USelectMenu
            v-model="filters.platform"
            placeholder="Platform"
            :items="[
              { label: 'All', value: undefined },
              { label: 'PlusVibe', value: 'plusvibe' },
              { label: 'No Platform', value: 'no_platform' },
            ]"
            value-key="value"
            class="w-full xs:w-40 sm:w-36"
            @change="applyFilters"
          />
          <USelectMenu
            v-model="filters.order"
            placeholder="Order by"
            :items="[
              { label: 'Newest', value: 'desc' },
              { label: 'Oldest', value: 'asc' },
            ]"
            value-key="value"
            class="w-full xs:w-40 sm:w-36"
            @change="applyFilters"
          />
          <USelectMenu
            v-model="filters.exportStatus"
            placeholder="Export Status"
            :items="[
              { label: 'ALL', value: undefined },
              { label: 'SENDING', value: 'SENDING' },
              { label: 'IDLE', value: 'IDLE' },
            ]"
            value-key="value"
            class="w-full xs:w-40 sm:w-36"
            @change="applyFilters"
          />
          <UButton
            label="Apply"
            variant="soft"
            color="primary"
            icon="i-heroicons-funnel"
            class="flex-1 sm:flex-none justify-center"
            @click="applyFilters"
          />
          <UButton
            label="Clear"
            variant="ghost"
            color="red"
            icon="i-heroicons-x-mark"
            class="flex-1 sm:flex-none justify-center"
            @click="clearFilters"
          />
        </div>
      </div>

      <!-- // Skeleton to show when loading or sending data -->
      <div
        v-if="loading"
        class="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-[1px] rounded-lg"
      >
        <div class="flex flex-col items-center gap-2">
          <UIcon
            name="i-heroicons-arrow-path"
            class="size-8 animate-spin text-primary-600"
          />
          <span class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >Processing...</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const emit = defineEmits(["refresh", "filter"]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm"); // Logic to hide/show labels dynamically
const selectedDomains = inject("selectedDomains");
const loading = ref(false);

// Filter State
const filters = reactive({
  domain: "",
  mailboxesCount: null as number | null,
  platform: undefined as string | undefined,
  order: undefined as boolean | undefined,
  exportStatus: undefined as "SENDING" | "IDLE" | undefined,
});

// Helper functions for the filters
const applyFilters = () => {
  // Emit the filter object to the parent component
  emit("filter", { ...filters });
};

const clearFilters = () => {
  filters.domain = "";
  filters.mailboxesCount = null;
  filters.exportStatus = undefined;
  filters.platform = undefined;
  applyFilters();
};
</script>
