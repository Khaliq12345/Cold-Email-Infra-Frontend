<template>
  <div class="flex flex-col gap-4">
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

    <div
      class="flex flex-wrap items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800"
    >
      <UInput
        v-model="filters.domain"
        icon="i-heroicons-magnifying-glass"
        placeholder="Filter by domain..."
        class="w-full sm:w-64"
      />

      <UInput
        v-model="filters.mailboxesCount"
        type="number"
        icon="i-heroicons-envelope"
        placeholder="Mailboxes Count"
        class="w-48"
      />

      <USelectMenu
        v-model="filters.hasPlusvibe"
        placeholder="PlusVibe Status"
        :items="[
          { label: 'All Status', value: undefined },
          { label: 'Synced to PlusVibe', value: true },
        ]"
        value-key="value"
        class="w-48"
      />
      <USelectMenu
        v-model="filters.order"
        placeholder="Order by"
        :items="[
          { label: 'Newest', value: 'desc' },
          { label: 'Oldest', value: 'asc' },
        ]"
        value-key="value"
        class="w-48"
        @change="applyFilters"
      />

      <UButton
        label="Submit"
        variant="ghost"
        color="primary"
        icon="i-heroicons-funnel"
        @click="applyFilters"
      />
      <UButton
        label="Clear"
        variant="ghost"
        color="red"
        icon="i-heroicons-x-mark"
        @click="clearFilters"
      />
    </div>

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
</template>

<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const emit = defineEmits(["refresh", "filter"]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm"); // Logic to hide/show labels dynamically
const dialogState = ref(false);
const plusvibeDialogState = ref(false);
const value = ref("");
const selectedDomains = inject("selectedDomains");
const loading = ref(false);

// Filter State
const filters = reactive({
  domain: "",
  mailboxesCount: null as number | null,
  hasPlusvibe: undefined as boolean | undefined,
  order: undefined as boolean | undefined,
});

// Helper functions for the filters
const applyFilters = () => {
  // Emit the filter object to the parent component
  emit("filter", { ...filters });
};

const clearFilters = () => {
  filters.domain = "";
  filters.mailboxesCount = null;
  filters.hasPlusvibe = undefined;
  applyFilters();
};
</script>
