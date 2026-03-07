<template>
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between p-2">
    <h2 class="text-lg font-semibold">Inboxes</h2>
    <div class="flex items-center gap-2">
      <USwitch
        @change="$emit('selectall')"
        :label="toggle ? 'Deselect all' : 'Select all'"
      />
      <UButton
        v-for="button in buttons"
        :key="button.label"
        :color="button.color"
        :variant="button.variant"
        :icon="button.icon"
        size="sm"
        @click="button.onClick"
      >
        <span :class="button.icon ? 'hidden sm:inline' : 'inline'">
          {{ button.label }}
        </span>
      </UButton>
      <DomainActions
        :selectedDomains="[domain]"
        title="Actions"
      ></DomainActions>
    </div>
  </div>
  <div></div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedMails: {
    type: Array,
    required: true,
  },
  toggle: {
    type: Boolean,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  totalMailboxes: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["refresh", "selectall", "download"]);
const toast = useToast();
const dialogState = ref(false);

const buttons = [
  {
    label: "",
    icon: "i-lucide-trash",
    color: "error",
    variant: "outline",
    onClick: async () => {
      const { success, response } = await removeMails(props.selectedMails);
      if (success) {
        toast.add({
          title: "Mailbox Removed",
          description: "Mailbox has been removed successfully.",
          color: "success",
        });
        emits("refresh");
      } else {
        toast.add({
          title: "Mailbox Removal Failed",
          description: response.message,
          color: "error",
        });
      }
    },
  },
];
</script>
