<template>
  <USelectMenu
    v-model="value"
    value-key="id"
    :items="items"
    class="w-full sm:w-44"
    :placeholder="title"
    @update:modelValue="bulkActions(value)"
    :loading="loading"
  />
  <MailboxModal
    v-model:open="dialogState"
    :total-mailboxes="0"
    :domains="selectedDomains"
  />
  <ExportMailboxesToPlusvibeModal
    v-model="plusvibeDialogState"
    :domains="selectedDomains"
  ></ExportMailboxesToPlusvibeModal>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedDomains: string[];
  title: string;
}>();
const value = ref("");
const emit = defineEmits(["refresh"]);
const dialogState = ref(false);
const plusvibeDialogState = ref(false);
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
      if (!props.selectedDomains || props.selectedDomains.length === 0) {
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
        for (const domain of props.selectedDomains) {
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
        } else {
          toast.add({ title: "No mailboxes found to export", color: "orange" });
        }
      } finally {
        // 5. Cleanup
        loading.value = false;
        value.value = "";
      }
      emit("refresh");
      break;
    }

    case "export_to_plusvibe": {
      console.log();
      plusvibeDialogState.value = true;
      break;
    }
  }
};
</script>
