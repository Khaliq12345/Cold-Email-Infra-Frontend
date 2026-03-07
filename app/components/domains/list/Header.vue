<template>
  <div
    class="relative w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4"
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

    <div class="flex flex-wrap items-center gap-2">
      <UButton
        to="/domains/import"
        :variant="isMobile ? 'ghost' : 'outline'"
        color="gray"
        icon="i-lucide-import"
        :label="isMobile ? '' : 'Import'"
        class="shrink-0"
      />

      <UButton
        to="/registrar/register"
        target="_blank"
        color="black"
        icon="i-heroicons-credit-card"
        :label="isMobile ? '' : 'Purchase'"
        class="shrink-0"
      />

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

      <USelectMenu
        v-model="value"
        value-key="id"
        :items="items"
        class="w-full sm:w-44"
        placeholder="Bulk Actions"
        @update:modelValue="bulkActions(value)"
      />
      <MailboxModal
        v-model:open="dialogState"
        :total-mailboxes="0"
        :domains="selectedDomains"
        @refresh="
          () => {
            selectedDomains = [];
            value = '';
          }
        "
      />
      <ExportMailboxesToPlusvibeModal
        v-model="plusvibeDialogState"
        :domains="selectedDomains"
      ></ExportMailboxesToPlusvibeModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const emit = defineEmits(["refresh"]);
const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("sm"); // Logic to hide/show labels dynamically
const dialogState = ref(false);
const plusvibeDialogState = ref(false);
const value = ref("");
const selectedDomains = inject("selectedDomains");
const mailboxes = ref([]);
const toast = useToast();
const loading = ref(false);

const items = [
  { label: "Create Mailboxes", id: "create_mailboxes" },
  { label: "Export To CSV", id: "export_to_csv" },
  { label: "Export To Plusvibe", id: "export_to_plusvibe" },
];

const bulkActions = async (actionType: string) => {
  switch (actionType) {
    case "create_mailboxes":
      dialogState.value = true;
      break; // 1. Added break to prevent falling into export logic

    case "export_to_csv": {
      // 2. CHECK: If no domains are selected, stop early
      if (!selectedDomains.value || selectedDomains.value.length === 0) {
        toast.add({
          title: "Please select at least one domain",
          color: "orange",
        });
        value.value = ""; // Reset dropdown
        return;
      }

      loading.value = true;
      const allMailboxes = [];

      try {
        for (const domain of selectedDomains.value) {
          try {
            const response = await useApi(`/mailboxes/${domain}`);
            if (Array.isArray(response)) {
              allMailboxes.push(...response);
            }
          } catch (error) {
            console.error(`Failed to fetch mailboxes for ${domain}:`, error);
          }
        }

        if (allMailboxes.length > 0) {
          mailboxes.value = allMailboxes;
          await downloadMailboxes(allMailboxes);

          // 4. OPTIONAL: Clear selection only AFTER successful export
          selectedDomains.value = [];
        } else {
          toast.add({ title: "No mailboxes found to export", color: "orange" });
        }
      } finally {
        // 5. Cleanup
        loading.value = false;
        value.value = "";
      }
      break;
    }

    case "export_to_plusvibe": {
      plusvibeDialogState.value = true;
      break;
    }
  }
};
</script>
